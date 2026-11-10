import type { Metadata } from 'next';
import {
  Pinyon_Script,
  Archivo_Black,
  Space_Grotesk,
  Silkscreen,
} from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import './globals.css';

const pinyonScript = Pinyon_Script({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-pinyon-script',
  display: 'swap',
  preload: true,
});

const archivoBlack = Archivo_Black({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-archivo-black',
  display: 'swap',
  preload: true,
});

const spaceGrotesk = Space_Grotesk({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
  preload: true,
});

const silkscreen = Silkscreen({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-silkscreen',
  display: 'swap',
  preload: false,
});

const SITE_TITLE = 'Build with AI: Anybody Can Code | BSSRV Golaghat';
const SITE_DESCRIPTION =
  'A free, beginner-friendly AI workshop for BSSRV students. Build a working project with AI tools. Day 1: Friday, 13 November 2026.';

export const metadata: Metadata = {
  metadataBase: new URL('https://www.buildwai.tech'),
  alternates: {
    canonical: '/',
  },
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: '/',
    type: 'website',
    locale: 'en_IN',
    siteName: 'Build with AI: Anybody Can Code',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Build with AI: Anybody Can Code — Day 1: Friday, 13 November 2026 at BSSRV Golaghat',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: ['/og-image.jpg'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${pinyonScript.variable} ${archivoBlack.variable} ${spaceGrotesk.variable} ${silkscreen.variable}`}
    >
      <body
        suppressHydrationWarning
        className="min-h-screen bg-[#F4F0E6] text-[#111111] font-body antialiased selection:bg-[#F5A623] selection:text-[#111111]"
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
