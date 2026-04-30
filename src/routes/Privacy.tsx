import { useIsMobile } from '../hooks/useIsMobile';
import { PrivacyDesktop } from './PrivacyDesktop';
import { PrivacyMobile } from './PrivacyMobile';

export function Privacy() {
  const isMobile = useIsMobile();
  return isMobile ? <PrivacyMobile /> : <PrivacyDesktop />;
}
