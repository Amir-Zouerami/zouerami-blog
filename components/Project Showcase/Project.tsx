import williams from '@/public/williams.webp';
import Image from 'next/image';
import GitHub from '@/icons/github.svg';
import Link from 'next/link';

function Project() {
  return (
    <div className="mx-auto mb-20 flex flex-col items-center rounded-3xl bg-slate-100 lg:min-w-[99%] lg:max-w-[90%] lg:flex-row">
      <div className="my-5 h-64 max-w-[95%] overflow-hidden rounded-3xl lg:mr-5 lg:max-w-[35%]">
        <Image
          src={williams}
          alt="williams portfolio"
          className="flex-grow-[2] basis-0 rounded-3xl object-cover"
        />
      </div>

      <div className="m-10 flex-grow-[1] basis-0">
        <h2 className="mb-5 text-3xl font-black">پورتفولیو روزالینا ویلیامز</h2>
        <p className="text-justify leading-8">
          لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با
          استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در
          ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و
          کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی
          در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می
          طلبد.
        </p>

        <div className="mt-3 flex flex-col justify-end text-center lg:flex-row">
          <Link
            href={'#'}
            className="mr-5 mt-5 flex-grow-[1] rounded-[10px] bg-[#1f2124] px-4 py-2 font-semibold text-white"
          >
            توضیحات بیشتر
          </Link>
          <Link
            href={'#'}
            className="mr-5 mt-5 flex-grow-[1] rounded-[10px] bg-[#1f2124] px-4 py-2 font-semibold text-white"
          >
            دموی پروژه
          </Link>
          <Link
            href={'#'}
            className="mr-5 mt-5 flex-grow-[1] rounded-[10px] bg-[#1f2124]
          bg-gradient-to-l from-[#5D4954] to-[#DC8B83]
          px-4 py-2 font-semibold text-white"
          >
            <Image
              src={GitHub}
              alt="Source code on GitHub"
              className="ml-1 inline-block w-[30px] invert"
            />{' '}
            سورس کد
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Project;
