'use client';
export const fetchCache = 'default-no-store';

import { useRouter, useSearchParams } from 'next/navigation';
import { useLayoutEffect, useRef, useState } from 'react';
import Pocketbase, { getTokenPayload } from 'pocketbase';
import toast, { Toaster } from 'react-hot-toast';
import { deleteCookie } from '@/utility/cookie';

const pb = new Pocketbase(process.env.NEXT_PUBLIC_PB_DOMAIN);

function EmailChange() {
  const [token, setToken] = useState('');
  const searchParams = useSearchParams();
  const router = useRouter();
  const buttonRef = useRef<HTMLButtonElement>(null);

  useLayoutEffect(() => {
    const token = searchParams.get('token');
    if (token) setToken(token);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="mx-auto flex min-h-[400px] max-w-[1000px] flex-col items-center justify-center lg:min-h-[700px]">
        <h1 className="mb-16 text-xl font-bold">
          لطفا برای <span className="text-red-500">تغییر ایمیل</span>، رمز عبور
          خود را وارد کنید
        </h1>
        <div className="mb-20 flex w-full items-center justify-center gap-5 max-lg:flex-col">
          <label htmlFor="password" className="text-lg">
            رمز عبور:
          </label>
          <input
            className="inline-block w-[95%] rounded-xl px-5 py-4 lg:w-[400px]"
            id="password"
            name="password"
            type="password"
            onKeyDown={e => {
              if (e.key === 'Enter') {
                e.preventDefault();

                if (buttonRef.current) {
                  buttonRef.current.click();
                }
              }
            }}
          />
        </div>
        <button
          className="reactiveButton rounded-2xl bg-[#3289b3] px-10 py-5 font-bold text-white"
          ref={buttonRef}
          onClick={async () => {
            const pass = document.getElementById(
              'password'
            ) as HTMLInputElement;

            const confirmEmail = async () => {
              return pb
                .collection('users')
                .confirmEmailChange(token, pass.value);
            };

            toast
              .promise(
                confirmEmail(),
                {
                  loading: 'لطفا منتظر بمانید',
                  success: 'ایمیل شما با موفقیت تغییر کرد!',
                  error:
                    'خطایی در درخواست شما رخ داده است. \n\n از صحت رمز عبور خود اطمینان حاصل کنید.',
                },
                { id: 'EMAIL_CHANGED_SUCCESSFULLY' }
              )
              .then(async data => {
                if (data) {
                  const newEmail = getTokenPayload(token).newEmail;

                  pb.authStore.clear();
                  deleteCookie('pb_auth');

                  pb.collection('users')
                    .authWithPassword(newEmail, pass.value)
                    .then(() => {
                      toast.success('ایمیل شما با موفقیت تغییر کرد!', {
                        id: 'EMAIL_CHANGED_SUCCESSFULLY',
                      });
                      setTimeout(() => {
                        return router.push('/user/profile');
                      }, 1000);
                    })
                    .catch(() => router.push('/sign-in'));
                }
              })
              .catch(_err => {
                pb.authStore.clear();
                return router.push('/sign-in');
              });
          }}
        >
          تایید عملیات
        </button>
      </div>
      <Toaster />
    </>
  );
}

export default EmailChange;
