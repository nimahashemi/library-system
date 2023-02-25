import { UserCreatetDto } from './user-create.dto';
import { InputType, Field, PartialType } from '@nestjs/graphql';

@InputType()
export class UserUpdatetDto extends PartialType(UserCreatetDto) {
  @Field(() => String)
  _id: string;
}
