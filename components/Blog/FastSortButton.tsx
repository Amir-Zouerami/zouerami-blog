// 'use client';

import Link from 'next/link';
import { ReactNode } from 'react';

function FastSortButton({
  children,
  sortIndex,
  classes,
}: {
  children: ReactNode;
  sortIndex: '?sort=views' | '?sort=lastCreated' | '?sort=lastUpdated';
  classes?: string;
}) {
  return (
    <Link
      href={sortIndex}
      className={`${
        sortIndex === '?sort=views' ? 'w-full lg:mx-3 lg:w-auto' : ''
      }  inline-block rounded-xl bg-gradient-to-r from-[#2c343e] to-[#4a5561] px-6 
    py-3 text-white hover:opacity-[.6] dark:bg-[#4d5061] dark:from-[#4d5061] ${classes}`}
    >
      {children}
    </Link>
  );
}

export default FastSortButton;
