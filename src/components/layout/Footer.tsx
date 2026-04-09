import { useIsMobile } from '../../hooks/useIsMobile';
import { FooterDesktop } from './FooterDesktop';
import { FooterMobile } from './FooterMobile';

export function Footer() {
  const isMobile = useIsMobile();
  return isMobile ? <FooterMobile /> : <FooterDesktop />;
}
