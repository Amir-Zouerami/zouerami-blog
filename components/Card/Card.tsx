import Image from 'next/image';
import newsRedis from '@/public/news-redis.jpg';
import newsPostgres from '@/public/news-postgres.jpg';
import Link from 'next/link';
import { BlogPostData } from '@/utility/types';
import { createFileURL, truncateSentence } from '@/utility/utils';

function Card({ post }: { post: BlogPostData }) {
  return (
    <div className="p-5 xl:max-w-[80%]">
      <div className="min-w-52 mx-auto mb-5 overflow-hidden">
        <Image
          src={createFileURL(post.id, post.collectionId, post.cover)}
          alt={post.cover_alt}
          width={0}
          height={0}
          sizes="100%"
          className="w-full rounded-2xl"
        />
      </div>

      <div className="my-8">
        <h2 className="mb-3 text-xl font-bold leading-9">{post.title}</h2>
        <p className="text-justify leading-8 2xl:leading-10">
          {truncateSentence(post.summary, 63)}
        </p>
      </div>

      <div className="my-14 text-center">
        <Link
          className="reactiveButton inline-block max-w-full rounded-md bg-[#1f2124] px-10 py-5
          font-bold text-white dark:bg-[#e25687]"
          href={'http://localhost:3000/blog/' + post.slug}
        >
          مطالعه‌ی این مقاله
        </Link>
      </div>
    </div>
  );
}

export default Card;
