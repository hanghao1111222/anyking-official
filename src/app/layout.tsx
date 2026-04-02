import type { Metadata } from 'next';
import { Inspector } from 'react-dev-inspector';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://www.anyking.official.com'),
  title: {
    default: 'AnyKing | Professional Laptop Monitor Extender',
    template: '%s | AnyKing',
  },
  description:
    'AnyKing professional laptop screen extenders - Boost your productivity with our 14" FHD 1080P IPS dual and triple screen extensions. Perfect for developers, traders, and creators.',
  keywords: [
    'AnyKing',
    'Laptop Screen Extender',
    'Triple Screen Extender',
    'Portable Monitor',
    'Dual Screen Extender',
    'Productivity Tool',
    'FHD 1080P Monitor',
    'IPS Display',
    'Remote Work',
    'Developer Tools',
  ],
  authors: [{ name: 'AnyKing Team', url: 'https://www.anyking.official.com' }],
  generator: 'Next.js',
  // icons: {
  //   icon: '',
  // },
  openGraph: {
    title: 'AnyKing | Expand Your Workspace Anytime, Anywhere',
    description:
      'Boost your productivity with the AnyKing professional laptop screen extender. Dual and triple screen setups designed for high-performance work.',
    url: 'https://www.anyking.official.com',
    siteName: 'AnyKing',
    locale: 'en_US',
    type: 'website',
    // images: [
    //   {
    //     url: '/brand-banner.jpg',
    //     width: 1200,
    //     height: 630,
    //     alt: 'AnyKing - Power Your Workflow',
    //   },
    // ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AnyKing | Professional Laptop Monitor Extender',
    description:
      'Expand your laptop with 14" FHD 1080P IPS screens. Plug and play productivity for professionals.',
    // images: ['/brand-banner.jpg'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isDev = process.env.NODE_ENV !== 'production';

  return (
    <html lang="en">
      <body className={`antialiased`}>
        {isDev && <Inspector />}
        {children}
      </body>
    </html>
  );
}
