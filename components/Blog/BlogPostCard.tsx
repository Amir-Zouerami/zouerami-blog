import Image from 'next/image';
import Link from 'next/link';

import postCover from '@/public/sample-post-cover.png';
import heart from '@/icons/heart.svg';
import bookmark from '@/icons/bookmark.svg';
import share from '@/icons/share.svg';
import report from '@/icons/report.svg';
import fire from '@/icons/fire.svg';
import calender from '@/icons/calender.svg';

function BlogPostCard() {
  return (
    <div className="mx-auto mb-16 grid max-w-[97%] rounded-2xl bg-[#f1f5f9] dark:bg-gradient-to-r dark:from-[#4C4F61] dark:to-[#4C4F61] dark:text-white lg:max-w-[1000px] lg:grid-cols-12">
      <div className="col-span-12 my-auto hidden justify-center gap-10 px-5 lg:col-span-1  lg:mx-auto lg:flex lg:flex-col lg:px-0">
        <Link href={'#'} className="svg-red mx-1">
          <Image
            src={heart}
            width={35}
            alt="like the post"
            className="invert dark:invert-0"
          />
        </Link>
        <Link href={'#'} className="svg-yellow mx-1">
          <Image
            src={bookmark}
            width={35}
            alt="bookmark the post"
            className="invert dark:invert-0"
          />
        </Link>
        <Link href={'#'} className="svg-blue mx-1">
          <Image
            src={share}
            width={35}
            alt="share the post"
            className="invert dark:invert-0"
          />
        </Link>
        <Link href={'#'} className="svg-orange mx-1">
          <Image
            src={report}
            width={35}
            alt="report the post"
            className="invert dark:invert-0"
          />
        </Link>
      </div>

      <div className="col-span-11 lg:col-span-7">
        <div className="pr-5 lg:p-0">
          <h2 className="py-5 text-xl font-black leading-8">
            ویرایش صوت در کتابخانه ی ffmpeg
          </h2>

          <p className="pb-5 pl-5 text-justify leading-8">
            لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با
            استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در
            ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز،
            و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای
            زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و
            متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان
            رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد
            کرد.
          </p>
        </div>

        <div className="flex items-center justify-between px-5">
          <Link
            href={'#'}
            className="inline-block rounded-t-2xl bg-gradient-to-r from-[#A880C0] to-[#4CB8B2] px-5 py-4 font-black
            text-white hover:opacity-[0.6] dark:from-[#D93965] dark:to-[#EE8C68]"
          >
            مطالعه مقاله
          </Link>
          <div>
            <Image
              src={calender}
              width={20}
              alt="date published icon"
              className="inline invert dark:invert-0"
            />
            <span className="mr-1">۱۳ روز پیش</span>
          </div>
          <div>
            <span className="mr-1">313 </span>
            <Image
              src={fire}
              width={20}
              alt="view count icon"
              className="verticalAlignSub inline invert dark:invert-0"
            />
          </div>
        </div>
      </div>

      <div className="-order-1 col-span-12 lg:order-1 lg:col-span-4">
        <Image
          src={postCover}
          alt="sample post cover"
          className="h-full w-full rounded-t-2xl object-cover lg:rounded-l-2xl"
        />
      </div>
    </div>
  );
}

export default BlogPostCard;
