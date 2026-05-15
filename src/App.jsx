import { useEffect } from 'react';
import { Agenda } from './components/Agenda';
import { Biography } from './components/Biography';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { Hero } from './components/Hero';
import { JustAMillion } from './components/JustAMillion';
import { LatestRelease } from './components/LatestRelease';
import { Media } from './components/Media';
import { SiteHeader } from './components/SiteHeader';
import { SpotifyDock } from './components/SpotifyDock';

export function App() {
  useEffect(() => {
    if (!window.location.hash) return;
    requestAnimationFrame(() => {
      document.querySelector(window.location.hash)?.scrollIntoView();
    });
  }, []);

  return (
    <main id="top" className="min-h-screen bg-stone-50 text-zinc-950">
      <SiteHeader />
      <Hero />
      <LatestRelease />
      <Agenda />
      <Biography />
      <JustAMillion />
      <Media />
      <Contact />
      <Footer />
      <SpotifyDock />
    </main>
  );
}
