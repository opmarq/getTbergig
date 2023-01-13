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
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Icon,
  Heading,
} from "@chakra-ui/react";
import { BsThreeDotsVertical } from "react-icons/bs";
import ReactHashtag from "react-hashtag";
import { gql, useMutation } from "@apollo/client";
import { BiLike, BiChat, BiShare } from "react-icons/bi";
import { BsGenderMale, BsGenderFemale } from "react-icons/bs";
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

export const Post = ({
  children,
  likes,
  id,
  createdAt,
  onClick,
  comments,
  age,
  gender,
  headless = false,
}) => {
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
    <Card
      boxShadow={headless ? "none" : "xl"}
      borderRadius="xl"
      bg={headless ? "transparent" : useColorModeValue("white", "gray.900")}
      w="full"
      border="1px"
      borderColor={
        headless ? "transparent" : useColorModeValue("black", "transparent")
      }
    >
      <CardHeader px={headless ? 0 : 5}>
        <Flex spacing="4">
          <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
            <Box>
              <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
                {gender === "man" && <Icon as={BsGenderFemale} boxSize={6} />}
                {gender === "woman" && <Icon as={BsGenderMale} boxSize={6} />}
                <Box textAlign="left">
                  <Heading size="sm">{age} years old</Heading>
                  <Text color="gray">
                    {formatRelative(new Date(createdAt), new Date())}
                  </Text>
                </Box>
              </Flex>
            </Box>
          </Flex>
          <Popover
            isOpen={isOpen}
            onClose={onClose}
            onOpen={onOpen}
            placement="left"
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
                  {/* <Button
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
                  </Button> */}
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
      <CardBody px={headless ? 0 : 5}>
        <Text textAlign="left">
          <ReactHashtag
            renderHashtag={(hashtagValue) => (
              <Link
                key={hashtagValue}
                href={{
                  pathname: "/",
                  query: {
                    h: hashtagValue.substring(1, hashtagValue.length),
                  },
                }}
              >
                <Box as="span" color="blue.200">
                  {hashtagValue}
                </Box>
              </Link>
            )}
          >
            {children}
          </ReactHashtag>
        </Text>
      </CardBody>
      <CardFooter px={headless ? 0 : 5} justify="space-between">
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
          variant="ghost"
          leftIcon={<BiLike />}
        >
          {likes}
        </Button>
        <Button
          onClick={() => {
            onClick(id);
          }}
          variant="ghost"
          leftIcon={<BiChat />}
        >
          {comments}
        </Button>
        <Button variant="ghost" leftIcon={<BiShare />}>
          Share
        </Button>
      </CardFooter>
    </Card>
  );
};
