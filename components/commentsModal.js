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
  Divider,
  Spinner,
} from "@chakra-ui/react";
import { gql, useMutation, useQuery } from "@apollo/client";

import { Post } from "./Post";
import { Comment } from "./Comment";

const AddCommentMutation = gql`
  mutation AddPost(
    $content: String = ""
    $data: [post_hashtag_insert_input!] = {}
  ) {
    insert_posts_one(
      object: { content: $content, post_hashtags: { data: $data } }
    ) {
      content
      likes
      id
      created_at
    }
  }
`;

export const GetPostQuery = gql`
  query GetPost($id: Int!) {
    posts_by_pk(id: $id) {
      content
      id
      likes
      created_at
    }
  }
`;

export const CommentsModal = ({ isOpen, onClose, postId }) => {
  const {
    data: { posts_by_pk: post } = { posts_by_pk: {} },
    loading: loadingPost,
  } = useQuery(GetPostQuery, {
    variables: {
      id: postId,
    },
  });

  const [comment, setComment] = useState("");

  // const [addPost] = useMutation(AddCommentMutation, {
  //   update(cache, { data: { insert_posts_one } }) {
  //     cache.modify({
  //       fields: {
  //         posts(existingPosts = []) {
  //           const newPostRef = cache.writeFragment({
  //             data: insert_posts_one,
  //             fragment: gql`
  //               fragment NewPost on Post {
  //                 id
  //                 content
  //               }
  //             `,
  //           });
  //           return [...existingPosts, newPostRef];
  //         },
  //       },
  //     });
  //   },
  // });

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
            <Spinner />
          ) : (
            <Post
              likes={post.likes}
              onClick={() => {}}
              createdAt={post.created_at}
              id={post.id}
              headless={true}
            >
              {post.content}
            </Post>
          )}
          <Divider />
          <Textarea
            onChange={(e) => {
              setComment(e.target.value);
            }}
          />
          <Comment
            likes={10}
            createdAt="Thu Dec 08 2022 13:57:19 GMT+0100 (Central European Standard Time)"
            id={1}
          >
            Irure laboris Lorem cupidatat Lorem eiusmod.
          </Comment>
          <Comment
            likes={10}
            createdAt="Thu Dec 08 2022 13:57:19 GMT+0100 (Central European Standard Time)"
            id={1}
          >
            Irure laboris Lorem cupidatat Lorem eiusmod.
          </Comment>
          <Comment
            likes={10}
            createdAt="Thu Dec 08 2022 13:57:19 GMT+0100 (Central European Standard Time)"
            id={1}
          >
            Irure laboris Lorem cupidatat Lorem eiusmod.
          </Comment>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
