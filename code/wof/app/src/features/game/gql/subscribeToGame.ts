import { graphql } from "../../../generated-client";

export const subscribeToGame = graphql(`
subscription GameChanged {
    gameChanged {
        isRunning
        isRoundDone
        canToggle
        result {
          id
          win
          name
          winText
        }
    }
  }
`)


