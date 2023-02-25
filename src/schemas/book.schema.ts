import { ObjectType, Field } from '@nestjs/graphql';
import { Transform } from '@nestjs/class-transformer';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId } from 'mongoose';

export type RoleDocument = Book & Document;
@Schema({
  timestamps: { createdAt: 'created', updatedAt: 'updated' },
})
@ObjectType()
export class Book {
  @Transform(({ value }) => value.toString())
  @Field(() => String)
  _id: ObjectId;

  @Prop({ required: true })
  @Field(() => String, { description: 'Book Name' })
  name: string;

  @Prop()
  @Field(() => String, { description: 'Book Author' })
  author: string;

  @Prop()
  @Field(() => String, { description: 'Book ISBN' })
  isbn: string;

  @Prop()
  @Field(() => String, { description: 'Book Summery' })
  summery: string;

  @Prop({ default: false })
  @Field(() => Boolean, { description: 'Book Loaned' })
  loaned: boolean;

  @Prop({ default: true })
  @Field(() => Boolean, { description: 'Book Active' })
  active: boolean;
}

export const BookSchema = SchemaFactory.createForClass(Book);
