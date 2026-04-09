# BartGeo — Strona firmowa

Produkcyjna strona internetowa dla firmy geodezyjno-kartograficznej **BartGeo** prowadzonej przez mgr inż. Bartłomieja Tomasika.

## Stack

- **Vite + React 18 + TypeScript** (strict mode)
- **Tailwind CSS v4** z custom tokenami
- **Framer Motion** — scroll-driven animations
- **React Three Fiber + drei** — interaktywny 3D model tachimetru
- **react-i18next** — 3 języki (PL/EN/DE)
- **react-hook-form + zod** — walidacja formularza
- **react-helmet-async** — SEO meta + JSON-LD
- **Vercel** — deployment target

## Instalacja

```bash
npm install
cp .env.example .env
```

## Development

```bash
npm run dev
```

## Zmienne środowiskowe

Utwórz plik `.env` na podstawie `.env.example`:

```
VITE_N8N_WEBHOOK_URL=https://n8n.arcly.pl/webhook/bartgeo-contact
```

Na Vercel: **Settings → Environment Variables → dodaj `VITE_N8N_WEBHOOK_URL`**.

## Build

```bash
npm run build
```

Pliki produkcyjne pojawią się w `dist/`.

## Deploy na Vercel

1. Podłącz repo w [vercel.com](https://vercel.com)
2. Framework Preset: **Vite**
3. Dodaj zmienną środowiskową `VITE_N8N_WEBHOOK_URL`
4. Deploy

Plik `vercel.json` zapewnia fallback SPA dla routera.

## Architektura Desktop / Mobile

Każda sekcja ma **osobne pliki** Desktop i Mobile:

```
Hero.tsx          ← wrapper (renderuje Desktop lub Mobile)
HeroDesktop.tsx   ← wersja Desktop (>= 1024px)
HeroMobile.tsx    ← wersja Mobile (< 1024px)
```

Hook `useIsMobile()` przełącza renderowanie na breakpoincie **1024px**.

**Edytowanie jednej wersji nie wpływa na drugą.** Jeśli chcesz zmienić tylko layout mobilny — edytuj plik `*Mobile.tsx`. Desktop pozostaje niezmieniony.

Sekcje z osobnymi plikami:
- Navbar, Footer
- Hero, Oferta, Realizacje, ONas, Opinie, Kontakt

## Jak wymienić zdjęcia w realizacjach

Edytuj `src/data/realizacje.ts` — zamień URL-e Unsplash na własne zdjęcia. Opcjonalnie umieść pliki w `public/photos/` i użyj ścieżek `/photos/nazwa.jpg`.

## Jak zmienić treść

Wszystkie teksty są w plikach i18n:

- `src/i18n/pl.json` — polski (domyślny)
- `src/i18n/en.json` — angielski
- `src/i18n/de.json` — niemiecki

Dane firmowe: `src/data/company.ts`
Usługi: `src/data/services.ts`
Opinie: `src/data/opinie.ts`

## Jak dodać nowy język

1. Skopiuj `src/i18n/pl.json` jako np. `src/i18n/fr.json`
2. Przetłumacz wszystkie klucze
3. W `src/i18n/index.ts` dodaj import i resource
4. W `LangSwitcher.tsx` dodaj kod języka do tablicy `langs`
