import Image from 'next/image';

import postcover from '@/public/sample-blog-post-cover-main-page.webp';
import BlogPostHeader from '@/components/Blog/BlogPostHeader';
import BlogPostContent from '@/components/Blog/BlogPostContent';
import CoulumnHelper from '@/components/Blog/CoulumnHelper';
import Comments from '@/components/Blog/Comments';

interface SingleBlogPost {
  params: { slug: string };
}

function page({ params }: SingleBlogPost) {
  return (
    <div className="mx-auto mt-20 max-w-[95%] lg:max-w-[1200px]">
      <div className="mx-auto max-w-[900px]">
        <Image
          src={postcover}
          alt="blog post cover"
          className="h-full w-full rounded-3xl object-cover"
        />
      </div>

      <CoulumnHelper />

      <BlogPostHeader />
      <BlogPostContent />

      <Comments />
    </div>
  );
}

export default page;
