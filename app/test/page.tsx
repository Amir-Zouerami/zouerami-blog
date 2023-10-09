'use client';

import { auth } from '@/utility/lucia';
import * as context from 'next/headers';
import { redirect } from 'next/navigation';
import { useState } from 'react';

function Page() {
  // const [formdata, setFormdata] = useState({ username: '', password: '' });
  // const authReq = auth.handleRequest('GET', context);
  // const session = await authReq.validate();

  // if (!session) {
  //   redirect('/sign-in');
  // }

  return (
    <div className="mx-auto my-20 max-w-[1000px]">
      <p>TEST ROUTE</p>

      <form
        action="/api/testapi"
        // onSubmit={async (e) => {
        //   e.preventDefault();

        //   const formdata = new FormData();
        //   formdata.append('username', 'someuservalue');
        //   formdata.append('password', 'someuserpassword');

        //   console.log(formdata)

        //   const res = await fetch('/api/testapi', {
        //     method: 'POST',
        //     body: formdata,
        //     // headers: {
        //     //   'Content-Type': 'application/json',
        //     // },
        //   });

        //   console.log(await res.json());
        // }}
        method="post"
      >
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
