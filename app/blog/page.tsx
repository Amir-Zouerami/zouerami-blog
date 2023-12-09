export const revalidate = 1800;

import { Metadata } from 'next';
import { BlogPostData, PROJECT } from '@/utility/types';

import Pagination from '@/components/pagination/Pagination';
import ArticleSearchSection from '@/components/Blog/ArticleSearchSection';
import BlogPostCard from '@/components/Blog/BlogPostCard';
import Pocketbase from 'pocketbase';

export const metadata: Metadata = {
  title: 'مقالات برنامه نویسی امیر زوارمی',
  description:
    'web development & programming articles published by Amir Zouerami',
  openGraph: {
    title: 'مقالات برنامه نویسی امیر زوارمی',
    description: 'مجموعه ای از مقالات برنامه برنامه نویسی و دنیای تکنولوژی',
    images: ['/social-preview-for-blog.webp'],
    url: '/blog',
    type: 'website',
    locale: 'fa_IR',
  },
};

// export async function generateStaticParams() {
//   let allProjects: PROJECT[];

//   try {
//     const pb = new Pocketbase(process.env.NEXT_PUBLIC_PB_DOMAIN);

//     allProjects = await pb.collection('projects').getFullList<PROJECT>();

//     return allProjects.map(project => ({
//       slug: project.slug,
//     }));
//   } catch (error) {
//     console.log('generateStaticParams for projects failed', error);
//     throw new Error('generateStaticParams for projects failed');
//   }
// }

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

    const pb = new Pocketbase(process.env.NEXT_PUBLIC_PB_DOMAIN);

    await pb.admins.authWithPassword(
      process.env.PB_ADMIN_EM as string,
      process.env.PB_ADMIN_PS as string
    );

    let pbFilter;

    if (searchParams.category) {
      pbFilter = pb.filter(
        'post_categories.category ?= {:category} && published = true',
        {
          category: searchParams.category,
        }
      );
    } else if (searchParams.search) {
      pbFilter = pb.filter('title ~ {:title} && published = true', {
        title: searchParams.search,
      });
    }

    posts = await pb.collection('posts').getList<BlogPostData>(currentPage, 5, {
      sort: sortIndex,
      fields:
        'id, title, slug, summary, cover, collectionId, viewcount, updated',
      filter: pbFilter ?? 'published = true',
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
