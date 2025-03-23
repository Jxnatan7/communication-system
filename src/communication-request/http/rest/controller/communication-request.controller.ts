import { Controller, Post, Body, Param, UseGuards } from "@nestjs/common";
import { CommunicationRequestService } from "src/communication-request/core/services/communication-request.service";
import { CreateCommunicationRequestDto } from "src/communication-request/http/rest/dto/create-communication-request.dto";
import { CommunicationRequestDto } from "../dto/communication-request.dto";
import { AuthGuard } from "@nestjs/passport";

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

  @UseGuards(AuthGuard("jwt"))
  @Post(":id/selectHouse/:houseId")
  async selectHouse(
    @Param("id") id: string,
    @Param("houseId") houseId: string,
  ): Promise<CommunicationRequestDto> {
    return this.communicationRequestService.selectHouse(id, houseId);
  }
}
