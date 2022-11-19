import { useState } from "react";
import { Box, IconButton } from "@chakra-ui/react";
import { ChevronUpIcon, ChevronDownIcon } from "@chakra-ui/icons";

export const Vote = ({ onVote, votes }) => {
  return (
    <Box userSelect="none">
      <IconButton
        onClick={() => {
          onVote(1);
        }}
        icon={<ChevronUpIcon />}
        size="sm"
      />
      <Box py="2">{votes}</Box>
      <IconButton
        icon={<ChevronDownIcon />}
        onClick={() => {
          onVote(-1);
        }}
        size="sm"
      />
    </Box>
  );
};
