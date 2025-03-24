import { Provider } from "src/provider/core/schemas/provider.schema";

export class SimpleProvider {
  readonly id: string;
  readonly name: string;
  readonly description?: string;
  readonly code?: string;

  constructor(provider: Provider) {
    this.id = provider.id as string;
    this.name = provider.name;
    this.description = provider.description;
    this.code = provider.code;
  }
}
