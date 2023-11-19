// TODO: ONLY FOR DEVELOPMENT
// export const revalidate = 1800;
export const fetchCache = 'default-no-store';

import { Metadata } from 'next';
import { BlogPostData } from '@/utility/types';

import Pagination from '@/components/pagination/Pagination';
import ArticleSearchSection from '@/components/Blog/ArticleSearchSection';
import BlogPostCard from '@/components/Blog/BlogPostCard';
import { adminPB } from '@/utility/pocketbase';

export const metadata: Metadata = {
  title: 'مقالات برنامه نویسی امیر زوارمی',
  description:
    'web development & programming articles published by Amir Zouerami',
};

async function page({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  let posts;
  let currentPage = searchParams.page ? Number(searchParams.page) : 1;

  try {
    let sortIndex;

    switch (searchParams.sort) {
      case 'views':
        sortIndex = '-viewcount';
        break;

      case 'lastUpdated':
        sortIndex = '-updated';
        break;

      case 'lastCreated':
        sortIndex = '+created';
        break;

      default:
        sortIndex = '+created';
        break;
    }

    const pb = await adminPB();
    let pbFilter;

    if (searchParams.category) {
      pbFilter = pb.filter('post_categories.category ?= {:category}', {
        category: searchParams.category,
      });
    } else if (searchParams.search) {
      pbFilter = pb.filter('title ~ {:title}', {
        title: searchParams.search,
      });
    }

    posts = await pb.collection('posts').getList<BlogPostData>(currentPage, 5, {
      sort: sortIndex,
      fields:
        'id, title, slug, summary, cover, collectionId, viewcount, updated',
      filter: pbFilter ?? '',
    });
  } catch (error) {
    console.log('ERROR FETCHING POSTS');
    throw new Error(JSON.stringify(error));
  }

  return (
    <section className="container mx-auto max-w-[1200px]">
      <h1 className="my-10 text-center text-4xl font-black leading-loose">
        <span className="text-sky-400">مقالات</span> برنامه نویسی!
      </h1>

      <ArticleSearchSection />

      <div className="my-20">
        {posts.items.map(post => (
          <BlogPostCard
            key={post.id}
            post={{
              id: post.id,
              collectionId: post.collectionId,
              title: post.title,
              slug: post.slug,
              summary: post.summary,
              cover: post.cover,
              updated: post.updated,
              viewcount: post.viewcount,
            }}
          />
        ))}
      </div>

      <div>
        <Pagination page={posts.page} totalPages={posts.totalPages} />
      </div>
    </section>
  );
}

export default page;
