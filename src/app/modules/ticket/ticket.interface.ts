import { Types } from 'mongoose';

export type TTicketStop ={
  station: Types.ObjectId; 
  arrivalTime: string;
  departureTime: string;
}

export type TTicket = {
  user: Types.ObjectId;
  train: Types.ObjectId;
  stops: TTicketStop[];
  fare: number;
  date?: Date;
};
