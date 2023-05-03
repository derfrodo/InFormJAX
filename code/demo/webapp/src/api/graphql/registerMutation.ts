import { ThunkObjMap, GraphQLFieldConfig } from "graphql";
import { ObjMap } from "graphql/jsutils/ObjMap";

export function registerMutation() {}

export const REGISTERED_MUTATIONS: ObjMap<GraphQLFieldConfig<any,any>> = {};

export function getMutations(): ThunkObjMap<GraphQLFieldConfig<any,any>>  {
  return { ...REGISTERED_MUTATIONS };
}
