import { useEffect, useRef } from "react";
import { prefersReducedMotion } from "./useSiteEffects";

export function useNeuralCanvas(mouseRef, dustRef) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const reduce = prefersReducedMotion();
    let points = [];
    let packets = [];
    let meteors = [];
    let frame = 0;

    const spawnPacket = () => ({
      a: Math.floor(Math.random() * points.length),
      b: Math.floor(Math.random() * points.length),
      t: Math.random(),
      speed: 0.003 + Math.random() * 0.006,
      magenta: Math.random() > 0.55,
    });

    const spawnMeteor = () => ({
      x: Math.random() * canvas.width,
      y: -40 - Math.random() * 200,
      len: 50 + Math.random() * 80,
      speed: 2.2 + Math.random() * 2.4,
      drift: 1.4 + Math.random() * 1.2,
      hue: Math.random() > 0.5 ? "34,211,238" : "232,121,249",
    });

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      const count = Math.min(88, Math.floor((canvas.width * canvas.height) / 18000));
      points = Array.from({ length: count }, (_, i) => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        hub: i < 8,
        pulse: Math.random() * Math.PI * 2,
      }));
      packets = Array.from({ length: 14 }, spawnPacket);
      meteors = Array.from({ length: 5 }, spawnMeteor);
    };

    const drawHex = (x, y, r, color) => {
      ctx.beginPath();
      for (let i = 0; i < 6; i += 1) {
        const angle = (Math.PI / 3) * i - Math.PI / 6;
        const px = x + Math.cos(angle) * r;
        const py = y + Math.sin(angle) * r;
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.closePath();
      ctx.strokeStyle = color;
      ctx.stroke();
    };

    const drawGrid = (mouse) => {
      const horizon = canvas.height * 0.58;
      const vanishX = canvas.width * 0.5 + (mouse.x - canvas.width * 0.5) * 0.04;
      const vanishY = canvas.height * 0.38;
      ctx.save();
      ctx.strokeStyle = "rgba(34, 211, 238, 0.07)";
      for (let i = 0; i < 14; i += 1) {
        const y = horizon + (i / 13) ** 1.7 * (canvas.height - horizon);
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }
      ctx.strokeStyle = "rgba(168, 85, 247, 0.06)";
      for (let i = -14; i <= 14; i += 1) {
        const x = canvas.width / 2 + i * (canvas.width / 16);
        ctx.beginPath();
        ctx.moveTo(x, canvas.height + 20);
        ctx.lineTo(vanishX, vanishY);
        ctx.stroke();
      }
      ctx.restore();
    };

    const draw = () => {
      const mouse = mouseRef.current;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawGrid(mouse);
      const glow = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 240);
      glow.addColorStop(0, "rgba(34, 211, 238, 0.12)");
      glow.addColorStop(1, "transparent");
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < points.length; i += 1) {
        const p = points[i];
        p.vx += (mouse.x - p.x) * 0.0012;
        p.vy += (mouse.y - p.y) * 0.0012;
        p.vx *= 0.994;
        p.vy *= 0.994;
        p.x += p.vx;
        p.y += p.vy;
        p.pulse += 0.03;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        for (let j = i + 1; j < points.length; j += 1) {
          const q = points[j];
          const dist = Math.hypot(p.x - q.x, p.y - q.y);
          if (dist < 140) {
            ctx.strokeStyle = `rgba(34, 211, 238, ${0.2 * (1 - dist / 140)})`;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.stroke();
          }
        }

        const toMouse = Math.hypot(p.x - mouse.x, p.y - mouse.y);
        if (toMouse < 220) {
          ctx.strokeStyle = `rgba(232, 121, 249, ${0.28 * (1 - toMouse / 220)})`;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
        }

        if (p.hub) {
          drawHex(p.x, p.y, 11 + Math.sin(p.pulse) * 1.2, "rgba(232, 121, 249, 0.35)");
          ctx.fillStyle = "#e879f9";
          ctx.beginPath();
          ctx.arc(p.x, p.y, 2.2, 0, Math.PI * 2);
          ctx.fill();
        } else {
          ctx.fillStyle = "#67e8f9";
          ctx.beginPath();
          ctx.arc(p.x, p.y, 1.4, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      packets.forEach((pack) => {
        if (!points[pack.a] || !points[pack.b]) return;
        pack.t += pack.speed;
        if (pack.t >= 1) {
          Object.assign(pack, spawnPacket(), { t: 0 });
          return;
        }
        const a = points[pack.a];
        const b = points[pack.b];
        ctx.fillStyle = pack.magenta ? "#e879f9" : "#22d3ee";
        ctx.shadowColor = ctx.fillStyle;
        ctx.shadowBlur = 12;
        ctx.beginPath();
        ctx.arc(a.x + (b.x - a.x) * pack.t, a.y + (b.y - a.y) * pack.t, 2.1, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      meteors.forEach((m, i) => {
        m.x += m.drift;
        m.y += m.speed;
        ctx.strokeStyle = `rgba(${m.hue}, 0.55)`;
        ctx.lineWidth = 1.4;
        ctx.beginPath();
        ctx.moveTo(m.x, m.y);
        ctx.lineTo(m.x - m.len * 0.45, m.y - m.len);
        ctx.stroke();
        if (m.y > canvas.height + 80) meteors[i] = spawnMeteor();
      });

      const dust = dustRef.current;
      for (let i = dust.length - 1; i >= 0; i -= 1) {
        const d = dust[i];
        d.life -= 0.03;
        d.x += d.vx;
        d.y += d.vy;
        if (d.life <= 0) {
          dust.splice(i, 1);
          continue;
        }
        ctx.fillStyle = `rgba(103, 232, 249, ${d.life})`;
        ctx.beginPath();
        ctx.arc(d.x, d.y, 1.4, 0, Math.PI * 2);
        ctx.fill();
      }

      frame = requestAnimationFrame(draw);
    };

    resize();
    if (!reduce) draw();
    else {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
    };
  }, [mouseRef, dustRef]);

  return canvasRef;
}
