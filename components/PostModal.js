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

  const [addPost] = useMutation(addPostMutation, {
    update(cache, { data: { insert_posts_one } }) {
      cache.modify({
        fields: {
          posts(existingPosts = []) {
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
  });

  return (
    <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>What do you want to say?</ModalHeader>
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
              addPost({
                variables: { content: post },
                optimisticResponse: {
                  insert_posts_one: {
                    __typename: "posts",
                    content: post,
                    likes: 0,
                    id: 111,
                    created_at: "2022-11-19T17:55:56.960641+00:00",
                  },
                },
              });
            }}
          >
            Send
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
