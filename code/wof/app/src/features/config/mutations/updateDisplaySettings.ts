import { graphql } from "../../../generated-client";


export const updateDisplaysettings = graphql(`
  mutation UpdateSettings($input: DisplaySettingsInput!) {
    updateDisplaySettings(input: $input) {
        showResultAfterMS
        showResultForMS
    }
  }
`);

