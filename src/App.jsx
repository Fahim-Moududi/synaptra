import { useEffect, useState } from "react";
import { schedule } from "./data";
import { Background, Boot, Footer, Header } from "./components/Chrome";
import { Brief, Events } from "./components/Events";
import { Hero } from "./components/Hero";
import { About, Core, Details, RulesFaq, Schedule, Venue } from "./components/Sections";
import { prefersReducedMotion, useSiteEffects } from "./hooks/useSiteEffects";
import { useNeuralCanvas } from "./hooks/useNeuralCanvas";

const BOOT_LINES = [
  "Establishing secure channel…",
  "Linking CSBS nodes…",
  "Calibrating event channels…",
  "SYNAPTRA '26 online.",
];

export default function App() {
  const [boot, setBoot] = useState({ done: false, pct: 0, line: BOOT_LINES[0] });
  const [ready, setReady] = useState(false);
  const [briefId, setBriefId] = useState(null);

  const { mouse, dust } = useSiteEffects(ready);
  const canvasRef = useNeuralCanvas(mouse, dust);

  useEffect(() => {
    if (prefersReducedMotion()) {
      setBoot({ done: true, pct: 100, line: BOOT_LINES[3] });
      document.body.classList.add("ready");
      setReady(true);
      return;
    }
    const start = performance.now();
    let frame = 0;
    const tick = (now) => {
      const t = Math.min(1, (now - start) / 1800);
      const pct = Math.round(t * 100);
      setBoot({
        done: false,
        pct,
        line: BOOT_LINES[Math.min(BOOT_LINES.length - 1, Math.floor(t * BOOT_LINES.length))],
      });
      if (t < 1) frame = requestAnimationFrame(tick);
      else {
        setTimeout(() => {
          setBoot((current) => ({ ...current, done: true }));
          document.body.classList.add("ready");
          setReady(true);
        }, 220);
      }
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    const onKey = (event) => {
      if (event.key !== "Escape") return;
      setBriefId(null);
      document.body.style.overflow = "";
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const openBrief = (id) => {
    setBriefId(id);
    document.body.style.overflow = "hidden";
  };

  const closeBrief = () => {
    setBriefId(null);
    document.body.style.overflow = "";
  };

  return (
    <>
      <Boot done={boot.done} pct={boot.pct} line={boot.line} />
      <Background canvasRef={canvasRef} />
      <Header />
      <main id="top">
        <Hero />
        <div className="marquee" aria-hidden="true">
          <div className="marquee-track">
            {["IDEAS", "TECH", "TALENT", "TOMORROW", "PAPER", "EXPO", "UI/UX", "QUIZ", "AUCTION"].concat(
              ["IDEAS", "TECH", "TALENT", "TOMORROW", "PAPER", "EXPO", "UI/UX", "QUIZ", "AUCTION"]
            ).map((item, i) => (
              <span key={`${item}-${i}`}>{item}</span>
            ))}
          </div>
        </div>
        <section className="stat-bar" aria-label="Symposium snapshot">
          {[
            ["05", "Flagship events"],
            ["01", "Campus day"],
            ["₹200", "Per participant"],
            ["10 Oct", "Last date to register"],
            ["SAEC", "Autonomous campus"],
          ].map(([n, label]) => (
            <article className="reveal" key={label}>
              <b>{n}</b>
              <span>{label}</span>
            </article>
          ))}
        </section>
        <About />
        <Events onOpen={openBrief} />
        <Schedule items={schedule} />
        <Core />
        <Details />
        <Venue />
        <RulesFaq />
      </main>
      <Brief eventId={briefId} onClose={closeBrief} />
      <Footer />
    </>
  );
}
