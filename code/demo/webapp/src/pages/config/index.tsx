"use client";

import Head from "next/head";

import { UpdateDisplaySettingsForm } from "@/Configuration/DisplaySettings/DisplaySettings.generated";
import {
  UpdateUpdateWheelPartForm,
  UpdateWheelPartTable,
} from "@/Configuration/WheelParts/UpdateWheelPart.generated";
import { UpdateWheelSettingsForm } from "@/Configuration/WheelSettings/WheelSettings.generated";
import { queryDisplaysettings } from "@/Configuration/mutations/queryDisplaysetting";
import { queryWheelSettings } from "@/Configuration/mutations/queryWheelSettings";
import { updateDisplaysettings } from "@/Configuration/mutations/updateDisplaySettings";
import { updateWheelSettings } from "@/Configuration/mutations/updateWheelSettings";
import App from "@/Wheel/App";
import { mutateToggleDisableWheelValue } from "@/Wheel/gql/mutateToggleDisableWheelValue";
import { queryGameSettings } from "@/Wheel/gql/queryGameSettings";
import { queryWheelParts } from "@/Wheel/gql/queryWheelParts";
import { getClient } from "@/gql/getApolloClient";
import { useMutation, useQuery } from "@apollo/client";
import { AppContext } from "next/app";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ReturnedWheelPartArrayElement } from "@/Configuration/WheelParts/ReturnedWheelPartArrayElement";
import { mutationUpdateOrCreateWheelPart } from "@/Wheel/gql/mutationUpdateOrCreateWheelPart";
import { useRouter } from "next/router";

export async function getServerSideProps(context: AppContext["ctx"]) {
  const c = getClient(null, true);
  // caching
  await c.query({ query: queryWheelParts });
  await c.query({ query: queryDisplaysettings });
  await c.query({ query: queryWheelSettings });
  await c.query({ query: queryGameSettings });

  return {
    props: { state: c.extract() }, // will be passed to the page component as props
  };
}

export default function Config() {
  const { data: values, refetch: refetchWheelParts } =
    useQuery(queryWheelParts);
  const { data: displaySettings } = useQuery(queryDisplaysettings);
  const { data: wheelSettings } = useQuery(queryWheelSettings);
  const { refetch: refetchGameSettings } = useQuery(queryGameSettings);

  const [toggleDisabled] = useMutation(mutateToggleDisableWheelValue);
  const [updateDisplaySettings] = useMutation(updateDisplaysettings);
  const [updateWheelsettings] = useMutation(updateWheelSettings);

  const [updateOrCreateWheelPart] = useMutation(
    mutationUpdateOrCreateWheelPart
  );

  const [selectedWheelPart, setSelectedWheelPart] =
    useState<ReturnedWheelPartArrayElement | null>(null);

  const { push } = useRouter();
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        push("/");
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [push]);

  return (
    <>
      <Head>
        <title>JAX Mit Materna - Konfiguration</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main style={{ padding: 16, position: "relative" }}>
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            height: "100vh",
            width: "100vw",
            overflow: "hidden",
            opacity: 0.05,
            pointerEvents: "none",
          }}
        >
          {values?.wheelParts ? (
            <App values={values.wheelParts.filter((v) => !v.disabled)} />
          ) : (
            <></>
          )}
        </div>
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            height: "calc(100vh - 32px)",
            width: "calc(100vw - 32px)",
            overflow: "hidden",
            padding: 16,
          }}
        >
          <div
            style={{
              display: "flex",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                flexDirection: "column",
              }}
            >
              <h1>⚙️ Einstellungen</h1>
              <div style={{ marginBottom: 12, marginTop: -12, marginLeft: 12 }}>
                <Link href="/">🏠 Zurück zum Rad</Link>
              </div>
            </div>
            <div style={{ flex: 1 }} />
          </div>

          <div style={{ display: "flex", gap: 32 }}>
            <div style={{ flex: 1 }}>
              {wheelSettings?.wheelSettings ? (
                <UpdateWheelSettingsForm
                  title={"Einstellungen am Rad"}
                  item={wheelSettings?.wheelSettings}
                  onSave={(next) => {
                    updateWheelsettings({ variables: { input: next } });
                  }}
                />
              ) : (
                <></>
              )}

              {displaySettings?.displaySettings ? (
                <UpdateDisplaySettingsForm
                  title={"Anzeigeeinstellungen"}
                  item={displaySettings.displaySettings}
                  onSave={(next) => {
                    updateDisplaySettings({ variables: { input: next } });
                  }}
                />
              ) : (
                <></>
              )}
            </div>
            <div style={{ flex: 1 }}>
              {!selectedWheelPart ? (
                <>
                  <h2>Abschnitte</h2>
                  <UpdateWheelPartTable
                    actionsComponent={({ item }) => {
                      const isDisabled =
                        !item.disabled &&
                        (values?.wheelParts || []).filter(
                          (i) => i.win === item.win && !i.disabled
                        ).length <= 1;
                      return (
                        <>
                          <button
                            disabled={isDisabled}
                            onClick={async (e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              await toggleDisabled({
                                variables: { name: item.name },
                              });
                              await refetchGameSettings();
                            }}
                          >
                            {item.disabled ? "✅" : "🚫"}
                          </button>
                        </>
                      );
                    }}
                    onRowClicked={async (item) => {
                      setSelectedWheelPart(item);
                      // await toggleDisabled({ variables: { name: item.name } });
                      // await refetchGameSettings();
                    }}
                    items={values?.wheelParts || []}
                  />
                </>
              ) : (
                <>
                  <h2>
                    Bearbeite Abschnitt (neuer Name {"=>"} neuer Abschnitt)
                  </h2>
                  <UpdateUpdateWheelPartForm
                    item={selectedWheelPart}
                    onSave={async (next) => {
                      await updateOrCreateWheelPart({
                        variables: { input: next },
                      });
                      await refetchWheelParts();
                      await refetchGameSettings();
                      setSelectedWheelPart(null);
                    }}
                  />
                </>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
