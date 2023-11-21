// TODO: CLEAN UP
// export const dynamic = 'force-dynamic';
// export const fetchCache = 'default-no-store';
export const revalidate = 1800;

import Image from 'next/image';
import BlogPostHeader from '@/components/Blog/BlogPostHeader';
import BlogPostContent from '@/components/Blog/BlogPostContent';
import CoulumnHelperDesktop from '@/components/Blog/CoulumnHelperDesktop';
import CoulumnHelperMobile from '@/components/Blog/CoulumnHelperMobile';
import Comments from '@/components/Blog/Comments';
import { BlogPostData } from '@/utility/types';
import { createFileURL } from '@/utility/utils';
import Pocketbase from 'pocketbase';
import { Metadata } from 'next';
import { cache } from 'react';

interface SingleBlogPostParam {
  params: { slug: string };
}

const getPosts = cache(async (postSlug: string) => {
  const pb = new Pocketbase(process.env.NEXT_PUBLIC_PB_DOMAIN);
  // pb.autoCancellation(false);
  let post: BlogPostData;

  try {
    await pb.admins.authWithPassword(
      process.env.PB_ADMIN_EM as string,
      process.env.PB_ADMIN_PS as string
    );

    post = await pb
      .collection('posts')
      .getFirstListItem<BlogPostData>(
        pb.filter('slug = {:slug}', { slug: postSlug }),
        {
          expand: 'post_categories, comments, comments.user_id',
          skipTotal: true,
        }
      );

    return post;
  } catch (error) {
    console.log('cached getPosts func failed', error);
    throw new Error('cached getPosts func failed');
  }
});

export async function generateMetadata({
  params,
}: SingleBlogPostParam): Promise<Metadata> {
  let post: BlogPostData = await getPosts(params.slug);

  return {
    title: post.title,
    // openGraph: {
    //   images: ['/some-specific-page-image.jpg', ...previousImages],
    // },
  };
}

async function page({ params }: SingleBlogPostParam) {
  let post: BlogPostData = await getPosts(params.slug);
  console.log('INSIDEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE');

  return (
    <div className="mx-auto mt-20 max-w-[95%] lg:max-w-[1200px]">
      <div className="relative mx-auto max-w-[900px]">
        <Image
          src={createFileURL(post.id, post.collectionId, post.cover)}
          width={900}
          height={450}
          alt="blog post cover"
          className="h-full w-full rounded-3xl object-cover"
        />
      </div>

      <CoulumnHelperDesktop />
      <CoulumnHelperMobile />

      <BlogPostHeader
        title={post.title}
        article_version={post.article_version}
        viewcount={post.viewcount}
        categories={post.expand.post_categories}
        skill_level={post.skill_level}
        updated={post.updated}
        created={post.created}
        article_headlines={post.article_headlines}
      />

      <BlogPostContent
        content={post.content}
        categories={post.expand.post_categories}
      />

      <Comments slug={post.slug} postId={post.id} />
    </div>
  );
}

export default page;
