import { graphql } from "@/gql/generated-client/gql";

export const getme = graphql(/* GraphQL */ `
  query me {
    firstname
  }
`);