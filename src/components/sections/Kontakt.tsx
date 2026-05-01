import { useDevice } from '../../hooks/useDevice';
import { KontaktDesktop } from './KontaktDesktop';
import { KontaktTablet } from './KontaktTablet';
import { KontaktMobile } from './KontaktMobile';

export function Kontakt() {
  const device = useDevice();
  if (device === 'mobile') return <KontaktMobile />;
  if (device === 'tablet') return <KontaktTablet />;
  return <KontaktDesktop />;
}
