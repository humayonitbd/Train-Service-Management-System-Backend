import { z } from 'zod';


const TicketStopSchema = z.object({
  station: z.string(), 
  arrivalTime: z.string(),
  departureTime: z.string()

});


const PurchaseTicketSchema = z.object({
  body: z.object({
    user: z.string(),
    train: z.string(),
    stops: z.array(TicketStopSchema),
    fare: z.number().positive('Fare must be a positive number'),
    date: z.string().optional(),
  }),
});

export const TicketValidation = {
  PurchaseTicketSchema,
};