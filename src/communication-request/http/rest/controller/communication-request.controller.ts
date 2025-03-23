import { Controller, Post, Body } from "@nestjs/common";
import { CommunicationRequestService } from "src/communication-request/core/services/communication-request.service";
import { CreateCommunicationRequestDto } from "src/communication-request/http/rest/dto/create-communication-request.dto";
import { CommunicationRequestDto } from "../dto/communication-request.dto";

@Controller("api/communication-requests")
export class CommunicationRequestController {
  constructor(
    private readonly communicationRequestService: CommunicationRequestService,
  ) {}

  @Post()
  async create(
    @Body() createCommunicationRequestDto: CreateCommunicationRequestDto,
  ): Promise<CommunicationRequestDto> {
    return this.communicationRequestService.create(
      createCommunicationRequestDto,
    );
  }
}
