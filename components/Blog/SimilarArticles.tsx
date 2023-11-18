export const dynamic = 'force-dynamic';

import Image from 'next/image';

import Link from 'next/link';
import Pocketbase from 'pocketbase';
import { BlogPostData, PostCategory } from '@/utility/types';
import { createFileURL, truncateSentence } from '@/utility/utils';

async function SimilarArticles({ categories }: { categories: PostCategory[] }) {
  let posts;

  try {
    const pb = new Pocketbase(process.env.NEXT_PUBLIC_PB_DOMAIN);
    await pb.admins.authWithPassword(
      process.env.PB_ADMIN_EM as string,
      process.env.PB_ADMIN_PS as string
    );

    const { category } = categories[0];

    posts = await pb.collection('posts').getList<BlogPostData>(1, 2, {
      cache: 'no-store',
      filter: pb.filter('post_categories.category ?= {:category}', {
        category,
      }),
    });
  } catch (error) {
    console.log(error);
    throw new Error('POSTS COULD NOT BE RETRIEVED');
  }
  return (
    <div className="mt-10 flex flex-col items-center justify-around md:flex-row">
      {posts?.items.map(post => {
        return (
          <div key={post.id} className="my-10 rounded-2xl md:mx-5 lg:mx-10">
            <Image
              src={createFileURL(post.id, post.collectionId, post.cover)}
              width={600}
              height={600}
              className="mb-5 w-full rounded-2xl"
              alt="sample"
            />
            <h2 className="p-3 text-xl font-black">{post.title}</h2>
            <p className="px-2 pb-5 text-justify text-base leading-9">
              {truncateSentence(post.summary, 70)}
            </p>
            <div className="mt-5 text-center">
              <Link
                href={'/blog/' + post.slug}
                className="w-10 rounded-xl bg-gradient-to-r from-[#5AA68C] to-[#C0B35F] px-12 py-4"
              >
                <span className="pr-2 font-bold text-white">مطالعه مقاله</span>
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default SimilarArticles;
