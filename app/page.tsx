export const revalidate = 1800;

import Card from '@/components/Card/Card';
import Hero from '@/components/Hero/Hero';
import Project from '@/components/Project Showcase/Project';
import NewsLetter from '@/components/NewsLetter/NewsLetter';

import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import Pocketbase from 'pocketbase';

import arrow from '@/icons/arrow.svg';
import suitMe from '@/public/suitMe.png';
import { BlogPostData, PROJECT } from '@/utility/types';

export const metadata: Metadata = {
  title: 'امیر زوارمی برنامه نویس و طراح وب',
  description: "Amir Zouerami's blog, a web developer & web designer",
};

export default async function Home() {
  let posts;
  let projects;

  try {
    const pb = new Pocketbase(process.env.NEXT_PUBLIC_PB_DOMAIN);
    await pb.admins.authWithPassword(
      process.env.PB_ADMIN_EM as string,
      process.env.PB_ADMIN_PS as string
    );

    projects = await pb
      .collection('projects')
      .getFullList<PROJECT>({ filter: 'featured = true' });

    posts = await pb.collection('posts').getList<BlogPostData>(1, 2, {
      filter: 'published = true',
      sort: '-created',
      skipTotal: true,
    });
  } catch (error) {}

  return (
    <>
      <section className="md:mb-50 fadeInDown mx-auto mb-24 grid max-w-[1200px] grid-cols-1 items-center justify-items-center md:gap-10 lg:grid-cols-12 2xl:mt-16">
        <Hero />
        <div className="col-span-6 justify-self-start px-5 text-justify lg:px-0">
          <h1 className="hidden">وب سایت شخصی امیر زوارمی</h1>
          <p className="pb-5 text-4xl font-black md:text-6xl">خوش اومدید!</p>
          <p className="leading-9">
            سلام! من{' '}
            <strong className="text-cyan-600 dark:text-cyan-300">
              امیر زوارمی
            </strong>{' '}
            هستم؛ توسعه دهنده و طراح وب. من برنامه نویسی رو از سال ۱۳۹۷ شروع
            کردم و تا الان با تیم های اوپن سورس خارج از کشور کار کردم و بعضا
            همکاری های محدودی هم با بچه های ایران داشتم. این صفحه ی{' '}
            <span className="text-cyan-600 dark:text-cyan-300">وبلاگ شخصی</span>{' '}
            من هست که در اون از اخبار حوزه ی تکنولوژی و همچنین برنامه نویسی و
            آموزش های اون صحبت می کنم. خلاصه اگه بگم، مجموعه ای از نکاتی رو که
            در مسیر شغلی خودم پیدا می کنم با شما به اشتراک می گذارم ...
            <span className="blinking-cursor">▌</span>
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-[1000px]">
        <p className="mb-14 text-center text-3xl font-black text-slate-500 dark:text-[#acacac] md:mb-16">
          پــــروژه هــای مــــن
        </p>

        {projects === undefined ? (
          <div className="my-20 text-center text-lg font-bold">
            <p>متاسفانه خطایی در دریافت داده ها رخ داده است.</p>
          </div>
        ) : (
          projects.map(project => (
            <Project key={project.id} project={project} />
          ))
        )}

        <div className="btn-container max-w-full overflow-hidden rounded-lg text-center">
          <Link
            href={'/portfolio'}
            className="arrow-container inline-block bg-[#396b5e] bg-gradient-to-l dark:bg-[#61a290]"
          >
            <Image src={arrow} alt="arrow icon for 'blog' button" />
          </Link>
          <Link
            href={'/portfolio'}
            className="LinkText inline-block w-full rounded-lg bg-gradient-to-l from-[#333a47] to-[#2f7169] 
            px-16 py-4 text-xl font-bold text-white dark:from-[#5ea38a] dark:to-[#beb262]"
          >
            لیست پروژه های دیگر
          </Link>
        </div>
      </section>

      <p className="mb-5 mt-32 text-center text-2xl font-bold text-slate-500 dark:text-[#acacac]">
        آخرین مقالات منتشر شده
      </p>

      <section className="mx-auto mt-16 grid max-w-[1000px] items-center justify-items-center lg:grid-cols-2">
        {posts === undefined ? (
          <div className="my-20 text-center text-lg font-bold">
            <p>متاسفانه خطایی در دریافت داده ها رخ داده است.</p>
          </div>
        ) : (
          posts.items.map(post => <Card key={post.id} post={post} />)
        )}
      </section>

      <div className="btn-container max-w-full overflow-hidden rounded-lg text-center">
        <Link
          href={'/blog'}
          className="arrow-container inline-block bg-[#396b5e] bg-gradient-to-l dark:bg-[#61a290]"
        >
          <Image src={arrow} alt="arrow icon for 'blog' button" />
        </Link>
        <Link
          href={'/blog'}
          className="LinkText inline-block w-full rounded-lg bg-gradient-to-l from-[#333a47] to-[#2f7169] 
            px-16 py-4 text-xl font-bold text-white dark:from-[#5ea38a] dark:to-[#beb262]"
        >
          مطالعه ی مقالات بیشتر
        </Link>
      </div>

      <section className="mb-32 mt-32 lg:my-40">
        <NewsLetter />
      </section>

      <section className="relative mx-auto mb-14 flex w-[80%] flex-col text-center leading-10 lg:max-w-[70%] xl:max-w-[50%]">
        <h2 className="mb-10 text-3xl font-black text-slate-500 dark:text-[#acacac]">
          خلاصــه ای از مــــن
        </h2>

        <p className="mx-auto max-w-[700px] text-justify">
          از اسم این صفحه حتما متوجه شدید که اسم من <strong>امیر زوارمی</strong>{' '}
          هست و یک توسعه دهنده ی وب هستم. من برنامه نویسی رو به عنوان یک سرگرمی
          از
          <strong className="text-teal-800 dark:text-yellow-400">
            سال ۱۳۹۴
          </strong>{' '}
          به صورت ساده شروع کردم و تا سال ۱۳۹۷ بهش به چشم یک تفریح نگاه می کردم.
          ما بین این سال ها تقریبا با انواع و اقسام زبان های برنامه نویسی مثل{' '}
          <strong className="text-teal-800 dark:text-yellow-400">
            JavaScript
          </strong>{' '}
          و PHP و Python و Dart و Java آشنا شدم و سعی می کردم ببینم چه کارهایی
          رو میشه با برنامه نویسی انجام داد.{' '}
          <strong className="text-teal-800 dark:text-yellow-400">
            {' '}
            سال ۱۳۹۷
          </strong>{' '}
          تصمیم گرفتم به صورت جدی وارد حوزه ی برنامه نویسی بشم و این کار رو به
          دلیل علاقم به عنوان شغلم انتخاب کردم اما به دلیل درگیری هایی مثل نوشتن
          پایان نامه و خدمت سربازی نتونستم اونچنان که باید براش وقت بزارم. می
          تونید پروژه ها و جزئیات بیشتر رو در قسمت «پورتفولیو» مشاهده کنید.
        </p>

        <Image
          src={suitMe}
          alt="amir zouerami in a suit"
          className="mx-auto lg:absolute lg:-left-72 lg:top-0 lg:max-w-[250px]"
        />
      </section>
    </>
  );
}
