import { useEffect, useState } from 'react';
import { SPOTIFY_ARTIST_URL } from '../config';
import {
  fallbackTracks,
  featuredArtistsByTitle,
  preferredTrackOrder,
  trackAliases,
} from '../data/tracks';

export function useDeezerPreviewTracks() {
  const [tracks, setTracks] = useState(fallbackTracks);

  useEffect(() => {
    const collectedTracks = new Map();
    let completedRequests = 0;
    const scripts = [];

    function finishRequest() {
      completedRequests += 1;
      if (completedRequests < preferredTrackOrder.length) return;

      const orderedTracks = preferredTrackOrder
        .map((title) => collectedTracks.get(title))
        .filter(Boolean);

      if (orderedTracks.length > 0) {
        setTracks(orderedTracks);
      }
    }

    preferredTrackOrder.forEach((preferredTitle, index) => {
      const callbackName = `deezerMarcFloor${Date.now()}${index}`;
      const script = document.createElement('script');
      const searchTitle = trackAliases[preferredTitle]?.[0] || preferredTitle;

      window[callbackName] = (payload) => {
        const match = (payload?.data || []).find((track) => {
          const matchedPreferredTitle = findPreferredTitle(track.title);
          return track.preview && matchedPreferredTitle === preferredTitle;
        });

        if (match && !collectedTracks.has(preferredTitle)) {
          collectedTracks.set(preferredTitle, {
            title: match.title,
            artist: featuredArtistsByTitle[preferredTitle] || match.artist?.name || 'Marc Floor',
            preview: match.preview,
            link: match.link || SPOTIFY_ARTIST_URL,
            cover: match.album?.cover_medium || match.artist?.picture_medium || fallbackTracks[0].cover,
          });
        }

        finishRequest();
      };

      script.src = `https://api.deezer.com/search/track?q=${encodeURIComponent(`Marc Floor ${searchTitle}`)}&limit=10&output=jsonp&callback=${callbackName}`;
      script.async = true;
      script.onerror = finishRequest;
      document.body.appendChild(script);
      scripts.push({ script, callbackName });
    });

    const timeout = window.setTimeout(() => {
      completedRequests = preferredTrackOrder.length;
      finishRequest();
    }, 7000);

    return () => {
      window.clearTimeout(timeout);
      scripts.forEach(({ script, callbackName }) => {
        delete window[callbackName];
        script.remove();
      });
    };
  }, []);

  return tracks;
}

function findPreferredTitle(title) {
  const normalizedTitle = normalizeTrackTitle(title);

  return preferredTrackOrder.find((preferredTitle) => {
    const names = [preferredTitle, ...(trackAliases[preferredTitle] || [])];
    return names.some((name) => normalizeTrackTitle(name) === normalizedTitle);
  });
}

function normalizeTrackTitle(title = '') {
  return title
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
}

