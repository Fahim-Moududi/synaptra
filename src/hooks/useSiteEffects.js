import { useEffect, useRef } from "react";

export function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function hasFinePointer() {
  return window.matchMedia("(pointer: fine)").matches;
}

export function useSiteEffects(ready) {
  const mouse = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const dust = useRef([]);

  useEffect(() => {
    const reduce = prefersReducedMotion();
    const fine = hasFinePointer();
    const cursor = document.getElementById("cursor");
    const progress = document.getElementById("scroll-progress");
    const art = document.querySelector(".bg-art");
    const ring = { x: mouse.current.x, y: mouse.current.y };
    const parallax = { x: 0, y: 0, tx: 0, ty: 0 };
    let followId = 0;

    const updateProgress = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (progress) progress.style.width = `${max ? (window.scrollY / max) * 100 : 0}%`;
    };

    const onMove = (event) => {
      mouse.current.x = event.clientX;
      mouse.current.y = event.clientY;
      parallax.tx = event.clientX / window.innerWidth - 0.5;
      parallax.ty = event.clientY / window.innerHeight - 0.5;
      if (!fine || reduce || !cursor) return;
      const dot = cursor.querySelector(".cursor-dot");
      if (dot) dot.style.transform = `translate(${event.clientX}px, ${event.clientY}px)`;
      if (dust.current.length < 28) {
        dust.current.push({
          x: event.clientX,
          y: event.clientY,
          vx: (Math.random() - 0.5) * 1.4,
          vy: (Math.random() - 0.5) * 1.4,
          life: 1,
        });
      }
    };

    const onScroll = () => {
      updateProgress();
      if (art && !reduce) art.style.transform = `translateY(${window.scrollY * 0.08}px)`;
    };

    const follow = () => {
      if (!reduce) {
        parallax.x += (parallax.tx - parallax.x) * 0.1;
        parallax.y += (parallax.ty - parallax.y) * 0.1;
        document.documentElement.style.setProperty("--mx", parallax.x.toFixed(4));
        document.documentElement.style.setProperty("--my", parallax.y.toFixed(4));
      }
      if (fine && !reduce && cursor) {
        ring.x += (mouse.current.x - ring.x) * 0.18;
        ring.y += (mouse.current.y - ring.y) * 0.18;
        const ringEl = cursor.querySelector(".cursor-ring");
        if (ringEl) ringEl.style.transform = `translate(${ring.x}px, ${ring.y}px)`;
      }
      followId = requestAnimationFrame(follow);
    };
    follow();

    if (fine && !reduce && cursor) {
      cursor.hidden = false;
      document.body.classList.add("has-cursor");
      document.querySelectorAll("a, button, summary, input, select").forEach((el) => {
        el.addEventListener("pointerenter", () => document.body.classList.add("cursor-grow"));
        el.addEventListener("pointerleave", () => document.body.classList.remove("cursor-grow"));
      });
      document.querySelectorAll(".magnetic").forEach((btn) => {
        btn.addEventListener("pointermove", (event) => {
          const r = btn.getBoundingClientRect();
          btn.style.transform = `translate(${(event.clientX - (r.left + r.width / 2)) * 0.22}px, ${(event.clientY - (r.top + r.height / 2)) * 0.22}px)`;
        });
        btn.addEventListener("pointerleave", () => {
          btn.style.transform = "";
        });
      });
      document.querySelectorAll(".tilt").forEach((card) => {
        card.addEventListener("pointermove", (event) => {
          const r = card.getBoundingClientRect();
          const px = (event.clientX - r.left) / r.width - 0.5;
          const py = (event.clientY - r.top) / r.height - 0.5;
          card.style.transform = `rotateY(${px * 10}deg) rotateX(${py * -10}deg) translateY(-4px)`;
        });
        card.addEventListener("pointerleave", () => {
          card.style.transform = "";
        });
      });
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const node = entry.target;
          const delay = Number(node.dataset.delay || 0);
          setTimeout(() => {
            node.classList.add("in");
            node.setAttribute("data-revealed", "");
          }, delay);
          io.unobserve(node);
        });
      },
      { threshold: 0.16 }
    );

    const watchReveals = () => {
      document.querySelectorAll(".reveal:not([data-revealed])").forEach((el) => io.observe(el));
    };
    watchReveals();
    const mo = new MutationObserver(watchReveals);
    mo.observe(document.body, { childList: true, subtree: true });

    window.addEventListener("pointermove", onMove);
    window.addEventListener("scroll", onScroll, { passive: true });
    updateProgress();

    return () => {
      cancelAnimationFrame(followId);
      io.disconnect();
      mo.disconnect();
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("scroll", onScroll);
    };
  }, [ready]);

  return { mouse, dust };
}
