import { getWheelValues } from "./getWheelValues";
import type { WheelValue } from "./types/WheelValue";
import { WheelPartFilter } from "../generated-types/graphql";

export const disabledWheelValues: WheelValue[] = [];

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
