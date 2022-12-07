import { extendTheme, useColorModeValue } from "@chakra-ui/react";

const config = {
  initialColorMode: "dark",
  useSystemColorMode: false,
  components: {
    Modal: {
      baseStyle: (props) => ({
        dialog: {
          bg: useColorModeValue("white", "gray.900"),
        },
      }),
    },
  },
};

const theme = extendTheme({ ...config });

export default theme;
