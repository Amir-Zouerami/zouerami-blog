'use client';

import Pocketbase from 'pocketbase';

function DisplayUser(authStore: any) {
  // const pb = new Pocketbase(process.env.NEXT_PUBLIC_PB_DOMAIN);
  // const model = pb.authStore.model;

  const auth = authStore;
  auth ? console.log('AUTH', auth.model.username) : console.log('NOOOOOOOOOOOO');

  return <div>{auth ? auth.model.username : 'NO'}</div>;
}

export default DisplayUser;
