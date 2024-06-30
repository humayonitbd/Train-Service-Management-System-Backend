import { z } from 'zod';

export const loginValidationSchema = z.object({
  body: z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters long'),
  }),
});

const changePasswordValidationSchema = z.object({
  body: z.object({
    oldPassword: z.string({ required_error: 'Old Password is required!' }),
    newPassword: z.string({ required_error: 'Password is required!' }),
  }),
});

const refreshTokenValidationSchema = z.object({
  cookies: z.object({
    refreshToken: z.string({
      required_error: 'Refresh token is require!!',
    }),
  }),
});

const forgetPasswordValidationSchema = z.object({
  body: z.object({
    id: z.string({ required_error: 'User id is required!!' }),
  }),
});

const resetPasswordValidationSchema = z.object({
  body: z.object({
    id: z.string({ required_error: 'User id is required!!' }),
    newPassword: z.string({
      required_error: 'User New Password is required!!',
    }),
  }),
});

export const AuthValidationSchema = {
  loginValidationSchema,
  changePasswordValidationSchema,
  refreshTokenValidationSchema,
  forgetPasswordValidationSchema,
  resetPasswordValidationSchema,
};
