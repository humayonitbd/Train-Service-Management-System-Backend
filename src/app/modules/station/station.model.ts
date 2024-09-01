import {Schema, model} from "mongoose";
import { TStation } from "./station.interface";

const StationSchema = new Schema<TStation>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    code: {
      type: String,
      required: true,
      unique: true,
    },
    isDeleted: {
      type: Boolean,
      required: [true, 'isDeleted is required'],
      default: false,
    },
  },
  { timestamps: true },
);

export const Station = model<TStation>('Station', StationSchema);
