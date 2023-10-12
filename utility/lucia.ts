import { pg } from '@lucia-auth/adapter-postgresql';
import { lucia } from 'lucia';
import { nextjs_future } from 'lucia/middleware';
import { pool } from './Postgresql';

export const auth = lucia({
  env: process.env.NODE_ENV === 'development' ? 'DEV' : 'PROD',
  middleware: nextjs_future(),

  sessionCookie: {
    expires: false,
  },

  getUserAttributes: data => {
    return {
      email: data.email,
      username: data.username,
      phone_number: data.phone_number,
      email_verified: data.email_verified,
    };
  },

  getSessionAttributes: data => {
    return {
      username: data.username,
    };
  },

  adapter: pg(pool, {
    user: 'users',
    key: 'lucia_user_keys',
    session: 'lucia_user_sessions',
  }),
});

export type Auth = typeof auth;
