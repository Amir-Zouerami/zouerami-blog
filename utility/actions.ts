'use server';

import {
  signupUserSchema,
  loginUserSchema,
  usernameType,
  emailType,
} from './zod-schema';
import Pocketbase from 'pocketbase';
import {
  AuthenticatedUser,
  EditedUserProfile,
  PBSignupError,
  formdataFieldIsFile,
} from './types';
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

    await pb.collection('users').create<AuthenticatedUser>(
      {
        email: validation.data.email.toLocaleLowerCase(),
        username: validation.data.username,
        password: validation.data.password,
        passwordConfirm: validation.data.password,
        verified: false,
      },
      { cache: 'no-store' }
    );

    await pb
      .collection('users')
      .authWithPassword(validation.data.email, validation.data.password);

    const authCookie = pb.authStore.exportToCookie({
      sameSite: 'Strict',
      httpOnly: false,
    });

    cookies().set('pb_auth', authCookie, { sameSite: 'strict', secure: true });

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

// ------------------- SIGNING IN USER ACCOUNT ---------------------

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
      .authWithPassword(validation.data.identifier, validation.data.password, {
        cache: 'no-store',
      });

    const authCookie = pb.authStore.exportToCookie({
      sameSite: 'Strict',
      httpOnly: false,
    });
    cookies().set('just_authed', 'true', {
      sameSite: 'strict',
      secure: true,
      maxAge: 5,
    });
    cookies().set('pb_auth', authCookie, { sameSite: 'strict', secure: true });

    return { code: 200, authCookie: authCookie };
  } catch (error) {
    return { code: 'ERROR' };
  }
};

// ------------------- EDIT USER PROFILE ---------------------

export const editProfileInfo = async (
  formData: FormData,
  authCookie: string
) => {
  const email = formData.get('email');
  const avatar = formData.get('user_avatar');
  let serverResponse;

  const pb = new Pocketbase(process.env.NEXT_PUBLIC_PB_DOMAIN);
  pb.authStore.loadFromCookie(authCookie);

  const validatedUsername = usernameType.safeParse(formData.get('username'));
  if (
    !pb.authStore.isValid ||
    !pb.authStore.model ||
    !validatedUsername.success
  ) {
    return { ok: false, level: 'NONE' };
  }

  const updatedUser: EditedUserProfile = {
    username: validatedUsername.data,
  };

  if (formdataFieldIsFile(avatar) && avatar.size !== 0) {
    const allowedTypes = ['image/png', 'image/jpg', 'image/jpeg', 'image/webp'];

    if (!allowedTypes.includes(avatar.type))
      return { ok: false, level: 'AVATAR' };

      console.log(avatar);
      

    updatedUser.avatar = avatar ?? null;
  }

  try {
    await pb.collection('users').update(pb.authStore.model.id, updatedUser);
    serverResponse = { ok: true, level: 'FIRST' };
  } catch (error) {
    serverResponse = { ok: false, level: 'FIRST' };
  }

  if (pb.authStore.model.email === email) return serverResponse;

  const validatedEmail = emailType.safeParse(email);

  if (!validatedEmail.success) return { ok: false, level: 'EMAIL_VALIDATION' };

  try {
    await pb.collection('users').requestEmailChange(validatedEmail.data);
    serverResponse = { ok: true, level: 'SECOND' };
  } catch (error) {
    serverResponse = { ok: false, level: 'SECOND' };
  }

  return serverResponse;
};
