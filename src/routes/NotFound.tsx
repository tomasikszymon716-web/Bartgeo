import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { Button } from '../components/ui/Button';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';

export function NotFound() {
  const { t } = useTranslation();

  return (
    <>
      <Helmet>
        <title>404 — BartGeo</title>
        <meta name="robots" content="noindex" />
      </Helmet>
      <Navbar />
      <main className="min-h-[70vh] flex flex-col items-center justify-center px-6 text-center">
        <h1 className="font-display font-bold text-5xl tracking-[-0.03em] text-[var(--color-ink)] mb-4">
          {t('not_found.title')}
        </h1>
        <p className="text-lg text-[var(--color-graphite-soft)] mb-8">
          {t('not_found.text')}
        </p>
        <Button variant="primary" href="/">
          {t('not_found.cta')}
        </Button>
      </main>
      <Footer />
    </>
  );
}
