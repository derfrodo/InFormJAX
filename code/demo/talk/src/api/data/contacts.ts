import { Contact } from "../generated-types/graphql";

export const contacts: Contact[] = [];

export function createContact(contact: Omit<Contact, "id">): Contact {
  const created = { ...contact, id: createContactId() }
  contacts.push(created);
  return created;
}

export function updateContact(next: Contact) {
  const index = contacts.findIndex(u => u.id === next.id);
  contacts.splice(index, 1, next);
  return next;
}


let lastId = 0;
export function createContactId() {
  lastId += 1;

  return lastId + "";
}