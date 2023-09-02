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
    <div className="relative p-4 lg:hidden">
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
          <div className="absolute top-5 min-w-[93vw] rounded-lg bg-slate-700 text-center text-white dark:bg-slate-600">
            <ul className="flex flex-col gap-7 px-5 py-10">
              <NavLinkMobile href="/">صفحه اصلی</NavLinkMobile>
              <NavLinkMobile href="/blog">بلاگ</NavLinkMobile>
              <NavLinkMobile href="/tech-news">اخبار تکنولوژی</NavLinkMobile>
              <NavLinkMobile href="/portfolio">پروژه ها</NavLinkMobile>
              <NavLinkMobile href="/about-me">درباره من</NavLinkMobile>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default NavMenu;
