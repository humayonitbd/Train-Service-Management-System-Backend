import { Schema, model } from "mongoose";

const TicketSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  train: {
    type: Schema.Types.ObjectId,
    ref: 'Train',
    required: true,
  },
  stops: [
    {
      station: {
        type: Schema.Types.ObjectId,
        ref: 'Station',
        required: true,
      },
      arrivalTime: { type: String, required: true },
      departureTime: { type: String, required: true },
    },
  ],
  fare: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

export const Ticket = model('Ticket', TicketSchema);
