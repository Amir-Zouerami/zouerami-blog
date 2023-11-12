// 'use client';

import { ReactNode } from 'react';

function FastSortButton({ children }: { children: ReactNode }) {
  return (
    <button
      className="rounded-xl bg-gradient-to-r from-[#2c343e] to-[#4a5561] px-6 py-3
    text-white hover:opacity-[.6] dark:bg-[#4d5061] dark:from-[#4d5061]"
    >
      {children}
    </button>
  );
}

export default FastSortButton;
