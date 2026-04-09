import { useIsMobile } from '../../hooks/useIsMobile';
import { RealizacjeDesktop } from './RealizacjeDesktop';
import { RealizacjeMobile } from './RealizacjeMobile';

export function Realizacje() {
  const isMobile = useIsMobile();
  return isMobile ? <RealizacjeMobile /> : <RealizacjeDesktop />;
}
