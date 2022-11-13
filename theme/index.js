import { extendTheme } from "@chakra-ui/react";

const config = {
  initialColorMode: "dark",
  useSystemColorMode: false,
  components: {
    Modal: {
      baseStyle: (props) => ({
        dialog: {
          bg: "#000000",
        },
      }),
    },
  },
};

const theme = extendTheme({ config });

export default theme;
