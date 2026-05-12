import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExternalLinkAlt, faHeart } from '@fortawesome/free-solid-svg-icons';
import { JUST_A_MILLION_DONATE_URL } from '../config';

export function JustAMillion() {
  return (
    <section className="just-section" aria-labelledby="just-a-million-title">
      <div className="just-inner">
        <div className="just-copy">
          <p className="just-label">Just A Million</p>
          <h2 id="just-a-million-title">'Just A Million' sponsoren?</h2>
          <p>
            Marc Floor en Lize Marie zetten zich met Just A Million in voor goede doelen en kind-vluchtelingen.
          </p>
        </div>
        <a className="just-button" href={JUST_A_MILLION_DONATE_URL} target="_blank" rel="noreferrer">
          <FontAwesomeIcon icon={faHeart} />
          Doneer
          <FontAwesomeIcon icon={faExternalLinkAlt} className="just-button-external" />
        </a>
      </div>
    </section>
  );
}

