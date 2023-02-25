import { Document } from 'mongoose';

export interface IUserBook extends Document {
  readonly user: string;
  readonly book: string;
  readonly return: Date;
}
