import ProfileMotherComponent from '@/components/userProfile/ProfileMotherComponent';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'تنظیمات پروفایل کاربری',
  description:
    'این صفحه حاوی اطلاعات کاربری شما از قبیل ایمیل، تصویر پروفایل، نام کاربری و غیره است.',
};

function Page() {
  return <ProfileMotherComponent />;
}

export default Page;
