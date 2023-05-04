import { graphql } from "@/gql/generated-client/gql";

export const queryGameSettings = graphql(`
  query GameSettings {
    gameSettings {
      chanceToWin
      sumOfChances
      sumOfWinChance
      sumOfLooseChance
    }
  }
`);
