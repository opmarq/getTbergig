import { useState } from "react";
import Head from "next/head";
import {
  Box,
  Container,
  Spinner,
  Stack,
  useDisclosure,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { gql, useQuery } from "@apollo/client";

import { Post } from "../components/Post";
import { Nav } from "../components/Navbar";
import { PostModal } from "../components/PostModal";
import { HashTags } from "../components/HashTags";
import { CommentsModal } from "../components/commentsModal";

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
  const { data: dataPosts, loading: loadingPosts } = useQuery(getPosts);
  const { posts } = dataPosts || { posts: [] };

  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isCommentOpen,
    onOpen: onOpenComment,
    onClose: onCloseComment,
  } = useDisclosure();
  const [postId, setPostId] = useState();

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
          <HashTags />
          <Stack as={Box} spacing="24px" textAlign={"center"}>
            {posts.length === 0 && !loadingPosts && (
              <Text>No tbergig yet!</Text>
            )}
            {loadingPosts ? (
              <Box p="5">
                <Spinner />
              </Box>
            ) : (
              <>
                {posts.map((post) => {
                  return (
                    <Post
                      createdAt={post.created_at}
                      likes={post.likes}
                      id={post.id}
                      key={post.id}
                      onClick={(id) => {
                        onOpenComment();
                        setPostId(id);
                      }}
                    >
                      {post.content}
                    </Post>
                  );
                })}
              </>
            )}
          </Stack>
        </Container>
        <PostModal isOpen={isOpen} onClose={onClose} />
        <CommentsModal
          postId={postId}
          isOpen={isCommentOpen}
          onClose={onCloseComment}
        />
      </main>
    </div>
  );
}
