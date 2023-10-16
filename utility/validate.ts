import { signupUserSchema } from './zod-schema';

export const validateSignupForm = (rawFormData: FormData) => {
  const formData = Object.fromEntries(rawFormData);
  return signupUserSchema.safeParse(formData);
};
