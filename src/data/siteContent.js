import { publicAsset } from '../config';

export const navItems = [
  { label: 'Agenda', href: '#agenda' },
  { label: 'Biografie', href: '#biografie' },
  { label: "Video's & foto's", href: '#media' },
  { label: 'Contact', href: '#contact' },
];

export const videoItems = [
  { title: 'Kapitein', src: publicAsset('/videos/kapitein.mp4'), thumbnail: 'https://i.ytimg.com/vi/wXHdkD2DTvg/hqdefault.jpg' },
  { title: 'Koud', src: publicAsset('/videos/koud.mp4'), thumbnail: 'https://i.ytimg.com/vi/PhpjycoNXdE/hqdefault.jpg' },
  { title: 'Fantasie', src: publicAsset('/videos/fantasie.mp4'), thumbnail: 'https://i.ytimg.com/vi/Of5ha6L7054/hqdefault.jpg' },
  { title: 'Zeventien', src: publicAsset('/videos/zeventien.mp4'), thumbnail: 'https://i.ytimg.com/vi/STLN5fJAyxQ/hqdefault.jpg' },
  { title: 'Wat Blijft Er Over', src: publicAsset('/videos/wat-blijft-er-over.mp4'), thumbnail: 'https://i.ytimg.com/vi/EGiykcXQUhw/hqdefault.jpg' },
  { title: 'Melkweg Aftermovie', src: publicAsset('/videos/melkweg-aftermovie.mp4'), thumbnail: 'https://i.ytimg.com/vi/Wj3yezFP2ZY/hqdefault.jpg' },
];

export const photoItems = [
  {
    image: publicAsset('/images/marc-floor-vrienden.png'),
    position: 'center 35%',
  },
  {
    image: publicAsset('/images/marc-floor-speelt-gitaar.jpg'),
    position: 'center',
  },
  {
    image: publicAsset('/images/marc-floor-live-zwart-wit.jpg'),
    position: 'center 34%',
  },
  {
    image: publicAsset('/images/marc-floor-studio.jpg'),
    position: 'center 42%',
  },
];

export const biographySections = [
  {
    title: 'Vier stoelen',
    paragraphs: [
      'Marc Floor is nog maar 19 jaar oud! Hij heeft een grote passie voor muziek. Voeg daar zijn gigantische portie talent aan toe en je hebt een ster in de dop te pakken. In 2021 deed Marc Floor mee aan The Voice Kids en tijdens de Blind Auditions draaiden alle vier de stoelen. Marc koos voor Snelle als coach en ontwikkelde zich binnen het The Voice circuit in rap tempo. Het resulteerde in een plek in de finale!',
    ],
  },
  {
    title: 'Ervaring bouwen',
    paragraphs: [
      "Na het avontuur bij The Voice wist Marc Floor zeker dat het hier niet bij kon blijven. Hij begon te werken aan eigen muziek en heeft ondertussen al wat eigen releases op zijn naam staan. Daarnaast heeft Marc Floor ook al aardig wat podiumervaring opgedaan. Zo verscheen hij in voorprogramma's van Snelle en de Bankzitters, deed hij optredens door heel Nederland en stond hij zelfs op het podium voor 15.000 bezoekers tijdens de EO Jongerendag in Ahoy Rotterdam.",
    ],
  },
  {
    title: 'Een groot hart',
    paragraphs: [
      "Naast het maken van muziek vindt Marc Floor het ook belangrijk om zichzelf in te zetten voor maatschappelijke belangen. Samen met zijn zusje, Lize Marie, startte hij het project Just A Million waarmee zij verschillende goede doelen helpen. Speciaal hiervoor schreven zij het nummer 'Een Plek Voor Jou En Mij' waarbij een videoclip werd geschoten op het eiland Lesbos. Daar zagen ze met eigen ogen hoe vluchtelingen en vooral ook de kinderen daar leven. Met hun muziek willen ze deze kind-vluchtelingen helpen.",
    ],
  },
  {
    title: 'Herman Brood Academie',
    paragraphs: [
      'Na Marc Floor zijn middelbare schoolperiode afronden in 2022 startte hij aan de Herman Brood Academie, waar hij zich volledig kon focussen op muziek. Met veel verschillende muzikanten om zich heen bouwde hij daar aan zijn eigen profiel als artiest.',
    ],
  },
  {
    title: 'De volgende stap',
    paragraphs: [
      "Marc Floor's droom om serieus werk van zijn talent te maken werd steeds meer werkelijkheid. Hij tekende zijn eerste deal bij Lieve Jongens, het platenlabel van zijn oude coach Snelle bij The Voice Kids en daar zit hij tot de dag van vandaag nog steeds.",
      'Voor 2026 heeft hij een hele hoop toffe releases en een bijzondere samenwerking in de pijplijn, dus hou hem in gaten!',
    ],
  },
];

export const socialLinks = {
  instagram: 'https://www.instagram.com/marcfloor/',
  tiktok: 'https://www.tiktok.com/@marcfloor/',
  youtube: 'https://www.youtube.com/@marcfloormusic',
};
