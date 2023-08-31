// 'use client';

import Image from 'next/image';
import DarkMode from './DarkMode';

import menu from '@/icons/menu.svg';
import search from '@/icons/search.svg';
import github from '@/icons/github.svg';
import Link from 'next/link';

// import { useState } from 'react';

function Navbar() {
  // TODO: Set active link styling based on the current page url
  // const [active, setActive] = useState('main-page');

  return (
    <nav className="sticky top-0 z-10 mx-auto max-w-[1200px] rounded-b-2xl bg-white dark:bg-[#31333c] lg:pt-5">
      <div className="">
        <div className="flex items-center justify-between lg:mr-5">
          <div className="p-4 lg:hidden">
            <Link href={'#'} className="">
              <Image
                src={menu}
                alt="navigation-menu"
                width={30}
                className="dark:invert"
              />
            </Link>
          </div>

          <ul className="hidden transition-all lg:flex lg:gap-20">
            <li>
              <Link
                href={'/'}
                className="mr-0 rounded-[10px] bg-[#1f2124] px-4 py-2 font-semibold text-white hover:opacity-[0.8] dark:bg-[#e25687]"
              >
                صفحه اصلی
              </Link>
            </li>

            <li>
              <Link
                href={'/blog'}
                className="hover:font-black hover:text-teal-700 dark:hover:text-cyan-300"
              >
                بلاگ
              </Link>
            </li>

            <li>
              <Link
                href={'/tech-news'}
                className="hover:font-black hover:text-teal-700 dark:hover:text-cyan-300"
              >
                اخبار تکنولوژی
              </Link>
            </li>

            <li>
              <Link
                href={'/portfolio'}
                className="hover:font-black hover:text-teal-700 dark:hover:text-cyan-300"
              >
                پروژه ها
              </Link>
            </li>

            <li>
              <Link
                href={'/about-me'}
                className="hover:font-black hover:text-teal-700 dark:hover:text-cyan-300"
              >
                درباره من
              </Link>
            </li>
          </ul>

          <div className="fix-hover flex gap-2 p-5 lg:gap-4">
            {/* TODO: Search Functionality */}
            <Link
              href={'#'}
              className="transition-transform hover:scale-150 hover:animate-pulse"
            >
              <Image
                src={search}
                alt="search"
                width={25}
                className="dark:invert"
              />
            </Link>

            <Link
              href={'https://github.com/Amir-Zouerami/zouerami-blog'}
              className="transition-transform hover:scale-150 hover:animate-pulse"
            >
              <Image
                src={github}
                alt="github"
                width={25}
                className="dark:invert"
              />
            </Link>

            <DarkMode />
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
