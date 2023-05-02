import { graphql } from "@/gql/generated-client/gql";

export const updateDisplaysettings = graphql(`
  mutation UpdateSettings($input: DisplaySettingsInput!) {
    updateSettings(input: $input) {
        showResultAfterMS
        showResultForMS
    }
  }
`);