import {
  Box,
  Text,
  Stack,
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  PopoverArrow,
  IconButton,
  useDisclosure,
  Flex,
  useColorModeValue,
} from "@chakra-ui/react";
import { BsThreeDotsVertical } from "react-icons/bs";
import ReactHashtag from "react-hashtag";
import { gql, useMutation } from "@apollo/client";

import { getPosts } from "../pages";
import { Vote } from "./Vote";
import Link from "next/link";

const deletePostMutation = gql`
  mutation DeletePost($id: Int!) {
    delete_posts_by_pk(id: $id) {
      id
    }
  }
`;

const voteMutation = gql`
  mutation Vote($id: Int!, $likes: numeric) {
    update_posts_by_pk(pk_columns: { id: $id }, _inc: { likes: $likes }) {
      approved
      content
      created_at
      id
      likes
    }
  }
`;

export const Post = ({ children, likes, id }) => {
  const [deletePost] = useMutation(deletePostMutation, {
    update: (store, { data: { delete_posts_by_pk } }) => {
      const data = store.readQuery({
        query: getPosts,
        variables: { id: id },
      });
      const posts = data.posts.filter(
        (post) => post.id !== delete_posts_by_pk.id
      );
      store.writeQuery({
        query: getPosts,
        data: { posts: posts },
      });
    },
  });
  const [vote] = useMutation(voteMutation);

  const { onOpen, onClose, isOpen } = useDisclosure();

  return (
    <Flex>
      <Box
        boxShadow={"lg"}
        borderRadius="xl"
        pt="5px"
        pb="10px"
        pl="20px"
        pr="5px"
        bg={useColorModeValue("white", "gray.900")}
        w="full"
      >
        <Flex justifyContent="end">
          <Flex justifyContent="center">
            <Popover
              isOpen={isOpen}
              onClose={onClose}
              onOpen={onOpen}
              placement="bottom"
              isLazy
            >
              <PopoverTrigger>
                <IconButton
                  aria-label="More server options"
                  icon={<BsThreeDotsVertical />}
                  variant="ghost"
                  w="fit-content"
                  _hover={{ bg: "transparent" }}
                />
              </PopoverTrigger>
              <PopoverContent w="fit-content" _focus={{ boxShadow: "none" }}>
                <PopoverArrow />
                <PopoverBody>
                  <Stack>
                    <Button
                      w="194px"
                      variant="ghost"
                      justifyContent="space-between"
                      fontWeight="normal"
                      colorScheme="red"
                      fontSize="sm"
                      onClick={() => {
                        onClose();
                        deletePost({
                          variables: { id },
                          optimisticResponse: {
                            delete_posts_by_pk: {
                              id,
                              __typename: "posts",
                            },
                          },
                        });
                      }}
                    >
                      Delete
                    </Button>
                    <Button
                      w="194px"
                      variant="ghost"
                      justifyContent="space-between"
                      fontWeight="normal"
                      colorScheme="red"
                      fontSize="sm"
                    >
                      Report
                    </Button>
                  </Stack>
                </PopoverBody>
              </PopoverContent>
            </Popover>
          </Flex>
        </Flex>
        <Text textAlign="left">
          <ReactHashtag
            renderHashtag={(hashtagValue, index) => (
              <Link key={index} href={hashtagValue}>
                {hashtagValue}
              </Link>
            )}
            onHashtagClick={(val) => console.log(val)}
          >
            {children}
          </ReactHashtag>
        </Text>
      </Box>
      <Box pl="2">
        <Vote
          onVote={(votes) => {
            vote({
              variables: { id, likes: votes },
              optimisticResponse: {
                update_posts_by_pk: {
                  approved: true,
                  content: children,
                  created_at: "2022-11-15T22:55:51.330032+00:00",
                  id: id,
                  likes: likes + votes,
                  __typename: "posts",
                },
              },
            });
          }}
          votes={likes}
        />
      </Box>
    </Flex>
  );
};
