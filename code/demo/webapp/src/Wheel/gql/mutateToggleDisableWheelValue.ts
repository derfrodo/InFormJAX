import { graphql } from "@/gql/generated-client/gql";

export const mutateToggleDisableWheelValue = graphql(`
  mutation toggleDisableWheelValue($name: String!) {
    toggleDisableWheelValue(name: $name) {
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
