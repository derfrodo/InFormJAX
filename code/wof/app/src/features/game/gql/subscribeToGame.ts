import { graphql } from "../../../generated-client";

export const subscribeToGame = graphql(`
subscription GameChanged {
    gameChanged {
        isRunning
        isRoundDone
        canToggle
        resultId
        date
        lastUpdate
    }
  }
`)


