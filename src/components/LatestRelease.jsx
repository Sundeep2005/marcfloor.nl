import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpotify, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { latestRelease } from '../data/siteContent';

export function LatestRelease() {
  return (
    <section className="latest-release-section" aria-label="Nieuwste release">
      <div className="latest-release-inner">
        <a className="latest-release-cover" href={latestRelease.youtube} target="_blank" rel="noreferrer" aria-label={`Bekijk ${latestRelease.title}`}>
          <img src={latestRelease.cover} alt="" />
        </a>
        <div className="latest-release-copy">
          <p className="latest-release-label">{latestRelease.label}</p>
          <h2>{latestRelease.title}</h2>
          <p>{latestRelease.artist}</p>
        </div>
        <div className="latest-release-actions">
          <a className="latest-release-spotify" href={latestRelease.spotify} target="_blank" rel="noreferrer" aria-label="Luister op Spotify">
            <FontAwesomeIcon icon={faSpotify} />
            <span>Spotify</span>
          </a>
          <a className="latest-release-youtube" href={latestRelease.youtube} target="_blank" rel="noreferrer" aria-label="Bekijk op YouTube">
            <FontAwesomeIcon icon={faYoutube} />
            <span>YouTube</span>
          </a>
        </div>
      </div>
    </section>
  );
}
