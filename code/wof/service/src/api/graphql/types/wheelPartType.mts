import {
  GraphQLBoolean,
  GraphQLFloat,
  GraphQLID,
  GraphQLInputObjectType,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from "graphql";
import type { WheelValue } from "../../data/types/WheelValue.mjs";
import { resolveDisabledWheelValue } from "../../data/disabledWheelValues.mjs";

const wheelPartFields = {
  id: {
    type: new GraphQLNonNull(GraphQLID),
  },
  name: {
    type: new GraphQLNonNull(GraphQLString),
  },
  win: {
    type: new GraphQLNonNull(GraphQLBoolean),
  },
  disabled: {
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
  // image: {
  //   type: GraphQLString,
  // },
  winChance: {
    type: new GraphQLNonNull(GraphQLFloat),
  },
};

export const createWheelPartInputType = new GraphQLInputObjectType({
  fields: {
    ...wheelPartFields,
  },
  name: "CreateWheelPartInput",
});

export const updateWheelPartInputType = new GraphQLInputObjectType({
  fields: {
    ...wheelPartFields,
  },
  name: "UpdateWheelPartInput",
});

export const wheelPartType = new GraphQLObjectType<WheelValue>({
  fields: {
    ...wheelPartFields,
    disabled: {
      type: new GraphQLNonNull(GraphQLBoolean),
      resolve: function (source) {
        return resolveDisabledWheelValue(source);
      },
    },
  },
  name: "WheelPart",
});
