import { graphql } from "../../../generated-client";


export const startWheel = graphql(`
mutation startWheel{
    startWheel {
      isRunning
    }
  }
`);
