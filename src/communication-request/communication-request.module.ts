import { Module } from "@nestjs/common";
import { CommunicationRequestSchema } from "./core/schemas/communication-request.schema";
import { MongooseModule } from "@nestjs/mongoose";
import { CommunicationRequestController } from "./http/rest/controller/communication-request.controller";
import { CommunicationRequestService } from "./core/services/communication-request.service";
import { UserModule } from "src/user/user.module";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: "CommunicationRequest", schema: CommunicationRequestSchema },
    ]),
    UserModule,
  ],
  controllers: [CommunicationRequestController],
  providers: [CommunicationRequestService],
  exports: [CommunicationRequestService],
})
export class CommunicationRequestModule {}
