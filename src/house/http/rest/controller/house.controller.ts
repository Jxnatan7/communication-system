import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { HouseService } from "src/house/core/services/house.service";
import { CreateHouseDto } from "../dto/create-house.dto";
import { UpdateHouseDto } from "../dto/update-house.dto";
import { SimpleHouse } from "../dto/simple-house.dto";
import { ManagerOrAdminGuard } from "src/auth/guards/manager-or-admin.guard";

@Controller("api/houses")
export class HouseController {
  constructor(private readonly houseService: HouseService) {}

  @Get()
  @UseGuards(AuthGuard("jwt"))
  async findAll() {
    const houses = await this.houseService.findAll();
    return houses.map((house) => new SimpleHouse(house));
  }

  @Get(":id")
  @UseGuards(AuthGuard("jwt"))
  async findById(@Param("id") id: string) {
    const house = await this.houseService.findById(id);
    return new SimpleHouse(house);
  }

  @Get("/provider/:providerId")
  async findByProviderId(@Param("providerId") providerId: string) {
    const houses = await this.houseService.findByProviderId(providerId);
    return houses.map((house) => new SimpleHouse(house));
  }

  @Post()
  @UseGuards(AuthGuard("jwt"), ManagerOrAdminGuard)
  async create(@Body() createHouseDto: CreateHouseDto) {
    const house = await this.houseService.create(createHouseDto);
    return new SimpleHouse(house);
  }

  @Patch(":id")
  @UseGuards(AuthGuard("jwt"), ManagerOrAdminGuard)
  async update(
    @Param("id") id: string,
    @Body() updateHouseDto: UpdateHouseDto,
  ) {
    const house = await this.houseService.update(id, updateHouseDto);
    return new SimpleHouse(house);
  }

  @Delete(":id")
  @UseGuards(AuthGuard("jwt"), ManagerOrAdminGuard)
  async delete(@Param("id") id: string) {
    await this.houseService.delete(id);
    return { message: "House deleted successfully" };
  }
}
