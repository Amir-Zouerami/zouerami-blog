import dayjs from '@/utility/dayjs';

import Image from 'next/image';
import Link from 'next/link';
import { BlogPostData, searchParams } from '@/utility/types';

import postCover from '@/public/sample-post-cover.png';
import heart from '@/icons/heart.svg';
import bookmark from '@/icons/bookmark.svg';
import share from '@/icons/share.svg';
import report from '@/icons/report.svg';
import fire from '@/icons/fire.svg';
import calender from '@/icons/calender.svg';
import { ToFaNumbers, createFileURL, truncateSentence } from '@/utility/utils';

export interface BlogPostCardData {
  id: string;
  title: string;
  slug: string;
  cover: string;
  collectionId: string;
  summary: string;
  // created: string;
  updated: string;
  viewcount: number;
}

function BlogPostCard({
  post, // searchParams,
}: {
  post: BlogPostCardData;
  // searchParams: searchParams;
}) {
  // console.log(post);

  return (
    <div className="mx-auto mb-16 grid max-w-[97%] rounded-2xl bg-[#f1f5f9] dark:bg-gradient-to-r dark:from-[#4C4F61] dark:to-[#4C4F61] dark:text-white lg:max-w-[1000px] lg:grid-cols-12">
      {/* TODO: How About a BG of #e1eae8 */}
      {/* <div className="mx-auto mb-16 grid max-w-[97%] rounded-2xl bg-[#e1eae8] dark:bg-gradient-to-r dark:from-[#4C4F61] dark:to-[#4C4F61] dark:text-white lg:max-w-[1000px] lg:grid-cols-12"> */}
      <div className="col-span-12 my-auto hidden justify-center gap-10 px-5 lg:col-span-1  lg:mx-auto lg:flex lg:flex-col lg:px-0">
        <Link href={'#'} className="svg-red mx-1">
          <Image
            src={heart}
            width={35}
            alt="like the post"
            className="svg-current-color invert dark:invert-0"
          />
        </Link>
        <Link href={'#'} className="svg-yellow mx-1">
          <Image
            src={bookmark}
            width={35}
            alt="bookmark the post"
            className="svg-current-color invert dark:invert-0"
          />
        </Link>
        <Link href={'#'} className="svg-blue mx-1">
          <Image
            src={share}
            width={35}
            alt="share the post"
            className="svg-current-color invert dark:invert-0"
          />
        </Link>
        <Link href={'#'} className="svg-orange mx-1">
          <Image
            src={report}
            width={35}
            alt="report the post"
            className="svg-current-color invert dark:invert-0"
          />
        </Link>
      </div>

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
          <Link
            href={'http://localhost:3000/blog/' + post.slug}
            className="inline-block rounded-t-2xl bg-gradient-to-r from-[#A880C0] to-[#4CB8B2] px-5 py-4 font-black
            text-white hover:opacity-[0.6] dark:from-[#D93965] dark:to-[#EE8C68]"
          >
            مطالعه مقاله
          </Link>
          <div>
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
          <div>
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
          alt="sample post cover"
          className="h-full w-full rounded-t-2xl object-cover lg:rounded-l-2xl"
        />
      </div>
    </div>
  );
}

export default BlogPostCard;
