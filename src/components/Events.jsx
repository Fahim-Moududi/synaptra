import { useState } from "react";
import { events, briefs, INSTAGRAM_URL, REGISTER_URL, WHATSAPP_URL } from "../data";

const FILTERS = [
  ["all", "All events"],
  ["tech", "Technical"],
  ["nontech", "Non-technical"],
];

export function Events({ onOpen }) {
  const [filter, setFilter] = useState("all");
  const visible = events.filter((event) => filter === "all" || event.kind === filter);

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
      <div className="filter-bar" role="group" aria-label="Event filter">
        {FILTERS.map(([id, label]) => (
          <button
            key={id}
            type="button"
            className={`chip${filter === id ? " on" : ""}`}
            aria-pressed={filter === id}
            onClick={(event) => {
              event.preventDefault();
              event.stopPropagation();
              setFilter(id);
            }}
          >
            {label}
          </button>
        ))}
      </div>
      <div className="event-board">
        {visible.map((event) => (
          <article
            key={event.id}
            className={`event-tile tilt ${event.kind}`}
            role="button"
            tabIndex={0}
            onClick={() => onOpen(event.id)}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
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
      <div className="events-join reveal">
        <p className="eyebrow">Participants</p>
        <h3>Join the participant channels</h3>
        <p>Follow CSBS on Instagram and join the WhatsApp group for event updates.</p>
        <div className="social-links">
          <a className="btn ghost magnetic social-link" href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">
            Instagram · @csbs_dept
          </a>
          <a className="btn ghost magnetic social-link" href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
            WhatsApp · Participant group
          </a>
        </div>
      </div>
    </section>
  );
}

export function Brief({ eventId, onClose }) {
  const data = eventId ? briefs[eventId] : null;
  if (!data) return null;
  return (
    <aside className="brief" onClick={(event) => event.target === event.currentTarget && onClose()}>
      <div className="brief-card">
        <p className="hud">{data.code}</p>
        <h3>{data.title}</h3>
        <div>{data.body}</div>
        <div className="brief-actions">
          <a className="btn magnetic" href={REGISTER_URL} onClick={onClose}>
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
