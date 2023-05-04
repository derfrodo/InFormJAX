import { GraphQLNonNull, GraphQLString } from "graphql";

export const userFields = {
  firstName: {
    type: new GraphQLNonNull(GraphQLString),
  },
  lastName: {
    type: new GraphQLNonNull(GraphQLString),
  },
  nickName: {
    // type: new GraphQLNonNull(GraphQLString),
    type: (GraphQLString),
  },
};
