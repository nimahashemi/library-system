import { IsString, MaxLength } from 'class-validator';
import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class LoginInput {
  @IsString()
  @MaxLength(50)
  @Field(() => String, { description: 'User Email' })
  email: string;

  @IsString()
  @MaxLength(30)
  @Field(() => String, { description: 'Paswword' })
  password: string;

  @IsString()
  @MaxLength(200)
  @Field(() => String, { description: 'token', nullable: true })
  token?: string;
}
