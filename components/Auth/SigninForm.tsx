'use client';

import email from '@/icons/messages.svg';
import password from '@/icons/password.svg';
import { loginUser } from '@/utility/actions';
import { SigninErrors } from '@/utility/types';
import { validateSigninForm } from '@/utility/validate';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { toastOptions } from '@/utility/toast';
import PocketBase from 'pocketbase';
import loading from '@/icons/loading.svg';
// import { cookies } from 'next/headers';
import { getCookie } from '@/utility/cookie';

function SigninForm() {
  const [isLoading, setisLoading] = useState(false);
  const [formError, setFormError] = useState<SigninErrors>({});
  const router = useRouter();
  const searchParams = useSearchParams();

  return (
    <div>
      <form
        action={async (rawFormData: FormData) => {
          setisLoading(true);
          const validatedForm = validateSigninForm(rawFormData);

          if (!validatedForm.success) {
            setFormError(validatedForm.error.flatten().fieldErrors);
            return setisLoading(false);
          }

          const res = await loginUser(rawFormData);

          if (res.code === 200) {
            const pb = new PocketBase(process.env.NEXT_PUBLIC_PB_DOMAIN);
            const authCookie = getCookie('pb_auth');

            if (authCookie) {
              pb.authStore.loadFromCookie(authCookie);
            }

            setisLoading(false);
            toast.success('ورود موفقیت آمیز بود. چند لحظه صبر کنید...', {
              ...toastOptions,
            });
          } else {
            setisLoading(false);
            return toast.error(
              'نام کاربری (یا ایمیل) با رمز عبور همخوانی ندارد.',
              {
                ...toastOptions,
              }
            );
          }

          setTimeout(() => {
            return router.push(searchParams.get('next') ?? '/');
          }, 1000);
        }}
        className={`mx-auto my-5 flex flex-col ${
          formError ? 'gap-5' : 'gap-10'
        } lg:w-[90%]`}
        id="sigIn-form"
      >
        <Toaster />

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
            src={email}
            width={25}
            alt="enter your name"
            className="absolute right-5 top-1/2 inline -translate-y-[50%] translate-x-0 invert dark:invert-0"
          />
          <input
            type="text"
            placeholder="ایمیل یا نام کاربری"
            name="identifier"
            required
            className="w-full rounded-xl border-2 border-[#ee8b68] p-5 pr-14 outline-none dark:bg-[#31333c]"
          />
        </div>
        {formError?.identifier && (
          <p className="text-xs font-bold text-red-300">
            {formError.identifier[0]}
          </p>
        )}

        <div className="relative w-full">
          <Image
            src={password}
            width={25}
            alt="enter your name"
            className="dark absolute right-5 top-1/2 inline -translate-y-[50%] translate-x-0 invert-0 dark:invert"
          />
          <input
            type="password"
            placeholder="رمز عبور خود را وارد کنید"
            name="password"
            required
            className="w-full rounded-xl border-2 border-[#ee8b68] p-5 pr-14 outline-none dark:bg-[#31333c]"
          />
        </div>
        {formError?.password && (
          <p className="text-xs font-bold text-red-300">
            {formError.password[0]}
          </p>
        )}
      </form>

      <div className="mx-auto my-10 max-w-[90%] lg:max-w-[70%]">
        <button
          id="signinSubmitButton"
          type="submit"
          disabled={isLoading}
          form="sigIn-form"
          className="w-full rounded-xl bg-gradient-to-r from-[#D93965] to-[#EE8C68] p-4 text-xl font-black text-white reactiveButton disabled:cursor-not-allowed"
        >
          ورود به حساب کاربری
        </button>
      </div>
    </div>
  );
}

export default SigninForm;
