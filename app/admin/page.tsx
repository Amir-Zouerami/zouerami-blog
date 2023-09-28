'use client';

import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';

function Page() {
  const { data: session } = useSession({
    required: true,
    // onUnauthenticated() {
    //   redirect('/sign-in');
    // },
  });
  return (
    <div className="mx-auto mt-20 max-w-[95%] lg:max-w-[1200px]">
      {session ? (
        <>
          <p>TESTING</p>
          <p>{session?.toString() ?? 'no user'}</p>
        </>
      ) : (
        'UNAUTHORIZED'
      )}
    </div>
  );
}

export default Page;
