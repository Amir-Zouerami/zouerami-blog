'use client';

import { useRouter } from 'next/navigation';
import { useLayoutEffect, useState } from 'react';
import Pocketbase from 'pocketbase';
import loadingSVG from '@/icons/loading.svg';
import Image from 'next/image';
import toast, { Toaster } from 'react-hot-toast';

function EmailConfirmation({ token }: { token: string }) {
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pb = new Pocketbase(process.env.NEXT_PUBLIC_PB_DOMAIN);

  useLayoutEffect(() => {
    setLoading(false);
  }, []);

  return (
    <div className="mx-auto flex min-h-[400px] max-w-[1000px] flex-col items-center justify-center lg:min-h-[700px]">
      {loading ? (
        <div className="flex items-center justify-center">
          <Image
            src={loadingSVG}
            width={50}
            className="inline-block"
            alt="در حال تایید ایمیل"
          />
          <span className="mr-5 text-lg font-bold">لطفا صبر کنید ...</span>
        </div>
      ) : (
        <div className="text-center">
          <p className="mb-5 px-4 text-justify text-lg font-semibold leading-9">
            اگر از فرآیند تایید ایمیل مطمئن هستید، روی دکمه‌ی زیر کلیک کنید:
          </p>
          <button
            className="reactiveButton rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-5 font-semibold text-white"
            onClick={async () => {
              const confirmEmail = () =>
                pb.collection('users').confirmVerification(token);

              toast
                .promise(
                  confirmEmail(),
                  {
                    loading: 'لطفا صبر کنید ...',
                    success: 'ایمیل شما با موفقیت تایید شد!',
                    error: 'درخواست شما با خطا مواجه شد!',
                  },
                  {
                    id: 'EMAIL_CONFIRMATION_PROMISE',
                  }
                )
                .then(async () => {
                  await pb.collection('users').authRefresh();
                })
                .then(() => {
                  setTimeout(() => {
                    return router.replace('/user/profile');
                  }, 500);
                })
                .catch(err => {});
            }}
          >
            تایید ایمیل
          </button>
        </div>
      )}
      <Toaster />
    </div>
  );
}

export default EmailConfirmation;
