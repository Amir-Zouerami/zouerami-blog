import Image from 'next/image';
import React, { ReactNode } from 'react';

import link from '@/icons/link.svg';

function BlogHeading({
  children,
  id,
  href,
}: {
  children: ReactNode;
  id?: string;
  href: string;
}) {
  return (
    <a className="flex" href={href} id={`${id ?? null}`}>
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
      <h2 className="my-10 inline-block text-2xl font-black md:text-3xl">
        {children}
      </h2>
    </a>
  );
}

export default BlogHeading;
