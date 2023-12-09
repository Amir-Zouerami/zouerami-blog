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
        sortIndex === '?sort=views' && 'w-full lg:mx-3 lg:w-auto'
      } reactiveButton inline-block rounded-xl  from-[#2c343e]  to-[#4a5561] px-6 py-3 text-[#505050] shadow-xl shadow-gray-300 
     dark:bg-[#4d5061] dark:bg-gradient-to-r dark:from-[#4d5061] dark:text-white dark:shadow-none ${classes}`}
    >
      {children}
    </Link>
  );
}

export default FastSortButton;
