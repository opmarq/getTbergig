import Head from "next/head";
import { Box, Container, Stack, useDisclosure } from "@chakra-ui/react";
import { gql, useQuery } from "@apollo/client";

import { Post } from "../components/Post";
import { Nav } from "../components/Navbar";
import { PostModal } from "../components/PostModal";

const getPosts = gql`
  query MyQuery {
    posts {
      content
      likes
      id
      created_at
    }
  }
`;

export default function Home() {
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
        <Container maxW={"3xl"} py="10">
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
                Ach kat3awd a zin ?
              </Box>
            </Box>
          </Stack>
          <Stack as={Box} spacing="24px" textAlign={"center"} py="10">
            {loading ? (
              "loading"
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
