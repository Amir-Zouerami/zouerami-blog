'use client';

import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import toast, { Toaster } from 'react-hot-toast';
import download from '@/icons/download.svg';

function BlogPostDownloadButton() {
  return (
    <div className="my-10 text-center">
      <Link
        href={'#'}
        onClick={e => {
          e.preventDefault();
          toast(
            `این قابلیت در حال حاضر در دسترس نیست.
              در آینده ی نزدیک کاربران ویژه می توانند مقالات سایت را دانلود کنند.`,
            { icon: '📢', duration: 4000 }
          );
        }}
        className="w-10 rounded-xl bg-[#FE634E] px-12 py-4"
      >
        <Image
          width={25}
          src={download}
          alt="download article"
          className="inline-block align-text-bottom"
        />
        <span className="pr-2 font-bold text-white"> PDF </span>
      </Link>

      <Toaster />
    </div>
  );
}

export default BlogPostDownloadButton;
