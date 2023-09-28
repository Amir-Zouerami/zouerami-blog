import nextAuth from 'next-auth';
import { NextAuthOptions } from 'next-auth';

import PostgresAdapter from '@auth/pg-adapter';
import GoogleProvider from 'next-auth/providers/google';

import { Pool } from 'pg';

const pool = new Pool({
  host: 'localhost',
  user: 'amirzm',
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

export const authOptions: NextAuthOptions = {
  // adapter: PostgresAdapter(pool),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  pages: {
    signIn: '/sign-in',
    newUser: '/sign-up',
  },
};

const handler = nextAuth(authOptions);

export { handler as GET, handler as POST };
