import { useCallback, useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { CalendarDaysIcon } from '@heroicons/react/24/outline';
import { publicAsset } from '../config';

const heroLoopFadeMs = 650;
const heroLoopLeadSeconds = .75;

export function Hero() {
  const videoRefs = [useRef(null), useRef(null)];
  const loopTimeoutRef = useRef(null);
  const isLoopingRef = useRef(false);
  const [activeVideoIndex, setActiveVideoIndex] = useState(0);

  const startSoftLoop = useCallback((currentIndex) => {
    if (isLoopingRef.current) return;

    const currentVideo = videoRefs[currentIndex].current;
    const nextIndex = currentIndex === 0 ? 1 : 0;
    const nextVideo = videoRefs[nextIndex].current;

    if (!currentVideo || !nextVideo) return;

    isLoopingRef.current = true;
    nextVideo.currentTime = 0;

    nextVideo.play().then(() => {
      setActiveVideoIndex(nextIndex);
      window.clearTimeout(loopTimeoutRef.current);
      loopTimeoutRef.current = window.setTimeout(() => {
        currentVideo.pause();
        currentVideo.currentTime = 0;
        isLoopingRef.current = false;
      }, heroLoopFadeMs);
    }).catch(() => {
      currentVideo.currentTime = 0;
      currentVideo.play().catch(() => {});
      isLoopingRef.current = false;
    });
  }, []);

  useEffect(() => () => window.clearTimeout(loopTimeoutRef.current), []);

  function handleVideoTimeUpdate(index, event) {
    if (index !== activeVideoIndex) return;

    const video = event.currentTarget;
    if (!video.duration) return;

    if (video.duration - video.currentTime <= heroLoopLeadSeconds) {
      startSoftLoop(index);
    }
  }

  return (
    <section className="hero">
      <div className="hero-video" aria-hidden="true">
        {[0, 1].map((index) => (
          <video
            className={`hero-video-frame ${index === activeVideoIndex ? 'is-active' : ''}`}
            autoPlay={index === 0}
            key={index}
            muted
            playsInline
            preload="auto"
            ref={videoRefs[index]}
            onEnded={() => startSoftLoop(index)}
            onTimeUpdate={(event) => handleVideoTimeUpdate(index, event)}
          >
            <source src={publicAsset('/videos/hero.mp4')} type="video/mp4" />
          </video>
        ))}
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
