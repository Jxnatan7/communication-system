import { Controller, Post, Body } from "@nestjs/common";
import { CommunicationRequest } from "src/communication-request/core/schemas/communication-request.schema";
import { CommunicationRequestService } from "src/communication-request/core/services/communication-request.service";
import { CreateCommunicationRequestDto } from "src/communication-request/http/rest/dto/create-communication-request.dto";

@Controller("api/communication-requests")
export class CommunicationRequestController {
  constructor(
    private readonly communicationRequestService: CommunicationRequestService,
  ) {}

  @Post()
  async create(
    @Body() createCommunicationRequestDto: CreateCommunicationRequestDto,
  ): Promise<CommunicationRequest> {
    return this.communicationRequestService.create(
      createCommunicationRequestDto,
    );
  }
}
