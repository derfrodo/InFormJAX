import { graphql } from "../../../generated-client";


export const startAutoplay = graphql(`
  
  mutation startAutoplay {
    startAutoplay {
      
      isRunning
    }
  }
`);
