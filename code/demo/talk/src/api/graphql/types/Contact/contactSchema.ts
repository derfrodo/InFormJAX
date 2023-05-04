import { createContact, updateContact, contacts } from "../../../data/contacts";
import { GraphQLFieldConfig, GraphQLList, GraphQLNonNull } from "graphql";
import { ObjMap } from "graphql/jsutils/ObjMap";
import { Contact } from "../../../generated-types/graphql";
import { createContactInputType } from "./createContactInputType";
import { updateContactInputType } from "./updateContactInputType";
import { contactType } from "./contactType";

export const contactMutations: ObjMap<GraphQLFieldConfig<any, any, any>> = {

  createContact: {
    type: new GraphQLNonNull(contactType),
    args: {
      input: {
        type: new GraphQLNonNull(createContactInputType),
      },
    },
    resolve: async (source, args, context, info) => {
      const input: Omit<Contact, "id"> = args["input"];
      return createContact(input);
    },
  },

  updateContact: {
    type: new GraphQLNonNull(contactType),
    args: {
      input: {
        type: new GraphQLNonNull(updateContactInputType),
      },
    },
    resolve: async (source, args, context, info) => {
      const input: Contact = args["input"];

      return updateContact(input);
    },
  },
}

export const contactQueries: ObjMap<GraphQLFieldConfig<any, any, any>> = {
  contacts: {
    type: new GraphQLList(new GraphQLNonNull(contactType)),
    async resolve(source, args, context, info) {
      return contacts;
    },
  },
}