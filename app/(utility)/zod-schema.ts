import { z } from 'zod';

// -------------- SIGN IN --------------

const userIdentifierSchema = z.union([
  z.string().email().min(4),
  z
    .string()
    .min(11)
    .max(11)
    .regex(/^09\d{9}$/),
  z
    .string()
    .min(3)
    .max(13)
    .regex(/^[a-z0-9_-]+$/),
]);

export const loginUserSchema = z.object({
  identifier: userIdentifierSchema,
  password: z.string().min(8).max(48),
});

// -------------- SIGN UP --------------

export const signupUserSchema = z.object({
  name: z.string().min(3).max(30),
  email: z.string().email().min(4),
  password: z.string().min(8).max(48),
});
