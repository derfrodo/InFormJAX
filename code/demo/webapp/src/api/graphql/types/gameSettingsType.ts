import { GraphQLFloat, GraphQLNonNull, GraphQLObjectType } from "graphql";
import { getFilteredWheelParts } from "../../../api/data/disabledWheelValues";

export const gameSettingsType = new GraphQLObjectType({
  name: "GameSettingsType",
  fields: {
    chanceToWin: {
      type: new GraphQLNonNull(GraphQLFloat),
      async resolve() {
        const activeParts = await getFilteredWheelParts({ disabled: false });
        const fullChance = activeParts
          .map((p) => p.winChance)
          .reduce((p, c) => p + c, 0);
        const winChance = activeParts
          .filter((w) => w.win)
          .map((p) => p.winChance)
          .reduce((p, c) => p + c, 0);

        return fullChance > 0 ? winChance / fullChance : 0;
      },
    },
    sumOfChances: {
      type: new GraphQLNonNull(GraphQLFloat),
      async resolve() {
        const activeParts = await getFilteredWheelParts({ disabled: false });
        const fullChance = activeParts
          .map((p) => p.winChance)
          .reduce((p, c) => p + c, 0);
        return fullChance;
      },
    },
    sumOfWinChance: {
      type: new GraphQLNonNull(GraphQLFloat),
      async resolve() {
        const activeParts = await getFilteredWheelParts({ disabled: false });

        const winChance = activeParts
          .filter((w) => w.win)
          .map((p) => p.winChance)
          .reduce((p, c) => p + c, 0);

        return winChance;
      },
    },
  },
});
