import {
  Stack,
  Button,
  Modal,
  ModalContent,
  ModalOverlay,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
} from "@chakra-ui/react";
import { gql, useQuery } from "@apollo/client";
import Link from "next/link";

export const getHashtags = gql`
  query getHashtags {
    hashtags {
      name
    }
  }
`;

export const HashTags = ({ isOpen, onClose }) => {
  const { data: dataHashtags, loadingHashTags } = useQuery(getHashtags);
  const { hashtags } = dataHashtags || { hashtags: [] };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <ModalCloseButton />
        </ModalHeader>
        <ModalBody>
          <Stack wrap="wrap" direction={"row"} my={6}>
            <Link
              href={{
                pathname: "/",
              }}
              onClick={onClose}
            >
              <Button px={2} py={1} fontWeight={"400"} size="sm">
                all
              </Button>
            </Link>
            {hashtags.map(({ name }, index) => {
              return (
                <Link
                  href={{
                    pathname: "/",
                    query: {
                      h: name,
                    },
                  }}
                  key={index}
                  onClick={onClose}
                >
                  <Button px={2} py={1} fontWeight={"400"} size="sm">
                    #{name}
                  </Button>
                </Link>
              );
            })}
          </Stack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
