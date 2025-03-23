import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";

export type ChatDocument = Chat & Document;

export class ChatMessage {
  @Prop({ required: true })
  sender: Types.ObjectId;

  @Prop({ required: true })
  content: string;

  @Prop({ default: Date.now })
  timestamp: Date;
}

export const ChatMessageSchema = SchemaFactory.createForClass(ChatMessage);

@Schema({ timestamps: true, collection: "chats" })
export class Chat {
  @Prop({ type: Types.ObjectId, ref: "CommunicationRequest", required: true })
  communicationRequestId: Types.ObjectId;

  @Prop({ type: [{ type: Types.ObjectId, ref: "User" }], required: true })
  participants: Types.ObjectId[];

  @Prop({ type: [ChatMessageSchema], default: [] })
  messages: ChatMessage[];
}

export const ChatSchema = SchemaFactory.createForClass(Chat);
