import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { UserService } from "src/user/core/services/user.service";
import { CreateUserDto } from "../dto/create-user.dto";
import { SimpleUser } from "../dto/simple-user.dto";

@Controller("api/users")
@UseGuards(AuthGuard("jwt"))
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUserRequest: CreateUserDto) {
    const user = await this.userService.create(createUserRequest);
    return SimpleUser.createFromUser(user);
  }
}
