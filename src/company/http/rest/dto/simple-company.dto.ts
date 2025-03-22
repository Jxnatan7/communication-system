import { Company } from "src/company/core/schemas/company.schema";

export class SimpleCompany {
  readonly id: string;
  readonly name: string;
  readonly description?: string;

  constructor(company: Company) {
    this.id = company.id as string;
    this.name = company.name;
    this.description = company.description;
  }
}
