import { useNavigate, useLocation } from 'react-router-dom';
import { scrollToSection } from './scrollToSection';

/**
 * Returns a navigation function that works from any page.
 * - On home (`/`): smooth-scrolls to the target section.
 * - On any other route: stores the target in sessionStorage,
 *   navigates to `/`, and HomeLayout scrolls after the loader completes.
 */
export function useNavLink() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (href: string) => {
    if (pathname === '/') {
      scrollToSection(href);
    } else {
      sessionStorage.setItem('scrollTarget', href.replace('#', ''));
      navigate('/');
    }
  };
}
