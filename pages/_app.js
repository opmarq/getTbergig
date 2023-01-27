import { ChakraProvider } from "@chakra-ui/react";
import { ApolloProvider } from "@apollo/client";
import { Analytics } from "@vercel/analytics/react";

import { createApolloClient } from "../utils/apollo-client";
import { PostsProvider } from "../components/PostsContext";
import { ShareProvider } from "../hooks/useShare";
import theme from "../theme";

const client = createApolloClient();

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Analytics />
      <ChakraProvider theme={theme}>
        <ShareProvider>
          <PostsProvider>
            <ApolloProvider client={client}>
              <Component {...pageProps} />
            </ApolloProvider>
          </PostsProvider>
        </ShareProvider>
      </ChakraProvider>
    </>
  );
}

export default MyApp;
