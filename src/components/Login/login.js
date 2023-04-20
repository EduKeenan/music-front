import {
  Box,
  Center,
  FormControl,
  FormLabel,
  Input,
  Button,
  Flex,
  Text,
  Image,
} from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AdicionarUsuario } from "../Usuarios/adicionarUsuario";
import { api } from "../../connection";
import source from "../../images/m.png";

export function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [label, setLabel] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || email === "" || !senha || senha === "") {
      setLabel("Email ou senha inválidos.");
      return;
    }

    try {
      await api
        .post(
          "/login",
          {
            email,
            senha,
          },
          {
            "content-type": "application/json",
          }
        )
        .then((response) => {
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("username", response.data.nome);
          navigate("/playlists");
        });
    } catch {
      setLabel("Email ou senha inválidos.");
    }
  };

  const handleMudarEmail = (texto) => {
    setEmail(texto);
  };
  const handleMudarSenha = (texto) => {
    setSenha(texto);
  };

  return (
    <Center>
      <Box as="form" onSubmit={handleSubmit} display="grid" gap="20px">
        <Box>
          <Flex justifyContent="center">
            <Image src={source} alt="logo" boxSize="150px" />
          </Flex>
        </Box>
        <Box display="grid" gap="20px">
          <FormControl>
            <FormLabel>Email:</FormLabel>
            <Input
              boxShadow="#2851a042 0px 3px 6px"
              type="text"
              id="email"
              value={email}
              onChange={(e) => handleMudarEmail(e.target.value)}
            />
          </FormControl>

          <FormControl>
            <FormLabel>Senha:</FormLabel>
            <Input
              boxShadow="#2851a042 0px 3px 6px"
              type="password"
              id="senha"
              value={senha}
              onChange={(e) => handleMudarSenha(e.target.value)}
            />
          </FormControl>
        </Box>
        <Flex justifyContent="space-between">
          <Button
            _hover={{ boxShadow: "#2851a042 0px 3px 6px" }}
            width="48%"
            size="xs"
            fontSize="xs"
            colorScheme="white"
            bgColor="gray.400"
            onClick={() => setIsOpen(true)}
          >
            Registre-se
          </Button>
          <Button
            _hover={{ boxShadow: "#2851a042 0px 3px 6px" }}
            width="48%"
            type="submit"
            size="xs"
            fontSize="xs"
            colorScheme="white"
            bgColor="gray.400"
          >
            Entrar
          </Button>
        </Flex>
        <Box>
          <Flex>
            {label !== "" ? <Text color="red.300">{label}</Text> : null}
          </Flex>
        </Box>
      </Box>
      <AdicionarUsuario isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </Center>
  );
}
