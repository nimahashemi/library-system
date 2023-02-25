import { InputType, Field } from '@nestjs/graphql';
import { IsBoolean, IsNotEmpty, IsString, MaxLength } from 'class-validator';

@InputType()
export class BookCreatetDto {
  @IsString()
  @MaxLength(100)
  @IsNotEmpty()
  @Field(() => String, { description: 'Book Name' })
  name: string;

  @IsString()
  @MaxLength(30)
  @IsNotEmpty()
  @Field(() => String, { description: 'Book Author' })
  author: string;

  @IsString()
  @MaxLength(15)
  @IsNotEmpty()
  @Field(() => String, { description: 'Book ISBN' })
  isbn: string;

  @IsString()
  @MaxLength(300)
  @IsNotEmpty()
  @Field(() => String, { description: 'Book Summery' })
  summery: string;

  @IsBoolean()
  @IsNotEmpty()
  @Field(() => Boolean, { description: 'Book Loaned' })
  loaned: boolean;

  @IsBoolean()
  @IsNotEmpty()
  @Field(() => Boolean, { description: 'Book Active' })
  active: boolean;
}
