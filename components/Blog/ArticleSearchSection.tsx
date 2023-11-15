import SearchArtilces from '@/components/Blog/SearchArticlesDropDown';
import Image from 'next/image';
import FastSortButton from '@/components/Blog/FastSortButton';

import fire from '@/icons/fire.svg';
import newBadge from '@/icons/new.svg';
import pen from '@/icons/pen.svg';

function ArticleSearchSection() {
  return (
    <div className="mt-8 lg:mt-20">
      <p className="mx-3 mb-10">مرتب سازی سریع بر اساس:</p>

      <div className="flex flex-col items-center justify-center lg:flex-row">
        <div className="grow">
          <FastSortButton classes="ml-3" sortIndex="?sort=lastUpdated">
            <Image
              src={pen}
              width={25}
              alt="sort by release date (new)"
              className="ml-2 inline-block"
            />

            <span>آخرین ویرایش</span>
          </FastSortButton>
          <FastSortButton classes="mr-3 lg:ml-3" sortIndex="?sort=lastCreated">
            <Image
              src={newBadge}
              width={25}
              alt="sort by most comments"
              className="ml-2 inline-block"
            />

            <span>آخرین انتشار</span>
          </FastSortButton>

          <div className="mt-5 w-full self-center text-center lg:inline-block lg:w-auto">
            <FastSortButton sortIndex="?sort=views">
              <Image
                src={fire}
                width={25}
                alt="sort by highest view count"
                className="ml-2 inline-block"
              />
              <span className="lg:hidden">بیشترین تعداد بازدید</span>
              <span className="hidden lg:inline">بازدید ها</span>
            </FastSortButton>
          </div>
        </div>

        <SearchArtilces />
      </div>
    </div>
  );
}

export default ArticleSearchSection;
