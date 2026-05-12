import { useEffect, useState } from 'react';
import { navItems } from '../data/siteContent';

export function SiteHeader() {
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    function updateHeader() {
      setHasScrolled(window.scrollY > 24);
    }

    updateHeader();
    window.addEventListener('scroll', updateHeader, { passive: true });
    return () => window.removeEventListener('scroll', updateHeader);
  }, []);

  return (
    <header className={`site-header ${hasScrolled ? 'is-scrolled' : ''}`}>
      <div className="site-header-inner">
        <a href="#top" className="site-brand">
          <img src="/images/marc-floor-logo-white.png" alt="" className="site-brand-logo" />
          <span className="site-brand-name">Marc Floor</span>
        </a>
        <nav className="site-nav site-nav-desktop" aria-label="Hoofdnavigatie">
          {navItems.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>
        <nav className="site-nav site-nav-mobile" aria-label="Hoofdnavigatie mobiel">
          {navItems.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}

