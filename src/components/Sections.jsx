import { useState } from "react";
import { faqs, rules } from "../data";

export function About() {
  return (
    <section id="about" className="section">
      <div className="section-head reveal">
        <p className="eyebrow">[ 01 ] The symposium</p>
        <h2>A live network for ideas, products, and performance.</h2>
      </div>
      <div className="split">
        <div>
          <p className="lead reveal">
            SYNAPTRA &apos;26 is the flagship symposium of the Department of Computer Science and
            Business Systems at Syed Ammal Engineering College. The name joins <em>synapse</em> and
            the year’s charge: a day when student work is presented, tested, and connected in public.
          </p>
          <p className="lead reveal">
            The programme is deliberately mixed. Technical floors cover paper presentation,
            project expo, and UI/UX design. Non-technical floors cover quiz and auction.
            Participants leave with critique, visibility, and a record of having competed
            on a formal campus stage.
          </p>
        </div>
        <aside className="quote-card tilt reveal">
          <p className="hud">Department note</p>
          <blockquote>
            CSBS sits between computing and business systems. SYNAPTRA is built for that overlap —
            rigorous enough for research, open enough for product, design, and strategy.
          </blockquote>
          <p className="quote-meta">Department of CSBS · SAEC (Autonomous)</p>
        </aside>
      </div>
      <div className="pillar-grid">
        {[
          ["01", "Think", "Frame a problem with evidence — a paper, a product thesis, or a design brief."],
          ["02", "Create", "Show the work: slides, a prototype, a flow, or a live demonstration."],
          ["03", "Compete", "Meet a jury and a room. Technical and non-technical tracks run the same day."],
          ["04", "Grow", "Take feedback, meet peers from other campuses, and convert the day into a next step."],
        ].map(([n, title, text], i) => (
          <article className="tilt reveal" data-delay={i * 80} key={title}>
            <span>{n}</span>
            <h3>{title}</h3>
            <p>{text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export function Schedule({ items }) {
  return (
    <section id="schedule" className="section">
      <div className="section-head reveal">
        <p className="eyebrow">[ 03 ] Campus day</p>
        <h2>Indicative schedule</h2>
      </div>
      <p className="lead reveal">
        Doors follow this working order. Exact room and heat timings will be mailed after
        registration closes on 10 October 2026.
      </p>
      <ol className="timeline">
        {items.map((item) => (
          <li className="reveal" key={item.time}>
            <time>{item.time}</time>
            <div>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}

export function Core() {
  const [nodes, setNodes] = useState([]);
  const live = nodes.length === 4;
  const toggle = (key) => {
    setNodes((current) =>
      current.includes(key) ? current.filter((n) => n !== key) : [...current, key]
    );
  };
  const flipAll = () => setNodes(live ? [] : ["think", "create", "compete", "grow"]);

  return (
    <section id="core" className="section core-section">
      <div className="section-head reveal">
        <p className="eyebrow">[ 04 ] Synapse ignition</p>
        <h2>Bring the network online</h2>
      </div>
      <p className="lead reveal">A live motif for the day. Activate Think, Create, Compete, and Grow — then the core goes online.</p>
      <div className="core-wrap reveal">
        <button type="button" className={`core-node${nodes.includes("think") ? " on" : ""}`} data-node="think" style={{ "--x": "-160px", "--y": "-130px" }} onClick={() => toggle("think")}>Think</button>
        <button type="button" className={`core-node${nodes.includes("create") ? " on" : ""}`} data-node="create" style={{ "--x": "160px", "--y": "-130px" }} onClick={() => toggle("create")}>Create</button>
        <button type="button" className={`core-reactor${live ? " live" : ""}`} aria-live="polite" onClick={flipAll}>
          <strong>{live ? "NETWORK ONLINE" : "POWERED DOWN"}</strong>
          <span>{nodes.length} / 4 nodes</span>
        </button>
        <button type="button" className={`core-node${nodes.includes("compete") ? " on" : ""}`} data-node="compete" style={{ "--x": "-160px", "--y": "130px" }} onClick={() => toggle("compete")}>Compete</button>
        <button type="button" className={`core-node${nodes.includes("grow") ? " on" : ""}`} data-node="grow" style={{ "--x": "160px", "--y": "130px" }} onClick={() => toggle("grow")}>Grow</button>
      </div>
    </section>
  );
}

export function Details() {
  return (
    <section id="details" className="section">
      <div className="section-head reveal">
        <p className="eyebrow">[ 05 ] At a glance</p>
        <h2>Official details</h2>
      </div>
      <div className="meta-grid">
        {[
          ["Date", "16.10.2026"],
          ["Start time", "9:00 AM"],
          ["Venue", "EEE Seminar Hall"],
          ["Fee", "₹200 / head"],
          ["Last date", "10.10.2026"],
        ].map(([label, value]) => (
          <article className="reveal" key={label}>
            <small>{label}</small>
            <p>{value}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export function Venue() {
  return (
    <section id="venue" className="section">
      <div className="section-head reveal">
        <p className="eyebrow">[ 06 ] Campus</p>
        <h2>Venue &amp; arrival</h2>
      </div>
      <div className="split">
        <div>
          <p className="lead reveal">
            SYNAPTRA &apos;26 is hosted at the EEE Seminar Hall, Syed Ammal Engineering College
            (Autonomous), Ramanathapuram. Report at least 15 minutes before your first slot
            with a valid college identity card and your SYN registration ID.
          </p>
          <ul className="plain-list reveal">
            <li><strong>Campus:</strong> Dr. E.M. Abdullah Campus, Ramanathapuram, Tamil Nadu</li>
            <li><strong>Hall:</strong> EEE Seminar Hall</li>
            <li><strong>Host:</strong> Department of Computer Science and Business Systems</li>
            <li><strong>Dress:</strong> Formal or smart campus attire recommended for jury events</li>
          </ul>
          <a className="btn ghost magnetic reveal" href="https://www.google.com/maps/search/?api=1&query=Syed+Ammal+Engineering+College+Ramanathapuram" target="_blank" rel="noopener noreferrer">Open in Google Maps</a>
        </div>
        <aside className="venue-card tilt reveal">
          <p className="hud">Wayfinding</p>
          <h3>How to reach</h3>
          <p>Ramanathapuram is connected by road and rail across southern Tamil Nadu. Use the college main gate and follow on-campus boards to the EEE block / seminar hall.</p>
          <p>Inter-college participants should plan arrival before 08:30 so verification does not cut into the inaugural session.</p>
        </aside>
      </div>
    </section>
  );
}

export function RulesFaq() {
  return (
    <>
      <section id="rules" className="section">
        <div className="section-head reveal">
          <p className="eyebrow">[ 07 ] Protocol</p>
          <h2>Guidelines &amp; compliance</h2>
        </div>
        <div className="accordion">
          {rules.map((block) => (
            <details className="reveal" key={block.title} open={block.open}>
              <summary>{block.title}</summary>
              <ul>
                {block.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </details>
          ))}
        </div>
      </section>
      <section id="faq" className="section">
        <div className="section-head reveal">
          <p className="eyebrow">[ 08 ] Signal check</p>
          <h2>Frequently asked questions</h2>
        </div>
        <div className="accordion">
          {faqs.map((item) => (
            <details className="reveal" key={item.q}>
              <summary>{item.q}</summary>
              <p>{item.a}</p>
            </details>
          ))}
        </div>
      </section>
    </>
  );
}
