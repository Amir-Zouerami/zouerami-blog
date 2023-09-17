import Image from 'next/image';
import Link from 'next/link';

import heart from '@/icons/heart.svg';
import share from '@/icons/share.svg';
import bookmark from '@/icons/bookmark.svg';
import comment from '@/icons/comment.svg';
import report from '@/icons/report.svg';

function CoulumnHelper() {
  return (
    <div
      className="columnHelper fixed bottom-0 right-0 hidden flex-col justify-center gap-8 rounded-3xl bg-[#1E1F25] p-5 font-bold lg:bottom-auto
    lg:right-10 lg:top-[50%] lg:flex"
    >
      <div className="text-white hover:text-cyan-500">
        <Link href={'#'}>
          <Image src={heart} width={35} alt="sample" className="inline-block" />
          <span className="columnSpan mr-2">لایک کردن مقاله</span>
        </Link>
      </div>

      <div className="text-white hover:text-cyan-500">
        <Link href={'#'}>
          <Image src={share} width={35} alt="sample" className="inline-block" />
          <span className="columnSpan mr-2">اشتراک گذاری مقاله</span>
        </Link>
      </div>

      <div className="text-white hover:text-cyan-500">
        <Link href={'#'}>
          <Image
            src={bookmark}
            width={35}
            alt="sample"
            className="inline-block"
          />
          <span className="columnSpan mr-2">نشان کردن برای مطالعه</span>
        </Link>
      </div>

      <div className="text-white hover:text-cyan-500">
        <Link href={'#'}>
          <Image
            src={comment}
            width={35}
            alt="sample"
            className="inline-block"
          />
          <span className="columnSpan mr-2">نمایش کامنت ها</span>
        </Link>
      </div>

      <div className="text-white hover:text-cyan-500">
        <Link href={'#'}>
          <Image
            src={report}
            width={35}
            alt="sample"
            className="inline-block"
          />
          <span className="columnSpan mr-2">گزارش اشتباهات و مشکلات</span>
        </Link>
      </div>
    </div>
  );
}

export default CoulumnHelper;
