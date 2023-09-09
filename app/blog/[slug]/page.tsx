import Image from 'next/image';

import postcover from '@/public/sample-blog-post-cover-main-page.webp';

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
      <p>{params.slug}</p>
    </div>
  );
}

export default page;
