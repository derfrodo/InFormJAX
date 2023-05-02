import { graphql } from "@/gql/generated-client/gql";

export const queryWheelSettings = graphql(`
  query wheelSettings {
    wheelSettings {
      radius
      rotationDurationNotPlaying
      rotationDurationPlaying
      rotationDurationInner
    }
  }
`);
