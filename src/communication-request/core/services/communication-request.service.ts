import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { CommunicationRequest } from "../schemas/communication-request.schema";
import { Model, Types } from "mongoose";
import { User, UserRole } from "src/user/core/schemas/user.schema";
import { CreateCommunicationRequestDto } from "src/communication-request/http/rest/dto/create-communication-request.dto";
import { CommunicationRequestDto } from "src/communication-request/http/rest/dto/communication-request.dto";

@Injectable()
export class CommunicationRequestService {
  constructor(
    @InjectModel(CommunicationRequest.name)
    private readonly communicationRequestModel: Model<CommunicationRequest>,
    @InjectModel(User.name) private readonly userModel: Model<User>,
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

  async selectHouse(
    id: string,
    houseId: string,
  ): Promise<CommunicationRequestDto> {
    const communicationRequest = await this.communicationRequestModel
      .findByIdAndUpdate(id, { $set: { houseId } }, { new: true })
      .exec();

    if (!communicationRequest) {
      throw new Error("Communication request not found");
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
