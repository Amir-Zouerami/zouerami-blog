// 'use client';

import Image from 'next/image';

import moon from '@/icons/moon.svg';
import menu from '@/icons/menu.svg';
import search from '@/icons/search.svg';
import github from '@/icons/github.svg';
import Link from 'next/link';

// import { useState } from 'react';

function Navbar() {
  // TODO: Set active link styling based on the current page url
  // const [active, setActive] = useState('main-page');

  return (
    <nav className="sticky top-0 rounded-b-2xl bg-white lg:py-2">
      <div className="">
        <div className="flex items-center justify-between lg:mr-5">
          <div className="p-4 lg:hidden">
            <Link href={'#'} className="">
              <Image src={menu} alt="navigation-menu" width={30} />
            </Link>
          </div>

          <ul className="hidden transition-all lg:flex lg:gap-20">
            <li>
              <Link
                href={'/'}
                className="mr-0 rounded-[10px] bg-[#1f2124] px-4 py-2 font-semibold text-white"
              >
                صفحه اصلی
              </Link>
            </li>

            <li>
              <Link href={'/blog'}>بلاگ</Link>
            </li>

            <li>
              <Link href={'/tech-news'}>اخبار تکنولوژی</Link>
            </li>

            <li>
              <Link href={'/portfolio'}>پروژه ها</Link>
            </li>

            <li>
              <Link href={'/about-me'}>درباره من</Link>
            </li>
          </ul>

          <div className="fix-hover flex gap-2 p-5 lg:gap-4">
            {/* TODO: Search Functionality */}
            <Link
              href={'#'}
              className="transition-transform hover:scale-150 hover:animate-pulse"
            >
              <Image src={search} alt="search" width={25} />
            </Link>

            <Link
              href={'https://github.com/Amir-Zouerami/zouerami-blog'}
              className="transition-transform hover:scale-150 hover:animate-pulse"
            >
              <Image src={github} alt="github" width={25} />
            </Link>

            {/* TODO: dark mode toggle */}
            <Link
              href={'#'}
              className="transition-transform hover:scale-150 hover:animate-pulse"
            >
              <Image src={moon} alt="dark-mode" width={25} />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
