import { useIsMobile } from '../../hooks/useIsMobile';
import { ONasDesktop } from './ONasDesktop';
import { ONasMobile } from './ONasMobile';

export function ONas() {
  const isMobile = useIsMobile();
  return isMobile ? <ONasMobile /> : <ONasDesktop />;
}
