'use client';

import Error500 from '@/icons/Error500';
import Link from 'next/link';
import { useEffect } from 'react';

export default function Error({
  error,
}: {
  error: Error & { digest?: string };
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="mx-auto mt-24 flex max-w-[800px] flex-col items-center justify-center">
      <h2 className="mb-10 text-4xl font-black">
        <span className="text-red-400">خطایی</span> رخ داده است ... !
      </h2>

      <div className="w-full text-center">
        <Error500 margin="lg:-mb-8" />
        <p className="text-xs text-gray-400">
          Illustration & Animation By{' '}
          <Link
            className="-mt-10 underline hover:cursor-pointer hover:text-cyan-500"
            href={'https://codepen.io/henrywr'}
          >
            Henry W
          </Link>
        </p>
      </div>

      <p className="mb-10 mt-5 max-w-[500px] px-4 text-justify text-lg font-bold leading-9">
        لینک تغییر ایمیل حساب کاربری شما{' '}
        <span className="text-orange-500"> صحیح نیست </span>و یا
        <span className="text-orange-500"> منقضی شده </span>
        است.
      </p>
    </div>
  );
}
