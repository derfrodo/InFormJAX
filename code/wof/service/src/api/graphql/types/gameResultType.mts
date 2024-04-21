import { GraphQLID, GraphQLObjectType } from "graphql";
import { GameResult } from "../../../data/GameResultsRepo.mjs";
import { getWheelValuesRepo } from "../../../data/WheelValuesRepo.mjs";
import { dateType } from "./dateType.mjs";
import { wheelPartType } from "./wheelPartType.mjs";

export const gameResultType = new GraphQLObjectType<GameResult>({
  name: "GameResult",
  fields: {
    id: {
      type: GraphQLID,
    },
    resultId: {
      type: GraphQLID,
    },
    date: {
      type: dateType,
    },
    result: {
      type: wheelPartType,
      async resolve(src) {
        const repo = await getWheelValuesRepo();
        return await repo.findOne({ where: { id: src.resultId } });
      }
    }
  }
});
