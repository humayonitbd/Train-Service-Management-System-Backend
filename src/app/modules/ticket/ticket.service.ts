
import QueryBuilder from '../../builder/QueryBuilder';
import { AppError } from '../../error/AppError';
import { User } from '../user/user.model';
import { Train } from '../train/train.model';
import { TTicket } from './ticket.interface';
import { Wallet } from '../wallet/wallet.model';
import { Ticket } from './ticket.model';
import { Station } from '../station/station.model';

const purchaseTicket = async (payload: TTicket) => {
      if (payload.fare <= 0) {
        throw new AppError(400, 'Fare must be greater than zero.');
      }
       if (!Array.isArray(payload.stops) || payload.stops.length === 0) {
         throw new AppError(400, 'At least one stop is required.');
       }
       const isExistByTrain = await Train.findById(payload.train);
       if (!isExistByTrain) {
         throw new AppError(404, 'Train is not Found!!');
       }

       for (const stop of payload.stops) {
         const station = await Station.findById(stop.station);
         if (!station) {
           throw new AppError(
             400,
             `Station with ID ${stop.station} is not found.`,
           );
         }
         if (stop.arrivalTime >= stop.departureTime) {
           throw new AppError(
             400,
             'Departure time must be after arrival time.',
           );
         }

         // Assuming `train.stops` is an array of stops with their timings in the Train model
         const trainStop = isExistByTrain.stops.find(
           (ts) => ts.station.toString() === stop.station.toString(),
         );

         if (
           !trainStop ||
           stop.arrivalTime !==
             trainStop.arrivalTime ||
           stop.departureTime !==
             trainStop.departureTime
         ) {
           throw new AppError(400, 'Your time schedule is incorrect.');
         }
       }

  const isExistByUser = await User.findById(payload.user);
  if (!isExistByUser) {
    throw new AppError(404, 'User is not Found!!');
  }
  
  const wallet = await Wallet.findOne({ user: payload.user });
  if (!wallet) {
    throw new AppError(404, 'Wallet User is not Found!!');
  }

  if (wallet.balance < payload.fare) {
    throw new AppError(404, 'Insufficient balance !!');
  }
try {
  wallet.balance -= payload.fare;
  wallet.transactions.push({ amount: payload.fare, type: 'debit' });
  await wallet.save(); 

  
  const ticket = await Ticket.create(payload);

  return ticket;
} catch (error) {
  throw new AppError(500, 'Failed to complete the ticket purchase');
}
 
};

const getAllTicket = async (query: Record<string, unknown>) => {
  const TicketQuery = new QueryBuilder(Ticket.find({}), query)
    .search([''])
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await TicketQuery.modelQuery;
  const meta = await TicketQuery.countTotal();
  return { meta, result };
};

export const TicketService = {
  purchaseTicket,
  getAllTicket,
};
