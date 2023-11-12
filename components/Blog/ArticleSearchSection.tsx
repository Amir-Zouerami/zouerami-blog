import SearchArtilces from '@/components/Blog/SearchArticlesDropDown';
import Image from 'next/image';
import FastSortButton from '@/components/Blog/FastSortButton';

import fire from '@/icons/fire.svg';
import newBadge from '@/icons/new.svg';
import comment from '@/icons/comment.svg';

function ArticleSearchSection() {
  return (
    <div className="mt-8 lg:mt-20">
      <p className="mx-3 mb-10">مرتب سازی سریع بر اساس:</p>
      <div className="mx-auto grid w-[95%] grid-cols-1 place-items-center gap-5 lg:grid-cols-2">
        <div className="flex gap-3 lg:gap-10">
          <FastSortButton>
            <Image
              src={fire}
              width={25}
              alt="sort by highest view count"
              className="ml-2 inline-block"
            />
            <span className="hidden lg:inline-block">پُر بازدید ها</span>
            <span className="inline-block lg:hidden">بازدید</span>
          </FastSortButton>
          <FastSortButton>
            <Image
              src={newBadge}
              width={25}
              alt="sort by release date (new)"
              className="ml-2 inline-block"
            />

            <span className="hidden lg:inline-block">جدید ترین ها</span>
            <span className="inline-block lg:hidden">تاریخ</span>
          </FastSortButton>
          <FastSortButton>
            <Image
              src={comment}
              width={25}
              alt="sort by most comments"
              className="ml-2 inline-block"
            />

            <span className="hidden lg:inline-block">بحث برانگیز ها</span>
            <span className="inline-block lg:hidden">کامنت</span>
          </FastSortButton>
        </div>

        <SearchArtilces />
      </div>
    </div>
  );
}

export default ArticleSearchSection;