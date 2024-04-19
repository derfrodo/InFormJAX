import { WheelPartsQuery } from "../../../generated-client/graphql";

export type ReturnedWheelPartArrayElement = ArrayElement<WheelPartsQuery["wheelParts"] & []>;

export type ArrayElement<TArray extends readonly unknown[]> =
  TArray extends readonly (infer TElement)[] ? TElement : never;
