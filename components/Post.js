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
} from "@chakra-ui/react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { gql, useMutation } from "@apollo/client";

import { getPosts } from "../pages";
import { Vote } from "./Vote";

const deletePostMutation = gql`
  mutation DeletePost($id: Int!) {
    delete_posts_by_pk(id: $id) {
      id
    }
  }
`;

export const Post = ({ children, id }) => {
  const [deletePost, { data, loading, error }] = useMutation(
    deletePostMutation,
    { refetchQueries: [{ query: getPosts }] }
  );
  const { onOpen, onClose, isOpen } = useDisclosure();

  return (
    <Flex>
      <Box
        boxShadow={"lg"}
        borderRadius="xl"
        pt="5px"
        pb="10px"
        pl="20px"
        pr="5px"
        bg={useColorModeValue("white", "gray.900")}
        w="full"
      >
        <Flex justifyContent="end">
          <Flex justifyContent="center">
            <Popover
              isOpen={isOpen}
              onClose={onClose}
              onOpen={onOpen}
              placement="bottom"
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
                    <Button
                      w="194px"
                      variant="ghost"
                      justifyContent="space-between"
                      fontWeight="normal"
                      colorScheme="red"
                      fontSize="sm"
                      onClick={() => {
                        onClose();
                        deletePost({ variables: { id } });
                      }}
                    >
                      Delete
                    </Button>
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
        </Flex>
        <Text textAlign="left">{children}</Text>
      </Box>
      <Box pl="2">
        <Vote />
      </Box>
    </Flex>
  );
};
