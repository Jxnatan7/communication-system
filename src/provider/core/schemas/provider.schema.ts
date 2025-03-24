import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";

@Schema({ timestamps: true })
export class Provider extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ unique: true })
  code: string;

  @Prop()
  description: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: "House" }] })
  houses: Types.ObjectId[];
}

export const ProviderSchema = SchemaFactory.createForClass(Provider);

function generateCode(length: number = 10): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

ProviderSchema.pre<Provider>("save", function (next) {
  if (!this.code) {
    this.code = generateCode();
  }
  next();
});
