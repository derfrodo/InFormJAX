import { graphql } from "@/gql/generated-client/gql";

export const updateWheelSettings = graphql(`
mutation UpdateWheelSettings($input: WheelSettingsInput!) {
  updateWheelSettings(input: $input) {
    radius
    rotationDurationInner
    rotationDurationNotPlaying
    rotationDurationPlaying
    minClickDelayMS
  }
}
`);

