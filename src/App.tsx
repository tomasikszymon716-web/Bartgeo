import { lazy, Suspense, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { Loader } from './components/layout/Loader';
import { ScrollProgress } from './components/layout/ScrollProgress';
import { BackToTop } from './components/layout/BackToTop';
import { CursorDot } from './components/layout/CursorDot';
import { Home } from './routes/Home';

const Privacy = lazy(() => import('./routes/Privacy').then((m) => ({ default: m.Privacy })));
const NotFound = lazy(() => import('./routes/NotFound').then((m) => ({ default: m.NotFound })));

function HomeLayout() {
  const { t } = useTranslation();
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      {!loaded && <Loader onComplete={() => setLoaded(true)} />}
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
      </BrowserRouter>
    </HelmetProvider>
  );
}
