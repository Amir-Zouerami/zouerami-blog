'use client';

import Image from 'next/image';
import { Suspense, useEffect, useState } from 'react';
import { formatHeadlines } from '@/utility/utils';

import fingerTap from '@/icons/finger-tap.svg';

function BlogPostStructure({
  article_headlines,
}: {
  article_headlines: string;
}) {
  const [structureModal, setStructureModal] = useState(false);
  const [headlineContent, setHeadlineContent] = useState<boolean | string>(
    false
  );

  useEffect(() => {
    const rootDiv = document.createElement('div');
    rootDiv.innerHTML = article_headlines;

    const formattedHeadlines = formatHeadlines(rootDiv);

    setHeadlineContent(formattedHeadlines);
  }, [article_headlines]);

  return (
    <div className="relative mx-2 max-w-[500px] cursor-pointer">
      <p
        onClick={() => {
          setStructureModal(!structureModal);
        }}
        className="mb-3 rounded-xl bg-[#b2c6cc] p-5 dark:bg-[#3b404b]"
      >
        <Image
          src={fingerTap}
          width={25}
          alt="see article headlines and structure"
          className="svg-current-gray inline text-white dark:filter-none"
        />
        <span className="dark:text-white"> ساختار و سرتیتر های مقاله: </span>
      </p>

      {structureModal && (
        <>
          <div
          // TODO: transition?
            className="absolute w-full rounded-xl border bg-[#b2c6cc] p-5 hover:cursor-default dark:bg-[#31333c] max-md:leading-9"
            dangerouslySetInnerHTML={{
              __html: headlineContent ? headlineContent : 'در حال بارگذاری',
            }}
            onClick={() => setStructureModal(false)}
          ></div>
        </>
      )}
    </div>
  );
}

export default BlogPostStructure;
