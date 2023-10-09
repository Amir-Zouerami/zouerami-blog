import { ZodError } from 'zod';

export const isObjEmpty = (obj: typeof ZodError) => {
  for (const i in obj) return false;
  return true;
};
