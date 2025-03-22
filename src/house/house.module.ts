import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { HouseSchema } from "./core/schemas/house.schema";
import { HouseController } from "./http/rest/controller/house.controller";
import { HouseService } from "./core/services/house.service";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: "House", schema: HouseSchema }]),
  ],
  controllers: [HouseController],
  providers: [HouseService],
  exports: [HouseService],
})
export class HouseModule {}
