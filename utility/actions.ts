'use server';

import { signupUserSchema } from './zod-schema';
import Pocketbase from 'pocketbase';
import { AuthenticatedUser, PBSignupError } from './types';

export const registerUser = async (formData: FormData) => {
  // TODO: Throttle Requests Sent By User

  const validation = signupUserSchema.safeParse({
    username: formData.get('username'),
    email: formData.get('email'),
    password: formData.get('password'),
  });

  if (!validation.success) {
    return {
      ok: false,
      message: 'داده ی ارسال شده معتبر نیست.',
      error: validation.error.flatten(),
    };
  }

  try {
    const pb = new Pocketbase(process.env.NEXT_PUBLIC_DOMAIN);

    await pb.collection('users').create<AuthenticatedUser>({
      email: validation.data.email.toLocaleLowerCase(),
      username: validation.data.username,
      password: validation.data.password,
      passwordConfirm: validation.data.password,
      verified: false,
    });

    return { code: 200 };
  } catch (error) {
    if (
      typeof error === 'object' &&
      error !== null &&
      'status' in error &&
      'response' in error
    ) {
      if (error.status === 403) return { code: '403' };

      if (
        (error as PBSignupError)?.response?.data?.email?.code ===
        'validation_invalid_email'
      )
        return { code: 'INVALID_EMAIL' };

      if (
        (error as PBSignupError)?.response?.data?.username?.code ===
        'validation_invalid_username'
      )
        return { code: 'INVALID_USERNAME' };
    }

    return { code: 'UNKNOWN', error };
  }
};
