import { z } from 'zod';

const transactionSchema = z.object({
  amount: z.number(),
  date: z.string().optional(), 
  type: z.enum(['credit', 'debit']),
});


export const addWalletSchema = z.object({
  body: z.object({
    user: z.string(),
    balance: z.number().nonnegative(),
    transactions: z.array(transactionSchema).optional(),
  }),
});



export const WalletValidation = {
  addWalletSchema,
};

