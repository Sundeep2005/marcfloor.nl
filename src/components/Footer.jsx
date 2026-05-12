import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faSpotify, faTiktok, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { publicAsset, SPOTIFY_ARTIST_URL } from '../config';
import { socialLinks } from '../data/siteContent';

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <a href="#top" className="footer-brand">
          <img src={publicAsset('/images/marc-floor-logo-white.png')} alt="" className="footer-logo" />
          <span className="footer-brand-name">Marc Floor</span>
        </a>
        <div className="footer-socials">
          <a aria-label="Instagram" href={socialLinks.instagram} target="_blank" rel="noreferrer"><FontAwesomeIcon icon={faInstagram} /></a>
          <a aria-label="Tiktok" href={socialLinks.tiktok} target="_blank" rel="noreferrer"><FontAwesomeIcon icon={faTiktok} /></a>
          <a aria-label="Spotify" href={SPOTIFY_ARTIST_URL} target="_blank" rel="noreferrer"><FontAwesomeIcon icon={faSpotify} /></a>
          <a aria-label="YouTube" href={socialLinks.youtube} target="_blank" rel="noreferrer"><FontAwesomeIcon icon={faYoutube} /></a>
        </div>
        <p className="footer-copyright">&copy; 2026 Marc Floor. Alle rechten voorbehouden.</p>
      </div>
    </footer>
  );
}
