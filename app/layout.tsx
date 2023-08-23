import './globals.css';
import { IranYekan } from './(utility)/font';

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
