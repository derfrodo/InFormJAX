import { graphql } from "@/gql/generated-client/gql";

export const mutationUpdateOrCreateWheelPart = graphql(`
mutation updateOrCreateWheelPart($input: UpdateWheelPartInput!) {
  updateOrCreateWheelPart(input: $input) {
    radius
    rotationDurationNotPlaying
    rotationDurationPlaying
    rotationDurationInner
  }
}
`);
