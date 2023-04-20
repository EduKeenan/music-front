import {
  Center,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalFooter,
  Button,
  VStack,
  Box,
  Text,
} from "@chakra-ui/react";

export function ModalAviso(props) {
  return (
    <VStack margin="1em">
      <Center>
        <Box>
          <Modal isOpen={props.isOpen} onClose={props.onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>{props.title}</ModalHeader>
              <ModalCloseButton color="red.300" />
              <Box marginX="1em">
                <Text>{props.message}</Text>
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
              </ModalFooter>
            </ModalContent>
          </Modal>
        </Box>
      </Center>
    </VStack>
  );
}
