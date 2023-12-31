import './globals.css';
import { IranYekan } from '@/utility/font';
import { ThemeProviders } from './themeProvider';
import Navbar from '@/components/Nav/Navbar';
import Footer from '@/components/Footer/Footer';
import { JotaiProviders } from './jotaiProvider';
import { Metadata } from 'next';

export const metadata: Metadata = {
  metadataBase: new URL('http://localhost:3000'),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <JotaiProviders>
      <html
        suppressHydrationWarning
        lang="fa"
        className={`${IranYekan.variable} overflow-x-hidden scroll-smooth text-sm`}
      >
        <body className="dark:bg-[#31333c] dark:text-white">
          <ThemeProviders>
            <header>
              <Navbar />
            </header>

            <main>{children}</main>

            <Footer />
          </ThemeProviders>
        </body>
      </html>
    </JotaiProviders>
  );
}
