import { useQuery } from "@apollo/client";
import { queryWheelSettings } from "../mutations/queryWheelSettings";
import { WheelSettingsQuery } from "../../../generated-client/graphql";
import { RADIUS } from "../constants/RADIUS";
import { SPIN_DURATION } from "../constants/SPIN_DURATION";
import { SPIN_INNER_DURATION } from "../constants/SPIN_INNER_DURATION";

export function useGetWheelSettings(): NonNullable<WheelSettingsQuery["wheelSettings"]> {
  const { data } = useQuery(queryWheelSettings);

  return data?.wheelSettings ?? {

    radius: RADIUS,
    rotationDurationInner: SPIN_INNER_DURATION,
    rotationDurationNotPlaying: Math.floor(SPIN_DURATION * 100),
    rotationDurationPlaying: SPIN_DURATION,
    minClickDelayMS: 1000,
  };
}
