"use client";

import Head from "next/head";

import { WheelPartArrayElementTable } from "@/Configuration/WheelParts/WheelPartArrayElement.generated";

import { getwheels } from "@/Wheel/gql/getwheels";
import { toggleDisableWheelValue } from "@/Wheel/gql/toggleDisableWheelValue";
import { getClient } from "@/gql/getApolloClient";
import { useMutation, useQuery } from "@apollo/client";
import { AppContext } from "next/app";
import Link from "next/link";
import { UpdateDisplaySettingsForm } from "@/Configuration/DisplaySettings/DisplaySettings.generated";
import { queryDisplaysettings } from "@/Configuration/mutations/queryDisplaysetting";
import { updateDisplaysettings } from "@/Configuration/mutations/updateDisplaySettings";

export async function getServerSideProps(context: AppContext["ctx"]) {
  const c = getClient(null, true);
  // caching
  await c.query({ query: getwheels });
  await c.query({ query: queryDisplaysettings });

  return {
    props: { state: c.extract() }, // will be passed to the page component as props
  };
}

export default function WheelParts() {
  const { data } = useQuery(getwheels);
  const [toggleDisabled] = useMutation(toggleDisableWheelValue);
  const { data: displaySettings } = useQuery(queryDisplaysettings);
  const [updateDisplaySettings] = useMutation(updateDisplaysettings);

  return (
    <>
      <Head>
        <title>JAX Mit Materna - Konfiguration</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main style={{ padding: 16 }}>
        <h1>Einstellungen</h1>
        <div style={{ marginBottom: 12 }}>
          <Link href="/">🏠 Zurück zum Rad</Link>
        </div>

        <h2>Abschnitte</h2>
        <WheelPartArrayElementTable
          onRowClicked={async (item) => {
            await toggleDisabled({ variables: { name: item.name } });
          }}
          items={data?.wheelParts || []}
        />

        <h2>Anzeigeeinstellungen</h2>

        {displaySettings?.displaySettings ? (
          <UpdateDisplaySettingsForm
            item={displaySettings.displaySettings}
            onSave={(next) => {
              const { __typename, ...rest } = next;
              updateDisplaySettings({ variables: { input: rest } });
            }}
          />
        ) : (
          <></>
        )}
        {/* <App values={data?.wheelParts ?? []} /> */}
      </main>
    </>
  );
}