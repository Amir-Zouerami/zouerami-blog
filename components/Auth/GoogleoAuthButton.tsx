'use client';
export const fetchCache = 'default-no-store';

import google from '@/icons/google.svg';

import Image from 'next/image';
import Link from 'next/link';
import { AuthProviderInfo } from 'pocketbase';
import { useEffect } from 'react';

interface GoogleoAuthButtonProps {
  googleoAuth: AuthProviderInfo | undefined;
  text: 'LOGIN' | 'SIGNUP';
}

function GoogleoAuthButton({ googleoAuth, text }: GoogleoAuthButtonProps) {
  useEffect(() => {
    localStorage.removeItem('oAuth_provider');
  }, []);

  return (
    <Link
      href={
        googleoAuth?.authUrl +
        encodeURIComponent('https://zouerami.dev/oauth2-redirect')
      }
      onClick={() => {
        localStorage.setItem('oAuth_provider', JSON.stringify(googleoAuth));
      }}
      className="reactiveButton w-full rounded-xl bg-gradient-to-r from-[#6BAEEB] to-[#7B68EE] p-4"
    >
      <Image
        src={google}
        width={25}
        alt="signup with google"
        className="ml-3 inline-block"
      />
      <span className="font-bold text-white">
        {text === 'SIGNUP'
          ? 'ثبت نام بــا حســــاب گوگــــــــل'
          : 'ورود بــا حســــاب گوگــــــــل'}
      </span>
    </Link>
  );
}

export default GoogleoAuthButton;
