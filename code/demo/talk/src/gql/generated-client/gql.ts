/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\nquery getContacts {\n    contacts {\n      id\n      firstName\n      lastName\n      email\n    }\n  }\n": types.GetContactsDocument,
    "\nmutation CreateContact($input: CreateContactInput!) {\n    createContact(input: $input) {\n        id\n        firstName\n        lastName\n        email\n    }\n  }\n": types.CreateContactDocument,
    "\nmutation UpdateContact($input: UpdateContactInput!) {\n    updateContact(input: $input) {\n        id\n        firstName\n        lastName\n        email\n    }\n  }\n": types.UpdateContactDocument,
    "\nquery getUsers {\n    users {\n      id\n      firstName\n      displayName\n      lastName\n      nickName\n    }\n  }\n": types.GetUsersDocument,
    "\nmutation CreateUser($input: CreateUserInput!) {\n    createUser(input: $input) {\n        id\n        firstName\n        displayName\n        lastName\n        nickName\n    }\n  }\n": types.CreateUserDocument,
    "\nmutation UpdateUser($input: UpdateUserInput!) {\n    updateUser(input: $input) {\n        id\n        firstName\n        displayName\n        lastName\n        nickName\n    }\n  }\n": types.UpdateUserDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\nquery getContacts {\n    contacts {\n      id\n      firstName\n      lastName\n      email\n    }\n  }\n"): (typeof documents)["\nquery getContacts {\n    contacts {\n      id\n      firstName\n      lastName\n      email\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\nmutation CreateContact($input: CreateContactInput!) {\n    createContact(input: $input) {\n        id\n        firstName\n        lastName\n        email\n    }\n  }\n"): (typeof documents)["\nmutation CreateContact($input: CreateContactInput!) {\n    createContact(input: $input) {\n        id\n        firstName\n        lastName\n        email\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\nmutation UpdateContact($input: UpdateContactInput!) {\n    updateContact(input: $input) {\n        id\n        firstName\n        lastName\n        email\n    }\n  }\n"): (typeof documents)["\nmutation UpdateContact($input: UpdateContactInput!) {\n    updateContact(input: $input) {\n        id\n        firstName\n        lastName\n        email\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\nquery getUsers {\n    users {\n      id\n      firstName\n      displayName\n      lastName\n      nickName\n    }\n  }\n"): (typeof documents)["\nquery getUsers {\n    users {\n      id\n      firstName\n      displayName\n      lastName\n      nickName\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\nmutation CreateUser($input: CreateUserInput!) {\n    createUser(input: $input) {\n        id\n        firstName\n        displayName\n        lastName\n        nickName\n    }\n  }\n"): (typeof documents)["\nmutation CreateUser($input: CreateUserInput!) {\n    createUser(input: $input) {\n        id\n        firstName\n        displayName\n        lastName\n        nickName\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\nmutation UpdateUser($input: UpdateUserInput!) {\n    updateUser(input: $input) {\n        id\n        firstName\n        displayName\n        lastName\n        nickName\n    }\n  }\n"): (typeof documents)["\nmutation UpdateUser($input: UpdateUserInput!) {\n    updateUser(input: $input) {\n        id\n        firstName\n        displayName\n        lastName\n        nickName\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;