'use client';

import Error500 from '@/icons/Error500';
import Link from 'next/link';
import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // TODO: Log the error to an error reporting service
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

      <p className="mb-10 mt-5 max-w-[500px] px-4 text-justify text-lg leading-9">
        با عرض پوزش خطایی در پردازش درخواست شما اتفاق افتاده است. لطفا دوباره
        تلاش کنید و در صورت عدم موفقیت تا رفع مشکل منتظر بمانید.
      </p>

      <button
        onClick={() => reset()}
        className="rounded-xl bg-gradient-to-r from-[#6BAEEB] to-[#7B68EE] p-5 font-bold text-white hover:opacity-[.7]"
      >
        دوباره امتحان کنید
      </button>
    </div>
  );
}
