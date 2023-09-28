'use client';

import { useState } from 'react';
import eye from '@/icons/eye.svg';
import Image from 'next/image';

function PasswordInput() {
  const [passwordVisibility, SetpasswordVisibility] = useState(false);

  return (
    <>
      <input
        type={passwordVisibility ? 'text' : 'password'}
        placeholder="رمز عبور دلخواه"
        autoComplete="new-password"
        required
        className="w-full rounded-xl border-2 border-[#ee8b68] p-5 pr-14 outline-none dark:bg-[#31333c]"
      />

      <Image
        src={eye}
        width={20}
        alt="enter your name"
        onClick={() => {
          SetpasswordVisibility(!passwordVisibility);
        }}
        className="absolute left-5 top-1/2 inline -translate-y-[50%] translate-x-0 cursor-pointer dark:invert"
      />
    </>
  );
}

export default PasswordInput;
