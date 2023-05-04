import { graphql } from "@/gql/generated-client/gql";

export const queryUsers = graphql(`
query getUsers {
    users {
      id
      firstName
      samAccountName
      lastName
      nickName
    }
  }
`);
