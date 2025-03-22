import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { hashSync } from "bcrypt";

export enum UserRole {
  ADMIN = "ADMIN",
  RESIDENT = "RESIDENT",
  MANAGER = "MANAGER",
}

@Schema({ timestamps: true })
export class User extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true, enum: UserRole })
  role: UserRole;

  @Prop({ type: Types.ObjectId, ref: "House" })
  houseId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: "Company" })
  companyId: Types.ObjectId;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre<User>("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  try {
    const saltRounds = 10;
    this.password = await hashSync(this.password, saltRounds);
    next();
  } catch (error) {
    next(error);
  }
});
