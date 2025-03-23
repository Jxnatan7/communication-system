import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { UserSchema } from "./core/schemas/user.schema";
import { UserController } from "./http/rest/controller/user.controller";
import { UserService } from "./core/services/user.service";
import { HouseModule } from "../house/house.module";
import { CompanyModule } from "../company/company.module";
import { HouseSchema } from "src/house/core/schemas/house.schema";
import { CompanySchema } from "src/company/core/schemas/company.schema";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: "User", schema: UserSchema }]),
    MongooseModule.forFeature([{ name: "House", schema: HouseSchema }]),
    MongooseModule.forFeature([{ name: "Company", schema: CompanySchema }]),
    HouseModule,
    CompanyModule,
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService, MongooseModule],
})
export class UserModule {}
