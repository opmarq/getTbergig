import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";
import { WebSocketLink } from "@apollo/client/link/ws";
import { SubscriptionClient } from "subscriptions-transport-ws";

const headers = {
  "x-hasura-admin-secret":
    "RkXzAkIrEy1wcgGet0vdbyLUVb2552WM4ZKfkNj0kuLPPzTNAZKXPu3ie9rZ97Ey",
  "content-type": "application/json",
};

const URL = "https://healthy-frog-18.hasura.app/v1/graphql";
const URI = "wss://healthy-frog-18.hasura.app/v1/graphql";

const createHttpLink = () => {
  const httpLink = new HttpLink({
    uri: URL,
    credentials: "include",
    headers,
  });
  return httpLink;
};

const createWSLink = () => {
  return new WebSocketLink(
    new SubscriptionClient(URI, {
      lazy: true,
      reconnect: true,
      connectionParams: {
        headers,
      },
    })
  );
};

export function createApolloClient() {
  const ssrMode = typeof window === "undefined";
  let link;
  if (ssrMode) {
    link = createHttpLink();
  } else {
    link = createWSLink();
  }
  return new ApolloClient({
    ssrMode,
    link,
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            posts: {
              keyArgs: ["order_by", "where"],
              merge(existing, incoming, { args: { offset = 0 } }) {
                const merged = existing ? existing.slice(0) : [];
                for (let i = 0; i < incoming.length; ++i) {
                  merged[offset + i] = incoming[i];
                }
                return merged;
              },
            },
          },
        },
      },
    }),
  });
}
