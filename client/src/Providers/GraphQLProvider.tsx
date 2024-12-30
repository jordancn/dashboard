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
import { ReactNode, useMemo } from "react";

const uri = process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT;

console.info("GraphQL URL", uri);

export const GraphQLProvider = ({ children }: { children: ReactNode }) => {
  const setError = useSetError();

  const errorLink = useMemo(
    () =>
      onError(({ graphQLErrors, networkError }) => {
        const errors = [
          ...(graphQLErrors ?? []),
          ...(networkError ? [networkError] : []),
        ];

        if (errors.length > 0) {
          setError(errors);
        }
      }),
    [setError],
  );

  const httpLink = useMemo(() => new HttpLink({ uri }), []);

  const client = useMemo(
    () =>
      new ApolloClient({
        cache: new InMemoryCache(),
        link: from([errorLink, httpLink]),
      }),
    [errorLink, httpLink],
  );

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
