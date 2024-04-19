import { useQuery, useMutation } from "@apollo/client";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import App from "../game/App";
import { ReturnedWheelPartArrayElement } from "./WheelParts/ReturnedWheelPartArrayElement";
import { UpdateWheelPartTable, UpdateUpdateWheelPartForm } from "./WheelParts/UpdateWheelPart.generated";
import { UpdateWheelSettingsForm } from "./WheelSettings/WheelSettings.generated";
import { queryDisplaysettings } from "./mutations/queryDisplaysetting";
import { queryWheelSettings } from "./mutations/queryWheelSettings";
import { updateDisplaysettings } from "./mutations/updateDisplaySettings";
import { updateWheelSettings } from "./mutations/updateWheelSettings";
import { mutateToggleDisableWheelValue } from "../game/gql/mutateToggleDisableWheelValue";
import { mutationUpdateOrCreateWheelPart } from "../game/gql/mutationUpdateOrCreateWheelPart";
import { queryGameSettings } from "../game/gql/queryGameSettings";
import { queryWheelParts } from "../game/gql/queryWheelParts";
import { UpdateDisplaySettingsForm } from "./DisplaySettings/DisplaySettings.generated";

export function Config() {
  const navigate = useNavigate();
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

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        navigate("/", { replace: true });
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [navigate]);

  return (
    <>
      <main style={{ position: "relative" }}>
        <div
          style={{
            height: "100vh",
            width: "100vw",
            overflow: "hidden",
            opacity: 0.05,
            pointerEvents: "none",
          }}
        >
          {values?.wheelParts ? (
            <App />
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
                <Link replace to="/">🏠 Zurück zum Rad</Link>
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
