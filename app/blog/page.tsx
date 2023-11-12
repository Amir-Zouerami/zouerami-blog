import { Metadata } from 'next';
import BlogPostCard from '../../components/Blog/BlogPostCard';
import Pagination from '@/components/pagination/Pagination';
import ArticleSearchSection from '@/components/Blog/ArticleSearchSection';

export const metadata: Metadata = {
  title: 'مقالات برنامه نویسی امیر زوارمی',
  description:
    'web development & programming articles published by Amir Zouerami',
};

function page() {
  return (
    <section className="container mx-auto max-w-[1200px]">
      <h1 className="my-10 text-center text-4xl font-black leading-loose">
        <span className="text-sky-400">مقالات</span> برنامه نویسی!
      </h1>

      <ArticleSearchSection />

      <div className="my-20">
        <BlogPostCard />
        <BlogPostCard />
        <BlogPostCard />
        <BlogPostCard />
      </div>

      <div>
        <Pagination />
      </div>
    </section>
  );
}

export default page;
