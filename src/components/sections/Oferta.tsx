import { useDevice } from '../../hooks/useDevice';
import { OfertaDesktop } from './OfertaDesktop';
import { OfertaTablet } from './OfertaTablet';
import { OfertaMobile } from './OfertaMobile';

export function Oferta() {
  const device = useDevice();
  if (device === 'mobile') return <OfertaMobile />;
  if (device === 'tablet') return <OfertaTablet />;
  return <OfertaDesktop />;
}
