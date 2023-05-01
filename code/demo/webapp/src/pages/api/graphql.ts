

import { getWheelValues } from "@/Wheel/constants/WHEELVALUES";
import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";

// see https://github.com/arcticmatt/graphql_server_reference_codegen/blob/master/src/codegen.ts
import { schema } from "@/api/graphql/schema";

const server = new ApolloServer({
  schema,
});
export default startServerAndCreateNextHandler(server);
