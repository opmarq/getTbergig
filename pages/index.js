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
import { useRouter } from "next/router";

import { Post } from "../components/Post";
import { Nav } from "../components/Navbar";
import { PostModal } from "../components/PostModal";
import { HashTags } from "../components/HashTags";
import { CommentsModal } from "../components/commentsModal";

export const getPosts = gql`
  query getPosts {
    posts(order_by: { created_at: desc }) {
      comments {
        content
        likes
        id
        created_at
      }
      content
      likes
      id
      created_at
    }
  }
`;

const getPostsByHashTag = gql`
  query getPostsByHashtag($_eq: String) {
    posts(
      order_by: { created_at: desc }
      where: { post_hashtags: { hashtag: { name: { _eq: $_eq } } } }
    ) {
      comments {
        content
        likes
        id
        created_at
      }
      content
      likes
      id
      created_at
    }
  }
`;

export default function Wall() {
  const { query } = useRouter();
  const { data: dataAllPosts, loading: loadingAllPosts } = useQuery(getPosts, {
    skip: !!query.h,
  });
  const { data: dataHashPosts, loading: loadingHashPosts } = useQuery(
    getPostsByHashTag,
    {
      skip: !query.h,
      variables: {
        _eq: query.h,
      },
    }
  );
  const { isOpen, onOpen, onClose } = useDisclosure();

  const {
    isOpen: isCommentOpen,
    onOpen: onOpenComment,
    onClose: onCloseComment,
  } = useDisclosure();

  const [postId, setPostId] = useState();

  const dataPosts = dataAllPosts || dataHashPosts;

  const loadingPosts = loadingAllPosts || loadingHashPosts;

  const { posts } = dataPosts || { posts: [] };

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
                      comments={post.comments.length}
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
