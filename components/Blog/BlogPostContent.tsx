'use server';

import SimilarArticles from './SimilarArticles';
import ShowCommentsButton from './ShowCommentsButton';
import BlogPostDownloadButton from './BlogPostDownloadButton';

import { parseOptions } from '@/utility/html-react-parser';
import parse from 'html-react-parser';
import { PostCategory } from '@/utility/types';

function BlogPostContent({
  content,
  categories,
}: {
  content: string;
  categories: PostCategory[];
}) {
  const parsedHTML = parse(content, parseOptions);

  return (
    <>
      <div className="mx-auto max-w-[95%] text-justify leading-[3]  2xl:text-lg 2xl:leading-10">
        {parsedHTML}
      </div>

      <div className="mb-32 mt-10">
        <BlogPostDownloadButton />
        <ShowCommentsButton />
      </div>

      <div>
        <p className="text-center text-2xl font-bold text-slate-400 md:pr-5 md:text-start">
          شاید از این مقالات نیز خوشتان بیاید:
        </p>

        <SimilarArticles categories={categories} />
      </div>
    </>
  );
}

export default BlogPostContent;
