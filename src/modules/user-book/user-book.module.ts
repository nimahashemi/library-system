import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserBook, UserBookSchema } from 'src/schemas/user-book.schema';
import { UserBookController } from './user-book.controller';
import { UserBookService } from './user-book.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: UserBook.name, schema: UserBookSchema },
    ]),
  ],
  controllers: [UserBookController],
  providers: [UserBookService],
})
export class UserBookModule {}
