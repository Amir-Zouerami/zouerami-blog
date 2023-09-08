import Link from 'next/link';
import FooterSocials from './FooterSocials';

function Footer() {
  return (
    <footer className="mt-36 md:mt-36">
      <div className="mb-10 flex justify-center gap-7 font-bold md:mb-24 md:gap-32">
        <Link
          className="transition-all hover:text-lg hover:text-cyan-700 dark:hover:text-cyan-300"
          href={'/'}
        >
          خانه
        </Link>
        <Link
          className="transition-all hover:text-lg hover:text-cyan-700 dark:hover:text-cyan-300"
          href={'/blog'}
        >
          وبلاگ
        </Link>
        <Link
          className="transition-all hover:text-lg hover:text-cyan-700 dark:hover:text-cyan-300"
          href={'/portfolio'}
        >
          پروژه
        </Link>
        <Link
          className="transition-all hover:text-lg hover:text-cyan-700 dark:hover:text-cyan-300"
          href={'/about-me'}
        >
          درباره من
        </Link>
      </div>

      <FooterSocials />

      <p className="mx-auto mb-10 mt-24 max-w-[90%] text-center text-slate-500">
        © تمامی حقوق مادی و معنوی این سایت قانونا و شرعاً متعلق به امیر زوارمی
        است.
      </p>
    </footer>
  );
}

export default Footer;
