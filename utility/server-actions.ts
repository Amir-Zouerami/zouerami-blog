'use server';

import { LuciaError } from 'lucia';
import { signupUserSchema } from './zod-schema';
import { auth, Auth } from '@/utility/lucia';
// import { pool } from './Postgresql';

export const someacc = async (formData: FormData) => {
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

  // try {
  //   const res = pool.connect();
  //   console.log('CLIENT DID', res);
  // } catch (error) {
  //   console.log('INSIDE PG CLIENT', error);
  // }

  // return { message: 'DID IT', data: validation.data };

  try {
    const newUser = await auth.createUser({
      key: {
        providerId: 'email',
        providerUserId: validation.data.username.toLocaleLowerCase(),
        password: validation.data.password,
      },
      attributes: {
        username: validation.data.username,
        email: validation.data.email,
      },
    });
    return { message: 'CREATED OK: ', newUser };
  } catch (e) {
    if (e instanceof LuciaError) {
      console.log('LUCIA ERROR: ');
      return { message: 'LUCIA ERROR: ', e };
    } else {
      console.log('NOT LUCIA ERROR: ', e);
      return { message: 'NOT LUCIA ERROR: ', e };
    }
  }
};
