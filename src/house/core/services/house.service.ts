import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { House } from "../schemas/house.schema";
import { UpdateHouseDto } from "src/house/http/rest/dto/update-house.dto";
import { CreateHouseDto } from "src/house/http/rest/dto/create-house.dto";
import { Provider } from "src/provider/core/schemas/provider.schema";

@Injectable()
export class HouseService {
  constructor(
    @InjectModel(House.name) private readonly houseModel: Model<House>,
    @InjectModel(Provider.name) private readonly providerModel: Model<Provider>,
  ) {}

  async create(createHouseDto: CreateHouseDto): Promise<House> {
    await this.ensureProviderExists(createHouseDto.providerId);

    const house = await new this.houseModel(createHouseDto).save();
    await this.addHouseToProvider(
      createHouseDto.providerId,
      house.id as string,
    );

    return house;
  }

  async findAll(): Promise<House[]> {
    return this.houseModel.find().exec();
  }

  async findByProviderId(providerId: string): Promise<House[]> {
    await this.ensureProviderExists(providerId);
    return this.houseModel.find({ providerId: providerId }).exec();
  }

  async findById(id: string): Promise<House> {
    return this.findHouseOrFail(id);
  }

  async update(id: string, updateHouseDto: UpdateHouseDto): Promise<House> {
    return this.updateHouseOrFail(id, updateHouseDto);
  }

  async delete(id: string): Promise<void> {
    await this.deleteHouseOrFail(id);
  }

  private async ensureProviderExists(providerId: string): Promise<void> {
    const providerExists = await this.providerModel.exists({ _id: providerId });
    if (!providerExists) {
      throw new NotFoundException("Provider not found");
    }
  }

  private async addHouseToProvider(
    providerId: string,
    houseId: string,
  ): Promise<void> {
    await this.providerModel.findByIdAndUpdate(
      providerId,
      { $push: { houses: houseId } },
      { new: true },
    );
  }

  private async findHouseOrFail(id: string): Promise<House> {
    const house = await this.houseModel.findById(id).exec();
    if (!house) {
      throw new NotFoundException("House not found");
    }
    return house;
  }

  private async updateHouseOrFail(
    id: string,
    updateHouseDto: UpdateHouseDto,
  ): Promise<House> {
    const house = await this.houseModel
      .findByIdAndUpdate(id, updateHouseDto, { new: true })
      .exec();
    if (!house) {
      throw new NotFoundException("House not found");
    }
    return house;
  }

  private async deleteHouseOrFail(id: string): Promise<void> {
    const result = await this.houseModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException("House not found");
    }
  }
}
