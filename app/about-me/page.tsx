import Image from 'next/image';

import me from '@/public/me.png';
import Event from '@/components/AboutMe/Event';
import Line from '@/components/AboutMe/Line';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'درباره من',
  description: 'A Timeline About Amir Zouerami',
};

function page() {
  return (
    <section className="container mx-auto max-w-[1000px]">
      <div className="my-20 flex items-center justify-center">
        <div className="mx-auto w-96 text-center">
          <Image
            src={me}
            className="h-full w-full rounded-3xl object-cover"
            alt="amir zouerami"
          />
          <h1 className="mb-3 mt-10 text-center text-2xl font-black">
            امیر زوارمی، طراح و توسعه دهنده
          </h1>
          <span className="text-gray-400">
            توسعه دهنده وب Node.js و React.js
          </span>
        </div>
      </div>

      <div className="mx-auto flex justify-center px-5 lg:max-w-[600px]">
        <div>
          <Event year="۱۳۹۳" title="دیدن اولین خط کد در تلویزیون!" text="" />

          <Line />

          <Event
            year="۱۳۹۴"
            title="باز کردن Developer Tools برای اولین بار"
            text="برای اولین بار فهمیدم داخل مرورگر بخشی به اسم Developer Tools وجود
              داره آخه از پیام های وایبر شنیده بودم از این بخش میشه وب سایت ها
              رو هک کرد :)"
          />

          <Line />

          <Event
            year="۱۳۹۵"
            title="نصب اندروید استودیو و آشنایی با Activity ها"
            text="برنامه نویسی اندروید (جاوا) اولین جایی بود که با مفاهیم اولیه برنامه نویسی مثل متغیر ها آشنا شدم.
            هنوز برنامه نویسی فقط یه تفریح بود."
          />

          <Line />

          <Event
            year="۱۳۹۶"
            title="ورود به دنیای برنامه نویسی وب"
            text="برنامه نویسی اندروید خیلی به دلم نشست و رفتم سراغ وب. اون موقع ها تازه با جی کوئری و PHP آشنا شدم."
          />

          <Line />

          <Event
            year="نیمه اول ۱۳۹۷"
            title="ساخت اولین وب سایت"
            text="اولین وب سایت خودم رو با PHP و Laravel نوشتم.
            توی همین سال بود که با Node.js هم آشنا شدم و دیگه نیازی به یاد گرفتن دو زبان مختلف برای ساخت وب سایت نداشتم.
            یادمه گیت هم اون زمان یاد گرفتم که خیلی به روند کاریم کمک کرد."
          />

          <Line />

          <Event
            year="نیمه دوم ۱۳۹۷"
            title="اولین پروژه ی کاری"
            text="این سال بود که چند نفر از دوستانم بهم پیشنهاد کار دادن. قرار بود شرکتی تاسیس کنن و در اون شروع به کار کنیم (شبیه استارت آپ های امروزی)
            اما بعد از شش ماه کار روی وب سایت، همه چیز به دلیل مسائل مالی کنسل شد! اون زمان با PHP و جی کوئری کار می کردیم و تازه وارد وردپرس شده بودیم.
            تقریبا همون زمان بود که کار به عنوان مدرس پایه برنامه نویسی رو در مجموعه ی روکسو شروع کردم."
          />

          <Line />

          <Event
            year="نیمه ی اول ۱۳۹۸"
            title="فریم ورک های جاوا اسکریپتی"
            text="یکم با Vue و React کار کردم و از بینشون React رو انتخاب کردم. اینجا بود که برنامه نویسی دیگه برام تفریح خالی نبود بلکه معنی کار جدی داشت.
            تا قبل از این با React و Vue کار کرده بودم اما از این نقطه به بعد کار جدی من شروع شد."
          />

          <Line />

          <Event
            year="نیمه ی دوم ۱۳۹۸"
            title="اولین پروژه ی فری لنسری - ربات تلگرامی"
            text=" این سال بود که اولین پروژه ی کاریم رو گرفتم: یک ربات تلگرامی که یک کتابخانه ی آنلاین بود و باید به کاربر ها اجازه می داد از بین حدود ۴۰ کتاب هر کتابی رو که می خوان مطالعه کنن
            بنابراین مباحثی مثل Pagination هم داخل این ربات بود.
            این پروژه اولین درک من از Web API ها و همچنین مدیریت کامل یک پروژه بود."
          />

          <Line />

          <Event
            year="نیمه ی اول ۱۳۹۹"
            title="الگوریتم و ساختمان داده"
            text="انگار هنوز هیچی از برنامه نویسی یاد نداشتم! تازه شروع به حل سوالات LeetCode و یاد گرفتن راجع به الگوریتم ها، ساختمان داده، الگوهای طراحی و غیره کرده بودم."
          />

          <Line />

          <Event
            year="نیمه ی دوم ۱۳۹۹"
            title="اکوسیستم جاوا اسکریپت"
            text="توی این مدت از شیر مرغ تا جون آدمیزاد رو امتحان کردم و می خواستم با تکنولوژی های مختلف آشنا بشم. از GraphQL تا Socket.io تا Next.js تا Svelte تا Postgresql و الی آخر..."
          />

          <Line />

          <Event
            year="نیمه ی اول ۱۴۰۰"
            title="اولین پروژه ی اوپن سورس - <a class='text-sky-300 font-bold' href='https://grammy.dev/'>grammY.dev</a>"
            text="این سال بود که با آقای <a class='text-sky-300 font-bold' href='https://github.com/KnorpelSenf'>Steffen Trog</a> آشنا شدم. ایشون با چند نفر دیگه در حال کار روی یک فریم ورک برای ربات های تلگرامی بود که واقعا از بقیه ی فریم ورک ها پیشرفته تر محسوب می شد.
            شما با یک نگاه به سورس کد متوجه این موضوع می شدید. من تا چند وقت کوتاه با این دوستان روی گرمی (grammY) کار کردیم. این فریم ورک هر دو رانتایم node و deno رو پشتیبانی می کرد بنابراین
            دردسر های خودش رو به همراه داشت."
          />

          <Line />

          <Event
            year="نیمه ی دوم ۱۴۰۰"
            title="مالیات جوانی - سربازی!"
            text="نوبتی هم باشه نوبت ماست که دو سال از زندگیمون رو هدر بدیم. توی این مدت اصلا انرژی برنامه نویسی نداشتم و تنها کاری که انجام دادم طراحی همین
            وب سایت با Next.js بود. سربازی واقعا روح و انرژی رو می خوره!"
          />

          <Line />

          <Event
            year="انتهای ۱۴۰۲"
            title="آزادی!"
            text="بالاخره نوبت برگشتن به زندگی و دنیای برنامه نویسیه ..."
          />
        </div>
      </div>

      <div className="mt-20 px-5">
        <p className="text-justify leading-loose">
          اتفاق های خیلی زیادی توی این سال ها افتاد و تایم لاین بالا حذفیات
          زیاده داره اما خلاصه ی خوبی از جریان حرفه ای زندگی من رو نشون میده.
          برای جزئیات بیشتر از پروژه ها و مسائل فنی شون به بخش{' '}
          <Link href={'/portfolio'} className="font-bold text-sky-300">
            پورتفولیو
          </Link>{' '}
          سایت برید.
        </p>
      </div>
    </section>
  );
}

export default page;
