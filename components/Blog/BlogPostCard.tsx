import dayjs from '@/utility/dayjs';

import Image from 'next/image';
import fire from '@/icons/fire.svg';
import calender from '@/icons/calender.svg';
import { ToFaNumbers, createFileURL, truncateSentence } from '@/utility/utils';
import ReadMore from './ReadMore';
import PostCardActions from './PostCardActions';

export interface BlogPostCardData {
  id: string;
  title: string;
  slug: string;
  cover: string;
  collectionId: string;
  summary: string;
  updated: string;
  viewcount: number;
}

function BlogPostCard({
  post,
  priority,
}: {
  post: BlogPostCardData;
  priority?: boolean;
}) {
  return (
    <div className="mx-auto mb-16 grid max-w-[97%] rounded-2xl bg-[#f1f5f9] dark:bg-gradient-to-r dark:from-[#4C4F61] dark:to-[#4C4F61] dark:text-white lg:max-w-[1000px] lg:grid-cols-12">
      {/* TODO: How About a BG of #e1eae8 */}

      <PostCardActions postId={post.id} title={post.title} slug={post.slug} />

      <div className="col-span-11 lg:col-span-6">
        <div className="pr-5 lg:p-0">
          <h2 className="py-5 text-xl font-black leading-8 text-[#4f4e4e] dark:text-white">
            {post.title}
          </h2>

          <p className="pb-5 pl-5 text-justify leading-8 text-[#5b5b5b] dark:text-white">
            {truncateSentence(post.summary, 100)}
          </p>
        </div>
        <div className="flex items-center justify-between px-5">
          <ReadMore slug={post.slug} />

          <div title="تاریخ آخرین ویرایش این مقاله">
            <Image
              src={calender}
              width={20}
              alt="date published icon"
              className="inline invert dark:invert-0"
            />
            <span className="mr-1">
              {ToFaNumbers(dayjs(post.updated).locale('fa').fromNow())}
            </span>
          </div>
          <div title="تعداد بازدید های این مقاله">
            <span className="mr-1">{post.viewcount}</span>
            <Image
              src={fire}
              width={20}
              alt="view count icon"
              className="verticalAlignSub inline invert dark:invert-0"
            />
          </div>
        </div>
      </div>

      <div className="-order-1 col-span-12 lg:order-1 lg:col-span-5">
        <Image
          src={createFileURL(post.id, post.collectionId, post.cover)}
          width={400}
          height={400}
          priority={priority ?? false}
          alt="sample post cover"
          className="h-full w-full rounded-t-2xl object-cover lg:rounded-l-2xl"
        />
      </div>
    </div>
  );
}

export default BlogPostCard;
