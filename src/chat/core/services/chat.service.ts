import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { Chat, ChatDocument, ChatMessage } from "../schemas/chat.schema";

@Injectable()
export class ChatService {
  constructor(
    @InjectModel(Chat.name) private readonly chatModel: Model<ChatDocument>,
  ) {}

  async createChat(
    communicationRequestId: string,
    participants: string[],
  ): Promise<Chat> {
    const chat = new this.chatModel({
      communicationRequestId,
      participants,
      messages: [],
    });
    return chat.save();
  }

  async getChatByCommunicationRequest(
    communicationRequestId: Types.ObjectId | string,
  ): Promise<Chat> {
    const chat = await this.chatModel
      .findOne({ communicationRequestId })
      .exec();
    if (!chat) {
      throw new Error("Chat not found");
    }
    return chat;
  }

  async addMessage(chatId: string, message: ChatMessage): Promise<Chat> {
    const chat = await this.chatModel
      .findByIdAndUpdate(
        chatId,
        { $push: { messages: message } },
        { new: true },
      )
      .exec();

    if (!chat) {
      throw new Error("Chat not found");
    }
    return chat;
  }
}
