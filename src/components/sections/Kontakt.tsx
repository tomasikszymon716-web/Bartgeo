import { useIsMobile } from '../../hooks/useIsMobile';
import { KontaktDesktop } from './KontaktDesktop';
import { KontaktMobile } from './KontaktMobile';

export function Kontakt() {
  const isMobile = useIsMobile();
  return isMobile ? <KontaktMobile /> : <KontaktDesktop />;
}
