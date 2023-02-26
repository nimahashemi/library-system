import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Book } from 'src/schemas/book.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { BookCreatetDto } from 'src/dto/book-create.dto';
import { BookUpdateDto } from 'src/dto/book-update.dto';
import { Request } from 'express';

@Injectable()
export class BookService {
  constructor(
    @InjectModel(Book.name)
    private readonly bookModel: Model<Book>,
  ) {}

  async create(bookCreatetDto: BookCreatetDto, req: Request) {
    try {
      if (!req?.headers?.authorization)
        throw new UnauthorizedException('Your Access is Limited ...!');
      const book = new this.bookModel(bookCreatetDto);
      return await book.save();
    } catch (error) {
      return new Error(error.message);
    }
  }

  async findAll(
    filters: BookCreatetDto,
    req?: Request,
  ): Promise<BookCreatetDto[]> {
    try {
      if (!req?.headers?.authorization)
        throw new UnauthorizedException('Your Access is Limited ...!');
      const books = await this.bookModel.find({ ...filters }).exec();

      if (!books) {
        throw new NotFoundException('Users not found!');
      }
      return books;
    } catch (error) {
      throw new NotFoundException('Users not found!');
    }
  }

  async findOne(id: string, req?: Request): Promise<BookCreatetDto> {
    try {
      if (!req?.headers?.authorization)
        throw new UnauthorizedException('Your Access is Limited ...!');
      const book = await this.bookModel.findOne({ _id: id }).exec();
      if (!book) {
        throw new NotFoundException('Users not found!');
      }
      return book;
    } catch (error) {
      throw new NotFoundException('Users not found!');
    }
  }

  async update(id: string, bookUpdateDto: BookUpdateDto, req: Request) {
    try {
      if (!req?.headers?.authorization)
        throw new UnauthorizedException('Your Access is Limited ...!');
      const book = await this.bookModel.findOne({ _id: id }).exec();
      if (!book) {
        return 'Book not found';
      }
      return this.bookModel.findByIdAndUpdate(id, bookUpdateDto);
    } catch (error) {
      return new Error(error.message);
    }
  }

  async remove(id: string, req: Request) {
    if (!req?.headers?.authorization)
      throw new UnauthorizedException('Your Access is Limited ...!');
    return this.bookModel.findByIdAndDelete(id);
  }
}
