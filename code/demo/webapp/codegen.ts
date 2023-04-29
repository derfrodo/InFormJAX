import { CodegenConfig } from "@graphql-codegen/cli";
import { printSchema } from "graphql";
import { schema } from "./src/api/graphql/schema";

const config: CodegenConfig = {
  ignoreNoDocuments: true,
  //   generates: {
  //     "./src/gql/": {
  //       preset: "client",
  //     },
  //   },

  generates: {
    "./src/api/graphql/": {
      preset: "graphql-modules",
      presetConfig: {
        baseTypesPath: "../generated-types/graphql.ts",
        filename: "generated-types/module-types.ts",
      },
      plugins: [
        "typescript",
        "typescript-resolvers",
      ],
    },
    './src/gql/': {
      preset: 'client',
    },
  },
  documents: ['src/**/*.tsx'],
//   hooks: { afterAllFileWrite: ['prettier --write'] },
  config: { numericEnums: true },
  schema: printSchema(schema),
};

export default config;
