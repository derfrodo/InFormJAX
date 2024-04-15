import { GraphQLNonNull, GraphQLInt } from "graphql";
export const displaySettingsFields = {
    showResultAfterMS: {
        type: new GraphQLNonNull(GraphQLInt),
    },
    showResultForMS: {
        type: new GraphQLNonNull(GraphQLInt),
    },
};
