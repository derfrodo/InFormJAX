import { GraphQLScalarType } from "graphql";

export const dateType = new GraphQLScalarType<string, string>({ name: "Date" });
