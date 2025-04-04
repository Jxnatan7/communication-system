import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import {
  CommunicationRequest,
  CommunicationStatus,
} from "../schemas/communication-request.schema";
import { Model, Types } from "mongoose";
import { User, UserRole } from "src/user/core/schemas/user.schema";
import { CreateCommunicationRequestDto } from "src/communication-request/http/rest/dto/create-communication-request.dto";
import { CommunicationRequestDto } from "src/communication-request/http/rest/dto/communication-request.dto";
import { ValidateCommunicationRequestDto } from "src/communication-request/http/rest/dto/validation-communication-request.dto";
import { ChatService } from "src/chat/core/services/chat.service";
import { House } from "src/house/core/schemas/house.schema";

@Injectable()
export class CommunicationRequestService {
  constructor(
    @InjectModel(CommunicationRequest.name)
    private readonly communicationRequestModel: Model<CommunicationRequest>,
    @InjectModel(User.name) private readonly userModel: Model<User>,
    @InjectModel(House.name) private readonly houseModel: Model<House>,
    readonly chatService: ChatService,
  ) {}

  // TODO: Fazer com que todo o método seja executado dentro de uma transaçãos
  async create(
    requestData: CreateCommunicationRequestDto,
  ): Promise<CommunicationRequestDto> {
    const savedRequest = await this.saveCommunicationRequest(requestData);
    const userSaved = await this.attachRequestToUser(savedRequest);
    const updatedRequest = await this.attachUserToRequest(
      savedRequest.id as string,
      userSaved,
    );

    return CommunicationRequestDto.create(updatedRequest);
  }

  async listByHouseId(houseId: string): Promise<CommunicationRequestDto[]> {
    const communicationRequests = await this.communicationRequestModel
      .find({ houseId })
      .exec();

    return communicationRequests.map((request) =>
      CommunicationRequestDto.create(request),
    );
  }

  async validate(
    id: string,
    validateCommunicationRequestDto: ValidateCommunicationRequestDto,
  ) {
    const communicationRequest = await this.communicationRequestModel
      .findByIdAndUpdate(
        id,
        { $set: { status: validateCommunicationRequestDto.status } },
        { new: true },
      )
      .exec();

    if (!communicationRequest) {
      throw new Error("Communication request not found");
    }

    if (communicationRequest.status === CommunicationStatus.ACCEPTED) {
      const house = await this.houseModel.findById(
        communicationRequest.houseId,
      );

      if (!house) {
        throw new Error("House not found");
      }

      if (house.residents.length === 0) {
        throw new Error("House has no residents");
      }

      const residentUserId = house.residents[0].toString();

      const participants = [residentUserId, communicationRequest.visitorId];
      await this.chatService.createChat(
        String(communicationRequest.id),
        participants,
      );
    }

    return CommunicationRequestDto.create(communicationRequest);
  }

  private async saveCommunicationRequest(
    requestData: CreateCommunicationRequestDto,
  ): Promise<CommunicationRequest> {
    const communicationRequest = new this.communicationRequestModel(
      requestData,
    );
    return communicationRequest.save();
  }

  private async attachRequestToUser(
    communicationRequest: CommunicationRequest,
  ): Promise<User> {
    const createVisitorUserRequest = {
      name: communicationRequest.visitorName,
      role: UserRole.VISITOR,
      communicationRequestId: communicationRequest.id as Types.ObjectId,
    };
    const user = new this.userModel(createVisitorUserRequest);
    return user.save();
  }

  private async attachUserToRequest(
    id: string,
    user: User,
  ): Promise<CommunicationRequest> {
    const updatedCommunicationRequest = await this.communicationRequestModel
      .findByIdAndUpdate(
        id,
        { $set: { visitorId: user.id, visitorToken: user.token } },
        { new: true },
      )
      .exec();

    if (!updatedCommunicationRequest) {
      throw new Error("Failed to update communication request");
    }
    return updatedCommunicationRequest;
  }
}
