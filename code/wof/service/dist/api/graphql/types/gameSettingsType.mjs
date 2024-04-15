import { GraphQLFloat, GraphQLNonNull, GraphQLObjectType } from "graphql";
export const gameSettingsType = new GraphQLObjectType({
    name: "GameSettingsType",
    fields: {
        chanceToWin: {
            type: new GraphQLNonNull(GraphQLFloat),
        },
        sumOfChances: {
            type: new GraphQLNonNull(GraphQLFloat),
        },
        sumOfWinChance: {
            type: new GraphQLNonNull(GraphQLFloat),
        },
        sumOfLooseChance: {
            type: new GraphQLNonNull(GraphQLFloat),
        },
    },
});
