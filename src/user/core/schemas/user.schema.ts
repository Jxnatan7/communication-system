import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { hashSync } from "bcrypt";
import * as jwt from "jsonwebtoken";

export enum UserRole {
  ADMIN = "ADMIN",
  RESIDENT = "RESIDENT",
  MANAGER = "MANAGER",
  VISITOR = "VISITOR",
}

@Schema({ timestamps: true })
export class User extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ unique: true })
  email: string;

  @Prop()
  phone: string;

  @Prop()
  password: string;

  @Prop({ required: true, enum: UserRole })
  role: UserRole;

  @Prop({ type: Types.ObjectId, ref: "House" })
  houseId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: "Company" })
  companyId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: "CommunicationRequest" })
  communicationRequestId: Types.ObjectId;

  @Prop()
  token: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

const SALT_ROUNDS = 10;

function generateJwtToken(payload: object, expiresIn: string) {
  const secretKey: jwt.Secret | undefined = process.env.JWT_SECRET_KEY;

  if (secretKey) {
    return jwt.sign(payload, secretKey, { expiresIn });
  }
}

function createVisitorToken(user: User) {
  const payload = { sub: user._id, role: user.role };
  return generateJwtToken(payload, "2h");
}

function createRegularToken(user: User) {
  const payload = { sub: user._id, email: user.email, role: user.role };
  return generateJwtToken(payload, "7d");
}

UserSchema.pre<User>("save", async function (next) {
  try {
    if (this.isModified("password")) {
      this.password = hashSync(this.password, SALT_ROUNDS);
    }

    if (!this.token) {
      if (this.role === UserRole.VISITOR) {
        const token = createVisitorToken(this);
        if (token) {
          this.token = token;
        }
      } else {
        const token = createRegularToken(this);
        if (token) {
          this.token = token;
        }
      }
    }

    next();
  } catch (error) {
    next(error);
  }
});
