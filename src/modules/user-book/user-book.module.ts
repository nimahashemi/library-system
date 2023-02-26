import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserBook, UserBookSchema } from 'src/schemas/user-book.schema';
import { UserBookController } from './user-book.controller';
import { UserBookResolver } from './user-book.resolver';
import { UserBookService } from './user-book.service';
import { UserModule } from '../user/user.module';
import { BookModule } from '../book/book.module';

@Module({
  imports: [
    UserModule,
    BookModule,
    MongooseModule.forFeature([
      { name: UserBook.name, schema: UserBookSchema },
    ]),
  ],
  controllers: [UserBookController],
  providers: [UserBookService, UserBookResolver],
})
export class UserBookModule {}
