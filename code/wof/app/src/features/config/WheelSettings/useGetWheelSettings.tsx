import { useQuery } from "@apollo/client";
import { WheelSettingsQuery } from "../../../generated-client/graphql";
import { queryWheelSettings } from "../mutations/queryWheelSettings";
import { defaultSessionWheelSettings } from "service/src/api/data/sessionWheelSettings.mjs"

export function useGetWheelSettings(): NonNullable<WheelSettingsQuery["wheelSettings"]> {
  const { data } = useQuery(queryWheelSettings);

  return data?.wheelSettings ?? defaultSessionWheelSettings
}
