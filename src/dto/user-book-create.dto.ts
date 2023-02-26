import { Field, InputType } from '@nestjs/graphql';
import {
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsString,
  MaxLength,
} from 'class-validator';
import mongoose from 'mongoose';

@InputType()
export class UserBookCreateDto {
  @IsString()
  @MaxLength(20)
  @IsNotEmpty()
  @Field(() => String, { description: 'User' })
  user: mongoose.Schema.Types.ObjectId;

  @IsString()
  @MaxLength(20)
  @IsNotEmpty()
  @Field(() => String, { description: 'Book' })
  book: mongoose.Schema.Types.ObjectId;

  @IsDate()
  @IsNotEmpty()
  @Field(() => String, { description: 'Return' })
  return: Date;

  @IsBoolean()
  @IsNotEmpty()
  @Field(() => String, { description: 'Status' })
  status: boolean;
}
