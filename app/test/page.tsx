// 'use client'

import { auth } from '@/app/(utility)/lucia';
import * as context from 'next/headers';
import { redirect } from 'next/navigation';

async function Page() {
  const authReq = auth.handleRequest('GET', context);
  const session = await authReq.validate();

  if (!session) {
    redirect('/sign-in');
  }

  return (
    <div className="mx-auto my-20 max-w-[1000px]">
      <p>TEST ROUTE</p>

      <form action="" method="post">
        <label htmlFor="username">Username</label>
        <input name="username" id="username" />
        <br />
        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password" />
        <br />
        <input type="submit" />
      </form>
    </div>
  );
}

export default Page;
