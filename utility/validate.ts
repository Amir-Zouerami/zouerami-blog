import { signupUserSchema, loginUserSchema } from './zod-schema';

export const validateSignupForm = (rawFormData: FormData) => {
  const formData = Object.fromEntries(rawFormData);
  return signupUserSchema.safeParse(formData);
};

export const validateSigninForm = (rawFormData: FormData) => {
  const formData = Object.fromEntries(rawFormData);
  return loginUserSchema.safeParse(formData);
};
