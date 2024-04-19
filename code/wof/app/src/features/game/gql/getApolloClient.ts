import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  split
} from "@apollo/client";
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { getMainDefinition } from '@apollo/client/utilities';
import { createClient } from 'graphql-ws';

let client: ApolloClient<unknown> | null = null;
const wsLink = new GraphQLWsLink(createClient({
  url: 'ws://localhost:4000/graphql',
  shouldRetry() {
    return true
  },
}));
const httpLink = new HttpLink({
  uri: 'http://localhost:4000/graphql',

});

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink,
);

export const getClient = () => {
  // create a new client if there's no existing one
  // or if we are running on the server.
  if (!client) {
    // also read this: https://www.apollographql.com/docs/react/caching/cache-configuration/#customizing-identifier-generation-globally
    const mc = new InMemoryCache();

    client = new ApolloClient({
      link: splitLink,
      cache: mc,

    });
  }

  // console.log(client.extract())

  return client;
};
