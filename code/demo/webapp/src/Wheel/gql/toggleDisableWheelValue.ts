import { graphql } from "@/gql/generated-client/gql";

export const toggleDisableWheelValue = graphql(`
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
