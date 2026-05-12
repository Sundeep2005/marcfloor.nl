import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { CalendarDaysIcon } from '@heroicons/react/24/outline';

export function Hero() {
  return (
    <section className="hero">
      <div className="hero-video" aria-hidden="true">
        <video
          className="hero-video-frame"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        >
          <source src="/videos/hero.mp4" type="video/mp4" />
        </video>
      </div>
      <div className="hero-shade" aria-hidden="true" />
      <div className="hero-inner">
        <div className="hero-copy">
          <h1 className="hero-title">Marc Floor</h1>
          <figure className="hero-quote">
            <blockquote>Mijn muziek laat zien wie ik ben</blockquote>
          </figure>
          <div className="hero-actions">
            <a className="button button-primary" href="#agenda">
              <CalendarDaysIcon className="size-5" />
              Agenda
            </a>
            <a className="button button-ghost" href="#media">
              <FontAwesomeIcon icon={faPlay} />
              Foto's & Video's
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
