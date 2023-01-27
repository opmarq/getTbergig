import {
  Modal,
  ModalContent,
  ModalOverlay,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  useClipboard,
  Flex,
  Input,
  Button,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

export const ShareModal = ({ isOpen, onClose }) => {
  const { onCopy, hasCopied, setValue } = useClipboard("");
  const [location, setLocation] = useState("");

  useEffect(() => {
    setLocation(window.location.href);
    setValue(window.location.href);
  }, []);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Share</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex m="5">
            <Input value={location} mr={2} readOnly />
            <Button onClick={onCopy}>{hasCopied ? "Copied!" : "Copy"}</Button>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
