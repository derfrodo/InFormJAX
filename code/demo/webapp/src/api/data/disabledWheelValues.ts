import { getWheelValues } from "../../Wheel/constants/WHEELVALUES";
import type { WheelValue } from "../../Wheel/types/WheelValue";
import { WheelPartFilter } from "../generated-types/graphql";


export const disabledWheelValues: WheelValue[] = [];

export function resolveDisabledWheelValue(value: WheelValue) {
    return disabledWheelValues.some(item => item.name === value.name);
}

export const getFilteredWheelParts = async (filter: WheelPartFilter) => {
    return (await getWheelValues()).filter((value) =>
        filter.disabled === null || filter.disabled
            ? disabledWheelValues.some((v) => v.name === value.name)
            : disabledWheelValues.every((v) => v.name !== value.name)
    );
};