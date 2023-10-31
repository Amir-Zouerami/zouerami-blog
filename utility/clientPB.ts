'use client';

import PocketBase from 'pocketbase';

/**
 * A Shared PB Instance: This is only safe for client components because server components share memory (single thread).
 */
export const clientPB = () => {
  return new PocketBase(process.env.NEXT_PUBLIC_DOMAIN);
};

// export const test = async () => {
//   const adminData = await pb.admins.authWithPassword(
//     'zouerami@gmail.com',
//     '0000000000'
//   );
//   console.log(adminData);
// };
