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
import { CreateProviderDto } from "../dto/create-provider.dto";
import { UpdateProviderDto } from "../dto/update-provider.dto";
import { SimpleProvider } from "../dto/simple-provider.dto";
import { AdminGuard } from "src/auth/guards/admin.guard";
import { ProviderService } from "src/provider/core/services/provider.service";

@Controller("api/providers")
export class ProviderController {
  constructor(private readonly providerService: ProviderService) {}

  @Get()
  @UseGuards(AuthGuard("jwt"), AdminGuard)
  async findAll() {
    const providers = await this.providerService.findAll();
    return providers.map((provider) => new SimpleProvider(provider));
  }

  @Get(":id")
  @UseGuards(AuthGuard("jwt"))
  async findById(@Param("id") id: string) {
    const provider = await this.providerService.findById(id);
    return new SimpleProvider(provider);
  }

  @Get("validate/:code")
  async validate(@Param("code") code: string) {
    const provider = await this.providerService.findByCode(code);
    return new SimpleProvider(provider);
  }

  @Post()
  @UseGuards(AuthGuard("jwt"), AdminGuard)
  async create(@Body() createProviderDto: CreateProviderDto) {
    const provider = await this.providerService.create(createProviderDto);
    return new SimpleProvider(provider);
  }

  @Patch(":id")
  @UseGuards(AuthGuard("jwt"), AdminGuard)
  async update(
    @Param("id") id: string,
    @Body() updateProviderDto: UpdateProviderDto,
  ) {
    const provider = await this.providerService.update(id, updateProviderDto);
    return new SimpleProvider(provider);
  }

  @Delete(":id")
  @UseGuards(AuthGuard("jwt"), AdminGuard)
  async delete(@Param("id") id: string) {
    await this.providerService.delete(id);
    return { message: "Provider deleted successfully" };
  }
}
