import {
    GraphQLBoolean,
    GraphQLInputObjectType,
    GraphQLInt,
    GraphQLNonNull,
    GraphQLObjectType,
    GraphQLString,
} from "graphql";
import type { WheelValue } from "../../../Wheel/types/WheelValue";
import { resolveDisabledWheelValue } from "../../data/disabledWheelValues";

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
        return resolveDisabledWheelValue(source);
      },
    },
  },
  name: "WheelPart",
});

const displaySettingsFields = {
  showResultAfterMS: {
    type: new GraphQLNonNull(GraphQLInt),
  },
  showResultForMS: {
    type: new GraphQLNonNull(GraphQLInt),
  },
};

export const displaySettingsType = new GraphQLObjectType({
  name: "DisplaySettings",
  fields: displaySettingsFields,
});

export const displaySettingsInputType = new GraphQLInputObjectType({
  name: "DisplaySettingsInput",
  fields: displaySettingsFields,
});

const wheelSettingsFields = {
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
};

export const wheelSettingsType = new GraphQLObjectType({
  name: "WheelSettings",
  fields: wheelSettingsFields,
});

export const wheelSettingsInputType = new GraphQLInputObjectType({
  name: "WheelSettingsInput",
  fields: wheelSettingsFields,
});
