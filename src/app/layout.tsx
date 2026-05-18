import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Creator Sponsor Pipeline — Centralize Sponsor Deal Management',
  description: 'The Creator Sponsor Pipeline centralizes sponsor deal intake, management, and reporting into a single platform, helping creators efficiently track deliverables and prove campaign ROI.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-zinc-50 antialiased`}>
        <div className="fixed top-0 left-0 right-0 z-50 bg-zinc-900 text-zinc-100 text-xs px-4 py-2 flex justify-between items-center">
          <span>⚡ Demo Mode — Creator Sponsor Pipeline · Built with NEXUS OS</span>
          <Link href="/dashboard" className="text-white hover:text-zinc-300 transition-colors">
            Open Dashboard →
          </Link>
        </div>
        <div className="pt-9">
          {children}
        </div>
      </body>
    </html>
  );
}