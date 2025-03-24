import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { HouseSchema } from "./core/schemas/house.schema";
import { HouseController } from "./http/rest/controller/house.controller";
import { HouseService } from "./core/services/house.service";
import { ProviderModule } from "src/provider/provider.module";
import { ProviderSchema } from "src/provider/core/schemas/provider.schema";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: "House", schema: HouseSchema }]),
    MongooseModule.forFeature([{ name: "Provider", schema: ProviderSchema }]),
    ProviderModule,
  ],
  controllers: [HouseController],
  providers: [HouseService],
  exports: [HouseService, MongooseModule],
})
export class HouseModule {}
