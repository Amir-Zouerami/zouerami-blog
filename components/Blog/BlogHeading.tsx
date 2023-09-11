import Image from 'next/image';
import Link from 'next/link';
import React, { ReactNode } from 'react';

import link from '@/icons/link.svg';

function BlogHeading({ children, id }: { children: ReactNode; id?: string }) {
  return (
    <Link href={''} id={`${id ?? null}`}>
      <Image width={20} src={link} alt="" className="ml-2 inline-block" />
      <h2 className="mb-10 inline-block text-3xl font-black">{children}</h2>
    </Link>
  );
}

export default BlogHeading;
