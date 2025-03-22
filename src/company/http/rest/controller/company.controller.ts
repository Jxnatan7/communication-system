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
import { CompanyService } from "src/company/core/services/company.service";
import { CreateCompanyDto } from "../dto/create-company.dto";
import { UpdateCompanyDto } from "../dto/update-company.dto";
import { SimpleCompany } from "../dto/simple-company.dto";
import { AdminGuard } from "src/auth/guards/admin.guard";

@Controller("api/companies")
@UseGuards(AuthGuard("jwt"))
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Get()
  async findAll() {
    const companies = await this.companyService.findAll();
    return companies.map((company) => new SimpleCompany(company));
  }

  @Get(":id")
  async findById(@Param("id") id: string) {
    const company = await this.companyService.findById(id);
    return new SimpleCompany(company);
  }

  @Post()
  @UseGuards(AdminGuard)
  async create(@Body() createCompanyDto: CreateCompanyDto) {
    const company = await this.companyService.create(createCompanyDto);
    return new SimpleCompany(company);
  }

  @Patch(":id")
  @UseGuards(AdminGuard)
  async update(
    @Param("id") id: string,
    @Body() updateCompanyDto: UpdateCompanyDto,
  ) {
    const company = await this.companyService.update(id, updateCompanyDto);
    return new SimpleCompany(company);
  }

  @Delete(":id")
  @UseGuards(AdminGuard)
  async delete(@Param("id") id: string) {
    await this.companyService.delete(id);
    return { message: "Company deleted successfully" };
  }
}
