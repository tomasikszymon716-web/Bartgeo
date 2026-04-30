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
        <Oferta />
        <Realizacje />
        <ONas />
        <Opinie />
        <Kontakt />
      </main>
    </>
  );
}
