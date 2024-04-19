import { graphql } from "../../../generated-client";

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

