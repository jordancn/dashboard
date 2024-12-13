"use client";

import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: process.env.GRAPHQL_URL,
  cache: new InMemoryCache(),
});

console.log(
  "NEXT_PUBLIC_GRAPHQL_ENDPOINT",
  process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT,
);

export const GraphQLProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
