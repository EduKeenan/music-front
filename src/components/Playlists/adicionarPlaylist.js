import {
  Center,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  FormLabel,
  ModalFooter,
  Button,
  VStack,
  Box,
  Input,
  Checkbox,
  FormControl,
  Text,
  Stack,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { api } from "../../connection";
import { ModalAviso } from "../Uteis/modalAviso";

export function AdicionarPlaylist(props) {
  const [showModal, setShowModal] = useState(false);
  const [nome, setNome] = useState("");
  const [genero, setGenero] = useState("");
  const [musicas, setMusicas] = useState([]);
  const [idsSelecionados, setIdsSelecionados] = useState([]);
  const [label, setLabel] = useState("");
  const [playlistId, setPlaylistId] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !nome ||
      nome === "" ||
      !genero ||
      genero === "" ||
      idsSelecionados.length === 0
    ) {
      setLabel("Dados inválidos.");
      return;
    }
    setLabel("");
    try {
      if (playlistId) {
        await api
          .put(
            `/playlist`,
            {
              id: playlistId,
              nome,
              genero,
              musicas: idsSelecionados,
            },
            {
              "content-type": "application/json",
              "x-access-token": localStorage.getItem("token"),
            }
          )
          .then(() => {
            setShowModal(true);
            props.onClose();
          });
      } else {
        await api
          .post(
            "/playlist",
            {
              nome,
              genero,
              musicas: idsSelecionados,
            },
            {
              "content-type": "application/json",
              "x-access-token": localStorage.getItem("token"),
            }
          )
          .then(() => {
            setShowModal(true);
            props.onClose();
          });
      }
    } catch {
      setLabel("Ocorreu um erro na comunicacão.");
      props.onClose();
    }
  };

  const handleMudarNome = (text) => {
    setNome(text);
  };
  const handleMudarGenero = (text) => {
    setGenero(text);
  };

  useEffect(() => {
    if (props.playlist) {
      setNome(props.playlist.nome);
      setGenero(props.playlist.genero);
      setPlaylistId(props.playlist.id);
    } else {
      setNome("");
      setGenero("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props]);

  useEffect(() => {
    if (!props.isOpen) {
      setNome("");
      setGenero("");
      setLabel("");
      setIdsSelecionados("");
    }
  }, [props.isOpen]);

  useEffect(() => {
    getDados();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.isOpen]);

  async function getDados() {
    await api
      .get("/musicas", {
        "content-type": "application/json",
        "x-access-token": localStorage.getItem("token"),
      })
      .then((response) => {
        setMusicas(response.data.data);
      })
      .catch((error) => {
        if (error.response.status === 401) navigate("/login");
      });
  }

  return (
    <VStack margin="1em">
      <Center>
        <Box as="form" onSubmit={handleSubmit}>
          <Modal isOpen={props.isOpen} onClose={props.onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>{props.title}</ModalHeader>
              <ModalCloseButton color="red.300" />
              <Box marginX="1em">
                <FormControl>
                  <FormLabel>Nome:</FormLabel>
                  <Input
                    type="text"
                    value={nome}
                    onChange={(e) => handleMudarNome(e.target.value)}
                  />
                </FormControl>

                <FormControl>
                  <FormLabel>Gênero:</FormLabel>
                  <Input
                    type="text"
                    value={genero}
                    onChange={(e) => handleMudarGenero(e.target.value)}
                  />
                </FormControl>

                <Box margin="5px">
                  <FormLabel>Músicas:</FormLabel>
                  <Box>
                    <Stack spacing={0.3} direction="column">
                      {musicas.map((item) => (
                        <Checkbox
                          justifyContent="flex-start"
                          id={item.id}
                          key={item.id}
                          onChange={(event) => {
                            if (event.target.checked) {
                              setIdsSelecionados([...idsSelecionados, item.id]);
                            } else {
                              setIdsSelecionados(
                                idsSelecionados.filter((id) => id !== item.id)
                              );
                            }
                          }}
                        >
                          {item.musica} - {item.artista}
                        </Checkbox>
                      ))}
                    </Stack>
                  </Box>
                </Box>
              </Box>

              <ModalFooter>
                <Button
                  bgcolor="red.300"
                  colorScheme="red"
                  mr={3}
                  onClick={props.onClose}
                >
                  Fechar
                </Button>
                <Button colorScheme="gray" type="submit" onClick={handleSubmit}>
                  {props.playlist ? "Editar" : "Adicionar"}
                </Button>
              </ModalFooter>
              {label !== "" ? (
                <Box display="flex" margin="10px">
                  <Text color="red.300">{label}</Text>
                </Box>
              ) : null}
            </ModalContent>
          </Modal>
        </Box>
      </Center>
      <ModalAviso
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
          props.setRenderizar(!props.renderizar)
        }}
        title="Sucesso"
        message='Playlist cadastrada/editada com sucesso.'
      />
    </VStack>
  );
}
