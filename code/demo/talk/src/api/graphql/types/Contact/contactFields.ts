import { GraphQLNonNull, GraphQLString } from "graphql";

export const contactFields = {
  firstName: {
    type: new GraphQLNonNull(GraphQLString),
  },
  lastName: {
    type: new GraphQLNonNull(GraphQLString),
  },
};
