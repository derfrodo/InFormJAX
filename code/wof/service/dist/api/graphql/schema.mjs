import { GraphQLBoolean, GraphQLInputObjectType, GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLSchema, GraphQLString, } from "graphql";
import { updateWheelPartInputType, wheelPartType } from "./types/wheelPartType.mjs";
import { displaySettingsInputType } from "./types/displaySettingsInputType.mjs";
import { displaySettingsType } from "./types/displaySettingsType.mjs";
import { wheelSettingsInputType } from "./types/wheelSettingsInputType.mjs";
import { wheelSettingsType } from "./types/wheelSettingsType.mjs";
import { gameSettingsType } from "./types/gameSettingsType.mjs";
export const schema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: "Query",
        fields: {
            wheelParts: {
                type: new GraphQLList(new GraphQLNonNull(wheelPartType)),
                args: {
                    ["filter"]: {
                        type: new GraphQLInputObjectType({
                            name: "wheelPartFilter",
                            fields: {
                                disabled: {
                                    type: GraphQLBoolean,
                                },
                            },
                        }),
                    },
                },
                async resolve(source, args, context, info) {
                    const filter = args["filter"];
                    await new Promise((r) => setTimeout(() => r(), 100));
                    // return !filter ? getWheelValues() : getFilteredWheelParts(filter);
                },
            },
            displaySettings: {
                type: displaySettingsType,
            },
            wheelSettings: {
                type: wheelSettingsType,
            },
            gameSettings: {
                type: gameSettingsType,
                resolve() {
                    return {};
                },
            },
            firstname: {
                type: GraphQLString,
                async resolve() {
                    await new Promise((r) => setTimeout(() => r(), 100));
                    return "Stefan";
                },
            },
        },
    }),
    mutation: new GraphQLObjectType({
        name: "Mutation",
        fields: {
            updateDisplaySettings: {
                type: displaySettingsType,
                args: {
                    input: {
                        type: new GraphQLNonNull(displaySettingsInputType),
                    },
                },
            },
            updateWheelSettings: {
                type: wheelSettingsType,
                args: {
                    input: {
                        type: new GraphQLNonNull(wheelSettingsInputType),
                    },
                },
            },
            updateOrCreateWheelPart: {
                type: wheelPartType,
                args: {
                    input: {
                        type: new GraphQLNonNull(updateWheelPartInputType),
                    },
                },
            },
            toggleDisableWheelValue: {
                type: wheelPartType,
                args: {
                    ["name"]: {
                        type: new GraphQLNonNull(GraphQLString),
                    },
                },
            },
        },
    }),
});
