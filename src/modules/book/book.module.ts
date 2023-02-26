import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Book, BookSchema } from '../../schemas/book.schema';
import { BookService } from './book.service';
import { BookController } from './book.controller';
import { BookResolver } from './book.resolver';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Book.name, schema: BookSchema }]),
  ],
  providers: [BookService, BookResolver],
  controllers: [BookController],
  exports: [BookService],
})
export class BookModule {}
