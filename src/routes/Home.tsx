import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { Hero } from '../components/sections/Hero';
import { Oferta } from '../components/sections/Oferta';
import { Realizacje } from '../components/sections/Realizacje';
import { ONas } from '../components/sections/ONas';
import { Opinie } from '../components/sections/Opinie';
import { Kontakt } from '../components/sections/Kontakt';
import { localBusinessJsonLd } from '../lib/seo';

export function Home() {
  const { i18n } = useTranslation();

  return (
    <>
      <Helmet>
        <html lang={i18n.language} />
        <title>BartGeo — Usługi Geodezyjne Rzeszów | Mapy, Tyczenia, Podziały</title>
        <meta
          name="description"
          content="BartGeo — 15 lat doświadczenia w geodezji. Mapy do celów projektowych, tyczenie budynków, inwentaryzacje, podziały nieruchomości. Powiat rzeszowski, łańcucki, kolbuszowski, ropczycko-sędziszowski."
        />
        <meta property="og:title" content="BartGeo — Usługi Geodezyjne Rzeszów" />
        <meta property="og:description" content="2014 zrealizowanych projektów. Precyzja, której można zaufać." />
        <meta property="og:image" content="/og-image.jpg" />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="pl_PL" />
        <link rel="canonical" href="https://bartgeo.pl" />
        <script type="application/ld+json">{JSON.stringify(localBusinessJsonLd)}</script>
      </Helmet>
      <main>
        <Hero />
        <Oferta />
        <Realizacje />
        <ONas />
        <Opinie />
        <Kontakt />
      </main>
    </>
  );
}
