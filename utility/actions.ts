'use server';

import { signupUserSchema } from './zod-schema';
import { pb } from './pocketbase';
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
    const AuthenticatedUser = await pb
      .collection('users')
      .create<AuthenticatedUser>({
        email: validation.data.email.toLocaleLowerCase(),
        username: validation.data.username,
        password: validation.data.password,
        passwordConfirm: validation.data.password,
        verified: false,
      });

    console.log(AuthenticatedUser);
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

  // try {
  //   const newUser = await auth.createUser({
  //     key: {
  //       providerId: 'email',
  //       providerUserId: validation.data.username.toLocaleLowerCase(),
  //       password: validation.data.password,
  //     },
  //     attributes: {
  //       username: validation.data.username,
  //       email: validation.data.email,
  //     },
  //   });

  //   const session = await auth.createSession({
  //     userId: newUser.userId,
  //     attributes: { username: newUser.username },
  //   });

  //   const authReq = auth.handleRequest();

  //   console.log(newUser);
  //   return { ok: true, message: 'REGISTERED', user: newUser };
  // } catch (error: any) {
  //   if (error instanceof LuciaError) {
  //     return { ok: false, message: 'UNKNOWN_LUCIA_ERROR' };
  //   } else {
  //     if (isPGConstraintError(error)) {
  //       if (error.constraint === 'users_email_key') {
  //         return { ok: false, message: 'EMAIL_CONSTRAINT' };
  //       }

  //       if (error.constraint === 'users_username_key') {
  //         return { ok: false, message: 'USERNAME_CONSTRAINT' };
  //       }
  //     } else {
  //       return { ok: false, message: 'UNKNOWN_PG_ERROR' };
  //     }
  //   }
  // }
};
