import { CodegenConfig } from "@graphql-codegen/cli";
import { printSchema } from "graphql";
import { schema } from "./src/api/graphql/schema";

const config: CodegenConfig = {
  ignoreNoDocuments: true,
  generates: {
    // generates the server types
    "./src/api/graphql/": {
      preset: "graphql-modules",
      presetConfig: {
        baseTypesPath: "../generated-types/graphql.ts",
        filename: "generated-types/module-types.ts",
      },
      plugins: ["typescript", "typescript-resolvers"],
    },
    // generates the actual client
    "./src/gql/generated-client/": {
      preset: "client",
    },
  },
  documents: ["src/**/*.tsx", "src/**/*.ts"],
  //   hooks: { afterAllFileWrite: ['prettier --write'] },
  config: { numericEnums: true },
  schema: printSchema(schema),
};

export default config;
