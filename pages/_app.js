import { ChakraProvider } from "@chakra-ui/react";
import { ApolloProvider } from "@apollo/client";
import { Analytics } from "@vercel/analytics/react";

import { createApolloClient } from "../utils/apollo-client";
import { PostsProvider } from "../components/PostsContext";
import theme from "../theme";

const client = createApolloClient();

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Analytics />
      <ChakraProvider theme={theme}>
        <PostsProvider>
          <ApolloProvider client={client}>
            <Component {...pageProps} />
          </ApolloProvider>
        </PostsProvider>
      </ChakraProvider>
    </>
  );
}

export default MyApp;
