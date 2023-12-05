'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';

interface NavLink {
  children: ReactNode;
  href: string;
}

function NavLink({ children, href }: NavLink) {
  const pathName = usePathname();

  return (
    <li>
      <Link
        href={href}
        className={`${
          pathName === href ? 'activeDesktop' : ''
        } mr-0 rounded-[10px] px-4 py-2 font-semibold reactiveButton`}
      >
        {children}
      </Link>
    </li>
  );
}

export default NavLink;
