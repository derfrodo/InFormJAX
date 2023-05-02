import { graphql } from "@/gql/generated-client/gql";

export const queryDisplaysettings = graphql(`
query DisplaySettings {
    displaySettings {
        showResultAfterMS
        showResultForMS
    }
  }
`);