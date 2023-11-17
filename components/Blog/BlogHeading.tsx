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
    <a href={href} id={`${id ?? null}`}>
      <Image width={20} src={link} alt="" className="ml-2 inline-block" />
      <h2 className="my-10 inline-block text-3xl font-black">{children}</h2>
    </a>
  );
}

export default BlogHeading;
