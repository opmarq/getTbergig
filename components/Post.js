import {
  Box,
  Text,
  Stack,
  Flex,
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  PopoverArrow,
  IconButton,
  useDisclosure,
} from "@chakra-ui/react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { gql, useMutation } from "@apollo/client";

const deletePostMutation = gql`
  mutation DeletePost($id: Int!) {
    delete_posts_by_pk(id: $id) {
      id
    }
  }
`;

export const Post = ({ children, id }) => {
  const [deletePost, { data, loading, error }] =
    useMutation(deletePostMutation);
  const { onOpen, onClose, isOpen } = useDisclosure();

  return (
    <Box
      boxShadow={"lg"}
      borderRadius="xl"
      pt="5px"
      pb="30px"
      pl="20px"
      pr="5px"
      backgroundColor="#232526"
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
      <Text textAlign="left" color="#ffffff">
        {children}
      </Text>
    </Box>
  );
};
