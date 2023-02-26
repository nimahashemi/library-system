import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserBook } from 'src/schemas/user-book.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { UserBookCreateDto } from '../../dto/user-book-create.dto';
import { UserBookUpdateDto } from '../../dto/user-book-update.dto';
import { BookLoanDto } from '../../dto/book-loan-dto';
import { UserService } from '../user/user.service';
import { BookService } from '../book/book.service';
import { Request } from 'express';

@Injectable()
export class UserBookService {
  constructor(
    @InjectModel(UserBook.name)
    private readonly userBookModel: Model<UserBook>,
    private readonly userService: UserService,
    private readonly bookService: BookService,
  ) {}

  async create(UserBookCreateDto: UserBookCreateDto, req?: Request) {
    try {
      if (req && req?.headers?.authorization)
        throw new UnauthorizedException('Your Access is Limited ...!');
      const book = new this.userBookModel(UserBookCreateDto);
      return await book.save();
    } catch (error) {
      return new Error(error.message);
    }
  }

  async findAll(filters: UserBookCreateDto, req?: Request) {
    try {
      if (req && req?.headers?.authorization)
        throw new UnauthorizedException('Your Access is Limited ...!');
      const books = await this.userBookModel.find({ ...filters }).exec();

      if (!books) {
        return 'Book not found';
      }
      return books;
    } catch (error) {
      return new Error(error.message);
    }
  }

  async findOne(id: string, req?: Request) {
    try {
      if (req && req?.headers?.authorization)
        throw new UnauthorizedException('Your Access is Limited ...!');
      const book = await this.userBookModel.findOne({ _id: id }).exec();
      if (!book) {
        return 'User Reserved Book not found';
      }
      return book;
    } catch (error) {
      return new Error(error.message);
    }
  }

  async update(id: string, userBookUpdateDto: UserBookUpdateDto, req: Request) {
    try {
      if (req && req?.headers?.authorization)
        throw new UnauthorizedException('Your Access is Limited ...!');
      const book = await this.userBookModel.findOne({ _id: id }).exec();
      if (!book) {
        return 'Book not found';
      }
      return this.userBookModel.findByIdAndUpdate(id, userBookUpdateDto);
    } catch (error) {
      return new Error(error.message);
    }
  }

  async remove(id: string, req?: Request) {
    if (req && req?.headers?.authorization)
      throw new UnauthorizedException('Your Access is Limited ...!');
    return this.userBookModel.findByIdAndDelete(id);
  }

  async booksStatus(bookLoanDto: BookLoanDto, req?: Request) {
    let list;
    if (req && req?.headers?.authorization)
      throw new UnauthorizedException('Your Access is Limited ...!');
    const userbooks = await this.userBookModel.find();

    if (!userbooks || userbooks.length == 0) {
      throw new NotFoundException('User & books data not found!');
    }

    for (const ub of userbooks) {
      if (ub.return > new Date()) {
        const user = await this.userService.findOne(
          bookLoanDto.user.toString(),
        );
        const book = await this.bookService.findOne(
          bookLoanDto.book.toString(),
        );
        if (!bookLoanDto.status) {
          list.push({
            bookName: book.name,
            fullName: user.name,
            book: bookLoanDto.book,
            user: bookLoanDto.bookName,
            return: ub.return,
            status: book.loaned,
          });
        } else if (bookLoanDto.status) {
          list.push({
            bookName: book.name,
            fullName: user.name,
            book: bookLoanDto.book,
            user: bookLoanDto.bookName,
            return: ub.return,
            status: bookLoanDto.status,
          });
        }
      }
    }
    return list;
  }
}
