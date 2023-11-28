'use client';

import { useRouter } from 'next/navigation';
import { useLayoutEffect, useRef, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import Pocketbase from 'pocketbase';
import { deleteCookie } from '@/utility/cookie';

const pb = new Pocketbase(process.env.NEXT_PUBLIC_PB_DOMAIN);

function PasswordReset({ token }: { token: string }) {
  const [email, setEmail] = useState('');
  const router = useRouter();
  const buttonRef = useRef<HTMLButtonElement>(null);

  useLayoutEffect(() => {
    if (!pb.authStore.isValid || !pb.authStore.model)
      return router.replace('/sign-in');

    setEmail(pb.authStore.model.email);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="mx-auto flex min-h-[400px] max-w-[1000px] flex-col items-center justify-center lg:min-h-[700px]">
        <h1 className="mb-10 px-4 text-xl font-semibold leading-9 max-lg:mt-20">
          برای تغییر رمز کاربری خود، رمز جدید را در هر دو فیلد زیر وارد کنید.
        </h1>

        <div className="mb-10 flex w-full items-center justify-center gap-5 max-lg:flex-col">
          <label htmlFor="password" className="text-lg">
            رمز عبور جدید:
          </label>
          <input
            className="inline-block w-[95%] rounded-xl px-5 py-4 lg:w-[400px]"
            id="password"
            name="password"
            type="password"
          />
        </div>

        <div className="mb-20 flex w-full items-center justify-center gap-5 max-lg:flex-col">
          <label htmlFor="password_confirm" className="text-lg">
            تایید رمز عبور:
          </label>
          <input
            className="inline-block w-[95%] rounded-xl px-5 py-4 lg:w-[400px]"
            id="password_confirm"
            name="password_confirm"
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
            const password = document.getElementById(
              'password'
            ) as HTMLInputElement;
            const passwordConfirm = document.getElementById(
              'password_confirm'
            ) as HTMLInputElement;

            if (password.value !== passwordConfirm.value) {
              return toast.error(
                'خطا: رمز های وارد شده با هم همخوانی ندارند. از یکسان بودن آن ها مطمئن شوید.',
                { id: 'ERROR_PASSWORDS_DO_NOT_MATCH', duration: 5000 }
              );
            }

            if (password.value.length < 8 || password.value.length > 50) {
              return toast.error(
                'خطا: رمز شما باید حداقل ۸ کاراکتر و حداکثر ۵۰ کاراکتر باشد.',
                { id: 'ERROR_PASSWORD_LENGTH_CONSTRAINT', duration: 5000 }
              );
            }

            const confirmNewPassword = async () => {
              return pb
                .collection('users')
                .confirmPasswordReset(
                  token,
                  password.value,
                  passwordConfirm.value
                );
            };

            toast
              .promise(
                confirmNewPassword(),
                {
                  loading: 'لطفا منتظر بمانید',
                  success: 'رمز عبور جدید شما با موفقیت ثبت شد!',
                  error: 'درخواست شما با خطا روبرو شده است.',
                },
                { id: 'PASSWORD_CHANGE_PROMISE' }
              )
              .then(data => {
                if (data) {
                  pb.authStore.clear();
                  deleteCookie('pb_auth');

                  pb.collection('users')
                    .authWithPassword(email, password.value)
                    .then(data => {
                      toast.success('رمز عبور جدید شما با موفقیت ثبت شد!', {
                        id: 'PASSWORD_CHANGE_PROMISE',
                      });
                      setTimeout(() => {
                        return router.push('/user/profile');
                      }, 1000);
                    })
                    .catch(err => {
                      //   console.log(err);
                      return toast.error('درخواست شما با خطا مواجه شد!', {
                        id: 'GENERAL_ERROR',
                      });
                    });
                }
              })
              .catch(_err => {
                // pb.authStore.clear();
                // return router.push('/sign-in');
                return toast.error('درخواست شما با خطا مواجه شد!', {
                  id: 'GENERAL_ERROR',
                });
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

export default PasswordReset;
