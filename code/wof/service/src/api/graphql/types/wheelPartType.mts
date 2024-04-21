import {
  GraphQLBoolean,
  GraphQLFloat,
  GraphQLID,
  GraphQLInputObjectType,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString
} from "graphql";
import { getGameResultsRepo } from "../../../data/GameResultsRepo.mjs";
import { WheelValueData } from "../../../data/WheelValueData.mjs";
import { gameResultType } from "./gameResultType.mjs";

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

export const wheelPartType = new GraphQLObjectType<WheelValueData>({
  fields: () => ({
    ...wheelPartFields,

    resultCount: {
      type: new GraphQLNonNull(GraphQLInt),
      async resolve(src) {
        const repo = await getGameResultsRepo();
        return (await repo.count({ where: { resultId: src.id } }));
      }
    },
    occurances: {
      type: new GraphQLNonNull(new GraphQLList(gameResultType)),
      async resolve(src) {
        const repo = await getGameResultsRepo();
        return (await repo.findAll({ where: { resultId: src.id } })).map(v => v.dataValues);
      }
    }
  }),

  name: "WheelPart",
});
