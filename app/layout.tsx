import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Social Media Ad Spy - Facebook & Instagram Intelligence Tool',
  description: 'Spy on competitor Facebook and Instagram ads in real-time. Discover their creative strategies, estimated spend, and winning campaigns instantly.',
  keywords: 'facebook ads, instagram ads, competitor analysis, ad intelligence, social media marketing, ad spy tool',
  authors: [{ name: 'CommerceInk' }],
  openGraph: {
    title: 'Social Media Ad Spy - See Every Ad Your Competitors Are Running',
    description: 'Get instant access to competitor Facebook & Instagram ads with performance insights and spend estimates',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang=\"en\">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}