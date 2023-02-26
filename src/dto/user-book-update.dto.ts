import { UserBookCreateDto } from './user-book-create.dto';
import { InputType, Field, PartialType } from '@nestjs/graphql';

@InputType()
export class UserBookUpdateDto extends PartialType(UserBookCreateDto) {
  @Field(() => String)
  _id: string;
}
