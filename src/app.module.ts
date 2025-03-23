import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { AuthModule } from "src/auth/auth.module";
import { UserModule } from "./user/user.module";
import { CompanyModule } from "./company/company.module";
import { HouseModule } from "./house/house.module";
import { CommunicationRequestModule } from "./communication-request/communication-request.module";

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(
      "mongodb://admin:admin@localhost:27017/communication-system?authSource=admin",
    ),
    AuthModule,
    UserModule,
    CompanyModule,
    HouseModule,
    CommunicationRequestModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
