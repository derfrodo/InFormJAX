import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  defaultDataIdFromObject,
} from "@apollo/client";

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
          case "WheelSettings":
            return `WheelSettings`;
            case "gameSettings":
              return `GameSettings`;

          default:
            return defaultDataIdFromObject(responseObject);
        }
      },
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

  return client;
};
