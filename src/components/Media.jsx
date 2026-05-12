import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faXmark } from '@fortawesome/free-solid-svg-icons';
import { photoItems, videoItems } from '../data/siteContent';

export function Media() {
  const [selectedVideo, setSelectedVideo] = useState(null);

  useEffect(() => {
    if (!selectedVideo) return undefined;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    function closeOnEscape(event) {
      if (event.key === 'Escape') {
        setSelectedVideo(null);
      }
    }

    window.addEventListener('keydown', closeOnEscape);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', closeOnEscape);
    };
  }, [selectedVideo]);

  return (
    <section id="media" className="section media-section">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="section-heading section-heading-dark">
          <h2>Video's</h2>
        </div>

        <div className="video-grid">
          {videoItems.map((item) => (
            <button
              key={item.src}
              type="button"
              className="video-card group"
              onClick={() => setSelectedVideo(item)}
              aria-label={`Speel ${item.title} af`}
            >
              <img
                src={item.thumbnail}
                alt=""
                className="h-full w-full object-cover opacity-90 transition duration-500 group-hover:scale-105 group-hover:opacity-100"
              />
              <span className="video-card-shade" aria-hidden="true" />
              <span className="video-play" aria-hidden="true">
                <FontAwesomeIcon icon={faPlay} />
              </span>
              <span className="video-title">{item.title}</span>
              <span className="video-open">Speel af</span>
            </button>
          ))}
        </div>

        <div className="media-subheading">
          <h3>Foto's</h3>
        </div>

        <div className="photo-grid">
          {photoItems.map((item) => (
            <article key={item.title} className="media-card group">
              <img
                src={item.image}
                alt={item.title}
                className="h-full w-full object-cover opacity-85 transition duration-500 group-hover:scale-105 group-hover:opacity-100"
                style={{ objectPosition: item.position }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/72 via-black/10 to-transparent" />
              <div className="absolute bottom-5 left-5 right-5">
                <h3 className="font-semibold">{item.title}</h3>
              </div>
            </article>
          ))}
        </div>
      </div>

      {selectedVideo && (
        <div className="video-modal" role="dialog" aria-modal="true" aria-label="Videospeler">
          <button
            type="button"
            className="video-modal-backdrop"
            aria-label="Sluit video"
            onClick={() => setSelectedVideo(null)}
          />
          <div className="video-modal-panel">
            <button
              type="button"
              className="video-modal-close"
              aria-label="Sluit video"
              onClick={() => setSelectedVideo(null)}
            >
              <FontAwesomeIcon icon={faXmark} />
            </button>
            <video src={selectedVideo.src} controls autoPlay playsInline />
          </div>
        </div>
      )}
    </section>
  );
}

