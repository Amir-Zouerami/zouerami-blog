import Image from 'next/image';

import moon from '@/icons/moon.svg';
import menu from '@/icons/menu.svg';
import search from '@/icons/search.svg';
import translate from '@/icons/translate.svg';
import navbarLogo from '@/icons/navbar-logo.webp';
import Link from 'next/link';

function Navbar() {
  return (
    // <nav className="fixed right-1/2 top-0 h-16 w-full translate-x-1/2 bg-gray-200 md:w-2/3">
    <nav className="sticky top-0 pt-3">
      <div className="">
        <div className="flex items-center justify-between">
          <div className="p-4 md:hidden">
            <Link href={'#'} className="">
              <Image src={menu} alt="navigation-menu" width={35} />
            </Link>
          </div>

          <ul className="hidden md:flex md:gap-20">
            <li>
              <Link
                href={'#'}
                className="mr-0 rounded-[10px] bg-[#1f2124] px-4 py-2 font-semibold text-white"
              >
                صفحه اصلی
              </Link>
            </li>

            <li>
              <Link href={'#'} className="">
                بلاگ
              </Link>
            </li>

            <li>
              <Link href={'#'} className="">
                اخبار تکنولوژی
              </Link>
            </li>

            <li>
              <Link href={'#'} className="">
                پروژه ها
              </Link>
            </li>

            <li>
              <Link href={'#'} className="">
                درباره من
              </Link>
            </li>
          </ul>

          <div className="flex gap-2 p-5 md:gap-4">
            <Link href={'#'}>
              <Image src={search} alt="search" width={25} />
            </Link>

            <Link href={'#'}>
              <Image src={translate} alt="translate" width={25} />
            </Link>

            <Link href={'#'}>
              <Image src={moon} alt="dark-mode" width={25} />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
