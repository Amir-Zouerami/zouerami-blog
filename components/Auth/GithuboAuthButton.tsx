'use client';
export const fetchCache = 'default-no-store';

import github from '@/icons/github.svg';

import Image from 'next/image';
import Link from 'next/link';
import { AuthProviderInfo } from 'pocketbase';
import { useEffect } from 'react';

interface GtihuboAuthButtonProps {
  githuboAuth: AuthProviderInfo | undefined;
  text: 'LOGIN' | 'SIGNUP';
}

function GithuboAuthButton({ githuboAuth, text }: GtihuboAuthButtonProps) {
  useEffect(() => {
    localStorage.removeItem('oAuth_provider');
  }, []);

  return (
    <Link
      href={
        githuboAuth?.authUrl +
        encodeURIComponent('https://zouerami.dev/oauth2-redirect')
      }
      className="reactiveButton w-full rounded-xl bg-gradient-to-r from-[#6BAEEB] to-[#7B68EE] p-4"
      onClick={() => {
        localStorage.setItem('oAuth_provider', JSON.stringify(githuboAuth));
      }}
    >
      <Image
        src={github}
        width={28}
        alt="signup with github"
        className="ml-3 inline-block invert"
      />
      <span className="font-bold text-white">
        {text === 'SIGNUP' ? 'ثبت نام با حساب گیت هاب' : 'ورود با حساب گیت هاب'}
      </span>
    </Link>
  );
}

export default GithuboAuthButton;
