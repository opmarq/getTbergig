import Head from "next/head";
import {
  Box,
  Container,
  Spinner,
  Stack,
  useDisclosure,
  Text,
  Badge,
  useColorModeValue,
  Button,
} from "@chakra-ui/react";
import { gql, useQuery } from "@apollo/client";

import { Post } from "../components/Post";
import { Nav } from "../components/Navbar";
import { PostModal } from "../components/PostModal";

export const getPosts = gql`
  query getPosts {
    posts {
      content
      likes
      id
      created_at
    }
  }
`;

export default function Wall() {
  const { data, loading, error } = useQuery(getPosts);
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <div>
      <Head>
        <title>Tbergig</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Nav />
        <Container maxW={"3xl"} py="5">
          <Stack as={Box} textAlign={"center"}>
            <Box
              borderRadius="xl"
              py="30px"
              px="15px"
              boxShadow={"lg"}
              bg={useColorModeValue("white", "gray.900")}
            >
              <Box
                borderRadius="2xl"
                p="10px"
                bg={useColorModeValue("white", "#3A3B3D")}
                textAlign="left"
                cursor="pointer"
                onClick={onOpen}
                border="1px"
                borderColor={useColorModeValue("gray.900", "#3A3B3D")}
              >
                What do you want to say?
              </Box>
            </Box>
          </Stack>
          <Stack direction={"row"} my={6}>
            <Button px={2} py={1} fontWeight={"400"} size="sm">
              #gabriel
            </Button>
            <Button px={2} py={1} fontWeight={"400"} size="sm">
              #redpill
            </Button>
            <Button px={2} py={1} fontWeight={"400"} size="sm">
              #sexologie
            </Button>
          </Stack>
          <Stack as={Box} spacing="24px" textAlign={"center"}>
            {data?.posts.length === 0 && <Text>No tbergig yet!</Text>}
            {loading ? (
              <Box p="5">
                <Spinner />
              </Box>
            ) : (
              <>
                {data.posts.map((post) => {
                  return (
                    <Post likes={post.likes} id={post.id} key={post.id}>
                      {post.content}
                    </Post>
                  );
                })}
              </>
            )}
          </Stack>
        </Container>
        <PostModal isOpen={isOpen} onClose={onClose} />
      </main>
    </div>
  );
}
