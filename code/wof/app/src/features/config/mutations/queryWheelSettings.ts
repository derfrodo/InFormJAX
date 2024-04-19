import { graphql } from "../../../generated-client";


export const queryWheelSettings = graphql(`
  query wheelSettings {
    wheelSettings {
      radius
      rotationDurationNotPlaying
      rotationDurationPlaying
      rotationDurationInner
      minClickDelayMS
    }
  }
`);
