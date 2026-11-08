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
});

const archivoBlack = Archivo_Black({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-archivo-black',
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
});

const silkscreen = Silkscreen({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-silkscreen',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Build with AI: Anybody Can Code — BSSRV',
  description:
    'A free, beginner-friendly two-part workshop at Birangana Sati Sadhani Rajyik Vishwavidyalaya (BSSRV), Golaghat, Assam. Day 1: Thursday, 12 November 2026 (tentative).',
  openGraph: {
    title: 'Build with AI: Anybody Can Code — BSSRV',
    description:
      'Something is building at BSSRV. A free, beginner-friendly two-part workshop at Birangana Sati Sadhani Rajyik Vishwavidyalaya (BSSRV), Golaghat, Assam. Day 1: Thursday, 12 November 2026 (tentative).',
    type: 'website',
    siteName: 'Build with AI: Anybody Can Code',
    images: [
      {
        url: '/assets/aistudio/WhatsApp_Image_2026-10-29_at_11.32.56_AM_24b39baa.jpeg',
        width: 1080,
        height: 1350,
        alt: 'Build with AI: Anybody Can Code — BSSRV Workshop Poster',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Build with AI: Anybody Can Code — BSSRV',
    description:
      'Something is building at BSSRV. Free, beginner-friendly two-part AI workshop at BSSRV, Golaghat, Assam (Day 1: Thursday, 12 November 2026 - tentative).',
    images: [
      '/assets/aistudio/WhatsApp_Image_2026-10-29_at_11.32.56_AM_24b39baa.jpeg',
    ],
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
