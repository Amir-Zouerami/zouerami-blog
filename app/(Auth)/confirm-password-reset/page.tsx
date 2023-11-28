export const fetchCache = 'default-no-store';

import PasswordReset from '@/components/Auth/PasswordReset';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'تغییر رمز عبور',
  description: 'در این صفحه می توانید رمز عبور حساب خود را تغییر دهید.',
};

function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
    
  if (!searchParams.token || typeof searchParams.token !== 'string') {
    throw new Error('TOKEN NOT PRESENT');
  }

  return <PasswordReset token={searchParams.token} />;
}

export default Page;
