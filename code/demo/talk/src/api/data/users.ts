import { User } from "../generated-types/graphql";


export const users: User[] = [];


export function createUser(user: Omit<User, "id">): User {
  const created = { ...user, id: createUserId() }
  users.push(created);
  return created;
}

export function updateUser(next: User) {
  const index = users.findIndex(u => u.id === next.id);
  users.splice(index, 1, next);
  return next;
}


let lastId = 0;
export function createUserId() {
  lastId += 1;

  return lastId + "";
}