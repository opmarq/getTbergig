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
  Card,
  CardHeader,
  CardBody,
  CardFooter,
} from "@chakra-ui/react";
import { BsThreeDotsVertical } from "react-icons/bs";
import ReactHashtag from "react-hashtag";
import { gql, useMutation } from "@apollo/client";
import { BiLike, BiShare } from "react-icons/bi";
import { formatRelative } from "date-fns";

import { getPosts } from "../pages";
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

export const Comment = ({ children, likes, id, createdAt }) => {
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
    <Card bg="transparent" boxShadow="none" borderRadius="xl" w="full">
      <CardHeader>
        <Flex spacing="4">
          <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
            <Box>
              <Text color="gray">
                {formatRelative(new Date(createdAt), new Date())}
              </Text>
            </Box>
          </Flex>
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
      </CardHeader>
      <CardBody>
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
      </CardBody>
      <CardFooter
        justify="space-between"
        flexWrap="wrap"
        sx={{
          "& > button": {
            minW: "136px",
          },
        }}
      >
        <Button
          onClick={() => {
            vote({
              variables: { id, likes: 1 },
              optimisticResponse: {
                update_posts_by_pk: {
                  approved: true,
                  content: children,
                  created_at: new Date(createdAt),
                  id: id,
                  likes: likes + 1,
                  __typename: "posts",
                },
              },
            });
          }}
          flex="1"
          variant="ghost"
          leftIcon={<BiLike />}
        >
          {likes}
        </Button>
        <Button flex="1" variant="ghost" leftIcon={<BiShare />}>
          Share
        </Button>
      </CardFooter>
    </Card>
  );
};
