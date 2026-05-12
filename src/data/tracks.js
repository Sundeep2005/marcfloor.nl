import { SPOTIFY_ARTIST_URL } from '../config';

export const fallbackTracks = [
  {
    title: 'Marc Floor',
    artist: 'Top tracks',
    preview: '',
    link: SPOTIFY_ARTIST_URL,
    cover: 'https://image-cdn-fa.spotifycdn.com/image/ab676161000051748ac92e1519365d78ed466af4',
  },
];

export const preferredTrackOrder = [
  'parkje biertje vrienden',
  'vrijdag',
  'bitterzoet',
  'fantasie',
  'koud',
  'duizende liedjes',
  'wat blijft er over',
  'krokodillentranen',
  'dresscode',
  'zeventien',
  'ik geloof in jou',
  'laat die hoodie maar hangen',
  'vlekkeloos',
  'kapitein',
  'he meester',
  'zij heeft alles',
];

export const trackAliases = {
  fantasie: ['fantansie'],
  'duizende liedjes': ['duizenden liedjes'],
  'he meester': ['hé meester'],
};

export const featuredArtistsByTitle = {
  'parkje biertje vrienden': 'Marc Floor & Snelle',
  bitterzoet: 'Marc Floor & Young Dylan',
  fantasie: 'Marc Floor & Pauline',
  'ik geloof in jou': 'Marc Floor & Pjotr',
};

