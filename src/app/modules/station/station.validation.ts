import { z } from 'zod';

export const createStationSchema = z.object({
  body: z.object({
    name: z.string({ required_error: 'Name is required' }),
    code: z.string({ required_error: 'Code is required' }),
    isDeleted: z.boolean().default(false).optional(),
  }),
});
export const updateStationSchema = z.object({
  body: z.object({
    name: z.string({ required_error: 'Name is required' }).optional(),
    code: z.string({ required_error: 'Code is required' }).optional(),
    isDeleted: z.boolean().default(false).optional(),
  }),
});

export const StationValidation = {
  createStationSchema,
  updateStationSchema,
};
