import { UserRole } from "src/user/core/schemas/user.schema";

export class CreateUserDto {
  readonly name: string;
  readonly email: string;
  readonly password: string;
  readonly role: UserRole;
  readonly houseId: string;
  readonly providerId: string;
  readonly communicationRequestId: string;
}
