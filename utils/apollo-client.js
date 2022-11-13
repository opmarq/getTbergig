import { ApolloClient, InMemoryCache } from "@apollo/client";

export const client = new ApolloClient({
  uri: "https://healthy-frog-18.hasura.app/v1/graphql",
  headers: {
    "x-hasura-admin-secret":
      "RkXzAkIrEy1wcgGet0vdbyLUVb2552WM4ZKfkNj0kuLPPzTNAZKXPu3ie9rZ97Ey",
    "content-type": "application/json",
  },
  cache: new InMemoryCache(),
});
