import './globals.css';
import type { Metadata } from 'next';
import { Nav } from '@/components/layout/nav';

export const metadata: Metadata = {
  title: 'GlobeTip 2026',
  description: 'Premium WM 2026 Tipp-Spiel',
  manifest: '/manifest.json',

  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
    shortcut: '/favicon.ico'
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de" className="dark">
      <body className="min-h-screen bg-stadium-radial pitch-lines">
  <Nav />

  {children}

  <footer className="mt-12 pb-8">
    <div className="flex flex-col items-center justify-center opacity-70">
      <img
        src="/frankg-logo.png"
        alt="Frank G"
        className="h-10 w-auto"
      />
      <span className="mt-2 text-xs text-white/40">
        Created by Frank G
      </span>
    </div>
  </footer>
</body>
