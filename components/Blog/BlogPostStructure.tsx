'use client';

import Image from 'next/image';
import { useState } from 'react';

import fingerTap from '@/icons/finger-tap.svg';

function BlogPostStructure() {
  const [structureModal, setStructureModal] = useState(false);

  return (
    <div className="mx-2 max-w-[500px] cursor-pointer">
      <p
        onClick={() => {
          setStructureModal(!structureModal);
        }}
        className="mb-3 rounded-xl bg-[#3b404b] p-5"
      >
        <Image
          src={fingerTap}
          width={25}
          alt="see article headlines and structure"
          className="inline text-white"
        />
        <span className="text-white"> ساختار و سرتیتر های مقاله: </span>
      </p>

      {structureModal && (
        <>
          <ul className="rounded-xl border p-5">
            <a
              href={'#installation'}
              className="transition-all hover:text-teal-400"
            >
              <li className="py-4">۱. نصب ابزار های مورد نیاز</li>
            </a>

            <li className="pt-3">
              <a
                href={'#design'}
                className="transition-all hover:text-teal-400"
              >
                ۲. طراحی UI
              </a>
              <ul className="px-5">
                <a href={'#'} className="transition-all hover:text-teal-400">
                  <li className="py-4">۲.۱. پیاده سازی حالت شب</li>
                </a>
                <a href={'#'} className="transition-all hover:text-teal-400">
                  <li className="py-4">
                    ۲.۲. رفتار وب سایت در هنگام تغییر سایز (موبایل و ...)
                  </li>
                </a>
                <a href={'#'} className="transition-all hover:text-teal-400">
                  <li className="py-4">۲.۳. استفاده از تصاویر ریسپانسیو</li>
                </a>
              </ul>
            </li>

            <a href={'#'} className="transition-all hover:text-teal-400">
              <li className="py-4">۳. کدنویسی در سمت سرور</li>
            </a>
            <a href={'#'} className="transition-all hover:text-teal-400">
              <li className="py-4">۴. اتصال به بلاک‌چین و Web3</li>
            </a>
            <a href={'#'} className="transition-all hover:text-teal-400">
              <li className="py-4">۵. پیش نمایشی کوچک از پلتفرم جدید ما</li>
            </a>
          </ul>
        </>
      )}
    </div>
  );
}

export default BlogPostStructure;
