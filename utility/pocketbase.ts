import PocketBase from 'pocketbase';

export const pb = new PocketBase('http://127.0.0.1:8090');

// export const test = async () => {
//   const adminData = await pb.admins.authWithPassword(
//     'zouerami@gmail.com',
//     '0000000000'
//   );
//   console.log(adminData);
// };
