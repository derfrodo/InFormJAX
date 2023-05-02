import { graphql } from "@/gql/generated-client/gql";

export const queryDisplaysettings = graphql(`
  query wheelSettings {
    wheelSettings {
      radius
      rotationDurationNotPlaying
      rotationDurationPlaying
      rotationDurationInner
    }
  }
`);
