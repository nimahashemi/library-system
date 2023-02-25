import { BookCreatetDto } from './book-create.dto';
import { InputType, Field, PartialType } from '@nestjs/graphql';

@InputType()
export class BookUpdateDto extends PartialType(BookCreatetDto) {
  @Field(() => String)
  _id: string;
}
