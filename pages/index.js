import Head from "next/head";
import {
  Box,
  Container,
  Spinner,
  Stack,
  useDisclosure,
  Text,
  Button,
  Wrap,
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
              backgroundColor="#232526"
            >
              <Box
                borderRadius="2xl"
                p="10px"
                backgroundColor="#3A3B3D"
                color="#ABAEB3"
                textAlign="left"
                cursor="pointer"
                onClick={onOpen}
              >
                What do you want to say?
              </Box>
            </Box>
          </Stack>
          <Wrap py="5" spacing={4} direction="row" align="center">
            <Button colorScheme="blue" href="#" size="sm">
              #gabriel
            </Button>
            <Button colorScheme="blue" size="sm">
              #sex
            </Button>
            <Button colorScheme="blue" size="sm">
              #maghariba3ilmaniyon
            </Button>
            <Button colorScheme="blue" href="#" size="sm">
              #gabriel
            </Button>
            <Button colorScheme="blue" size="sm">
              #sex
            </Button>
            <Button colorScheme="blue" size="sm">
              #maghariba3ilmaniyon
            </Button>
            <Button colorScheme="blue" href="#" size="sm">
              #gabriel
            </Button>
            <Button colorScheme="blue" size="sm">
              #sex
            </Button>
            <Button colorScheme="blue" size="sm">
              #maghariba3ilmaniyon
            </Button>
          </Wrap>
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
                    <Post id={post.id} key={post.id}>
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
