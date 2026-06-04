# GlobeTip 2026

Moderne WM-2026 Tipp-Spiel Web-App mit Next.js 15, TypeScript, Tailwind, shadcn-ready UI, Framer Motion, Zustand und Supabase.

## Start
```bash
npm install
cp .env.example .env.local
npm run dev
```

## Supabase Setup
1. Neues Supabase-Projekt erstellen.
2. `supabase/schema.sql` im SQL Editor ausführen.
3. In Authentication > Providers Google aktivieren, falls gewünscht.
4. `.env.local` mit `NEXT_PUBLIC_SUPABASE_URL` und `NEXT_PUBLIC_SUPABASE_ANON_KEY` füllen.
5. Für echte Daten: Stadien und Matches in Supabase einfügen oder die lokalen Dateien unter `data/` ersetzen.

## Hinweise zu Assets
Team-Logos, echte FIFA-Logos und hochauflösende Stadionfotos sind aus Lizenzgründen nicht eingebettet. Die App nutzt Platzhalter-SVGs unter `public/stadiums/`. Ersetze sie später durch lizenzierte Bilder mit denselben Dateinamen.

## Deployment Vercel
- GitHub Repo erstellen
- Vercel Import Project
- Environment Variables setzen
- Build Command: `npm run build`

## Punkte-System
- Exaktes Ergebnis: 3 Punkte
- Tendenz richtig: 1 Punkt
- Sonst: 0 Punkte

## Produktiver Ausbau
- Server Actions für Tippabgabe ergänzen
- Supabase Realtime für Live-Leaderboard aktivieren
- Admin-Rolle für Ergebnis-Eingabe
- Vollständigen FIFA-Spielplan importieren
