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
  FormControl,
  Text,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { api } from "../../connection";

export function AdicionarUsuario(props) {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [label, setLabel] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !nome ||
      nome === "" ||
      !email ||
      email === "" ||
      !senha ||
      senha === ""
    ) {
      setLabel("Dados inválidos.");
      return;
    }
    setLabel("");
    try {
      await api
        .post(
          `/user`,
          {
            nome,
            email,
            senha,
          },
          {
            "content-type": "application/json",
          }
        )
        .then(() => {
          props.onClose();
          navigate("/login");
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
  const handleMudarSenha = (text) => {
    setSenha(text);
  };

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

                <FormControl>
                  <FormLabel>Senha:</FormLabel>
                  <Input
                    _hover={{ boxShadow: "#2851a042 0px 3px 6px" }}
                    type="password"
                    value={senha}
                    onChange={(e) => handleMudarSenha(e.target.value)}
                  />
                </FormControl>
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
                  Confirmar
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
    </VStack>
  );
}
