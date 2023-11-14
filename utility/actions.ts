'use server';

import { signupUserSchema, loginUserSchema } from './zod-schema';
import Pocketbase from 'pocketbase';
import { AuthenticatedUser, PBSignupError } from './types';
import { cookies } from 'next/headers';

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
    const pb = new Pocketbase(process.env.NEXT_PUBLIC_PB_DOMAIN);

    await pb.collection('users').create<AuthenticatedUser>({
      email: validation.data.email.toLocaleLowerCase(),
      username: validation.data.username,
      password: validation.data.password,
      passwordConfirm: validation.data.password,
      verified: false,
    });

    await pb
      .collection('users')
      .authWithPassword(validation.data.email, validation.data.password);

    const authCookie = pb.authStore.exportToCookie({
      sameSite: 'Strict',
      httpOnly: false,
    });

    cookies().set('pb_auth', authCookie, { sameSite: 'lax', secure: true });

    if (pb.authStore.model) {
      const userVerified = pb.authStore.model.verified;

      if (!userVerified) {
        pb.collection('users').requestVerification(pb.authStore.model.email);
      }
    }

    return { code: 200, authCookie: authCookie };
  } catch (error) {
    if (
      typeof error === 'object' &&
      error !== null &&
      'status' in error &&
      'response' in error
    ) {
      // if (error.status === 403) return { code: '403' };

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

export const loginUser = async (formData: FormData) => {
  const validation = loginUserSchema.safeParse({
    identifier: formData.get('identifier'),
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
    const pb = new Pocketbase(process.env.NEXT_PUBLIC_PB_DOMAIN);

    await pb
      .collection('users')
      .authWithPassword(validation.data.identifier, validation.data.password);

    const authCookie = pb.authStore.exportToCookie({
      sameSite: 'Lax',
      httpOnly: false,
    });
    cookies().set('just_authed', 'true', { maxAge: 5 });
    cookies().set('pb_auth', authCookie, { sameSite: 'lax', secure: true });

    return { code: 200, authCookie: authCookie };
  } catch (error) {
    return { code: 'ERROR' };
  }
};
