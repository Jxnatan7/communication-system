import { User } from "src/user/core/schemas/user.schema";

export class SimpleUser {
  private readonly _id: string;
  private readonly _name: string;
  private readonly _email: string;

  private constructor(id: string, name: string, email: string) {
    this._id = id;
    this._name = name;
    this._email = email;
  }

  public static createFromUser(user: User): SimpleUser {
    if (!user.id || !user.name || !user.email) {
      throw new Error("Dados do usuário inválidos para criação de SimpleUser.");
    }

    return new SimpleUser(String(user.id), user.name, user.email);
  }

  public get id(): string {
    return this._id;
  }

  public get name(): string {
    return this._name;
  }

  public get email(): string {
    return this._email;
  }
}
