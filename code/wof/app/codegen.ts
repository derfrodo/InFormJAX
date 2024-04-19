import { CodegenConfig } from "@graphql-codegen/cli";
import { printSchema } from "graphql";
import { schema } from "service/src/api/graphql/schema.mjs";

const config: CodegenConfig = {
  ignoreNoDocuments: true,
  generates: {
    
    // generates the actual client
    "./src/generated-client/": {
      preset: "client",

    },
  },
  documents: ["./src/**/*.(tsx|ts)"],
  //   hooks: { afterAllFileWrite: ['prettier --write'] },
  config: { numericEnums: true },
  schema: printSchema(schema),
};

export default config;
