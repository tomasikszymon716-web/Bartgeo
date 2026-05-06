import { lazy, Suspense } from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { Hero } from '../components/sections/Hero';
import { localBusinessJsonLd } from '../lib/seo';

/* Below-the-fold sections are code-split. Hero ships in the entry
   chunk so the first paint is instant; everything else streams in
   while the user reads the hero. Suspense fallback is intentionally
   `null` — sections take their natural height when they hydrate, no
   layout shift because the page extends as the user scrolls. */
const Oferta = lazy(() => import('../components/sections/Oferta').then((m) => ({ default: m.Oferta })));
const Realizacje = lazy(() =>
  import('../components/sections/Realizacje').then((m) => ({ default: m.Realizacje })),
);
const ONas = lazy(() => import('../components/sections/ONas').then((m) => ({ default: m.ONas })));
const Opinie = lazy(() => import('../components/sections/Opinie').then((m) => ({ default: m.Opinie })));
const Kontakt = lazy(() =>
  import('../components/sections/Kontakt').then((m) => ({ default: m.Kontakt })),
);

export function Home() {
  const { i18n } = useTranslation();

  return (
    <>
      <Helmet>
        <html lang={i18n.language} />
        <title>BartGeo Usługi Geodezyjno-Kartograficzne</title>
        <meta
          name="description"
          content="Profesjonalne usługi geodezyjne w Rzeszowie i okolicach. Mapy do celów projektowych, podziały działek, tyczenia. Szybkie terminy i precyzyjna realizacja."
        />
        <link rel="icon" type="image/png" href="/brand/logo-icon.png" />
        <link rel="apple-touch-icon" href="/brand/logo-icon.png" />
        <meta property="og:title" content="BartGeo Usługi Geodezyjno-Kartograficzne" />
        <meta property="og:description" content="Profesjonalne usługi geodezyjne w Rzeszowie i okolicach. Mapy do celów projektowych, podziały działek, tyczenia. Szybkie terminy i precyzyjna realizacja." />
        <meta property="og:image" content="/brand/logo-icon.png" />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="pl_PL" />
        <link rel="canonical" href="https://bartgeo.pl" />
        <script type="application/ld+json">{JSON.stringify(localBusinessJsonLd)}</script>
      </Helmet>
      <main>
        <Hero />
        <Suspense fallback={null}>
          <Oferta />
          <Realizacje />
          <ONas />
          <Opinie />
          <Kontakt />
        </Suspense>
      </main>
    </>
  );
}
