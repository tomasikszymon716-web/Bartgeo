import { lazy, Suspense, useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { Loader } from './components/layout/Loader';
import { ScrollProgress } from './components/layout/ScrollProgress';
import { BackToTop } from './components/layout/BackToTop';
import { CursorDot } from './components/layout/CursorDot';
import { CookieBanner } from './components/layout/CookieBanner';
import { Home } from './routes/Home';
import { scrollToSection } from './lib/scrollToSection';
import { initAnalyticsConsentBridge } from './lib/analytics';

const Privacy = lazy(() => import('./routes/Privacy').then((m) => ({ default: m.Privacy })));
const NotFound = lazy(() => import('./routes/NotFound').then((m) => ({ default: m.NotFound })));

function HomeLayout() {
  const { t } = useTranslation();
  const [loaded, setLoaded] = useState(false);

  /* Always start at the top on page load / refresh */
  useEffect(() => {
    window.history.scrollRestoration = 'manual';
    window.scrollTo(0, 0);
  }, []);

  /* After loader completes — scroll to section if navigated from another page */
  const handleLoaderComplete = () => {
    setLoaded(true);
    const target = sessionStorage.getItem('scrollTarget');
    if (target) {
      sessionStorage.removeItem('scrollTarget');
      setTimeout(() => scrollToSection(`#${target}`), 150);
    }
  };

  return (
    <>
      {!loaded && <Loader onComplete={handleLoaderComplete} />}
      <a href="#hero" className="skip-to-content">
        {t('skip')}
      </a>
      <ScrollProgress />
      <CursorDot />
      <Navbar />
      <Home />
      <Footer />
      <BackToTop />
    </>
  );
}

export default function App() {
  /* Boot analytics bridge once. Listens for consent grant and only
     then injects the GA4 script — never at app boot. */
  useEffect(() => {
    initAnalyticsConsentBridge();
  }, []);

  return (
    <HelmetProvider>
      <BrowserRouter>
        <Suspense fallback={null}>
          <Routes>
            <Route path="/" element={<HomeLayout />} />
            <Route path="/polityka-prywatnosci" element={<Privacy />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
        <CookieBanner />
      </BrowserRouter>
    </HelmetProvider>
  );
}
