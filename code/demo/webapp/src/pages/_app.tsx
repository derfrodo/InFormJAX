import "@/Wheel/App.css";
import { getClient } from "@/gql/getApolloClient";
import "@/styles/globals.css";
import { ApolloProvider } from "@apollo/client";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function App({ Component, pageProps }: AppProps) {
  const client = getClient(pageProps);

  useEffect(() => {
    if (
      location &&
      location.href.indexOf(":3000") > 0 &&
      location.href.indexOf("localhost") > 0
    ) {
      location.href = "http://127.0.0.1:3000";
    }
  }, []);

  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}
