import { graphql } from "@/gql/generated-client/gql";

export const getwheels = graphql(`
  query wheelParts($filter: wheelPartFilter) {
    wheelParts(filter: $filter) {
      name
      imagePath
      imageText
      win
      winText
      disabled
    }
  }
`);
