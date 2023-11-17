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
    // TODO: Hover Not Working!
    const rootDiv = document.createElement('div');
    rootDiv.innerHTML = article_headlines;

    const formattedHeadlines = formatHeadlines(rootDiv);

    setHeadlineContent(formattedHeadlines);
  }, [article_headlines]);

  return (
    <div className="mx-2 max-w-[500px] cursor-pointer">
      <p
        onClick={() => {
          setStructureModal(!structureModal);
        }}
        className="mb-3 rounded-xl bg-[#3b404b] p-5"
      >
        <Image
          src={fingerTap}
          width={25}
          alt="see article headlines and structure"
          className="inline text-white"
        />
        <span className="text-white"> ساختار و سرتیتر های مقاله: </span>
      </p>

      {structureModal && (
        <>
          <div
            className="rounded-xl border p-5 hover:cursor-default"
            dangerouslySetInnerHTML={{
              __html: headlineContent ? headlineContent : 'در حال بارگذاری',
            }}
          ></div>
        </>
      )}
    </div>
  );
}

export default BlogPostStructure;
