import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { CompanyController } from "./http/rest/controller/company.controller";
import { CompanyService } from "./core/services/company.service";
import { CompanySchema } from "./core/schemas/company.schema";
@Module({
  imports: [
    MongooseModule.forFeature([{ name: "Company", schema: CompanySchema }]),
  ],
  controllers: [CompanyController],
  providers: [CompanyService],
  exports: [CompanyService],
})
export class CompanyModule {}
