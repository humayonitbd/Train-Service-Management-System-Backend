import { Schema, model } from "mongoose";
import { TTrain } from "./train.interface";

const TrainSchema = new Schema<TTrain>({
  number: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
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
  isDeleted: {
    type: Boolean,
    required: [true, 'isDeleted is required'],
    default: false,
  },
});

export const Train = model<TTrain>('Train', TrainSchema);
