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

import { getPosts } from "../pages";

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

  const [addPost, { data, loading, error, refetch }] = useMutation(
    addPostMutation,
    {
      update(cache, { data: { insert_posts_one } }) {
        cache.modify({
          fields: {
            todos(existingPosts = []) {
              const newPostRef = cache.writeFragment({
                data: insert_posts_one,
                fragment: gql`
                  fragment NewPost on Post {
                    id
                    content
                  }
                `,
              });
              return [...existingPosts, newPostRef];
            },
          },
        });
      },
      refetchQueries: [{ query: getPosts }],
    }
  );

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
