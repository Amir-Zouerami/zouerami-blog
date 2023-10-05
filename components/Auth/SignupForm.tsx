'use client';

import Image from 'next/image';
import PasswordInput from './PasswordInput';

import user from '@/icons/user-auth.svg';
import email from '@/icons/messages.svg';
import password from '@/icons/password.svg';

function SignupForm() {
  return (
    <form
      className="mx-auto my-5 flex flex-col gap-10 lg:w-[90%]"
      action=""
      onSubmit={async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target as HTMLFormElement);

        const res = fetch('/api/testapi', {
          method: 'POST',
          body: formData,
        });

        console.log('server response client side: ', res);
      }}
    >
      <div className="relative w-full">
        <Image
          src={user}
          width={25}
          alt="enter your name"
          className="absolute right-5 top-1/2 inline -translate-y-[50%] translate-x-0 dark:invert"
        />
        <input
          type="text"
          placeholder="نام و نام خانوادگی شما"
          name="name"
          required
          className="w-full rounded-xl border-2 border-[#ee8b68] p-5 pr-14 outline-none dark:bg-[#31333c]"
        />
      </div>

      <div className="relative w-full">
        <Image
          src={email}
          width={25}
          alt="enter your name"
          className="absolute right-5 top-1/2 inline -translate-y-[50%] translate-x-0 invert dark:invert-0"
        />
        <input
          type="email"
          placeholder="ایمیل شما"
          name="email"
          required
          className="w-full rounded-xl border-2 border-[#ee8b68] p-5 pr-14 outline-none dark:bg-[#31333c]"
        />
      </div>

      <div className="relative w-full">
        <Image
          src={password}
          width={25}
          alt="enter your name"
          className="absolute right-5 top-1/2 inline -translate-y-[50%] translate-x-0 dark:invert"
        />

        <PasswordInput />
      </div>
    </form>
  );
}

export default SignupForm;
