import Hero from '@/components/Hero/Hero';
import Navbar from '@/components/Nav/Navbar';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'امیر زوارمی برنامه نویس و طراح وب',
  description: "Amir Zouerami's blog, a web developer & web designer",
};

export default function Home() {
  return (
    <main className="container mx-auto">
      <Navbar />
      <section className="grid grid-cols-1 items-center justify-items-center md:gap-10 lg:mb-60 lg:mt-28 lg:grid-cols-12">
        <Hero />
        <div className="col-span-6 justify-self-start px-5 text-justify lg:px-0">
          <h1 className="hidden">وب سایت شخصی امیر زوارمی</h1>
          <p className="pb-5 text-4xl font-black md:text-6xl">خوش اومدید!</p>
          <p className="leading-9">
            سلام! من <strong className="text-cyan-600 ">امیر زوارمی</strong> هستم
            توسعه دهنده و طراح وب. من برنامه نویسی رو از سال ۱۳۹۷ شروع کردم و تا
            الان با تیم های اوپن سورس خارج از کشور کار کردم و بعضا همکاری های
            محدودی هم با بچه های ایران داشتم. این صفحه ی{' '}
            <span className="text-cyan-600">وبلاگ شخصی</span> من هست که در اون
            از اخبار حوزه ی تکنولوژی و همچنین برنامه نویسی و آموزش های اون صحبت
            می کنم. خلاصه اگه بگم، مجموعه ای از نکاتی رو که در مسیر شغلی خودم
            پیدا می کنم با شما به اشتراک می گذارم.
          </p>
        </div>
      </section>

      <section>
        <span className="font-black">به زبان فارسی</span>
        <span className="font-black">به زبان فارسی</span>
        <span className="font-black">به زبان فارسی</span>
        <span className="font-black">به زبان فارسی</span>
        <span className="font-black">به زبان فارسی</span>
        <span className="font-black">به زبان فارسی</span>
        <span className="font-black">به زبان فارسی</span>
        <span className="font-black">به زبان فارسی</span>
        <span className="font-black">به زبان فارسی</span>
        <span className="font-black">به زبان فارسی</span>
        <span className="font-black">به زبان فارسی</span>
        <span className="font-black">به زبان فارسی</span>
        <span className="font-black">به زبان فارسی</span>
        <span className="font-black">به زبان فارسی</span>
        <span className="font-black">به زبان فارسی</span>
        <h1 className="font-black">به زبان فارسی</h1>
        <h1 className="font-black">به زبان فارسی</h1>
        <h1 className="font-black">به زبان فارسی</h1>
        <h1 className="font-black">به زبان فارسی</h1>
        <h1 className="font-black">به زبان فارسی</h1>
        <h1 className="font-black">به زبان فارسی</h1>
        <h1 className="font-black">به زبان فارسی</h1>
        <h1 className="font-black">به زبان فارسی</h1>
        <h1 className="font-black">به زبان فارسی</h1>
        <h1 className="font-black">به زبان فارسی</h1>
        <h1 className="font-black">به زبان فارسی</h1>
        <h1 className="font-black">به زبان فارسی</h1>
        <h1 className="font-black">به زبان فارسی</h1>
        <h1 className="font-black">به زبان فارسی</h1>
        <h1 className="font-black">به زبان فارسی</h1>
        <h1 className="font-black">به زبان فارسی</h1>
        <h1 className="font-black">به زبان فارسی</h1>
        <h1 className="font-black">به زبان فارسی</h1>
        <h1 className="font-black">به زبان فارسی</h1>
        <h1 className="font-black">به زبان فارسی</h1>
      </section>

      <h1 className="font-black">به زبان فارسی</h1>
    </main>
  );
}
