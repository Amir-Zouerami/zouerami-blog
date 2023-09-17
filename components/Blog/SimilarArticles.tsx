import Image from 'next/image';

import randomCode from '@/public/random-code.jpg';
import Link from 'next/link';

function SimilarArticles() {
  return (
    <div className="flex flex-col items-center justify-center md:flex-row md:justify-between">
      <div className="my-10 rounded-2xl md:max-w-[45%] lg:max-w-[40%]">
        <Image src={randomCode} className="mb-5 rounded-2xl" alt="sample" />
        <h2 className="p-3 text-xl font-black">قواعد اصلی کدنویسی حرفه ای</h2>
        <p className="px-3 pb-5 text-base leading-9">
          لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با
          استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در
          ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و
          کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی
          در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می
          طلبد.
        </p>
        <div className="text-center mt-5">
          <Link
            href={'#'}
            className="w-10 rounded-xl bg-gradient-to-r from-[#5AA68C] to-[#C0B35F] px-12 py-4"
          >
            <span className="pr-2 font-bold text-white">مطالعه مقاله</span>
          </Link>
        </div>
      </div>

      <div className="my-10 rounded-2xl md:max-w-[45%] lg:max-w-[40%]">
        <Image src={randomCode} className="mb-5 rounded-2xl" alt="sample" />
        <h2 className="p-3 text-xl font-black">قواعد اصلی کدنویسی حرفه ای</h2>
        <p className="px-3 pb-5 text-base leading-9">
          لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با
          استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در
          ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و
          کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی
          در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می
          طلبد.
        </p>
        <div className="text-center mt-5">
          <Link
            href={'#'}
            className="w-10 rounded-xl bg-gradient-to-r from-[#5AA68C] to-[#C0B35F] px-12 py-4"
          >
            <span className="pr-2 font-bold text-white">مطالعه مقاله</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SimilarArticles;
