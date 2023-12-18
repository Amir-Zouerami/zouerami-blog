import Link from 'next/link';
import BlogPostStructure from './BlogPostStructure';
import dayjs from '@/utility/dayjs';
import { BlogPostHeaderProps } from '@/utility/types';
import { ToFaNumbers } from '@/utility/utils';
import BlogViews from './BlogViews';

async function BlogPostHeader({
  title,
  article_version,
  skill_level,
  viewId,
  created,
  updated,
  categories,
  article_headlines,
}: BlogPostHeaderProps) {
  return (
    <div className="mt-20">
      <h1 className="pr-3 text-3xl font-black leading-9 lg:text-4xl">
        {title}
      </h1>
      <span className="!transition-all hover:!text-teal-400"></span>

      <div className="my-10 flex flex-col items-center justify-between lg:mx-40 lg:flex-row">
        <div className="">
          <p className="py-3 lg:mx-3 lg:inline-block">
            تاریخ انتشار:{' '}
            <span className="text-slate-400">
              {ToFaNumbers(dayjs(created).locale('fa').fromNow())}
            </span>
          </p>
          <p className="py-3 lg:mx-3 lg:inline-block">
            آخرین ویرایش:{' '}
            <span className="text-slate-400">
              {ToFaNumbers(dayjs(updated).locale('fa').fromNow())}
            </span>
          </p>

          <br className="hidden lg:block" />

          <p className="py-3 lg:mx-3 lg:inline-block">
            سطح مقاله: <span className="text-slate-400">{skill_level}</span>
          </p>
          <p className="py-3 lg:mx-3 lg:inline-block">
            دسته:
            {categories.map(postCategory => (
              <Link
                key={postCategory.id}
                href={`/blog?category=${postCategory.category}`}
              >
                <span className="mx-1 rounded-lg bg-[#e25687] px-2 py-1 text-white transition-all hover:!bg-orange-400 dark:bg-slate-600">
                  {postCategory.category}
                </span>
              </Link>
            ))}
          </p>
          <p className="py-3 lg:mx-3 lg:inline-block">
            بازدید: <BlogViews viewId={viewId} />
          </p>
        </div>

        <div className="mt-5 lg:m-0">
          <select
            name="article_version"
            id="article_version"
            className="rounded-xl bg-[#fdcf54] p-4 font-bold text-[#6f611f]"
          >
            <option value="1.0" defaultValue={'1.0'}>
              انتخاب نسخه ی مقاله
            </option>
            <option value={`${article_version}`}>نسخه {article_version}</option>
          </select>
        </div>
      </div>

      <BlogPostStructure article_headlines={article_headlines} />
    </div>
  );
}

export default BlogPostHeader;
