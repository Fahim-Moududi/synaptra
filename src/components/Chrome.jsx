import { useEffect, useState } from "react";
import { navLinks, registerLinkProps } from "../data";

export function Header() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("nav-open", open);
    return () => document.body.classList.remove("nav-open");
  }, [open]);

  useEffect(() => {
    const close = () => setOpen(false);
    const onKey = (event) => {
      if (event.key === "Escape") close();
    };
    window.addEventListener("hashchange", close);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("hashchange", close);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  return (
    <header className="site-header">
      <a className="brand" href="#top">
        <span className="brand-mark" />
        SYNAPTRA <em>&apos;26</em>
      </a>
      <button
        className="nav-toggle"
        type="button"
        aria-expanded={open}
        aria-controls="site-nav"
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((v) => !v)}
      >
        <span /><span /><span />
      </button>
      <nav id="site-nav" className={`site-nav${open ? " open" : ""}`}>
        {navLinks.map((link) => (
          <a key={link.href} href={link.href} onClick={() => setOpen(false)}>
            {link.label}
          </a>
        ))}
        <a className="nav-cta magnetic" {...registerLinkProps} onClick={() => setOpen(false)}>
          Register
        </a>
      </nav>
    </header>
  );
}

export function Boot({ done, pct, line }) {
  return (
    <div className={`boot${done ? " done" : ""}`} role="dialog" aria-label="Loading SYNAPTRA">
      <div className="boot-inner">
        <p className="hud">SAEC // CSBS // RAMANATHAPURAM</p>
        <h2>SYNAPSE LINK</h2>
        <p className="boot-line">{line}</p>
        <div className="boot-bar" aria-hidden="true">
          <span style={{ width: `${pct}%` }} />
        </div>
        <p className="boot-pct">{String(pct).padStart(2, "0")}%</p>
      </div>
    </div>
  );
}

export function Background({ canvasRef }) {
  return (
    <>
      <div className="cursor" id="cursor" hidden>
        <span className="cursor-dot" />
        <span className="cursor-ring" />
      </div>
      <canvas id="neural-net" ref={canvasRef} aria-hidden="true" />
      <div className="bg-art" aria-hidden="true">
        <div className="aurora a1" />
        <div className="aurora a2" />
        <div className="aurora a3" />
        <div className="hex-grid" />
        <svg className="circuits" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice">
          <g className="trace cyan">
            <path d="M40 80 H220 L260 120 H420" />
            <path d="M40 80 V210 H120 V320" />
            <path d="M80 160 H180 V240 H300" />
            <circle cx="220" cy="80" r="4" />
            <circle cx="260" cy="120" r="3" />
            <circle cx="120" cy="210" r="3" />
            <rect x="292" y="232" width="16" height="16" />
          </g>
          <g className="trace magenta">
            <path d="M1400 120 H1180 L1140 170 H980" />
            <path d="M1400 120 V260 H1320 V380" />
            <path d="M1260 200 H1160 V290 H1040" />
            <circle cx="1180" cy="120" r="4" />
            <circle cx="1140" cy="170" r="3" />
            <circle cx="1320" cy="260" r="3" />
            <rect x="1032" y="282" width="16" height="16" />
          </g>
          <g className="trace cyan faint">
            <path d="M60 820 H260 L300 760 H480" />
            <path d="M1380 840 H1120 L1080 780 H900" />
            <circle cx="260" cy="820" r="3" />
            <circle cx="1120" cy="840" r="3" />
          </g>
        </svg>
        <div className="float-orb o1" />
        <div className="float-orb o2" />
        <div className="float-orb o3" />
        <div className="orbit ring-a" />
        <div className="orbit ring-b" />
        <div className="beam left" />
        <div className="beam right" />
        <div className="sparkles" />
        <svg className="constellation" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice">
          <g stroke="rgba(103,232,249,0.28)" fill="none">
            <path d="M180 240 L320 190 L410 310 L250 360 Z" />
            <path d="M1080 220 L1220 280 L1180 400 L1020 340 Z" />
          </g>
          <g fill="#67e8f9">
            <circle cx="180" cy="240" r="3" />
            <circle cx="320" cy="190" r="2.5" />
            <circle cx="410" cy="310" r="3" />
            <circle cx="250" cy="360" r="2" />
            <circle cx="1080" cy="220" r="3" />
            <circle cx="1220" cy="280" r="2.5" />
            <circle cx="1180" cy="400" r="3" />
            <circle cx="1020" cy="340" r="2" />
          </g>
        </svg>
        <div className="hud-frame tl" />
        <div className="hud-frame tr" />
        <div className="hud-frame bl" />
        <div className="hud-frame br" />
      </div>
      <div className="vignette" aria-hidden="true" />
      <div className="scroll-progress" id="scroll-progress" aria-hidden="true" />
    </>
  );
}

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-grid">
        <div>
          <p className="footer-motto">Ideas / Tech / Talent / Tomorrow</p>
          <p>
            Department of Computer Science and Business Systems
            <br />
            Syed Ammal Engineering College (Autonomous)
            <br />
            Ramanathapuram, Tamil Nadu
          </p>
        </div>
        <div>
          <p className="hud">On the day</p>
          <p>
            16 October 2026 · 9:00 AM
            <br />
            EEE Seminar Hall
            <br />
            ₹200 / participant
          </p>
        </div>
        <nav>
          <p className="hud">Navigate</p>
          <a href="#about">About</a>
          <a href="#events">Events</a>
          <a href="#schedule">Schedule</a>
          <a href="#contact">Contact</a>
          <a {...registerLinkProps}>Register</a>
        </nav>
      </div>
      <p className="copyright">© 2026 SYNAPTRA · Department of CSBS, SAEC. All rights reserved.</p>
    </footer>
  );
}
