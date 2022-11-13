import { useState } from "react";
import {
  Box,
  Container,
  Stack,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Textarea,
} from "@chakra-ui/react";
import { gql, useMutation } from "@apollo/client";

const addPostMutation = gql`
  mutation AddPost($content: String!) {
    insert_posts_one(object: { content: $content }) {
      content
      likes
      id
      created_at
    }
  }
`;

export const PostModal = ({ isOpen, onClose }) => {
  const [post, setPost] = useState("");
  const [addPost, { data, loading, error }] = useMutation(addPostMutation);

  return (
    <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Khwi alina qlbek!!</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Textarea
            onChange={(e) => {
              setPost(e.target.value);
            }}
          />
        </ModalBody>
        <ModalFooter>
          <Button
            width="full"
            colorScheme="blue"
            onClick={() => {
              onClose();
              addPost({ variables: { content: post } });
            }}
          >
            Send
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
