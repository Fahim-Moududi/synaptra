import { useEffect, useState } from "react";
import { EVENT_DATE, REGISTER_URL } from "../data";

function pad(value) {
  return String(value).padStart(2, "0");
}

export function Hero() {
  const [parts, setParts] = useState([
    ["Days", "00"],
    ["Hrs", "00"],
    ["Min", "00"],
    ["Sec", "00"],
  ]);

  useEffect(() => {
    const tick = () => {
      const delta = Math.max(0, EVENT_DATE.getTime() - Date.now());
      setParts([
        ["Days", pad(Math.floor(delta / 86400000))],
        ["Hrs", pad(Math.floor(delta / 3600000) % 24)],
        ["Min", pad(Math.floor(delta / 60000) % 60)],
        ["Sec", pad(Math.floor(delta / 1000) % 60)],
      ]);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="hero">
      <p className="college-line reveal">Syed Ammal Engineering College</p>
      <p className="college-meta reveal">An Autonomous Institution · Ramanathapuram, Tamil Nadu</p>
      <p className="dept reveal">
        Department of Computer Science and Business Systems <span>(CSBS)</span>
      </p>

      <div className="hero-title-wrap">
        <div className="neural-orb" data-parallax aria-hidden="true">
          <div className="orb-core" />
          <div className="orb-ring" />
          <div className="orb-ring delay" />
          <div className="orb-ring far" />
          <span className="sat s1" />
          <span className="sat s2" />
          <span className="sat s3" />
        </div>
        <h1 className="glitch">
          {"SYNAPTRA".split("").map((ch, i) => (
            <span className="char" key={`${ch}-${i}`}>
              {ch}
            </span>
          ))}
          <span className="char year">&apos;26</span>
        </h1>
      </div>

      <p className="symposium-type reveal">Technical &amp; Non-Technical Symposium</p>
      <p className="tagline reveal">
        Where Ideas Connect, <em>Innovation Takes Over</em>
      </p>
      <p className="hero-dek reveal">
        A one-day campus symposium for research, products, design, and live-floor competition — hosted by CSBS on 16 October 2026.
      </p>

      <ul className="motto">
        {["Think", "Create", "Compete", "Grow"].map((item) => (
          <li className="reveal" key={item}>
            {item}
          </li>
        ))}
      </ul>

      <p className="hud countdown-label reveal">Symposium starts in</p>
      <div className="countdown" aria-label="Countdown to SYNAPTRA">
        {parts.map(([label, value]) => (
          <div key={label}>
            <b>{value}</b>
            <span>{label}</span>
          </div>
        ))}
      </div>
      <div className="hero-actions reveal">
        <a className="btn magnetic" href={REGISTER_URL}>
          Register now
        </a>
        <a className="btn ghost magnetic" href="#events">
          View events
        </a>
      </div>
      <p className="fine-print reveal">Registration closes 10 October 2026. College ID required on campus.</p>
    </section>
  );
}
