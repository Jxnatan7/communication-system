import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { JwtModule } from "@nestjs/jwt";
import { Chat, ChatSchema } from "./core/schemas/chat.schema";
import { WsJwtGuard } from "src/auth/guards/ws-jwt.guard";
import { ChatGateway } from "./gateways/chat.gateway";
import { ChatService } from "./core/services/chat.service";
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forFeature([{ name: Chat.name, schema: ChatSchema }]),
    JwtModule.register({ secret: process.env.JWT_SECRET_KEY }),
  ],
  providers: [ChatService, ChatGateway, WsJwtGuard],
  controllers: [],
  exports: [ChatService],
})
export class ChatModule {}
