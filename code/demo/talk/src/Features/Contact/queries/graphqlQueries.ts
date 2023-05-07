import { graphql } from "@/gql/generated-client/gql";

export const queryContacts = graphql(`
query getContacts {
    contacts {
      id
      firstName
      lastName
      email
    }
  }
`);

export const mutateCreateContact = graphql(`
mutation CreateContact($input: CreateContactInput!) {
    createContact(input: $input) {
        id
        firstName
        lastName
        email
    }
  }
`);

export const mutateUpdateContact = graphql(`
mutation UpdateContact($input: UpdateContactInput!) {
    updateContact(input: $input) {
        id
        firstName
        lastName
        email
    }
  }
`);
