import {
  Box,
  Flex,
  Avatar,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useColorModeValue,
  useColorMode,
  Heading,
  Stack,
  HStack,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";

export const Nav = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <>
      <Box
        borderBottom="1px"
        borderColor={useColorModeValue("black", "transparent")}
        bg={useColorModeValue("gray.100", "gray.900")}
        px={4}
      >
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <Flex alignItems="center" gap="2">
            <Heading size="md">Tbergig</Heading>
          </Flex>
          <HStack spacing="24px">
            <Button onClick={toggleColorMode}>
              {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
            </Button>
            {/* <Flex alignItems={"center"}>
              <Stack direction={"row"} spacing={7}>
                <Menu>
                  <MenuButton
                    as={Button}
                    rounded={"full"}
                    variant={"link"}
                    cursor={"pointer"}
                    minW={0}
                  >
                    <Avatar size={"sm"} name="Admin" />
                  </MenuButton>
                  <MenuList alignItems={"center"}>
                    <MenuItem>Dashboard</MenuItem>
                    <MenuItem>Settings</MenuItem>
                    <MenuItem>Logout</MenuItem>
                  </MenuList>
                </Menu>
              </Stack>
            </Flex> */}
          </HStack>
        </Flex>
      </Box>
    </>
  );
};
