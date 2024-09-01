import { z } from 'zod';

const timeStringSchema = z.string().refine(
  (time) => {
    const regex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
    return regex.test(time);
  },
  { message: "invalid time formate, expected 'HH:MM' in 24 hour format" },
);
const updateTimeStringSchema = z.string().refine(
  (time) => {
    const regex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
    return regex.test(time);
  },
  { message: "invalid time formate, expected 'HH:MM' in 24 hour format" },
).optional();

const stopSchema = z.object({
  station: z.string(),
  arrivalTime: timeStringSchema,
  departureTime: timeStringSchema,
});
const updateStopSchema = z.object({
  station: z.string(),
  arrivalTime: updateTimeStringSchema,
  departureTime: updateTimeStringSchema,
});


export const CreateTrainSchema = z.object({
  body: z.object({
    number: z.string().min(1, 'Train number is required'),
    name: z.string().min(1, 'Train name is required'),
    stops: z.array(stopSchema).nonempty('At least one stop is required'),
    isDeleted: z.boolean().default(false).optional(),
  }),
});

export const updateTrainSchema = z.object({
  body: z.object({
    number: z.string().min(1, 'Train number is required').optional(),
    name: z.string().min(1, 'Train name is required').optional(),
    stops: z.array(updateStopSchema).nonempty('At least one stop is required').optional(),
    isDeleted: z.boolean().default(false).optional(),
  }),
});


export const TrainValidation = {
  CreateTrainSchema,
  updateTrainSchema,
};