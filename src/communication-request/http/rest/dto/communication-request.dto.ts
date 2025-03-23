import {
  CommunicationRequest,
  CommunicationStatus,
} from "src/communication-request/core/schemas/communication-request.schema";
import { UserRole } from "src/user/core/schemas/user.schema";

export class CommunicationRequestDto {
  private readonly _visitorName: string;
  private readonly _visitorContact: string;
  private readonly _initialMessage: string;
  private readonly _houseId: string;
  private readonly _status: CommunicationStatus;
  private readonly _visitorId: string;
  private readonly _visitorToken: string;
  private readonly _visitorRole: UserRole;

  private constructor(
    visitorName: string,
    visitorContact: string,
    initialMessage: string,
    houseId: string,
    status: CommunicationStatus,
    visitorId: string,
    visitorToken: string,
    role: UserRole,
  ) {
    // TODO: REMOVER ESSAS PORRA DESSES TRACINHOS
    this._visitorName = visitorName;
    this._visitorContact = visitorContact;
    this._initialMessage = initialMessage;
    this._houseId = houseId;
    this._status = status;
    this._visitorId = visitorId;
    this._visitorToken = visitorToken;
    this._visitorRole = role;
  }

  public static create(
    data: CommunicationRequest,
    role: UserRole,
  ): CommunicationRequestDto {
    if (
      !data.visitorName ||
      !data.initialMessage ||
      !data.houseId ||
      data.status === undefined ||
      !data.visitorId ||
      !data.visitorToken ||
      role === undefined
    ) {
      throw new Error("Dados inválidos para criar CommunicationRequestDto.");
    }

    return new CommunicationRequestDto(
      data.visitorName,
      data.visitorContact,
      data.initialMessage,
      data.houseId.toString(),
      data.status,
      data.visitorId,
      data.visitorToken,
      role,
    );
  }

  public get visitorName(): string {
    return this._visitorName;
  }

  public get visitorContact(): string {
    return this._visitorContact;
  }

  public get initialMessage(): string {
    return this._initialMessage;
  }

  public get houseId(): string {
    return this._houseId;
  }

  public get status(): CommunicationStatus {
    return this._status;
  }

  public get visitorId(): string {
    return this._visitorId;
  }

  public get visitorToken(): string {
    return this._visitorToken;
  }

  public get visitorRole(): UserRole {
    return this._visitorRole;
  }
}
