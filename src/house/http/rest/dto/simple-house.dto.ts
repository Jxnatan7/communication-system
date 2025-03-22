import { House } from "src/house/core/schemas/house.schema";

export class SimpleHouse {
  readonly id: string;
  readonly name: string;
  readonly address: string;
  readonly description?: string;
  readonly companyId: string;

  constructor(house: House) {
    this.id = house.id as string;
    this.name = house.name;
    this.address = house.address;
    this.description = house.description;
    this.companyId = house.companyId.toString();
  }
}
