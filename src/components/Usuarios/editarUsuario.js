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
  Radio,
  RadioGroup,
  FormControl,
  Text,
  Stack,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { api } from "../../connection";
import { ModalAviso } from "../Uteis/modalAviso";


export function EditarUsuario(props) {
  const [showModal, setShowModal] = useState(false);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [label, setLabel] = useState("");
  const [role, setRole] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !nome ||
      nome === "" ||
      !email ||
      email === ""
    ) {
      setLabel("Dados inválidos.");
      return;
    }
    setLabel("");
    try {
      await api
        .put(
          `/user`,
          {
            id: props.usuario.id,
            nome,
            email,
            role: role.toUpperCase(),
          },
          {
            "content-type": "application/json",
            "x-access-token": localStorage.getItem("token"),
          }
        )
        .then(() => {
          setShowModal(true)
          props.onClose();
        });
    } catch {
      setLabel("Ocorreu um erro na comunicacão.");
      navigate("/login");
      props.onClose();
    }
  };

  const handleMudarNome = (text) => {
    setNome(text);
  };
  const handleMudarEmail = (text) => {
    setEmail(text);
  };
 

  useEffect(() => {
    if (props.usuario) {
      setNome(props.usuario.nome);
      setEmail(props.usuario.email);
      setRole(props.usuario.role.toLowerCase());
    } else {
      setNome("");
      setEmail("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props]);

  useEffect(() => {
    if (!props.isOpen) {
      setNome("");
      setEmail("");
      setLabel("");
    }
  }, [props.isOpen]);

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
                    _hover={{ boxShadow: "#2851a042 0px 3px 6px" }}
                    type="text"
                    value={nome}
                    onChange={(e) => handleMudarNome(e.target.value)}
                  />
                </FormControl>

                <FormControl>
                  <FormLabel>Email:</FormLabel>
                  <Input
                    _hover={{ boxShadow: "#2851a042 0px 3px 6px" }}
                    type="text"
                    value={email}
                    onChange={(e) => handleMudarEmail(e.target.value)}
                  />
                </FormControl>

                <Box margin="5px">
                  <FormLabel>Role:</FormLabel>
                  <Box>
                    <RadioGroup value={role} onChange={setRole}>
                      <Stack direction="column">
                        <Radio justifyContent="flex-start" value="admin">
                          ADMIN
                        </Radio>
                        <Radio justifyContent="flex-start" value="user">
                          USER
                        </Radio>
                      </Stack>
                    </RadioGroup>
                  </Box>
                </Box>
              </Box>

              <ModalFooter>
                <Button
                  _hover={{ boxShadow: "#2851a042 0px 3px 6px" }}
                  bgcolor="red.300"
                  colorScheme="red"
                  mr={3}
                  onClick={props.onClose}
                >
                  Fechar
                </Button>
                <Button
                  _hover={{ boxShadow: "#2851a042 0px 3px 6px" }}
                  colorScheme="gray"
                  type="submit"
                  onClick={handleSubmit}
                >
                  Editar
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
        message="Usuário editado com sucesso."
      />
    </VStack>
  );
}
