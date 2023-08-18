import './globals.css';
import type { Metadata } from 'next';
import { IranYekan } from './(utility)/font';

export const metadata: Metadata = {
  title: 'وبلاگ شخصی امیر زوارمی',
  description: 'Personal Blog for Amir Zouerami',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fa" className={IranYekan.variable}>
      <body className="dark:bg-[#31333c]">{children}</body>
    </html>
  );
}
