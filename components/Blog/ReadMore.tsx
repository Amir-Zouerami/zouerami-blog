'use client';

import { useState } from 'react';
import loading from '@/icons/loading.svg';
import Image from 'next/image';
import Link from 'next/link';

function ReadMore({ slug }: { slug: string }) {
  const [isloading, setIsloading] = useState(false);
  return (
    <div onClick={() => setIsloading(true)}>
      <Link
        href={'http://localhost:3000/blog/' + slug}
        className="inline-block rounded-t-2xl bg-gradient-to-r from-[#A880C0] to-[#4CB8B2] px-5 py-4 font-black
            text-white hover:opacity-[0.6] dark:from-[#D93965] dark:to-[#EE8C68]"
      >
        {isloading ? (
          <>
            <Image
              className="svg-white ml-2 inline-block"
              src={loading}
              width={20}
              alt="در حال باز کردن پست"
            />
            <span>لطفا صبر کنید</span>
          </>
        ) : (
          <span>مطالعه مقاله</span>
        )}
      </Link>
    </div>
  );
}

export default ReadMore;
