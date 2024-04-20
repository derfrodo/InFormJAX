import { GraphQLNonNull, GraphQLInt } from "graphql";

export const wheelSettingsFields = {
    radius: {
      type: new GraphQLNonNull(GraphQLInt),
    },
    rotationDurationNotPlaying: {
      type: new GraphQLNonNull(GraphQLInt),
    },
    rotationDurationPlaying: {
      type: new GraphQLNonNull(GraphQLInt),
    },
    rotationDurationInner: {
      type: new GraphQLNonNull(GraphQLInt),
    },
    minClickDelayMS:{
      type: new GraphQLNonNull(GraphQLInt),
    },
    minAutoplayDurationMS:{
      type: new GraphQLNonNull(GraphQLInt),
    },
    autoplayAddMaxMS:{
      type: new GraphQLNonNull(GraphQLInt),
    }
  };
  