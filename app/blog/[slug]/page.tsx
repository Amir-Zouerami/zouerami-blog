export const revalidate = 1800;

import Image from 'next/image';
import BlogPostHeader from '@/components/Blog/BlogPostHeader';
import BlogPostContent from '@/components/Blog/BlogPostContent';
import CoulumnHelper from '@/components/Blog/CoulumnHelper';
import Comments from '@/components/Blog/Comments';
import { BlogPostData } from '@/utility/types';
import { createFileURL } from '@/utility/utils';
import Pocketbase from 'pocketbase';
import { Metadata } from 'next';
import { Toaster } from 'react-hot-toast';

interface SingleBlogPostParam {
  params: { slug: string };
}

const getPost = async (postSlug: string) => {
  let post: BlogPostData;

  try {
    const pb = new Pocketbase(process.env.NEXT_PUBLIC_PB_DOMAIN);
    pb.autoCancellation(false);

    await pb.admins.authWithPassword(
      process.env.PB_ADMIN_EM as string,
      process.env.PB_ADMIN_PS as string
    );

    post = await pb
      .collection('posts')
      .getFirstListItem<BlogPostData>(
        pb.filter('slug = {:slug} && published = true', { slug: postSlug }),
        {
          expand: 'post_categories, view',
          skipTotal: true,
        }
      );
    return post;
  } catch (error) {
    console.log('getPost func failed', error);
    throw new Error('cached getPost func failed');
  }
};

export async function generateMetadata({
  params,
}: SingleBlogPostParam): Promise<Metadata> {
  let post: BlogPostData = await getPost(params.slug);

  return {
    title: post.title,
    description: post.summary,
    openGraph: {
      title: post.title,
      description: post.summary,
      images: [createFileURL(post.id, post.collectionId, post.cover)],
      url: `/blog/${post.slug}`,
      type: 'article',
      locale: 'fa_IR',
      authors: 'امیر زوارمی',
      publishedTime: `${post.updated}`,
    },
  };
}

export async function generateStaticParams() {
  let allPosts: BlogPostData[];

  try {
    const pb = new Pocketbase(process.env.NEXT_PUBLIC_PB_DOMAIN);
    await pb.admins.authWithPassword(
      process.env.PB_ADMIN_EM as string,
      process.env.PB_ADMIN_PS as string
    );

    allPosts = await pb.collection('posts').getFullList<BlogPostData>({
      filter: 'published = true',
    });

    return allPosts.map(post => ({
      slug: post.slug,
    }));
  } catch (error) {
    console.log('generateStaticParams func failed', error);
    throw new Error('cached getPosts func failed');
  }
}

async function page({ params }: SingleBlogPostParam) {
  const { slug } = params;
  let post: BlogPostData = await getPost(slug);

  return (
    <div className="mx-auto mt-20 max-w-[95%] lg:max-w-[1100px]">
      <div className="relative mx-auto max-w-[900px]">
        <Image
          src={createFileURL(post.id, post.collectionId, post.cover)}
          // This abomination of a code is because of next.js. @see: https://stackoverflow.com/a/73618982/13218429
          width={0}
          height={0}
          sizes="100vw"
          // this prevents layout shift (knowing image size in advance)
          style={{ width: '900', height: '450' }}
          alt={post.cover_alt}
          priority
          className="h-full w-full rounded-3xl object-cover"
        />
      </div>

      <CoulumnHelper postId={post.id} title={post.title} />

      <BlogPostHeader
        title={post.title}
        article_version={post.article_version}
        viewId={post.expand.view.id}
        categories={post.expand.post_categories}
        skill_level={post.skill_level}
        updated={post.updated}
        created={post.created}
        article_headlines={post.article_headlines}
      />

      <BlogPostContent
        content={post.content}
        categories={post.expand.post_categories}
        slug={post.slug}
      />

      <Comments slug={post.slug} postId={post.id} />

      <Toaster />
    </div>
  );
}

export default page;
