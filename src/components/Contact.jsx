import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

export function Contact() {
  return (
    <section id="contact" className="section contact-section">
      <div className="mx-auto flex max-w-4xl justify-center px-5 text-center sm:px-8 lg:px-10">
        <div className="contact-content">
          <h2 className="font-display text-5xl leading-none text-zinc-950 sm:text-6xl lg:text-7xl">Contact</h2>
          <div className="contact-links">
            <ContactLink label="Voor contact & informatie:" href="mailto:info@marcfloor.nl" text="info@marcfloor.nl" />
            <ContactLink label="Voor boekingen:" href="mailto:philip@your-agency.nl" text="philip@your-agency.nl" />
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactLink({ label, href, text }) {
  return (
    <a href={href} className="contact-link group">
      <span className="contact-link-icon">
        <FontAwesomeIcon icon={faEnvelope} />
      </span>
      <span className="contact-link-copy">
        <span>{label}</span>
        <strong>{text}</strong>
      </span>
    </a>
  );
}
