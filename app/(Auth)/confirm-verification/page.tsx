export const fetchCache = 'default-no-store';

import EmailConfirmation from '@/components/Auth/EmailConfirmation';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'تایید حساب کاربری',
  description: 'این صفحه برای تایید ایمیل ارائه شده در حساب کاربری شما است.',
};

function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  if (!searchParams.token || typeof searchParams.token !== 'string') {
    throw new Error('TOKEN NOT PRESENT');
  }

  return <EmailConfirmation token={searchParams.token} />;
}

export default Page;
