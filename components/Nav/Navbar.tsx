import DarkMode from './DarkMode';

import NavMenuMobile from './NavMenu';
import NavLinkDesktop from './NavLinkDesktop';
import SearchLink from './SearchLink';
import UserProfile from './UserProfile';
import Notify from './Notify';

function Navbar() {
  return (
    <>
      <Notify />

      <nav className="sticky top-0 z-10 mx-auto max-w-[1200px] rounded-b-2xl bg-white dark:bg-[#31333c] lg:pt-5">
        <div>
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

              <UserProfile />

              <DarkMode />
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
