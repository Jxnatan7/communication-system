import {
  Injectable,
  ConflictException,
  NotFoundException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User, UserRole } from "../schemas/user.schema";
import { CreateUserDto } from "src/user/http/rest/dto/create-user.dto";
import { House } from "src/house/core/schemas/house.schema";
import { Provider } from "src/provider/core/schemas/provider.schema";

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    @InjectModel(House.name) private readonly houseModel: Model<House>,
    @InjectModel(Provider.name) private readonly providerModel: Model<Provider>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    await this.ensureEmailIsUnique(createUserDto.email);
    await this.validateUserRole(createUserDto);

    const user = await new this.userModel(createUserDto).save();
    await this.addResidentToHouse(user);

    return user;
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ email }).exec();
  }

  private async ensureEmailIsUnique(email: string): Promise<void> {
    const userExists = await this.findByEmail(email);
    if (userExists) {
      throw new ConflictException("Email is already in use");
    }
  }

  private async validateUserRole(createUserDto: CreateUserDto): Promise<void> {
    if (createUserDto.role === UserRole.MANAGER) {
      await this.ensureManagerHasProvider(createUserDto.providerId);
    }

    if (createUserDto.role === UserRole.RESIDENT) {
      await this.ensureResidentHasHouse(createUserDto.houseId);
    }
  }

  private async ensureManagerHasProvider(providerId?: string): Promise<void> {
    if (!providerId) {
      throw new ConflictException("MANAGER must have a providerId");
    }
    const providerExists = await this.providerModel.exists({ _id: providerId });
    if (!providerExists) {
      throw new NotFoundException("Provider not found");
    }
  }

  private async ensureResidentHasHouse(houseId?: string): Promise<void> {
    if (!houseId) {
      throw new ConflictException("RESIDENT must have a houseId");
    }
    const houseExists = await this.houseModel.exists({ _id: houseId });
    if (!houseExists) {
      throw new NotFoundException("House not found");
    }
  }

  private async addResidentToHouse(user: User): Promise<void> {
    if (user.role !== UserRole.RESIDENT) return;

    await this.houseModel.findByIdAndUpdate(
      user.houseId,
      { $push: { residents: user._id } },
      { new: true },
    );
  }
}
