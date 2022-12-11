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
  Flex,
  Button,
} from "@chakra-ui/react";
import { gql, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { BiHash } from "react-icons/bi";
import { ChevronDownIcon } from "@chakra-ui/icons";

import { Post } from "../components/Post";
import { Nav } from "../components/Navbar";
import { PostModal } from "../components/PostModal";
import { HashTags } from "../components/HashTags";
import { CommentsModal } from "../components/commentsModal";

export const getPosts = gql`
  query getPosts(
    $order_by: [posts_order_by!] = { created_at: desc }
    $where: posts_bool_exp
  ) {
    posts(order_by: $order_by, where: $where) {
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
      age
      gender
    }
  }
`;

export default function Wall() {
  const { query } = useRouter();
  const [activeTab, setActiveTab] = useState("new");

  const { data: { posts } = { posts: [] }, loading } = useQuery(getPosts, {
    variables: {
      order_by:
        activeTab === "new" ? { created_at: "desc" } : { likes: "desc" },
      where: !!query.h
        ? { post_hashtags: { hashtag: { name: { _eq: query.h } } } }
        : null,
    },
  });

  const { isOpen, onOpen, onClose } = useDisclosure();

  const {
    isOpen: isCommentOpen,
    onOpen: onOpenComment,
    onClose: onCloseComment,
  } = useDisclosure();

  const {
    isOpen: isHashTagOpen,
    onOpen: onHashTagOpen,
    onClose: onHashTagClose,
  } = useDisclosure();

  const [postId, setPostId] = useState();

  return (
    <div>
      <Head>
        <title>Tbergig, The front page of Morocco</title>
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
          <Flex
            my="5"
            borderRadius="xl"
            p="10px"
            px="15px"
            boxShadow={"lg"}
            bg={useColorModeValue("white", "gray.900")}
            justifyContent="space-between"
          >
            <Flex gap={2}>
              <Button
                borderRadius="none"
                variant="ghost"
                textAlign="center"
                minW="70px"
                borderBottom={activeTab === "new" ? "1px" : "none"}
                onClick={() => {
                  setActiveTab("new");
                }}
              >
                New
              </Button>
              <Button
                borderRadius="none"
                variant="ghost"
                textAlign="center"
                minW="70px"
                borderBottom={activeTab === "hot" ? "1px" : "none"}
                onClick={() => {
                  setActiveTab("hot");
                }}
              >
                Hot
              </Button>
            </Flex>
            <Button
              justifyContent="left"
              minW="100px"
              leftIcon={<BiHash />}
              rightIcon={<ChevronDownIcon />}
              onClick={onHashTagOpen}
            >
              {query.h ? query.h : "All"}
            </Button>
          </Flex>
          <Stack as={Box} spacing="24px" textAlign={"center"}>
            {posts.length === 0 && !loading && <Text>No tbergig yet!</Text>}
            {loading ? (
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
                      age={post.age}
                      gender={post.gender}
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
        <HashTags isOpen={isHashTagOpen} onClose={onHashTagClose} />
      </main>
    </div>
  );
}
