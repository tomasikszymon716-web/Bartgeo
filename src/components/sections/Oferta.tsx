import { useIsMobile } from '../../hooks/useIsMobile';
import { OfertaDesktop } from './OfertaDesktop';
import { OfertaMobile } from './OfertaMobile';

export function Oferta() {
  const isMobile = useIsMobile();
  return isMobile ? <OfertaMobile /> : <OfertaDesktop />;
}
