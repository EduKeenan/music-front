import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Center,
  Flex,
  Button,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { AdicionarPlaylist } from "./adicionarPlaylist";
import { ModalAviso } from "../Uteis/modalAviso";
import { api } from "../../connection";
import { useNavigate } from "react-router-dom";

export function Playlists() {
  const [isOpen, setIsOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [dados, setDados] = useState([]);
  const [playlistSelecionada, setPlaylistSelecionada] = useState(null);
  const [renderizar, setRenderizar] = useState(false);

  const onClose = () => setIsOpen(false);
  const onOpen = (adicionar = true, playlistSelecionada = null) => {
    setIsOpen(true);
    setPlaylistSelecionada(adicionar ? null : playlistSelecionada);
  };

  const navigate = useNavigate();

  useEffect(() => {
    getDados();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [renderizar]);

  async function getDados() {
    await api
      .get("/playlist", {
        "content-type": "application/json",
        "x-access-token": localStorage.getItem("token"),
      })
      .then((response) => {
        setDados(response.data.data);
      })
      .catch((error) => {
        if (error.response.status === 401) navigate("/login");
      });
  }

  async function handleDelete(id) {
    try {
      await api
        .delete(`/playlist/${id}`, {
          headers: {
            "Content-Type": "application/json",
            "x-access-token": localStorage.getItem("token"),
          },
        })
        .then(() => {
          setDados(dados.filter((item) => item.id !== id));
        });
    } catch (error) {
      if (error.response.status === 403) setShowModal(true);
      if (error.response.status === 401) navigate('/login');
    }
  }

  return (
    <VStack margin="1em">
      <Center width="80%">
        <Table variant="simple" colorScheme="gray" size="sm">
          <Thead bgColor="gray.400">
            <Tr color="white">
              <Th color="white">Nome</Th>
              <Th color="white">Gênero</Th>
              <Th color="white">Músicas</Th>
              <Th color="white" width="165px">
                Ações
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {dados.map((item) => (
              <Tr key={item.id}>
                <Td>{item.nome}</Td>
                <Td>{item.genero}</Td>
                <Td maxWidth="500px">{item.musicas}</Td>
                <Td>
                  <Flex justifyContent="flex-end">
                    <Button
                      _hover={{ boxShadow: "#2851a042 0px 3px 6px" }}
                      size="xs"
                      fontSize="xs"
                      colorScheme="gray"
                      mr="3"
                      bgColor="gray.300"
                      onClick={() => {
                        setPlaylistSelecionada(item);
                        onOpen(false, item);
                      }}
                    >
                      Editar
                    </Button>
                    <Button
                      _hover={{ boxShadow: "#2851a042 0px 3px 6px" }}
                      size="xs"
                      fontSize="xs"
                      colorScheme="red"
                      mr="3"
                      bgColor="red.400"
                      onClick={() => handleDelete(item.id)}
                    >
                      Remover
                    </Button>
                  </Flex>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Center>
      <Button
        _hover={{ boxShadow: "#2851a042 0px 3px 6px" }}
        size="xs"
        fontSize="xs"
        colorScheme="white"
        mr="3"
        bgColor="gray.400"
        onClick={onOpen}
      >
        Adicionar
      </Button>
      <AdicionarPlaylist
        isOpen={isOpen}
        onClose={onClose}
        title={playlistSelecionada ? "Editar Playlist" : "Adicionar Playlist"}
        playlist={playlistSelecionada}
        setRenderizar={setRenderizar}
        renderizar={renderizar}
      />
      <ModalAviso
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="Aviso"
        message="Esta playlist não pertence ao seu usuário."
      />
    </VStack>
  );
}
