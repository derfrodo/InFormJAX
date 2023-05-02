import { useQuery } from "@apollo/client";
import { queryWheelSettings } from "@/Configuration/mutations/queryWheelSettings";
import { WheelSettingsQuery } from "@/gql/generated-client/graphql";
import { sessionWheelSettings } from "@/api/data/sessionWheelSettings";


export function useGetWheelSettings(): WheelSettingsQuery["wheelSettings"] & {} {
  const { data } = useQuery(queryWheelSettings);

  return data?.wheelSettings ?? sessionWheelSettings;
}
