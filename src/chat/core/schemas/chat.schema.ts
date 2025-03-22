import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export enum ChatStatus {
  ACTIVE = 'ACTIVE',
  CLOSED = 'CLOSED',
}

@Schema({ timestamps: true })
export class Chat extends Document {
  @Prop({ type: Types.ObjectId, ref: 'CommunicationRequest', required: true })
  communicationRequestId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'House', required: true })
  houseId: Types.ObjectId;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'User', required: true }] })
  participants: Types.ObjectId[];

  @Prop({ required: true, enum: ChatStatus, default: ChatStatus.ACTIVE })
  status: ChatStatus;
}

export const ChatSchema = SchemaFactory.createForClass(Chat);
