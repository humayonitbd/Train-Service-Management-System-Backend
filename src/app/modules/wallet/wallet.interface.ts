import { Types } from 'mongoose';

export type TTransaction ={
  amount: number;
  date?: Date;
  type: 'credit' | 'debit';
}

export type TWallet = {
  user: Types.ObjectId; 
  balance: number;
  transactions: TTransaction[];
};
