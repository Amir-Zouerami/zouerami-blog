import Image from 'next/image';
import newsRedis from '@/public/news-redis.jpg';
import newsPostgres from '@/public/news-postgres.jpg';
import Link from 'next/link';

function Card() {
  return (
    // <div className="flex flex-col justify-center">
    <div className="p-5 xl:max-w-[80%]">
      <p className="my-5 text-center text-2xl font-bold text-slate-500 dark:text-[#acacac]">
        اخبار تکنولوژی
      </p>

      <div className="min-w-52 mx-auto mb-5 overflow-hidden">
        <Image src={newsPostgres} alt="news redis" className="rounded-2xl" />
      </div>

      <div className="my-8">
        <h2 className="mb-3 text-xl font-bold leading-9">
          ردیس حافظه ی خود را افزایش می دهد
        </h2>
        <p className="text-justify leading-8 2xl:leading-10">
          لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با
          استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در
          ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و
          کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی
          در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می
          طلبد.
        </p>
      </div>

      <div className="my-14 text-center">
        <Link
          className=" rounded-md bg-[#1f2124] px-10 py-5 font-bold text-white hover:bg-[#696a6b] dark:bg-[#e25687] dark:hover:bg-[#843c55]"
          href={'#'}
        >
          مشاهده اخبار بیشتر
        </Link>
      </div>
    </div>
  );
}

export default Card;
