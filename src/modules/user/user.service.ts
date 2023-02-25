import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserCreatetDto } from 'src/dto/user-create.dto';
import { UserUpdatetDto } from 'src/dto/user-update.dto';
import { User, UserDocument } from '../../schemas/user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(userCreatetDto: UserCreatetDto) {
    try {
      const user = new this.userModel(userCreatetDto);
      return await user.save();
    } catch (error) {
      return new Error(error.message);
    }
  }

  async findAll(filters: UserCreatetDto) {
    try {
      const users = await this.userModel.find({ ...filters }).exec();

      if (!users) {
        return 'User not found';
      }
      return users;
    } catch (error) {
      return new Error(error.message);
    }
  }

  async findOne(id: string) {
    try {
      const user = await this.userModel.findOne({ _id: id }).exec();
      if (!user) {
        return 'User not found';
      }
      return user;
    } catch (error) {
      return new Error(error.message);
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
