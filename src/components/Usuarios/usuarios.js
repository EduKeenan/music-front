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
import { EditarUsuario } from "./editarUsuario";
import { api } from "../../connection";
import { useNavigate } from "react-router-dom";

export function Usuarios() {
  const [isOpen, setIsOpen] = useState(false);
  const [dados, setDados] = useState([]);
  const [usuarioSelecionado, setUsuarioSelecionado] = useState(null);
  const [renderizar, setRenderizar] = useState(false);

  const onClose = () => setIsOpen(false);
  const onOpen = (adicionar = true, playlistSelecionada = null) => {
    setIsOpen(true);
    setUsuarioSelecionado(adicionar ? null : playlistSelecionada);
  };

  const navigate = useNavigate();

  useEffect(() => {
    getDados();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [renderizar]);

  async function getDados() {
    await api
      .get("/user", {
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
      await api.delete(`/user/${id}`, {
        headers: {
          "Content-Type": "application/json",
          "x-access-token": localStorage.getItem("token"),
        },
      });
      setDados(dados.filter((item) => item.id !== id));
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <VStack margin="1em">
      <Center width="80%">
        <Table variant="simple" colorScheme="gray" size="sm">
          <Thead bgColor="gray.400">
            <Tr color="white">
              <Th color="white">Nome</Th>
              <Th color="white">Email</Th>
              <Th color="white">Role</Th>
              <Th color="white" width="165px">
                Ações
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {dados.map((item) => (
              <Tr key={item.id}>
                <Td>{item.nome}</Td>
                <Td>{item.email}</Td>
                <Td>{item.role}</Td>
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
                        setUsuarioSelecionado(item);
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
      <EditarUsuario
        isOpen={isOpen}
        onClose={onClose}
        title={"Editar Usuario"}
        usuario={usuarioSelecionado}
        setRenderizar={setRenderizar}
        renderizar={renderizar}
      />
    </VStack>
  );
}
