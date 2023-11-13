// TODO: ONLY FOR DEVELOPMENT
// export const revalidate = 0;
// export const dynamic = 'force-dynamic';
export const fetchCache = 'default-no-store';

import { Metadata } from 'next';
import BlogPostCard from '../../components/Blog/BlogPostCard';
import Pagination from '@/components/pagination/Pagination';
import ArticleSearchSection from '@/components/Blog/ArticleSearchSection';
import { BlogPostData } from '@/utility/types';

import Pocketbase from 'pocketbase';

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

  try {
    let sortIndex;

    switch (searchParams.sort) {
      case 'views':
        sortIndex = '-viewcount';
        break;

      case 'lastUpdated':
        sortIndex = '-updated';
        break;

      default:
        sortIndex = '+created';
        break;
    }

    const pb = new Pocketbase(process.env.NEXT_PUBLIC_PB_DOMAIN);
    await pb.admins.authWithPassword(
      process.env.PB_ADMIN_EM as string,
      process.env.PB_ADMIN_PS as string
    );

    posts = await pb.collection('posts').getList<BlogPostData>(1, 3, {
      sort: sortIndex,
      fields: 'id, title, slug, summary, cover, collectionId, viewcount, updated',
      filter: pb.filter('title ~ {:title}', {
        title: searchParams.search ?? '',
      }),
      cache: 'no-store',
    });

    // console.log(posts);
  } catch (error) {
    console.log('ERROR FETCHING POSTS');
    throw new Error(JSON.stringify(error));
  }

  // console.log(posts);
  // console.log(
  //   // @ts-ignore
  //   'FUUUUUUUUUUUUUUUUUUUUULLLLL',
  //   `http://127.0.0.1:8090/api/files/${posts.items[0].collectionId}/${posts.items[0].id}/${posts.items[0].cover}`
  // );

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
        {/* [
          <BlogPostCard
          blogPostData={{
            title: 'some title here',
            slug: 'the-id-to-read',
            article_headlines: 'testing',
            article_version: 1,
            content: 'the content is here',
            cover: 'some image cover here as well',
            created: '2023-11-03 08:11:30.579Z',
            updated: '2023-11-03 08:11:30.579Z',
          }}
        />, 
        <BlogPostCard
          blogPostData={{
            title: 'some title here',
            slug: 'the-id-to-read',
            article_headlines: 'testing',
            article_version: 1,
            content: 'the content is here',
            cover: 'some image cover here as well',
            created: '2023-11-03 08:11:30.579Z',
            updated: '2023-11-03 08:11:30.579Z',
          }}
        />
        ] */}
        {/* <BlogPostCard />
        <BlogPostCard />
        <BlogPostCard /> */}
      </div>

      <div>
        <Pagination />
      </div>
    </section>
  );
}

export default page;
