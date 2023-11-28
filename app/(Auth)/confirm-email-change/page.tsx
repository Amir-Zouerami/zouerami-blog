import EmailChange from '@/components/Auth/EmailChange';

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'تغییر آدرس ایمیل حساب کاربری',
  description:
    'در این صفحه می توانید آدرس ایمیل حساب کاربری خودتان را تغییر دهید',
};

function Page() {
  return <EmailChange />;
}

export default Page;
