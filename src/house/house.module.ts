import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { HouseSchema } from "./core/schemas/house.schema";
import { HouseController } from "./http/rest/controller/house.controller";
import { HouseService } from "./core/services/house.service";
import { CompanyModule } from "../company/company.module";
import { CompanySchema } from "src/company/core/schemas/company.schema";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: "House", schema: HouseSchema }]),
    MongooseModule.forFeature([{ name: "Company", schema: CompanySchema }]),
    CompanyModule,
  ],
  controllers: [HouseController],
  providers: [HouseService],
  exports: [HouseService, MongooseModule],
})
export class HouseModule {}
