import { graphql } from "../../../generated-client";


export const queryGameInfo = graphql(`
  query gameInfo {
    gameInfo {
      chanceToWin
      sumOfChances
      sumOfWinChance
      sumOfLooseChance
    }
  }
`);
