'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import {
  Trophy,
  CalendarDays,
  Landmark,
  BarChart3,
  ClipboardList,
  LogIn,
  LogOut,
  User
} from 'lucide-react';
import { createClient } from '@/lib/supabase-browser';

const items = [
  const items = [
  ['/dashboard', 'Dashboard', Trophy],
  ['/spielplan', 'Spielplan', CalendarDays],
  ['/stadien', 'Stadien', Landmark],
  ['/meine-tipps', 'Meine Tipps', ClipboardList],
  ['/profil', 'Profil', User],
  ['/leaderboard', 'Ranking', BarChart3]
] as const;

export function Nav() {
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    const supabase = createClient();

    supabase.auth.getUser().then(({ data }) => {
      setEmail(data.user?.email ?? null);
    });
  }, []);

  async function logout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    setEmail(null);
    window.location.href = '/';
  }

  return (
    <nav className="sticky top-0 z-40 border-b border-white/10 bg-pitch/75 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3">

        <Link href="/" className="flex shrink-0 items-center gap-3">
          <Image
            src="/icons/icon-192.png"
            alt="GlobeTip 2026"
            width={40}
            height={40}
            className="rounded-xl"
          />

          <span className="hidden text-xl font-black sm:inline">
            <span className="text-white">GlobeTip </span>
            <span className="text-green-400">2026</span>
          </span>
        </Link>

        <div className="flex gap-1 overflow-x-auto">
          {items.map(([href, label, Icon]) => (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm text-white/75 hover:bg-white/10 hover:text-white"
            >
              <Icon size={16} />
              <span className="hidden sm:inline">{label}</span>
            </Link>
          ))}

          {email ? (
            <button
              onClick={logout}
              className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm text-white/75 hover:bg-white/10 hover:text-white"
            >
              <LogOut size={16} />
              <span className="hidden sm:inline">Logout</span>
            </button>
          ) : (
            <Link
              href="/auth/login"
              className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm text-white/75 hover:bg-white/10 hover:text-white"
            >
              <LogIn size={16} />
              <span className="hidden sm:inline">Login</span>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
