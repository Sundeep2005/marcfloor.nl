import { biographySections } from '../data/siteContent';
import { publicAsset } from '../config';

export function Biography() {
  return (
    <section id="biografie" className="section biography-section">
      <div className="mx-auto grid max-w-7xl items-start gap-10 px-5 sm:px-8 lg:grid-cols-[.94fr_1fr] lg:px-10">
        <div className="bio-image">
          <img
            src={publicAsset('/images/marc-floor-bio.jpg')}
            alt="Portret van Marc Floor"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="bio-copy lg:pl-10">
          <h2 className="font-display text-5xl leading-none text-zinc-950 sm:text-6xl lg:text-7xl">Biografie</h2>
          <div className="bio-text">
            {biographySections.map((section) => (
              <section key={section.title}>
                <h3>{section.title}</h3>
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </section>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
