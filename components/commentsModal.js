import { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Button,
  Textarea,
  Stack,
  Skeleton,
  useColorModeValue,
  Flex,
} from "@chakra-ui/react";
import { gql, useMutation, useQuery } from "@apollo/client";

import { Post } from "./Post";
import { Comment } from "./Comment";

const AddCommentMutation = gql`
  mutation addComment($content: String = "", $post_id: Int = 10) {
    insert_comments_one(object: { content: $content, post_id: $post_id }) {
      id
      likes
      created_at
      content
      post_id
    }
  }
`;

export const GetPostQuery = gql`
  query GetPost($id: Int!) {
    posts_by_pk(id: $id) {
      comments {
        content
        likes
        id
        created_at
      }
      content
      id
      likes
      created_at
    }
  }
`;

export const CommentsModal = ({ isOpen, onClose, postId }) => {
  const {
    data: { posts_by_pk: post } = { posts_by_pk: { comments: [] } },
    loading: loadingPost,
  } = useQuery(GetPostQuery, {
    variables: {
      id: postId,
    },
  });

  const [comment, setComment] = useState("");

  const [addComment] = useMutation(AddCommentMutation, {
    onCompleted() {
      setComment("");
    },
    update(cache, { data: { insert_comments_one } }) {
      console.log(insert_comments_one);
      cache.modify({
        fields: {
          comments(existingComments = []) {
            console.log(existingComments);
            const newCommentsRef = cache.writeFragment({
              data: insert_comments_one,
              fragment: gql`
                fragment NewComment on Comment {
                  id
                  content
                }
              `,
            });
            return [...existingComments, newCommentsRef];
          },
        },
      });
    },
  });

  const onComment = (e) => {
    addComment({
      variables: {
        content: comment,
        post_id: postId,
      },
    });
  };

  return (
    <Modal
      size={{
        base: "full",
        md: "3xl",
      }}
      blockScrollOnMount={false}
      isOpen={isOpen}
      onClose={onClose}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader />
        <ModalCloseButton />
        <ModalBody>
          {loadingPost ? (
            <Stack my="5">
              <Skeleton
                borderRadius="lg"
                startColor={useColorModeValue("white", "#3A3B3D")}
                height="20px"
              />
              <Skeleton
                borderRadius="lg"
                startColor={useColorModeValue("white", "#3A3B3D")}
                height="20px"
              />
              <Skeleton
                borderRadius="lg"
                startColor={useColorModeValue("white", "#3A3B3D")}
                height="20px"
              />
              <Skeleton
                borderRadius="lg"
                startColor={useColorModeValue("white", "#3A3B3D")}
                height="20px"
              />
            </Stack>
          ) : (
            <Post
              likes={post.likes}
              onClick={() => {}}
              createdAt={post.created_at}
              id={post.id}
              headless={true}
              comments={post.comments.length}
            >
              {post.content}
            </Post>
          )}
          <Textarea
            onChange={(e) => {
              setComment(e.target.value);
            }}
            value={comment}
          />
          <Flex my={5} justifyContent="end">
            <Button onClick={onComment}>Send</Button>
          </Flex>
          {post.comments.map((comment) => {
            return (
              <Comment
                key={comment.id}
                likes={comment.likes}
                createdAt={comment.created_at}
                id={comment.id}
              >
                {comment.content}
              </Comment>
            );
          })}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
