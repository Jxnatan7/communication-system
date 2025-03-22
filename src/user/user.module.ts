import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { UserSchema } from "./core/schemas/user.schema";
import { UserController } from "./http/rest/controller/user.controller";
import { UserService } from "./core/services/user.service";

@Module({
  imports: [MongooseModule.forFeature([{ name: "User", schema: UserSchema }])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
