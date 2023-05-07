import { getWheelValues } from "./getWheelValues";
import type { WheelValue } from "./types/WheelValue";
import { WheelPartFilter } from "../generated-types/graphql";

export const disabledWheelValues: WheelValue[] = [
  
  {
    name: "Leider nix",
    winText: "Vielleicht das nächste Mal.",
    win: false,
    imageText: "😢",
    winChance: 0.5,
  },
  {
    name: "Zauberwürfel",
    winText: "Zauberhaft!",
    win: true,
    imageText: "🎲",
    winChance: 0.05,
  },

];

export function resolveDisabledWheelValue(value: WheelValue) {
  return disabledWheelValues.some((item) => item.name === value.name);
}

export const getFilteredWheelParts = async (filter: WheelPartFilter) => {
  return (await getWheelValues()).filter((value) =>
    typeof filter.disabled === "boolean"
      ? filter.disabled
        ? disabledWheelValues.some((v) => v.name === value.name)
        : disabledWheelValues.every((v) => v.name !== value.name)
      : true
  );
};
