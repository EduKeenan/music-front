import { useNavigate } from "react-router-dom";
import { Box, Button, Center, Flex, Text } from "@chakra-ui/react";
import { api } from "../../connection";
export function NavBarAdm(props) {
  const navigate = useNavigate();
  const logout = async (e) => {
    try {
      await api
        .post(
          "/logout",
          {},
          {
            "content-type": "application/json",
            "x-access-token": localStorage.getItem("token"),
          }
        )
        .then(() => {
          localStorage.removeItem("token");
          navigate("/login");
        });
    } catch {
      navigate("/login");
    }
  };
  return (
    <Center justifyContent="right">
      <Box width="45%">
        <Flex
          justifyContent="center"
          alignItems="center"
          gap="10px"
          padding="10px"
        >
          <Text>{localStorage.getItem("username")}</Text>
          {props.adm ? (
            <Button
              _hover={{ boxShadow: "#2851a042 0px 3px 6px" }}
              size="sm"
              fontSize="sm"
              colorScheme="gray"
              onClick={() => navigate("/usuarios")}
            >
              Usuários
            </Button>
          ) : null}
          <Button
            _hover={{ boxShadow: "#2851a042 0px 3px 6px" }}
            size="sm"
            fontSize="sm"
            colorScheme="gray"
            onClick={() => navigate("/playlists")}
          >
            Playlists
          </Button>
          <Button
            _hover={{ boxShadow: "#2851a042 0px 3px 6px" }}
            size="sm"
            fontSize="sm"
            colorScheme="gray"
            onClick={logout}
          >
            Logout
          </Button>
        </Flex>
      </Box>
    </Center>
  );
}
