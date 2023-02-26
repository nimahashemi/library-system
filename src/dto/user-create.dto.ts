import {
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsString,
  MaxLength,
} from 'class-validator';
import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class UserCreatetDto {
  @IsString()
  @MaxLength(50)
  @IsNotEmpty()
  @Field(() => String, { description: 'User Full Name' })
  readonly name: string;

  @IsString()
  @MaxLength(50)
  @IsNotEmpty()
  @Field(() => String, { description: 'User Email' })
  email: string;

  @IsString()
  @MaxLength(30)
  @IsNotEmpty()
  @Field(() => String, { description: 'Paswword' })
  password: string;

  @IsString()
  @MaxLength(5)
  @IsNotEmpty()
  @Field(() => String, { description: 'User Gender' })
  gender: string;

  @IsDate()
  @IsNotEmpty()
  @Field(() => Date, { description: 'Birthdate' })
  birthdate: Date;

  @IsString()
  @MaxLength(5)
  @IsNotEmpty()
  @Field(() => String, { description: 'User Role' })
  role: string;

  @IsBoolean()
  @IsNotEmpty()
  @Field(() => Boolean, { description: 'User Active' })
  active: boolean;
}
