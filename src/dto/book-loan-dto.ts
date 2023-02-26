import { InputType, Field } from '@nestjs/graphql';
import {
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsString,
  MaxLength,
} from 'class-validator';
import mongoose from 'mongoose';

@InputType()
export class BookLoanDto {
  @IsString()
  @MaxLength(100)
  @Field(() => String, { description: 'Book Name', nullable: true })
  bookName?: string;

  @IsString()
  @MaxLength(100)
  @Field(() => String, { description: 'Use Full name', nullable: true })
  fullName?: string;

  @IsString()
  @MaxLength(20)
  @Field(() => String, { description: 'User', nullable: true })
  user?: mongoose.Schema.Types.ObjectId;

  @IsString()
  @MaxLength(20)
  @Field(() => String, { description: 'Book', nullable: true })
  book?: mongoose.Schema.Types.ObjectId;

  @IsDate()
  @Field(() => String, { description: 'Return', nullable: true })
  return?: Date;

  @IsBoolean()
  @Field(() => String, { description: 'Status', nullable: true })
  status?: boolean;
}
