import { graphql } from "../../../generated-client";

export const queryStatistics = graphql(`
query Statistics {
    wheelParts {
      id
      name
      resultCount
    }
    statistics {
      total
      won
      loose
    }
  }
`);
