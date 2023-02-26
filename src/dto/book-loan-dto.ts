import { InputType, Field } from '@nestjs/graphql';
import {
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsString,
  MaxLength,
} from 'class-validator';

@InputType()
export class BookLoanDto {
  @IsString()
  @MaxLength(100)
  @IsNotEmpty()
  @Field(() => String, { description: 'Book Name' })
  book: string;

  @IsString()
  @MaxLength(100)
  @IsNotEmpty()
  @Field(() => String, { description: 'Use Full name' })
  name: string;

  @IsDate()
  @IsNotEmpty()
  @Field(() => String, { description: 'Return' })
  return: Date;

  @IsBoolean()
  @IsNotEmpty()
  @Field(() => String, { description: 'Status' })
  status: boolean;
}
