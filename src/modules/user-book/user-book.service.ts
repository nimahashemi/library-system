import { Injectable } from '@nestjs/common';
import { UserBook } from 'src/schemas/user-book.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { UserBookCreateDto } from '../../dto/user-book-create.dto';
import { UserBookUpdateDto } from '../../dto/user-book-update.dto';

@Injectable()
export class UserBookService {
  constructor(
    @InjectModel(UserBook.name)
    private readonly userBookModel: Model<UserBook>,
  ) {}

  async create(UserBookCreateDto: UserBookCreateDto) {
    try {
      const book = new this.userBookModel(UserBookCreateDto);
      return await book.save();
    } catch (error) {
      return new Error(error.message);
    }
  }

  async findAll(filters: UserBookCreateDto) {
    try {
      const books = await this.userBookModel.find({ ...filters }).exec();

      if (!books) {
        return 'Book not found';
      }
      return books;
    } catch (error) {
      return new Error(error.message);
    }
  }

  async findOne(id: string) {
    try {
      const book = await this.userBookModel.findOne({ _id: id }).exec();
      if (!book) {
        return 'User Reserved Book not found';
      }
      return book;
    } catch (error) {
      return new Error(error.message);
    }
  }

  async update(id: string, userBookUpdateDto: UserBookUpdateDto) {
    try {
      const book = await this.userBookModel.findOne({ _id: id }).exec();
      if (!book) {
        return 'Book not found';
      }
      return this.userBookModel.findByIdAndUpdate(id, userBookUpdateDto);
    } catch (error) {
      return new Error(error.message);
    }
  }

  async remove(id: string) {
    return this.userBookModel.findByIdAndDelete(id);
  }
}
