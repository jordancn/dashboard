"use client";

import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

const graphqlUrl = process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT;

console.info("GraphQL URL", graphqlUrl);

const client = new ApolloClient({
  uri: graphqlUrl,
  cache: new InMemoryCache(),
});

export const GraphQLProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
