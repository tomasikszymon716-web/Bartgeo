import { useDevice } from '../../hooks/useDevice';
import { RealizacjeDesktop } from './RealizacjeDesktop';
import { RealizacjeTablet } from './RealizacjeTablet';
import { RealizacjeMobile } from './RealizacjeMobile';

export function Realizacje() {
  const device = useDevice();
  if (device === 'mobile') return <RealizacjeMobile />;
  if (device === 'tablet') return <RealizacjeTablet />;
  return <RealizacjeDesktop />;
}
