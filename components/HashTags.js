import { Stack, Button } from "@chakra-ui/react";
import { gql, useQuery } from "@apollo/client";
import Link from "next/link";

export const getHashtags = gql`
  query getHashtags {
    hashtags {
      name
    }
  }
`;

export const HashTags = () => {
  const { data: dataHashtags, loadingHashTags } = useQuery(getHashtags);
  const { hashtags } = dataHashtags || { hashtags: [] };

  return (
    <Stack direction={"row"} my={6}>
      <Link
        href={{
          pathname: "/",
        }}
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
          >
            <Button px={2} py={1} fontWeight={"400"} size="sm">
              #{name}
            </Button>
          </Link>
        );
      })}
    </Stack>
  );
};
