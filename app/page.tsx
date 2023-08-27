import Card from '@/components/Card/Card';
import Hero from '@/components/Hero/Hero';
import Navbar from '@/components/Nav/Navbar';
import Project from '@/components/Project Showcase/Project';
import NewsLetter from '@/components/NewsLetter/NewsLetter';
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';

import suitMe from '@/public/suitMe.png';
import FooterSocials from '@/components/FooterSocials/FooterSocials';

export const metadata: Metadata = {
  title: 'امیر زوارمی برنامه نویس و طراح وب',
  description: "Amir Zouerami's blog, a web developer & web designer",
};

export default function Home() {
  return (
    <main className="container mx-auto">
      <Navbar />

      <section className="md:mb-50 mb-24 grid grid-cols-1 items-center justify-items-center md:gap-10 lg:mt-28 lg:grid-cols-12">
        <Hero />
        <div className="col-span-6 justify-self-start px-5 text-justify lg:px-0">
          <h1 className="hidden">وب سایت شخصی امیر زوارمی</h1>
          <p className="pb-5 text-4xl font-black md:text-6xl">خوش اومدید!</p>
          <p className="leading-9">
            سلام! من <strong className="text-cyan-600 ">امیر زوارمی</strong>{' '}
            هستم؛ توسعه دهنده و طراح وب. من برنامه نویسی رو از سال ۱۳۹۷ شروع
            کردم و تا الان با تیم های اوپن سورس خارج از کشور کار کردم و بعضا
            همکاری های محدودی هم با بچه های ایران داشتم. این صفحه ی{' '}
            <span className="text-cyan-600">وبلاگ شخصی</span> من هست که در اون
            از اخبار حوزه ی تکنولوژی و همچنین برنامه نویسی و آموزش های اون صحبت
            می کنم. خلاصه اگه بگم، مجموعه ای از نکاتی رو که در مسیر شغلی خودم
            پیدا می کنم با شما به اشتراک می گذارم.
          </p>
        </div>
      </section>

      <section>
        <p className="mb-14 text-center text-3xl font-black text-slate-500 md:mb-16">
          پــــروژه هــای مــــن
        </p>
        <Project />
        <Project />
        <Project />

        <div className="text-center">
          <Link
            href={'#'}
            className="rounded-lg bg-gradient-to-l from-[#333a47] to-[#2f7169] px-16 py-4 text-xl font-bold text-white"
          >
            لیست پروژه های دیگر
          </Link>
        </div>
      </section>

      <section className="my-16 grid items-center justify-items-center lg:grid-cols-2">
        <Card />
        <Card />
      </section>

      <section className="mb-32 lg:my-40">
        <NewsLetter />
      </section>

      <section className="relative mx-auto mb-14 flex w-[80%] flex-col text-center leading-10 lg:max-w-[70%] xl:max-w-[50%]">
        <h2 className="mb-10 text-3xl font-black text-slate-500">
          خلاصــه ای از مــــن
        </h2>

        <p className="text-justify">
          از اسم این صفحه حتما متوجه شدید که اسم من <strong>امیر زوارمی</strong>{' '}
          هست و یک توسعه دهنده ی وب هستم. من برنامه نویسی رو به عنوان یک سرگرمی
          از
          <strong className="text-teal-800">سال ۱۳۹۴</strong> به صورت ساده شروع
          کردم و تا سال ۱۳۹۷ بهش به چشم یک تفریح نگاه می کردم. ما بین این سال ها
          تقریبا با انواع و اقسام زبان های برنامه نویسی مثل{' '}
          <strong className="text-teal-800">JavaScript</strong> و PHP و Python و
          Dart و Java آشنا شدم و سعی می کردم ببینم چه کارهایی رو میشه با برنامه
          نویسی انجام داد. <strong className="text-teal-800"> سال ۱۳۹۷</strong>{' '}
          تصمیم گرفتم به صورت جدی وارد حوزه ی برنامه نویسی بشم و این کار رو به
          دلیل علاقم به عنوان شغلم انتخاب کردم اما به دلیل درگیری هایی مثل نوشتن
          پایان نامه و خدمت سربازی نتونستم اونچنان که باید براش وقت بزارم. می
          تونید پروژه ها و جزئیات بیشتر رو در قسمت «پورتفولیو» مشاهده کنید.
        </p>

        <Image
          src={suitMe}
          alt="amir zouerami in a suit"
          className="mx-auto md:absolute md:-left-64 md:top-0 md:max-w-[250px]"
        />
      </section>

      <footer className="mt-36 md:mt-36">
        <div className="mb-10 flex justify-center gap-7 font-bold md:mb-24 md:gap-32">
          <Link href={'#'}>خانه</Link>
          <Link href={'#'}>وبلاگ</Link>
          <Link href={'#'}>پروژه</Link>
          <Link href={'#'}>درباره من</Link>
        </div>

        <FooterSocials />

        <p className="mx-auto mb-10 mt-24 max-w-[90%] text-center text-slate-500">
          © تمامی حقوق مادی و معنوی این سایت قانونا و شرعاً متعلق به امیر
          زوارمی است.
        </p>
      </footer>
    </main>
  );
}
