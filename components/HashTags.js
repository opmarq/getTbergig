import { Stack, Button } from "@chakra-ui/react";
import { gql, useQuery } from "@apollo/client";

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
      {hashtags.map(({ name }, index) => {
        return (
          <Button key={index} px={2} py={1} fontWeight={"400"} size="sm">
            {name}
          </Button>
        );
      })}
    </Stack>
  );
};
