import { graphql } from "../../../generated-client";

export const queryWheelParts = graphql(`
  query wheelParts($filter: wheelPartFilter) {
    wheelParts(filter: $filter) {
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
