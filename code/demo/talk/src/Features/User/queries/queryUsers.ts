import { graphql } from "@/gql/generated-client/gql";

export const queryUsers = graphql(`
query getUsers {
    users {
      id
      firstName
      displayName
      lastName
      nickName
    }
  }
`);

export const mutateCreateUser = graphql(`
mutation CreateUser($input: CreateUserInput!) {
    createUser(input: $input) {
        id
        firstName
        displayName
        lastName
        nickName
    }
  }
`);

export const mutateUpdateUser = graphql(`
mutation UpdateUser($input: UpdateUserInput!) {
    updateUser(input: $input) {
        id
        firstName
        displayName
        lastName
        nickName
    }
  }
`);
