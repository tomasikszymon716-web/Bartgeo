import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';

const sections = [
  'admin',
  'purpose',
  'legal',
  'retention',
  'recipients',
  'rights',
  'cookies',
  'contact',
] as const;

export function Privacy() {
  const { t, i18n } = useTranslation();

  return (
    <>
      <Helmet>
        <html lang={i18n.language} />
        <title>{t('privacy.title')} — BartGeo</title>
        <meta name="robots" content="noindex" />
      </Helmet>
      <Navbar />
      <main className="pt-32 pb-24">
        <div className="max-w-[800px] mx-auto px-6">
          <h1 className="font-display font-bold text-4xl tracking-[-0.03em] text-[var(--color-ink)] mb-12">
            {t('privacy.title')}
          </h1>
          <div className="space-y-10">
            {sections.map((key) => (
              <section key={key}>
                <h2 className="font-semibold text-xl text-[var(--color-ink)] mb-3">
                  {t(`privacy.sections.${key}_title`)}
                </h2>
                <p className="text-base leading-[1.7] text-[var(--color-graphite-soft)]">
                  {t(`privacy.sections.${key}_text`)}
                </p>
              </section>
            ))}
          </div>
          <p className="mt-12 text-sm text-[var(--color-muted)]">
            {t('privacy.updated')} 2026-04-07
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
