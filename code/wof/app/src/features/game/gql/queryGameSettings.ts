import { graphql } from "../../../generated-client";


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
