'use client';

import Image from 'next/image';
import Link from 'next/link';

import menu from '@/icons/menu.svg';
import x from '@/icons/menu-X.svg';
import { useState } from 'react';
import NavLinkMobile from './NavLinkMobile';

function NavMenu() {
  const [modal, setModal] = useState(false);

  return (
    <div className="p-4 lg:hidden">
      <Link
        href={'#'}
        className=""
        onClick={() => {
          setModal(!modal);
        }}
      >
        {modal === false ? (
          <Image
            src={menu}
            alt="open navigation menu"
            width={30}
            className="dark:invert"
          />
        ) : (
          <Image
            src={x}
            alt="close navigation-menu"
            width={20}
            className="dark:invert"
          />
        )}
      </Link>

      {modal && (
        <div
          className="fixed min-h-[100vh] min-w-[100vw]"
          onClick={() => {
            setModal(!modal);
          }}
        >
          <div
            className="absolute top-5 min-w-[93vw] rounded-lg bg-white p-5 text-center opacity-[0.95] shadow-2xl
          dark:bg-slate-600 dark:bg-gradient-to-r dark:from-[#293036] dark:to-[#424b56] dark:text-white dark:opacity-[1]
          dark:shadow-none"
          >
            <ul className="flex flex-col gap-7 px-5 py-10">
              <NavLinkMobile href="/">صفحه اصلی</NavLinkMobile>
              <NavLinkMobile href="/blog">بلاگ</NavLinkMobile>
              <NavLinkMobile href="/portfolio">پورتفولیو</NavLinkMobile>
              <NavLinkMobile href="/developers">توسعه دهندگان</NavLinkMobile>
              <NavLinkMobile href="/about-me">درباره من</NavLinkMobile>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default NavMenu;
