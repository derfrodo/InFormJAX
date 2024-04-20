import { GraphQLFloat, GraphQLNonNull, GraphQLObjectType } from "graphql";
import { getFilteredWheelParts } from "../../data/disabledWheelValues.mjs";

export async function getChanceToWin() {
  const activeParts = await getFilteredWheelParts({ disabled: false });
  const fullChance = activeParts
    .map((p) => p.winChance)
    .reduce((p, c) => p + c, 0);
  const winChance = activeParts
    .filter((w) => w.win)
    .map((p) => p.winChance)
    .reduce((p, c) => p + c, 0);

  const result = fullChance > 0 ? winChance / fullChance : 0;
  console.log({ activeParts, result, fullChance, winChance })
  return result;
}

export async function getSumOfChance() {
  const activeParts = await getFilteredWheelParts({ disabled: false });
  const fullChance = activeParts
    .map((p) => p.winChance)
    .reduce((p, c) => p + c, 0);
  return fullChance;
}
export async function getSumOfLooseChance() {
  const activeParts = await getFilteredWheelParts({ disabled: false });

  const winChance = activeParts
    .filter((w) => !w.win)
    .map((p) => p.winChance)
    .reduce((p, c) => p + c, 0);

  return winChance;
}
export async function getSumOfWinChance() {
  const activeParts = await getFilteredWheelParts({ disabled: false });

  const winChance = activeParts
    .filter((w) => w.win)
    .map((p) => p.winChance)
    .reduce((p, c) => p + c, 0);

  return winChance;
}

export const gameInfoType = new GraphQLObjectType({
  name: "GameInfoType",
  fields: {
    chanceToWin: {
      type: new GraphQLNonNull(GraphQLFloat),
      resolve() {
        return getChanceToWin();
      },
    },
    sumOfChances: {
      type: new GraphQLNonNull(GraphQLFloat),
      resolve() {
        return getSumOfLooseChance();
      },
    },
    sumOfWinChance: {
      type: new GraphQLNonNull(GraphQLFloat),
      resolve() {
        return getSumOfWinChance()

      },
    },
    sumOfLooseChance: {
      type: new GraphQLNonNull(GraphQLFloat),
      resolve() {
        return getSumOfLooseChance();
      },
    },
  },
});
