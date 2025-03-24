import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ProviderController } from "./http/rest/controller/provider.controller";
import { ProviderService } from "./core/services/provider.service";
import { Provider, ProviderSchema } from "./core/schemas/provider.schema";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Provider.name, schema: ProviderSchema },
    ]),
  ],
  controllers: [ProviderController],
  providers: [ProviderService],
  exports: [ProviderService, MongooseModule],
})
export class ProviderModule {}
