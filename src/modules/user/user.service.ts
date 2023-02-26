import {
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserCreatetDto } from 'src/dto/user-create.dto';
import { UserUpdatetDto } from 'src/dto/user-update.dto';
import { User, UserDocument } from '../../schemas/user.schema';
import * as bcrypt from 'bcrypt';
import { Request } from 'express';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(userCreatetDto: UserCreatetDto, req: Request) {
    try {
      console.log(req.headers);
      const salt = await bcrypt.genSalt();
      const hashPassword = await bcrypt.hash(userCreatetDto.password, salt);
      userCreatetDto.password = hashPassword;
      const user = new this.userModel(userCreatetDto);
      return await user.save();
    } catch (error) {
      return new Error(error.message);
    }
  }

  async findAll(filters: UserCreatetDto): Promise<UserCreatetDto[]> {
    try {
      const users = await this.userModel.find({ ...filters }).exec();

      if (!users) {
        throw new NotFoundException('Users not found!');
      }
      return users;
    } catch (error) {
      throw new NotFoundException('Users not found!');
    }
  }

  async findOne(id: string): Promise<UserCreatetDto> {
    try {
      const user = await this.userModel.findOne({ _id: id }).exec();
      if (!user) {
        throw new NotFoundException('User not found!');
      }
      return user;
    } catch (error) {
      throw new NotFoundException('User not found!');
    }
  }

  async findByEmail(email: string) {
    try {
      const user = await this.userModel.findOne({ email }).exec();
      if (!user) {
        throw new NotAcceptableException('could not find the user');
      }
      return user;
    } catch (error) {
      throw new NotAcceptableException('could not find the user');
    }
  }

  async update(id: string, userUpdateDto: UserUpdatetDto) {
    try {
      const user = await this.userModel.findOne({ _id: id }).exec();
      if (!user) {
        return 'User not found';
      }
      return this.userModel.findByIdAndUpdate(id, userUpdateDto);
    } catch (error) {
      return new Error(error.message);
    }
  }

  async remove(id: string) {
    return this.userModel.findByIdAndDelete(id);
  }
}
