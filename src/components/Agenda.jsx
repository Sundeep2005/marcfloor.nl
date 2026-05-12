import { CalendarDaysIcon } from '@heroicons/react/24/outline';
import { ARTWIN_WIDGET_URL } from '../config';
import { useArtwinAgenda } from '../hooks/useArtwinAgenda';

export function Agenda() {
  const { events, isLoading } = useArtwinAgenda(ARTWIN_WIDGET_URL);

  return (
    <section id="agenda" className="section agenda-section">
      <div className="mx-auto max-w-4xl px-5 sm:px-8">
        <h2 className="agenda-title">Agenda</h2>
        {isLoading && <p className="agenda-loading">Agenda wordt geladen...</p>}
        {events.length > 0 ? (
          <div className="agenda-list">
            {events.map((event) => (
              <article className="agenda-row" key={`${event.day}-${event.month}-${event.title}`}>
                <time className="agenda-date" dateTime={event.dateTime}>
                  <span>{event.weekday}</span>
                  <strong>{event.day}</strong>
                  <span>{event.month}</span>
                  {event.time && <small>{event.time}</small>}
                </time>
                <div className="agenda-details">
                  <h3>{event.title}</h3>
                  <p>
                    <span className="nl-flag" aria-hidden="true" />
                    <span>{event.venue}, {event.city}</span>
                  </p>
                  {event.note && <p className="agenda-note">{event.note}</p>}
                  <div className="agenda-actions">
                    <span>Website</span>
                    <span>Tickets</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          !isLoading && <AgendaEmptyState />
        )}
      </div>
    </section>
  );
}

function AgendaEmptyState() {
  return (
    <div className="agenda-empty">
      <CalendarDaysIcon className="agenda-empty-icon" />
      <h3>Er zijn op dit moment geen shows van Marc Floor.</h3>
      <p>Nieuwe data verschijnen hier zodra ze bekend zijn.</p>
    </div>
  );
}

