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
  Spinner,
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
      comments(order_by: { created_at: desc }) {
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
    refetch,
  } = useQuery(GetPostQuery, {
    variables: {
      id: postId,
    },
  });

  const [comment, setComment] = useState("");

  const [addComment] = useMutation(AddCommentMutation, {
    onCompleted() {
      setComment("");
      refetch();
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
      isOpen={isOpen}
      onClose={onClose}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <ModalCloseButton />
        </ModalHeader>
        {loadingPost ? (
          <ModalBody>
            <Stack alignItems="center" justifyContent="center" h="16">
              <Spinner />
            </Stack>
          </ModalBody>
        ) : (
          <ModalBody>
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
        )}
      </ModalContent>
    </Modal>
  );
};
