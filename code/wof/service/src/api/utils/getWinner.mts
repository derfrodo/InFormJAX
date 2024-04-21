import { WheelValue } from "../data/types/WheelValue.mjs";


export function getWinner<T extends WheelValue>(sumOfChances: number, values: T[]) {
  if (values.length === 0) {
    console.error("NO values to be found.");
  }
  const randomResult = Math.random() * sumOfChances;

  let currentChance = 0;
  for (const value of values) {
    currentChance += value.winChance;
    if (currentChance > randomResult) {
      return value;
    }
  }

  return values[values.length - 1];
}
