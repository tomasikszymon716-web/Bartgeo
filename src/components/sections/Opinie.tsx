import { useIsMobile } from '../../hooks/useIsMobile';
import { OpinieDesktop } from './OpinieDesktop';
import { OpinieMobile } from './OpinieMobile';

export function Opinie() {
  const isMobile = useIsMobile();
  return isMobile ? <OpinieMobile /> : <OpinieDesktop />;
}
