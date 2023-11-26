import projectSamplePic from '@/public/project-sample-pic.png';
import Image from 'next/image';
import GitHub from '@/icons/github.svg';
import Link from 'next/link';

function Project() {
  return (
    <div className="mx-1 mb-20 flex flex-col items-center rounded-3xl bg-slate-100 dark:bg-[#424551] lg:flex-row">
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

        <div className="mt-5 text-center">
          <div className="flex flex-wrap items-center justify-between gap-5 lg:justify-end">
            {/* <Link
              href={'#'}
              className="mr-5 mt-4 w-full flex-shrink-0 rounded-[10px] bg-[#1f2124] px-5 py-4 text-white transition-all
              hover:bg-[#696a6b] dark:bg-[#e25687] dark:hover:bg-[#e25687c1] lg:w-auto"
            > */}

            <Link
              href={'#'}
              className="inline-block flex-1 rounded-[10px] bg-[#1f2124] px-4 py-4 text-white transition-all hover:bg-[#696a6b]
              dark:bg-[#e25687] dark:hover:bg-[#e25687c1] lg:flex-none"
            >
              توضیحات بیشتر
            </Link>

            <Link
              href={'#'}
              className="inline-block flex-1 rounded-[10px] bg-[#1f2124] px-4 py-4 text-white transition-all hover:bg-[#696a6b]
              dark:bg-[#e25687] dark:hover:bg-[#e25687c1] lg:flex-none"
            >
              دموی پروژه
            </Link>

            <Link
              href={'#'}
              className="inline-block w-full rounded-[10px] bg-[#1f2124] bg-gradient-to-l from-[#5D4954] to-[#DC8B83] px-4 py-3
             text-white transition-all reactiveButton dark:from-[#a67fbe] dark:to-[#51b6af] lg:w-auto"
            >
              <Image
                src={GitHub}
                width={25}
                alt="Source code on GitHub"
                className="inline invert"
              />
              <span className=""> سورس کد</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Project;
