// 'use client';

import { cookies } from 'next/headers';
import Pocketbase from 'pocketbase';
import DisplayUser from './DisplayUser';
// import { getUserFromCookie } from '@/utility/pocketbase';
// import { redirect } from 'next/navigation';

function Page() {
  // const userdetail = getUserFromCookie(cookies());

  const pb = new Pocketbase(process.env.NEXT_PUBLIC_DOMAIN);
  const cookie = cookies().get('pb_auth')
  pb.authStore.loadFromCookie(cookie?.value || "")

  // console.log("LOGIN?", pb.authStore.isValid);
  
  // const model = pb.authStore.model;
  
  // console.log("MODEL?", pb.authStore.model);
  return (
    <div className="mx-auto mt-20 max-w-[95%] lg:max-w-[1200px]">
      <p>An ADMIN Route PROTECTED :</p>

      <DisplayUser model={pb.authStore.model}></DisplayUser>
    </div>
  );
}

export default Page;
