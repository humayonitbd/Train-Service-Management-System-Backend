import { Schema,model } from "mongoose";

const WalletSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  balance: {
    type: Number,
    default: 0,
  },
  transactions: [
    {
      amount: Number,
      date: { type: String, default: Date.now },
      type: { type: String, enum: ['credit', 'debit'], required: true },
    },
  ],
});

export const Wallet = model('Wallet', WalletSchema);
