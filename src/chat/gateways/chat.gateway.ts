import { Logger, UseGuards } from "@nestjs/common";
import {
  OnGatewayInit,
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
} from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import { Types } from "mongoose";
import { WsJwtGuard } from "src/auth/guards/ws-jwt.guard";
import { ChatService } from "../core/services/chat.service";

@UseGuards(WsJwtGuard)
@WebSocketGateway({ namespace: "/chat" })
export class ChatGateway implements OnGatewayInit {
  @WebSocketServer() server: Server;
  private logger: Logger = new Logger("ChatGateway");

  constructor(private chatService: ChatService) {}

  afterInit(server: Server) {
    this.logger.log("Chat gateway initialized");
  }

  @SubscribeMessage("joinChat")
  handleJoinChat(
    @MessageBody() data: { chatId: string },
    @ConnectedSocket() client: Socket,
  ): void {
    client.join(data.chatId);
    this.logger.log(`Client ${client.id} joined chat ${data.chatId}`);
  }

  @SubscribeMessage("sendMessage")
  async handleSendMessage(
    @MessageBody() data: { chatId: string; sender: string; content: string },
    @ConnectedSocket() client: Socket,
  ) {
    const message = {
      sender: new Types.ObjectId(data.sender),
      content: data.content,
      timestamp: new Date(),
    };
    const updatedChat = await this.chatService.addMessage(data.chatId, message);
    this.server.to(data.chatId).emit("newMessage", message);
    return updatedChat;
  }
}
