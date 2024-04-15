import {
  GraphQLBoolean,
  GraphQLFloat,
  GraphQLInputObjectType,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from "graphql";
import { WheelValue } from "./WheelValue.mjs";

const wheelPartFields = {
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

    },
  },
  name: "WheelPart",
});
