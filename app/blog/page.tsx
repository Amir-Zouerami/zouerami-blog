import Image from 'next/image';
import { Metadata } from 'next';
import FastSortButton from '@/components/Blog/FastSortButton';

import fire from '@/icons/fire.svg';
import newBadge from '@/icons/new.svg';
import comment from '@/icons/comment.svg';
import BlogPostCard from '../../components/Blog/BlogPostCard';
import Pagination from '@/components/pagination/Pagination';
import SearchArtilces from '@/components/Blog/SearchArtilces';

export const metadata: Metadata = {
  title: 'مقالات برنامه نویسی امیر زوارمی',
  description:
    'web development & programming articles published by Amir Zouerami',
};

function page() {
  return (
    <section className="container mx-auto max-w-[1200px]">
      <div className="mt-8 lg:mt-36">
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

      <div className="my-20">
        <BlogPostCard />
        <BlogPostCard />
        <BlogPostCard />
        <BlogPostCard />
      </div>

      <div>
        <Pagination />
      </div>
    </section>
  );
}

export default page;
