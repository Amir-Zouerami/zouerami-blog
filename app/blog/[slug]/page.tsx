export const fetchCache = 'default-no-store';

import Image from 'next/image';
import BlogPostHeader from '@/components/Blog/BlogPostHeader';
import BlogPostContent from '@/components/Blog/BlogPostContent';
import CoulumnHelperDesktop from '@/components/Blog/CoulumnHelperDesktop';
import CoulumnHelperMobile from '@/components/Blog/CoulumnHelperMobile';
import Comments from '@/components/Blog/Comments';
import { BlogPostData } from '@/utility/types';
import { notFound } from 'next/navigation';
import { createFileURL } from '@/utility/utils';
import { adminPB } from '@/utility/pocketbase';

interface SingleBlogPostParam {
  params: { slug: string };
}

async function page({ params }: SingleBlogPostParam) {
  let post: BlogPostData;

  try {
    const pb = await adminPB();

    post = await pb
      .collection('posts')
      .getFirstListItem<BlogPostData>(
        pb.filter('slug = {:slug}', { slug: params.slug }),
        {
          expand: 'post_categories, comments, comments.user_id',
          skipTotal: true,
        }
      );
  } catch (error) {
    console.log('No Such Post', error);
    return notFound();
  }

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
