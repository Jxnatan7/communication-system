import { User } from "src/user/core/schemas/user.schema";

export class SimpleUser {
  readonly id: string;
  readonly name: string;
  readonly email: string;

  constructor(user: User) {
    this.id = user.id as string;
    this.name = user.name;
    this.email = user.email;
  }
}
