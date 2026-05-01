import { useDevice } from '../../hooks/useDevice';
import { FooterDesktop } from './FooterDesktop';
import { FooterMobile } from './FooterMobile';

/* Tablet routes to Desktop — the 4-col grid (col-span-4/3/3/2)
   compresses gracefully at 768–1279px and avoids the awkwardly
   tall single-column scroll the mobile footer would produce. */
export function Footer() {
  const device = useDevice();
  if (device === 'mobile') return <FooterMobile />;
  return <FooterDesktop />;
}
