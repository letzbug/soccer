# World Soccer 2026 Tip Game

Mobile-first Demo-App für GitHub Pages.

## Direkt testen
1. Repository auf GitHub erstellen.
2. Alle Dateien hochladen.
3. GitHub Pages aktivieren: Settings → Pages → Deploy from branch → main / root.
4. Danach die GitHub-Pages-URL öffnen oder per QR-Code teilen.

## Was schon funktioniert
- Demo-Login / Profil über localStorage
- Spieleliste und Tipps speichern
- Punkte- und Bonus-System
- Weltkarte mit Gastgeberländern
- Stadion-Discovery mit Bonuspunkten
- Ranking
- Mail-Vorschau
- Komplett statisch, läuft ohne Server
- Stadionbilder sind generierte SVG-Artworks, keine fremden Fotos

## Später echt anschließen
- Datenbank: Supabase / Firebase / eigenes PHP-Backend
- E-Mail: Mailjet API
- Resultate: Fußball-API
- Login: Magic Link oder E-Mail/Passwort

## Dateien
- `index.html` Startseite
- `styles.css` Design
- `app.js` App-Logik
- `data/app-data.js` Spiele, Stadien, Länder
- `assets/stadiums/` generierte Stadionbilder
