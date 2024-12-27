"use client";

import { useSetError } from "@/Providers/ErrorStateProvider";
import {
  ApolloClient,
  ApolloProvider,
  from,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import React from "react";

const uri = process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT;

console.info("GraphQL URL", uri);

export const GraphQLProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const setError = useSetError();

  const errorLink = React.useMemo(
    () =>
      onError(({ graphQLErrors, networkError }) => {
        const errors = [
          ...(graphQLErrors ?? []),
          ...(networkError ? [networkError] : []),
        ];

        console.log("onError", errors);

        if (errors.length > 0) {
          console.log("setError called");

          setError(errors);
        }
      }),
    [setError],
  );

  const httpLink = React.useMemo(() => new HttpLink({ uri }), [uri]);

  const client = React.useMemo(
    () =>
      new ApolloClient({
        cache: new InMemoryCache(),
        link: from([errorLink, httpLink]),
      }),
    [errorLink, httpLink],
  );

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
