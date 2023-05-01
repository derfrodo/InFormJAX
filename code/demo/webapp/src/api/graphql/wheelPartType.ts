import {
    GraphQLBoolean,
    GraphQLNonNull,
    GraphQLObjectType,
    GraphQLString
} from "graphql";
import type { WheelValue } from "../../Wheel/types/WheelValue";
import { resolve } from "path";
import { resolveDisabledWheelValue } from "../data/disabledWheelValues";

export const wheelPartType = new GraphQLObjectType<WheelValue>({
    fields: {
        name: {
            type: new GraphQLNonNull(GraphQLString),
        },
        win: {
            type: new GraphQLNonNull(GraphQLBoolean),
        },
        imageText: {
            type: GraphQLString,
        },
        imagePath: {
            type: GraphQLString,
        },
        winText: {
            type: GraphQLString,
        },
        image: {
            type: GraphQLString,
        },
        disabled: {
            type: new GraphQLNonNull(GraphQLBoolean),
            resolve: function (source) {
                return resolveDisabledWheelValue(source)
            }
        }
    },
    name: "WheelPart",
});