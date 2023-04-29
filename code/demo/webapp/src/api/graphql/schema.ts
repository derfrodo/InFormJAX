import { GraphQLSchema, GraphQLObjectType, GraphQLString } from "graphql";

export const schema = new GraphQLSchema({
    query: new GraphQLObjectType({
      name: "Query",
      fields: {
        firstname: {
          type: GraphQLString,
          resolve() {
            return "Stefa2n";
          },
        },
      },
    }),
  });