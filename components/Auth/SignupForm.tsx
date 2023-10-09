'use client';

import Image from 'next/image';
import { useState } from 'react';
import { signupUserSchema } from '@/utility/zod-schema';
import { isObjEmpty } from '@/utility/utils';
import { ZodError } from 'zod';

import user from '@/icons/user-auth.svg';
import email from '@/icons/messages.svg';
import password from '@/icons/password.svg';
import loading from '@/icons/loading.svg';
import eye from '@/icons/eye.svg';

function SignupForm() {
  const [isLoading, setisLoading] = useState(false);
  const [formError, setFormError] = useState<ZodError>();
  const [passwordVisibility, SetpasswordVisibility] = useState(false);

  return (
    <>
      <div className="relative px-3">
        <p className="pr-3 text-right">ثبت نام با ایمیل:</p>
        <form
          className={`mx-auto my-5 flex flex-col ${
            formError ? 'gap-5' : 'gap-10'
          } lg:w-[90%]`}
          id="signup-form"
          onSubmit={async (e) => {
            e.preventDefault();
            // setisLoading(true);

            const formData = new FormData(e.target as HTMLFormElement);

            const formfields: Record<string, FormDataEntryValue> = {};
            formData.forEach((value, name) => {
              formfields[name] = value;
            });

            const res = signupUserSchema.safeParse(formfields);
            if (res.success) {
              console.log('success');
            } else {
              console.log(res.error.flatten())
              // setFormError(res.error);
            }

            // console.log(formfields)

            // const res = await fetch('/api/testapi', {
            //   method: 'POST',
            //   body: formData,
            // });

            // setisLoading(false);
            // console.log('server response client side: ', await res.json());
          }}
        >
          {isLoading ? (
            <div className="absolute right-0 top-9 z-10 flex h-full w-full items-center justify-center rounded-lg backdrop-blur-sm">
              <Image
                src={loading}
                width={70}
                alt="loading form response"
                className=""
              />
            </div>
          ) : null}

          <div className="relative w-full">
            <Image
              src={user}
              width={25}
              alt="enter your name"
              className="absolute right-5 top-1/2 inline -translate-y-[50%] translate-x-0 dark:invert"
            />
            <input
              id="name"
              type="text"
              placeholder="نام و نام خانوادگی شما"
              name="name"
              required
              className="w-full rounded-xl border-2 border-[#ee8b68] p-5 pr-14 outline-none dark:bg-[#31333c]"
            />
          </div>
          {/* {formError?.formErrors.name ? (
            <p className="font-bold text-red-300">{formError.errors.}</p>
          ) : null} */}
          <div className="relative w-full">
            <Image
              src={email}
              width={25}
              alt="enter your name"
              className="absolute right-5 top-1/2 inline -translate-y-[50%] translate-x-0 invert dark:invert-0"
            />
            <input
              id="email"
              // type="email"
              placeholder="ایمیل شما"
              name="email"
              required
              className="w-full rounded-xl border-2 border-[#ee8b68] p-5 pr-14 outline-none dark:bg-[#31333c]"
            />
          </div>
          {formError ? (
            <p className="font-bold text-red-300">error bro</p>
          ) : null}

          <div className="relative w-full">
            <Image
              src={password}
              width={25}
              alt="enter your name"
              className="absolute right-5 top-1/2 inline -translate-y-[50%] translate-x-0 dark:invert"
            />

            <input
              id="password"
              type={passwordVisibility ? 'text' : 'password'}
              placeholder="رمز عبور دلخواه"
              autoComplete="new-password"
              name="password"
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
          </div>
          {formError ? (
            <p className="font-bold text-red-300">error bro</p>
          ) : null}
        </form>

        <div className="mx-auto my-10 max-w-[90%] lg:max-w-[70%]">
          <button
            type="submit"
            disabled={isLoading}
            form="signup-form"
            className="w-full rounded-xl bg-gradient-to-r from-[#D93965] to-[#EE8C68] p-4 text-xl font-black text-white hover:opacity-[.7] disabled:cursor-not-allowed"
          >
            ساخت حساب کاربری
          </button>
        </div>
      </div>
    </>
  );
}

export default SignupForm;
