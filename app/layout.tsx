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

        <footer className="mt-4 pb-16">
          <div className="flex justify-center">
            <img
              src="/frankg-logo.png"
              alt="Frank G"
              className="h-12 w-auto rounded-xl border border-white/10 bg-black/50 p-2 opacity-80 shadow-glow"
            />
          </div>
        </footer>
      </body>
    </html>
  );
}
