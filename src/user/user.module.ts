import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { UserSchema } from "./core/schemas/user.schema";
import { UserController } from "./http/rest/controller/user.controller";
import { UserService } from "./core/services/user.service";
import { HouseModule } from "../house/house.module";
import { ConfigModule } from "@nestjs/config";
import { ProviderModule } from "src/provider/provider.module";
import { HouseSchema } from "src/house/core/schemas/house.schema";
import { ProviderSchema } from "src/provider/core/schemas/provider.schema";

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forFeature([{ name: "User", schema: UserSchema }]),
    MongooseModule.forFeature([{ name: "House", schema: HouseSchema }]),
    MongooseModule.forFeature([{ name: "Provider", schema: ProviderSchema }]),
    HouseModule,
    ProviderModule,
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService, MongooseModule],
})
export class UserModule {}
