import { ChakraProvider } from "@chakra-ui/react";
import { ApolloProvider } from "@apollo/client";

import { createApolloClient } from "../utils/apollo-client";
import { PostsProvider } from "../components/PostsContext";

const client = createApolloClient();

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <PostsProvider>
        <ApolloProvider client={client}>
          <Component {...pageProps} />
        </ApolloProvider>
      </PostsProvider>
    </ChakraProvider>
  );
}

export default MyApp;
