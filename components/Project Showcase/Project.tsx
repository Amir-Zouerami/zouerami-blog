import projectSamplePic from '@/public/project-sample-pic.png';
import Image from 'next/image';
import GitHub from '@/icons/github.svg';
import Link from 'next/link';

function Project() {
  return (
    <div className="mx-1 mb-20 flex flex-col items-center rounded-3xl bg-slate-100 lg:flex-row">
      <div className="flex rounded-3xl lg:max-w-[400px]">
        <Image
          src={projectSamplePic}
          alt="williams portfolio"
          className="rounded-3xl object-cover"
        />
      </div>

      <div className="flex-1 px-12 py-10">
        <h2 className="mb-5 text-3xl font-black">پورتفولیو روزالینا ویلیامز</h2>
        <p className="text-justify leading-8">
          لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با
          استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در
          ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و
          کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد.
        </p>

        <div className="mx-auto mt-5 flex flex-col items-center justify-end text-center lg:flex-row">
          <div className="flex max-w-[150px] justify-center lg:max-w-full">
            <Link
              href={'#'}
              className="mr-5 mt-4 w-full flex-shrink-0 rounded-[10px] bg-[#1f2124] px-5 py-4 text-white lg:w-auto"
            >
              توضیحات بیشتر
            </Link>
            <Link
              href={'#'}
              className="mr-5 mt-4 w-full flex-shrink-0 rounded-[10px] bg-[#1f2124] px-5 py-4 text-white lg:w-auto"
            >
              دموی پروژه
            </Link>
          </div>

          <Link
            href={'#'}
            className="mr-5 mt-4 w-full flex-shrink-0 rounded-[10px] bg-[#1f2124]
          bg-gradient-to-l from-[#5D4954] to-[#DC8B83]
          px-5 py-3 text-white lg:w-auto"
          >
            <Image
              src={GitHub}
              alt="Source code on GitHub"
              className="ml-1 inline-block w-[25px] invert"
            />{' '}
            سورس کد
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Project;
