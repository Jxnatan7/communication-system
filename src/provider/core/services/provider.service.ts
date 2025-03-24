import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Provider } from "../schemas/provider.schema";
import { CreateProviderDto } from "src/provider/http/rest/dto/create-provider.dto";
import { UpdateProviderDto } from "src/provider/http/rest/dto/update-provider.dto";

@Injectable()
export class ProviderService {
  constructor(
    @InjectModel(Provider.name) private providerModel: Model<Provider>,
  ) {}

  async create(createProviderDto: CreateProviderDto): Promise<Provider> {
    const createdProvider = new this.providerModel(createProviderDto);
    return createdProvider.save();
  }

  async findAll(): Promise<Provider[]> {
    return this.providerModel.find().exec();
  }

  async findByCode(code: string): Promise<Provider> {
    const provider = await this.providerModel.findOne({ code }).exec();
    if (!provider) {
      throw new NotFoundException("Provider not found");
    }
    return provider;
  }

  async findById(id: string): Promise<Provider> {
    const provider = await this.providerModel.findById(id).exec();
    if (!provider) {
      throw new NotFoundException("Provider not found");
    }
    return provider;
  }

  async update(
    id: string,
    updateProviderDto: UpdateProviderDto,
  ): Promise<Provider> {
    const updatedProvider = await this.providerModel
      .findByIdAndUpdate(id, updateProviderDto, { new: true })
      .exec();

    if (!updatedProvider) {
      throw new NotFoundException("Provider not found");
    }
    return updatedProvider;
  }

  async delete(id: string): Promise<void> {
    const result = await this.providerModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException("Provider not found");
    }
  }
}
