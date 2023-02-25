import { ObjectType, Field } from '@nestjs/graphql';
import { Transform } from '@nestjs/class-transformer';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId } from 'mongoose';

export type UserDocument = User & Document;
@Schema({
  timestamps: { createdAt: 'created', updatedAt: 'updated' },
})
@ObjectType()
export class User {
  @Transform(({ value }) => value.toString())
  @Field(() => String)
  _id: ObjectId;

  @Prop({ required: true })
  @Field(() => String, { description: 'User Full Name' })
  name: string;

  @Prop({ required: true, unique: true })
  @Field(() => String, { description: 'User Email' })
  email: string;

  @Prop({ required: true })
  @Field(() => String, { description: 'Password' })
  password: string;

  @Prop({ required: true, default: 'MEN' })
  @Field(() => String, { description: 'User Gender' })
  gender: string;

  @Prop()
  @Field(() => Date, { description: 'Birthdate' })
  birthdate: Date;

  @Prop({ required: true, enum: ['ADMIN', 'USER'] })
  @Field(() => String, { description: 'User Role' })
  role: string;

  @Prop({ default: true })
  @Field(() => Boolean, { description: 'User Active' })
  active: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
