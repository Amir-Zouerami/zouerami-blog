import './globals.css';
import { IranYekan } from './(utility)/font';
import { Providers } from './provider';
import Navbar from '@/components/Nav/Navbar';
import Footer from '@/components/Footer/Footer';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      suppressHydrationWarning
      lang="fa"
      className={`${IranYekan.variable} overflow-x-hidden text-sm`}
    >
      <body className="dark:bg-[#31333c] dark:text-white">
        <Providers>
          <header>
            <Navbar />
          </header>

          <main>{children}</main>

          <Footer />
        </Providers>
      </body>
    </html>
  );
}
