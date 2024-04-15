import { CodegenConfig } from "@graphql-codegen/cli";
import { printSchema } from "graphql";
import { schema } from "./src/api/graphql/schema.mjs";

const config: CodegenConfig = {
  ignoreNoDocuments: true,
  generates: {
    // generates the server types
    "./src/api/graphql/": {
      preset: "graphql-modules",
      presetConfig: {
        baseTypesPath: "../generated-types/graphql.mts",
      },
      plugins: ["typescript", "typescript-resolvers"],
    },

  },
  documents: ["src/**/*.tsx", "src/**/*.ts"],
  //   hooks: { afterAllFileWrite: ['prettier --write'] },
  config: { numericEnums: true },
  schema: printSchema(schema),
};

export default config;
