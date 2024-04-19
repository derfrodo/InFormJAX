import { graphql } from "../../../generated-client";


export const stopWheel = graphql(`
  
  mutation stopWheel {
    stopWheel {
      
      isRunning
    }
  }
`);
