import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

// const client = new ApolloClient({
//   uri: "/api/graphql", //"https://api.spacex.land/graphql/",
//   cache: new InMemoryCache(),
// });

// export function getApolloClient() {
//   return client;
// }

let client: ApolloClient<any> | null = null;

export const getClient = (pageProps?: any) => {
  // create a new client if there's no existing one
  // or if we are running on the server.
  if (!client ) {
    client = new ApolloClient({
      link: new HttpLink({
        uri: "http://localhost:3255/api/graphql",
      }),
      cache:
        typeof window !== "undefined" &&
        typeof pageProps === "object" &&
        pageProps !== null &&
        pageProps.state
          ? new InMemoryCache().restore(pageProps.state)
          : new InMemoryCache(),
    });
  }

  return client;
};
