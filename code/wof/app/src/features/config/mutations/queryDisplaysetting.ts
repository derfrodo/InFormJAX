import { graphql } from "../../../generated-client";

export const queryDisplaysettings = graphql(`
query DisplaySettings {
    displaySettings {
        showResultAfterMS
        showResultForMS
    }
  }
`);