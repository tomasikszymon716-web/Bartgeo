import { useIsMobile } from '../../hooks/useIsMobile';
import { NavbarDesktop } from './NavbarDesktop';
import { NavbarMobile } from './NavbarMobile';

export function Navbar() {
  const isMobile = useIsMobile();
  return isMobile ? <NavbarMobile /> : <NavbarDesktop />;
}
