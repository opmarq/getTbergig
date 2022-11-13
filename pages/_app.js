import { ChakraProvider } from "@chakra-ui/react";
import { ApolloProvider } from "@apollo/client";

import { client } from "../utils/apollo-client";
import { PostsProvider } from "../components/PostsContext";

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
