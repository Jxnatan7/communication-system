import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { House } from "../schemas/house.schema";
import { UpdateHouseDto } from "src/house/http/rest/dto/update-house.dto";
import { CreateHouseDto } from "src/house/http/rest/dto/create-house.dto";
@Injectable()
export class HouseService {
  constructor(@InjectModel(House.name) private houseModel: Model<House>) {}

  async create(createHouseDto: CreateHouseDto): Promise<House> {
    const createdHouse = new this.houseModel(createHouseDto);
    return createdHouse.save();
  }

  async findAll(): Promise<House[]> {
    return this.houseModel.find().exec();
  }

  async findById(id: string): Promise<House> {
    const house = await this.houseModel.findById(id).exec();
    if (!house) {
      throw new NotFoundException("House not found");
    }
    return house;
  }

  async update(id: string, updateHouseDto: UpdateHouseDto): Promise<House> {
    const updatedHouse = await this.houseModel
      .findByIdAndUpdate(id, updateHouseDto, { new: true })
      .exec();

    if (!updatedHouse) {
      throw new NotFoundException("House not found");
    }
    return updatedHouse;
  }

  async delete(id: string): Promise<void> {
    const result = await this.houseModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException("House not found");
    }
  }
}
