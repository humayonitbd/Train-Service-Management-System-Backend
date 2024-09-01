import httpStatus from 'http-status';
import QueryBuilder from '../../builder/QueryBuilder';
import { AppError } from '../../error/AppError';
import { User } from '../user/user.model';
import { TWallet } from './wallet.interface';
import { Wallet } from './wallet.model';

const addWallet = async (payload: TWallet) => {
  const isExistByUser = await User.findById(payload.user);
  if (!isExistByUser) {
    throw new AppError(404,'User is not Found!!');
  }
   let wallet = await Wallet.findOne({ user: payload.user });

   if (wallet) {
     let newBalance = wallet.balance;
     for (const transaction of payload.transactions) {
       if (transaction.type === 'credit') {
         newBalance += transaction.amount;
       } else if (transaction.type === 'debit') {
         newBalance -= transaction.amount;
       }
       wallet.transactions.push(transaction);
     }
     wallet.balance = newBalance;

     await wallet.save();
   } else {
     
     wallet = await Wallet.create(payload);
   }

   return wallet;
};

const getAllWallet = async (query: Record<string, unknown>) => {
  const WalletQuery = new QueryBuilder(Wallet.find({}), query)
    .search([''])
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await WalletQuery.modelQuery;
  const meta = await WalletQuery.countTotal();
  return { meta, result };
};


export const WalletService = {
  addWallet,
  getAllWallet,
};
