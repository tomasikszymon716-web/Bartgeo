import { useIsMobile } from '../../hooks/useIsMobile';
import { HeroDesktop } from './HeroDesktop';
import { HeroMobile } from './HeroMobile';

export function Hero() {
  const isMobile = useIsMobile();
  return isMobile ? <HeroMobile /> : <HeroDesktop />;
}
