'use client';

import Image from 'next/image';
import Link from 'next/link';

import menu from '@/icons/menu.svg';
import x from '@/icons/menu-X.svg';
import { useState } from 'react';
import { usePathname } from 'next/navigation';

function NavMenu() {
  const [modal, setModal] = useState(false);
  const pathName = usePathname();

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
          <div className="absolute top-5 min-w-[93vw] rounded-lg bg-slate-700 text-center dark:bg-slate-600">
            <ul className="flex flex-col gap-7 px-5 py-10">
              <li>
                <Link
                  href={'/'}
                  className={`${
                    pathName === '/' ? 'activeMobile' : ''
                  } mr-0 text-white`}
                >
                  صفحه اصلی
                </Link>
              </li>

              <li>
                <Link
                  href={'/blog'}
                  className={`${
                    pathName.startsWith('/blog') ? 'activeMobile' : ''
                  } text-white hover:font-black`}
                >
                  بلاگ
                </Link>
              </li>

              <li>
                <Link
                  href={'/tech-news'}
                  className={`${
                    pathName.startsWith('/tech-news') ? 'activeMobile' : ''
                  } text-white hover:font-black`}
                >
                  اخبار تکنولوژی
                </Link>
              </li>

              <li>
                <Link
                  href={'/portfolio'}
                  className={`${
                    pathName.startsWith('/portfolio') ? 'activeMobile' : ''
                  } text-white hover:font-black`}
                >
                  پروژه ها
                </Link>
              </li>

              <li>
                <Link
                  href={'/about-me'}
                  className={`${
                    pathName === '/about-me' ? 'activeMobile' : ''
                  } text-white hover:font-black`}
                >
                  درباره من
                </Link>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default NavMenu;
