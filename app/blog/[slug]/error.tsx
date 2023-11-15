'use client';

import Error404 from '@/icons/Error404';
import Link from 'next/link';

function NotFound() {
  return (
    <div className="mx-auto mt-24 flex max-w-[800px] flex-col items-center justify-center">
      <h2 className="mb-10 text-4xl font-black">
        چنین صفحه ای <span className="text-[#e4c052]">وجود ندارد</span>...!
      </h2>

      <div className="w-full text-center">
        <Error404 margin="lg:-mb-8" />
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
        صفحه ای که درخواست کرده اید وجود ندارد، با دقت بیشتر مجددا تلاش کنید. در
        صورت استمرار خطا، مشکل خود را به مدیریت سایت اطلاع دهید.
      </p>
    </div>
  );
}

export default NotFound;
