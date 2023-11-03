// import { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies';
// import Pocketbase from 'pocketbase';
// import { AuthenticatedUser } from './types';
// import { cookies } from 'next/headers';

// export const PBFromCookie = () => {
//   const pb = new Pocketbase(process.env.NEXT_PUBLIC_DOMAIN);

//   if (typeof document !== 'undefined') {
//     pb.authStore.loadFromCookie(document.cookie);

//     pb.authStore.onChange(() => {
//       document.cookie = pb.authStore.exportToCookie({ httpOnly: false });
//     });
//   }

//   return pb;
// };

// export const getUserFromCookie = (
//   Cookies: ReadonlyRequestCookies
// ): AuthenticatedUser | null => {
//   const authCookie = cookies();
//   authCookie.get('pb_auth')

//   if (!authCookie) return null;

//   const pb = PBFromCookie();

//   pb.authStore.loadFromCookie(`${authCookie.name}=${authCookie.value}`);
//   const user = pb.authStore.model;

//   return user as AuthenticatedUser;
// };
