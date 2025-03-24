import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { AuthModule } from "src/auth/auth.module";
import { UserModule } from "./user/user.module";
import { HouseModule } from "./house/house.module";
import { CommunicationRequestModule } from "./communication-request/communication-request.module";
import { ChatModule } from "./chat/chat.module";
import { ProviderModule } from "./provider/provider.module";

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(
      "mongodb://admin:admin@localhost:27017/communication-system?authSource=admin",
    ),
    AuthModule,
    UserModule,
    ProviderModule,
    HouseModule,
    CommunicationRequestModule,
    ChatModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
