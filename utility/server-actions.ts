'use server';

import { signupUserSchema } from './zod-schema';

export const someacc = (formData: FormData) => {
  console.log('SERVER ACTION DATA: ', formData);

  return { message: 'server action response' };
};
