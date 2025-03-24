import {
  CommunicationRequest,
  CommunicationStatus,
} from "src/communication-request/core/schemas/communication-request.schema";
import { UserRole } from "src/user/core/schemas/user.schema";

export class CommunicationRequestDto {
  private readonly visitorName: string;
  private readonly visitorContact: string;
  private readonly initialMessage: string;
  private readonly houseId: string;
  private readonly providerId: string;
  private readonly status: CommunicationStatus;
  private readonly visitorId: string;
  private readonly visitorToken: string;
  private readonly visitorRole: UserRole;

  private constructor(
    visitorName: string,
    visitorContact: string,
    initialMessage: string,
    houseId: string,
    providerId: string,
    status: CommunicationStatus,
    visitorId: string,
    visitorToken: string,
    role: UserRole,
  ) {
    this.visitorName = visitorName;
    this.visitorContact = visitorContact;
    this.initialMessage = initialMessage;
    this.houseId = houseId;
    this.providerId = providerId;
    this.status = status;
    this.visitorId = visitorId;
    this.visitorToken = visitorToken;
    this.visitorRole = role;
  }

  public static create(data: CommunicationRequest): CommunicationRequestDto {
    if (
      !data.visitorName ||
      !data.initialMessage ||
      !data.providerId ||
      data.status === undefined ||
      !data.visitorId ||
      !data.visitorToken
    ) {
      // TODO: TROCAR AS MENSAGENS
      throw new Error("Dados inválidos para criar CommunicationRequestDto.");
    }

    return new CommunicationRequestDto(
      data.visitorName,
      data.visitorContact,
      data.initialMessage,
      data.houseId?.toString(),
      data.providerId?.toString(),
      data.status,
      data.visitorId,
      data.visitorToken,
      UserRole.VISITOR,
    );
  }
}
