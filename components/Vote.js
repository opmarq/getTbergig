import { useState } from "react";
import { Box, IconButton } from "@chakra-ui/react";
import { ChevronUpIcon, ChevronDownIcon } from "@chakra-ui/icons";

export const Vote = () => {
  const [likes, setLikes] = useState(0);
  return (
    <Box userSelect="none">
      <IconButton
        onClick={() => {
          setLikes(likes + 1);
        }}
        icon={<ChevronUpIcon />}
      />
      <Box py="2">{likes}</Box>
      <IconButton
        icon={<ChevronDownIcon />}
        onClick={() => {
          setLikes(likes - 1);
        }}
      />
    </Box>
  );
};
