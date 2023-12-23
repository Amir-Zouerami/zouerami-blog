'use client';

import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { SignupErrors } from '@/utility/types';
import { registerUser } from '@/utility/actions';
import { toastOptions } from '@/utility/toast';
import { validateSignupForm } from '@/utility/validate';
import PocketBase from 'pocketbase';

import user from '@/icons/user-auth.svg';
import email from '@/icons/messages.svg';
import password from '@/icons/password.svg';
import loading from '@/icons/loading.svg';
import eye from '@/icons/eye.svg';

function SignupForm() {
  const [isLoading, setisLoading] = useState(false);
  const [formError, setFormError] = useState<SignupErrors>({});
  const [passwordVisibility, SetpasswordVisibility] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  return (
    <>
      <div className="relative px-3">
        <p className="pr-3 text-right">ثبت نام با ایمیل:</p>
        <form
          action={async (rawFormData: FormData) => {
            setisLoading(true);
            const validatedForm = validateSignupForm(rawFormData);

            if (!validatedForm.success) {
              setFormError(validatedForm.error.flatten().fieldErrors);
              return setisLoading(false);
            }

            const res = await registerUser(rawFormData);

            if (res?.code === 'INVALID_EMAIL') {
              setisLoading(false);

              return toast.error('ایمیل نامعتبر بوده یا قبلا ثبت شده است.', {
                id: 'EMAIL_CONSTRAINT_TOAST',
                ...toastOptions,
              });
            }

            if (res?.code === 'INVALID_USERNAME') {
              setisLoading(false);

              return toast.error(
                'نام کاربری نامعتبر بوده یا قبلا ثبت شده است.',
                {
                  id: 'USERNAME_CONSTRAINT_TOAST',
                  ...toastOptions,
                }
              );
            }

            if (res?.code === 200) {
              try {
                const pb = new PocketBase(process.env.NEXT_PUBLIC_PB_DOMAIN);
                const authCookie = res.authCookie;

                if (authCookie) {
                  pb.authStore.loadFromCookie(authCookie);
                }

                if (pb.authStore.model && !pb.authStore.model.verified) {
                  toast.success(
                    'ثبت نام موفقیت آمیز بود. لطفا ایمیل خود را تایید کنید!',
                    {
                      ...toastOptions,
                    }
                  );
                } else {
                  toast.success(
                    'ثبت نام موفقیت آمیز بود. چند لحظه صبر کنید...',
                    {
                      ...toastOptions,
                    }
                  );
                }

                setisLoading(false);
              } catch (error) {
                setisLoading(false);

                return toast.error(
                  'مشکلی در ثبت نام پیش آمده است! بعدا مجددا تلاش کنید.',
                  {
                    ...toastOptions,
                  }
                );
              }

              return setTimeout(() => {
                return router.push(searchParams.get('next') ?? '/');
              }, 1000);
            }

            setisLoading(false);

            return toast.error(
              'مشکلی در ثبت نام پیش آمده است! بعدا مجددا تلاش کنید.',
              {
                ...toastOptions,
              }
            );
          }}
          className={`mx-auto my-5 flex flex-col ${
            formError ? 'gap-5' : 'gap-10'
          } lg:w-[90%]`}
          id="signup-form"
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
              src={user}
              width={25}
              alt="enter your name"
              className="absolute right-5 top-1/2 inline -translate-y-[50%] translate-x-0 dark:invert"
            />
            <input
              id="name"
              type="text"
              placeholder="نام کاربری دلخواه"
              name="username"
              required
              className="w-full rounded-xl border-2 border-[#ee8b68] p-5 pr-14 outline-none dark:bg-[#31333c]"
            />
          </div>
          {formError?.username && (
            <p className="text-xs font-bold text-red-300">
              {formError.username[0]}
            </p>
          )}
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
          {formError?.email && (
            <p className="text-xs font-bold text-red-300">
              {formError.email[0]}
            </p>
          )}

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
          {formError?.password && (
            <p className="text-xs font-bold text-red-300">
              {formError.password[0]}
            </p>
          )}
        </form>

        <div className="mx-auto my-10 max-w-[90%] lg:max-w-[70%]">
          <button
            id="signUpSubmitButton"
            type="submit"
            disabled={isLoading}
            form="signup-form"
            className="reactiveButton w-full rounded-xl bg-gradient-to-r from-[#D93965] to-[#EE8C68] p-4 text-xl font-black text-white disabled:cursor-not-allowed"
          >
            ساخت حساب کاربری
          </button>
        </div>
      </div>
    </>
  );
}

export default SignupForm;
