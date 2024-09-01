import { Types } from 'mongoose';

export type TTrain = {
  number: string;
  name: string;
  stops: TStop[];
  isDeleted: boolean;
};

export type TStop = {
  station: Types.ObjectId;
  arrivalTime: string;
  departureTime: string;
};
