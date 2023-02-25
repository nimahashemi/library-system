import { IsDate, IsNotEmpty, IsString, MaxLength } from 'class-validator';
import mongoose from 'mongoose';

export class BookCreatetDto {
  @IsString()
  @MaxLength(20)
  @IsNotEmpty()
  user: mongoose.Schema.Types.ObjectId;

  @IsString()
  @MaxLength(20)
  @IsNotEmpty()
  book: mongoose.Schema.Types.ObjectId;

  @IsDate()
  @IsNotEmpty()
  return: Date;
}
