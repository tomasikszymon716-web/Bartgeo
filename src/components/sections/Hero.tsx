import { useDevice } from '../../hooks/useDevice';
import { HeroDesktop } from './HeroDesktop';
import { HeroTablet } from './HeroTablet';
import { HeroMobile } from './HeroMobile';

export function Hero() {
  const device = useDevice();
  if (device === 'mobile') return <HeroMobile />;
  if (device === 'tablet') return <HeroTablet />;
  return <HeroDesktop />;
}
