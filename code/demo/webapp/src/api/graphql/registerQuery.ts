import { ThunkObjMap, GraphQLFieldConfig } from "graphql";
import { ObjMap } from "graphql/jsutils/ObjMap";

export function registerToQuery(
  name: string,
  config: GraphQLFieldConfig<any, any>
) {
  REGISTERED_QUERIES[name] = config;
}

const REGISTERED_QUERIES: ObjMap<GraphQLFieldConfig<any, any>> = {};

export function getQueries(): ThunkObjMap<GraphQLFieldConfig<any, any>> {
  return { ...REGISTERED_QUERIES };
}
