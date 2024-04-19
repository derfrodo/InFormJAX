import { graphql } from "../../../generated-client";

export const mutateToggleDisableWheelValue = graphql(`
  mutation toggleDisableWheelValue($name: String!) {
    toggleDisableWheelValue(name: $name) {
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
