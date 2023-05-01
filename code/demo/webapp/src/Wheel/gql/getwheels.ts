import { graphql } from "@/gql/generated-client/gql";

export const getwheels = graphql(`
  query wheelParts {
    wheelParts {
      name
      imagePath
      imageText
      win
      winText
    }
  }
`);
