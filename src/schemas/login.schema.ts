import { ObjectType, Field } from '@nestjs/graphql';
import { Prop, SchemaFactory } from '@nestjs/mongoose';

export type LoginDocument = Login & Document;

@ObjectType()
export class Login {
  @Prop()
  @Field(() => String, { description: 'User Email' })
  email: string;

  @Prop()
  @Field(() => String, { description: 'User Password' })
  password: string;
}

export const LoginSchema = SchemaFactory.createForClass(Login);
