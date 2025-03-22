import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { House } from "../schemas/house.schema";
import { UpdateHouseDto } from "src/house/http/rest/dto/update-house.dto";
import { CreateHouseDto } from "src/house/http/rest/dto/create-house.dto";
import { Company } from "src/company/core/schemas/company.schema";

@Injectable()
export class HouseService {
  constructor(
    @InjectModel(House.name) private readonly houseModel: Model<House>,
    @InjectModel(Company.name) private readonly companyModel: Model<Company>,
  ) {}

  async create(createHouseDto: CreateHouseDto): Promise<House> {
    await this.ensureCompanyExists(createHouseDto.companyId);

    const house = await new this.houseModel(createHouseDto).save();
    await this.addHouseToCompany(createHouseDto.companyId, house.id as string);

    return house;
  }

  async findAll(): Promise<House[]> {
    return this.houseModel.find().exec();
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

  private async ensureCompanyExists(companyId: string): Promise<void> {
    const companyExists = await this.companyModel.exists({ _id: companyId });
    if (!companyExists) {
      throw new NotFoundException("Company not found");
    }
  }

  private async addHouseToCompany(
    companyId: string,
    houseId: string,
  ): Promise<void> {
    await this.companyModel.findByIdAndUpdate(
      companyId,
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
