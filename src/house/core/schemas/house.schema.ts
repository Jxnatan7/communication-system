import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";

@Schema({ timestamps: true })
export class House extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  address: string;

  @Prop()
  description: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: "User" }] })
  residents: Types.ObjectId[];

  @Prop({ type: Types.ObjectId, ref: "Provider" })
  providerId: Types.ObjectId;
}

export const HouseSchema = SchemaFactory.createForClass(House);
