import { graphql } from "../../../generated-client";

export const mutationUpdateOrCreateWheelPart = graphql(`
mutation updateOrCreateWheelPart($input: UpdateWheelPartInput!) {
  updateOrCreateWheelPart(input: $input) {
    id
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
