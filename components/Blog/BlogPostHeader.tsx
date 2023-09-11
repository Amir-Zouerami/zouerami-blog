import Link from 'next/link';
import BlogPostStructure from './BlogPostStructure';

function BlogPostHeader() {
  return (
    <div className="mt-20">
      <h1 className="pr-3 text-3xl font-black">توسعه ی یک پلتفرم تبادل NFT</h1>

      <div className="my-10 flex flex-col items-center justify-between lg:mx-40 lg:flex-row">
        <div className="">
          <p className="py-3 lg:mx-3 lg:inline-block">
            تاریخ انتشار: <span className="text-slate-400">هجده روز پیش</span>
          </p>
          <p className="py-3 lg:mx-3 lg:inline-block">
            آخرین ویرایش: <span className="text-slate-400">سیزده روز پیش</span>
          </p>

          <br className="hidden lg:block" />

          <p className="py-3 lg:mx-3 lg:inline-block">
            سطح مقاله: <span className="text-slate-400">پیشرفته</span>
          </p>
          <p className="py-3 lg:mx-3 lg:inline-block">
            دسته:
            <Link href={'#'}>
              <span className="mx-1 rounded-lg bg-slate-600 px-2 py-1 text-white transition-all hover:bg-orange-400">
                NFT
              </span>
            </Link>
            <Link href={'#'}>
              <span className="mx-1 rounded-lg bg-slate-600 px-2 py-1 text-white transition-all hover:bg-orange-400">
                بلاک چین
              </span>
            </Link>
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
            <option value="1.0">ویرایش 1.0</option>
            <option value="1.6">ویرایش 1.6</option>
            <option value="2.1">ویرایش 2.1</option>
            <option value="2.3">ویرایش 2.3</option>
          </select>
        </div>
      </div>

      <BlogPostStructure />
    </div>
  );
}

export default BlogPostHeader;
