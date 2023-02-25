import { Document } from 'mongoose';

export interface IRole extends Document {
  readonly name: string;
  readonly author: string;
  readonly isbn: string;
  readonly summery: string;
  readonly loaned: boolean;
  readonly active: boolean;
}
