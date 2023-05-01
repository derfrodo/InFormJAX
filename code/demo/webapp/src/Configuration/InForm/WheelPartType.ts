import { WheelPart, WheelPartsQuery } from "../../gql/generated-client/graphql";
import {} from "../../gql/generated-client/gql";
import { InFormMapping } from "@derfrodo/gen-in-form-runtime";

// export type TT = {
//     test:"da"
// };
// export type TT =  WheelPart;

 export type TT = ArrayElement<WheelPartsQuery["wheelParts"] & []>;

export type ArrayElement<TArray extends readonly unknown[]> =
  TArray extends readonly (infer TElement)[] ? TElement : never;

// function getWheel(): ArrayElement<WheelPartsQuery["wheelParts"] & []> {
//   throw new Error("Only for cool generator typings");
// }

// export type TT = ReturnType<typeof getWheel>;
