import { graphql } from "../../../generated-client";

export const subscribeToGame = graphql(`
subscription GameChanged {
    gameChanged {
        isRunning
        isRoundDone
        canToggle
        result {
          win
          name
          winText
        }
        resultIndex
    }
  }
`)


