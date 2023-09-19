import Image from 'next/image';
import Link from 'next/link';

import heart from '@/icons/heart.svg';
import share from '@/icons/share.svg';
import bookmark from '@/icons/bookmark.svg';
import comment from '@/icons/comment.svg';
import report from '@/icons/report.svg';

function CoulumnHelperMobile() {
  return (
    <div className="fixed bottom-5 left-1/2 flex w-[300px] -translate-x-1/2 items-center justify-center gap-5 rounded-3xl bg-[#1E1F25] p-5 font-bold lg:hidden">
      <div className="inline-block text-white hover:text-cyan-500">
        <Link href={'#'} className="svg-red">
          <Image src={heart} width={30} alt="sample" />
        </Link>
      </div>

      <div className="inline-block text-white hover:text-cyan-500">
        <Link href={'#'} className="svg-blue">
          <Image src={share} width={30} alt="sample" />
        </Link>
      </div>

      <div className="inline-block text-white hover:text-cyan-500">
        <Link href={'#'} className="svg-yellow">
          <Image src={bookmark} width={30} alt="sample" />
        </Link>
      </div>

      <div className="inline-block text-white hover:text-cyan-500">
        <Link href={'#'} className="svg-purple">
          <Image src={comment} width={30} alt="sample" />
        </Link>
      </div>

      <div className="inline-block text-white hover:text-cyan-500">
        <Link href={'#'} className="svg-orange">
          <Image src={report} width={30} alt="sample" />
        </Link>
      </div>
    </div>
  );
}

export default CoulumnHelperMobile;
