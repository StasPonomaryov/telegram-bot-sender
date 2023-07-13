import { Suspense } from 'react';
import Loading from './loading';
import Header from './components/Header';
import { Source_Code_Pro } from 'next/font/google';
import './globals.css';

const inter = Source_Code_Pro({ subsets: ['cyrillic-ext'] });

export const metadata = {
  title: 'Telegram Bot Sender',
  description: 'Send messages to Telegram users by using bot',
};

type RootLayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="uk">
      <body className={inter.className}>
        <Header />
        <Suspense fallback={<Loading />}>{children}</Suspense>
        <footer className="page-footer">&copy; Стас Пономарьов, 2023</footer>
      </body>
    </html>
  );
}
