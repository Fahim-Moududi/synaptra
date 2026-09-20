import { events, briefs, registerLinkProps } from "../data";

export function Events({ filter, onFilter, onOpen }) {
  return (
    <section id="events" className="section">
      <div className="section-head reveal">
        <p className="eyebrow">[ 02 ] Competitions</p>
        <h2>Five events. One campus day.</h2>
      </div>
      <p className="lead reveal">
        Choose a primary event at registration. Open a brief for format, evaluation focus,
        and what to bring. Final slot lists are issued to registered participants.
      </p>
      <div className="filter-bar reveal" role="tablist" aria-label="Event filter">
        {[
          ["all", "All events"],
          ["tech", "Technical"],
          ["nontech", "Non-technical"],
        ].map(([id, label]) => (
          <button
            key={id}
            type="button"
            className={`chip${filter === id ? " on" : ""}`}
            onClick={() => onFilter(id)}
          >
            {label}
          </button>
        ))}
      </div>
      <div className="event-board">
        {events.map((event) => (
          <article
            key={event.id}
            className={`event-tile tilt reveal ${event.kind}${filter !== "all" && event.kind !== filter ? " is-hidden" : ""}`}
            role="button"
            tabIndex={filter !== "all" && event.kind !== filter ? -1 : 0}
            onClick={() => onOpen(event.id)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onOpen(event.id);
              }
            }}
          >
            <p className="hud">{event.code}</p>
            <h3>{event.title}</h3>
            <p>{event.blurb}</p>
            <ul className="tile-meta">
              {event.tags.map((tag) => (
                <li key={tag}>{tag}</li>
              ))}
            </ul>
            <span className="tile-cta">Open brief →</span>
          </article>
        ))}
      </div>
    </section>
  );
}

export function Brief({ eventId, onClose }) {
  const data = eventId ? briefs[eventId] : null;
  if (!data) return null;
  return (
    <aside className="brief" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="brief-card">
        <p className="hud">{data.code}</p>
        <h3>{data.title}</h3>
        <div>{data.body}</div>
        <div className="brief-actions">
          <a className="btn magnetic" {...registerLinkProps} onClick={onClose}>
            Register for this event
          </a>
          <button type="button" className="btn ghost" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </aside>
  );
}
