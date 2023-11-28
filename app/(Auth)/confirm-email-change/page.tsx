import EmailChange from '@/components/Auth/EmailChange';

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'تغییر آدرس ایمیل حساب کاربری',
  description:
    'در این صفحه می توانید آدرس ایمیل حساب کاربری خودتان را تغییر دهید',
};

function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  if (!searchParams.token || typeof searchParams.token !== 'string') {
    throw new Error('TOKEN NOT PRESENT');
  }

  return <EmailChange token={searchParams.token} />;
}

export default Page;
