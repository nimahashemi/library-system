import { ObjectType, Field } from '@nestjs/graphql';
import { Transform } from '@nestjs/class-transformer';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, ObjectId } from 'mongoose';
import { Book } from './book.schema';
import { User } from './user.schema';

export type UserBookDocument = UserBook & Document;
@Schema({
  timestamps: { createdAt: 'created', updatedAt: 'updated' },
})
@ObjectType()
export class UserBook {
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

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: Book.name,
    required: true,
  })
  @Field(() => String, { description: 'Book ID' })
  book: ObjectId;

  @Prop({ required: true })
  @Field(() => Date, { description: 'Return Date' })
  return: Date;
}

export const UserBookSchema = SchemaFactory.createForClass(UserBook);
