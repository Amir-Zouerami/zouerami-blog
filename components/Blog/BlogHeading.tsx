import Image from 'next/image';
import React, { ReactNode } from 'react';

import link from '@/icons/link.svg';

function BlogHeading({
  children,
  id,
  href,
  as,
}: {
  children: ReactNode;
  id?: string;
  href: string;
  as: string;
}) {
  return (
    <div className="mb-5 mt-14 flex">
      <a href={href} id={`${id ?? null}`} className="flex">
        <Image
          // This abomination of a code is because of next.js. @see: https://stackoverflow.com/a/73618982/13218429
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: '20px', height: 'auto' }}
          src={link}
          alt=""
          className="ml-2 inline-block"
        />
        {as === 'h2' ? (
          <h2 className="inline-block text-right text-2xl font-black leading-10 md:text-3xl">
            {children}
          </h2>
        ) : (
          <h3 className="inline-block text-right text-2xl font-black leading-10 md:text-3xl">
            {children}
          </h3>
        )}
      </a>
    </div>
  );
}

export default BlogHeading;
