export class CreateHouseDto {
  readonly name: string;
  readonly address: string;
  readonly description?: string;
  readonly providerId: string;
}
