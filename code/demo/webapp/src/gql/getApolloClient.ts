import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  defaultDataIdFromObject,
} from "@apollo/client";

// const client = new ApolloClient({
//   uri: "/api/graphql", //"https://api.spacex.land/graphql/",
//   cache: new InMemoryCache(),
// });

// export function getApolloClient() {
//   return client;
// }

let client: ApolloClient<any> | null = null;

export const getClient = (pageProps?: any, forceReset = false) => {
  // create a new client if there's no existing one
  // or if we are running on the server.
  if (!client || forceReset) {
    // also read this: https://www.apollographql.com/docs/react/caching/cache-configuration/#customizing-identifier-generation-globally
    const mc = new InMemoryCache({
      dataIdFromObject(responseObject) {
        switch (responseObject.__typename) {
          case "WheelPart":
            return `WheelPart:${responseObject.name}`;
          case "DisplaySettings":
            return `DisplaySettings`;
          default:
            return defaultDataIdFromObject(responseObject);
        }
      },
      // // merge in client: https://stackoverflow.com/questions/63123558/apollo-graphql-merge-cached-data
      // // Actually not needed thanks to dataIdFromObject above
      // typePolicies: {
      //   Query: {
      //     fields: {
      //       wheelParts: {
      //         merge(existing = [], incoming: any) {
      //           console.log({ existing, incoming });
      //           return [...existing, ...incoming];
      //           // this part of code is depends what you actually need to do, in my
      //         },
      //       },
      //     },
      //   },
      // },
    });

    client = new ApolloClient({
      link: new HttpLink({
        uri: "http://localhost:3255/api/graphql",
      }),
      cache:
        typeof window !== "undefined" &&
        typeof pageProps === "object" &&
        pageProps !== null &&
        pageProps.state
          ? mc.restore(pageProps.state)
          : mc,
    });
  }

  // console.log(client.extract())

  return client;
};
