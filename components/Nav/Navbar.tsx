import Image from 'next/image';
import DarkMode from './DarkMode';

import github from '@/icons/github.svg';
import Link from 'next/link';
import NavMenuMobile from './NavMenu';
import NavLinkDesktop from './NavLinkDesktop';
import SearchLink from './SearchLink';

function Navbar() {
  return (
    <nav className="sticky top-0 z-10 mx-auto max-w-[1200px] rounded-b-2xl bg-white dark:bg-[#31333c] lg:pt-5">
      <div className="">
        <div className="flex items-center justify-between lg:mr-5">
          <NavMenuMobile />

          <ul className="hidden transition-all lg:flex lg:gap-20">
            <NavLinkDesktop href="/">صفحه اصلی</NavLinkDesktop>
            <NavLinkDesktop href="/blog">بلاگ</NavLinkDesktop>
            <NavLinkDesktop href="/tech-news">اخبار تکنولوژی</NavLinkDesktop>
            <NavLinkDesktop href="/portfolio">پروژه ها</NavLinkDesktop>
            <NavLinkDesktop href="/about-me">درباره من</NavLinkDesktop>
          </ul>

          <div className="fix-hover flex gap-2 p-5 lg:gap-4">
            <SearchLink />

            <Link
              href={'https://github.com/Amir-Zouerami/zouerami-blog'}
              className="transition-transform hover:scale-150 hover:animate-pulse"
            >
              <Image
                src={github}
                alt="github link for this website"
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
