"use client";

import App from "@/Wheel/App";
import Head from "next/head";

import { getClient } from "@/gql/getApolloClient";
import { useQuery } from "@apollo/client";
import { AppContext } from "next/app";
import { getwheels } from "@/Wheel/gql/getwheels";
import { getme } from "@/Wheel/gql/getme";
import { useMemo } from "react";

export async function getServerSideProps(context: AppContext["ctx"]) {
  const c = getClient(null, true);

  // caching
  await c.query({ query: getme });
  await c.query({
    query: getwheels,
    variables: { filter: { disabled: false } },
  });

  return {
    props: { state: c.extract() }, // will be passed to the page component as props
  };
}

export default function AppComponent() {
  // const {data:d, loading, called} = useQuery(getme,{context:{revalidate:5}});
  const { data } = useQuery(getwheels, {
    variables: { filter: { disabled: false } },
  });

  return (
    <>
      <Head>
        <title>JAX Mit Materna</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <App values={data?.wheelParts ?? []} />
      </main>
    </>
  );
}
