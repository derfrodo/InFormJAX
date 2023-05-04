import { GetUsersQuery } from "../../gql/generated-client/graphql";

export type ReturnedUserArrayElement = ArrayElement<GetUsersQuery["users"] & []>;

export type ArrayElement<TArray extends readonly unknown[]> =
  TArray extends readonly (infer TElement)[] ? TElement : never;
