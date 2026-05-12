import { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBackwardStep,
  faForwardStep,
  faListUl,
  faPause,
  faPlay,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';
import { faSpotify } from '@fortawesome/free-brands-svg-icons';
import { SPOTIFY_ARTIST_URL } from '../config';
import { useDeezerPreviewTracks } from '../hooks/useDeezerPreviewTracks';

const fadeDurationMs = 700;
const fadeSteps = 14;

export function SpotifyDock() {
  const tracks = useDeezerPreviewTracks();
  const audioRef = useRef(null);
  const shouldResumeRef = useRef(false);
  const fadeOutStartedRef = useRef(false);
  const fadeRef = useRef(null);
  const [trackIndex, setTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isQueueOpen, setIsQueueOpen] = useState(false);
  const [progress, setProgress] = useState(0);

  const currentTrack = tracks[trackIndex] || tracks[0];

  useEffect(() => {
    setTrackIndex(0);
    setIsPlaying(false);
    setProgress(0);
  }, [tracks]);

  useEffect(() => {
    if (!audioRef.current || !currentTrack?.preview) return;

    const shouldResume = shouldResumeRef.current || isPlaying;
    shouldResumeRef.current = false;
    fadeOutStartedRef.current = false;
    audioRef.current.load();
    audioRef.current.volume = 0;
    setProgress(0);

    if (shouldResume) {
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
          fadeAudio(1);
        })
        .catch(() => setIsPlaying(false));
    }
  }, [currentTrack]);

  useEffect(() => () => window.clearInterval(fadeRef.current), []);

  useEffect(() => {
    function closeOnEscape(event) {
      if (event.key === 'Escape') {
        setIsQueueOpen(false);
      }
    }

    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, []);

  function togglePlayback() {
    if (!audioRef.current || !currentTrack?.preview) return;

    if (isPlaying) {
      fadeAudio(0, () => {
        audioRef.current?.pause();
        setIsPlaying(false);
      });
      return;
    }

    audioRef.current.volume = 0;
    audioRef.current.play().then(() => {
      setIsPlaying(true);
      fadeAudio(1);
    }).catch(() => setIsPlaying(false));
  }

  function fadeAudio(targetVolume, onComplete) {
    const audio = audioRef.current;
    if (!audio) return;

    window.clearInterval(fadeRef.current);

    const startVolume = audio.volume;
    const stepSize = (targetVolume - startVolume) / fadeSteps;
    let step = 0;

    fadeRef.current = window.setInterval(() => {
      step += 1;
      audio.volume = Math.min(1, Math.max(0, startVolume + stepSize * step));

      if (step >= fadeSteps) {
        window.clearInterval(fadeRef.current);
        audio.volume = targetVolume;
        onComplete?.();
      }
    }, fadeDurationMs / fadeSteps);
  }

  function moveTrack(direction, autoplay = isPlaying) {
    const changeTrack = () => {
      shouldResumeRef.current = autoplay;
      setTrackIndex((current) => {
        const next = current + direction;
        if (next < 0) return tracks.length - 1;
        if (next >= tracks.length) return 0;
        return next;
      });
    };

    if (autoplay && audioRef.current && !audioRef.current.paused) {
      fadeAudio(0, changeTrack);
      return;
    }

    changeTrack();
  }

  function selectTrack(index) {
    const changeTrack = () => {
      shouldResumeRef.current = isPlaying;
      setTrackIndex(index);
      setProgress(0);
      setIsQueueOpen(false);
    };

    if (isPlaying && audioRef.current && !audioRef.current.paused) {
      fadeAudio(0, changeTrack);
      return;
    }

    changeTrack();
  }

  return (
    <>
      {isQueueOpen && (
        <section className="spotify-queue-panel" aria-label="Wachtrij">
          <div className="spotify-queue-header">
            <h2>Wachtrij</h2>
            <button type="button" onClick={() => setIsQueueOpen(false)} aria-label="Sluit wachtrij">
              <FontAwesomeIcon icon={faXmark} />
            </button>
          </div>
          <div className="spotify-queue-list">
            {tracks.map((track, index) => (
              <button
                type="button"
                className={index === trackIndex ? 'is-active' : undefined}
                key={`${track.title}-${track.artist}`}
                onClick={() => selectTrack(index)}
                aria-current={index === trackIndex ? 'true' : undefined}
              >
                <img src={track.cover} alt="" />
                <span>
                  <strong>{track.title}</strong>
                  <small>{track.artist}</small>
                </span>
              </button>
            ))}
          </div>
        </section>
      )}
      <aside className="spotify-dock" aria-label="Spotify speler">
        <audio
          ref={audioRef}
          src={currentTrack?.preview || undefined}
          onTimeUpdate={(event) => {
            const audio = event.currentTarget;
            setProgress(audio.duration ? (audio.currentTime / audio.duration) * 100 : 0);

            if (
              isPlaying &&
              audio.duration &&
              audio.duration - audio.currentTime <= fadeDurationMs / 1000 &&
              !fadeOutStartedRef.current
            ) {
              fadeOutStartedRef.current = true;
              fadeAudio(0);
            }
          }}
          onEnded={() => moveTrack(1, true)}
        />
        <a className="spotify-cover" href={currentTrack?.link || SPOTIFY_ARTIST_URL} target="_blank" rel="noreferrer" aria-label="Open nummer">
          <img src={currentTrack?.cover} alt="" />
        </a>
        <div className="spotify-copy">
          <strong>{currentTrack?.title}</strong>
          <span>{currentTrack?.artist}</span>
        </div>
        <div className="spotify-controls" aria-label="Player controls">
          <button type="button" onClick={() => moveTrack(-1)} aria-label="Vorig nummer">
            <FontAwesomeIcon icon={faBackwardStep} />
          </button>
          <button type="button" className="spotify-play" onClick={togglePlayback} aria-label={isPlaying ? 'Pauzeer preview' : 'Speel preview'}>
            <FontAwesomeIcon icon={isPlaying ? faPause : faPlay} className={!isPlaying ? 'play-icon' : undefined} />
          </button>
          <button type="button" onClick={() => moveTrack(1)} aria-label="Volgend nummer">
            <FontAwesomeIcon icon={faForwardStep} />
          </button>
        </div>
        <div className="spotify-progress" aria-hidden="true">
          <span style={{ width: `${progress}%` }} />
        </div>
        <div className="spotify-actions">
          <button type="button" className="spotify-queue-toggle" onClick={() => setIsQueueOpen((open) => !open)} aria-expanded={isQueueOpen} aria-label="Open wachtrij">
            <FontAwesomeIcon icon={faListUl} />
            <span>Wachtrij</span>
          </button>
          <a className="spotify-open" href={SPOTIFY_ARTIST_URL} target="_blank" rel="noreferrer">
            <FontAwesomeIcon icon={faSpotify} />
            Spotify
          </a>
        </div>
      </aside>
    </>
  );
}

