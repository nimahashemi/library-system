import { ObjectType, Field } from '@nestjs/graphql';
import { Transform } from '@nestjs/class-transformer';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, ObjectId } from 'mongoose';
import { User } from './user.schema';

export type AuthDocument = Auth & Document;
@Schema({
  timestamps: { createdAt: 'created', updatedAt: 'updated' },
})
@ObjectType()
export class Auth {
  @Transform(({ value }) => value.toString())
  @Field(() => String)
  _id: ObjectId;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: User.name,
    required: true,
  })
  @Field(() => String, { description: 'User ID' })
  user: ObjectId;

  @Prop({ required: true, unique: true })
  @Field(() => String, { description: 'User Email' })
  email: string;

  @Prop({ required: true, unique: true })
  @Field(() => String, { description: 'User Email' })
  token: string;
}

export const AuthSchema = SchemaFactory.createForClass(Auth);
