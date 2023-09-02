'use client';

import Link from 'next/link';
import Image from 'next/image';

import moon from '@/icons/moon.svg';
import sun from '@/icons/sun.svg';
import loading from '@/icons/loading.svg';

import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';

function DarkMode() {
  const { theme, setTheme } = useTheme();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <Image src={loading} width={25} alt="loading theme button" />;
  }

  return (
    <Link
      href={'#'}
      className="transition-transform hover:scale-150 hover:animate-pulse dark:invert"
      onClick={() => {
        setTheme(theme === 'light' || theme === undefined ? 'dark' : 'light');
      }}
    >
      {theme === 'light' ? (
        <Image src={moon} alt="set theme to dark mode" width={25} />
      ) : (
        <Image src={sun} alt="set theme to light mode" width={25} />
      )}
    </Link>
  );
}

export default DarkMode;
