import { graphql } from "../../../generated-client";

export const mutationUpdateOrCreateWheelPart = graphql(`
mutation updateOrCreateWheelPart($input: UpdateWheelPartInput!) {
  updateOrCreateWheelPart(input: $input) {
    name
    imagePath
    imageText
    win
    winText
    winChance
    disabled
  }
}
`);
