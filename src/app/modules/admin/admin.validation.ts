
import { z } from 'zod';

const adminNameValidationSchema = z.object({
  firstName: z
    .string()
    .min(1, { message: 'First name is Required' })
    .max(20, { message: 'First name cannot be more than 20 characters' }),

  middleName: z.string().optional(),
  lastName: z.string().min(1, { message: 'Last name is Required' }),
});

const createAdminValidationSchema = z.object({
  body: z.object({
    admin: z.object({
      id: z.string().min(1, { message: 'ID is required' }),
      user: z.string().min(1, { message: 'User id is required' }),
      name: adminNameValidationSchema,
      designation: z.string().min(1, { message: 'Designation is required' }),
      gender: z.enum(['male', 'female', 'other'], {
        required_error: 'Gender is required',
      }),
      dateOfBirth: z.string({ required_error: 'Date of birth is required' }),
      email: z
        .string()
        .email({ message: 'Invalid email address' })
        .min(1, { message: 'Email is required' }),
      contactNo: z.string().min(1, { message: 'Contact number is required' }),
      emergencyContactNo: z
        .string()
        .min(1, { message: 'Emergency contact number is required' }),
      presentAddress: z
        .string()
        .min(1, { message: 'Present address is required' }),
      permanentAddress: z
        .string()
        .min(1, { message: 'Permanent address is required' }),
      managementDepartment: z.string().optional(),
      profileImage: z.string().optional(),
      isDeleted: z.boolean().default(false),
    }),
  }),
});

const updateAdminNameValidationSchema = z.object({
  firstName: z
    .string()
    .min(1, { message: 'First name is Required' })
    .max(20, { message: 'First name cannot be more than 20 characters' }),

  middleName: z.string().optional(),
  lastName: z.string().min(1, { message: 'Last name is Required' }).optional(),
});

const updateCreateAdminValidationSchema = z.object({
  body: z.object({
    admin: z.object({
      id: z.string().min(1, { message: 'ID is required' }),
      user: z.string().min(1, { message: 'User id is required' }),
      name: updateAdminNameValidationSchema,
      designation: z
        .string()
        .min(1, { message: 'Designation is required' })
        .optional(),
      gender: z
        .enum(['male', 'female', 'other'], {
          required_error: 'Gender is required',
        })
        .optional(),
      dateOfBirth: z
        .string({ required_error: 'Date of birth is required' })
        .optional(),
      email: z
        .string()
        .email({ message: 'Invalid email address' })
        .min(1, { message: 'Email is required' })
        .optional(),
      contactNo: z
        .string()
        .min(1, { message: 'Contact number is required' })
        .optional(),
      emergencyContactNo: z
        .string()
        .min(1, { message: 'Emergency contact number is required' })
        .optional(),
      presentAddress: z
        .string()
        .min(1, { message: 'Present address is required' })
        .optional(),
      permanentAddress: z
        .string()
        .min(1, { message: 'Permanent address is required' })
        .optional(),
      profileImage: z.string().optional(),
      // managementDepartment: z.string().optional(),
      isDeleted: z.boolean().default(false).optional(),
    }),
  }),
});

export const AdminValidations = {
  createAdminValidationSchema,
  updateCreateAdminValidationSchema,
};
