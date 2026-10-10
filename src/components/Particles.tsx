import { useEffect, useRef } from "react";

type P = { x: number; y: number; vx: number; vy: number; r: number; hue: number; t: number; kind: 0 | 1 | 2; life?: number };

export function Particles() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = ref.current!;
    const ctx = c.getContext("2d")!;
    let w = 0, h = 0, raf = 0;
    const dpr = Math.min(devicePixelRatio, 2);
    const mouse = { x: -999, y: -999 };
    const resize = () => { w = innerWidth; h = innerHeight; c.width = w * dpr; c.height = h * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0); };
    resize();
    const n = Math.min(160, Math.floor((w * h) / 8000));
    const make = (): P => {
      const k = Math.random();
      return {
        x: Math.random() * w, y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.3, vy: k < 0.15 ? -0.3 - Math.random() * 0.4 : (Math.random() - 0.5) * 0.3,
        r: k < 0.15 ? 4 + Math.random() * 8 : Math.random() * 2 + 0.5,
        hue: [285, 45, 330][Math.floor(Math.random() * 3)]!, t: Math.random() * 6,
        kind: k < 0.15 ? 2 : k < 0.45 ? 1 : 0,
      };
    };
    const ps: P[] = Array.from({ length: n }, make);
    const trail: P[] = [];
    let shoot: { x: number; y: number; l: number } | null = null;

    const move = (e: PointerEvent) => {
      mouse.x = e.clientX; mouse.y = e.clientY;
      for (let i = 0; i < 2; i++)
        trail.push({ x: e.clientX, y: e.clientY, vx: (Math.random() - 0.5) * 1.5, vy: (Math.random() - 0.5) * 1.5, r: Math.random() * 2.5 + 1, hue: Math.random() > 0.5 ? 45 : 330, t: 0, kind: 0, life: 1 });
      if (trail.length > 200) trail.splice(0, trail.length - 200);
    };
    const leave = () => { mouse.x = mouse.y = -999; };

    const star = (x: number, y: number, r: number) => {
      ctx.beginPath();
      for (let i = 0; i < 8; i++) { const a = (i * Math.PI) / 4; const rr = i % 2 ? r * 0.35 : r; ctx.lineTo(x + Math.cos(a) * rr, y + Math.sin(a) * rr); }
      ctx.closePath(); ctx.fill();
    };

    const loop = () => {
      ctx.clearRect(0, 0, w, h);
      for (const p of ps) {
        const dx = p.x - mouse.x, dy = p.y - mouse.y, d = Math.hypot(dx, dy);
        if (d < 120 && d > 0) { p.vx += (dx / d) * 0.2; p.vy += (dy / d) * 0.2; }
        p.vx *= 0.97; if (p.kind !== 2) p.vy *= 0.97;
        p.x += p.vx + Math.sin(p.t) * 0.2; p.y += p.vy + (p.kind === 0 ? 0.08 : 0); p.t += 0.02;
        if (p.y < -20) p.y = h + 20; if (p.y > h + 20) p.y = -20; if (p.x < -20) p.x = w + 20; if (p.x > w + 20) p.x = -20;
        const a = 0.45 + Math.sin(p.t * 2) * 0.4;
        if (p.kind === 2) {
          const g = ctx.createRadialGradient(p.x - p.r * 0.3, p.y - p.r * 0.3, 0, p.x, p.y, p.r);
          g.addColorStop(0, "hsla(0,0%,100%,0.5)"); g.addColorStop(0.6, `hsla(${p.hue},90%,80%,0.08)`); g.addColorStop(1, `hsla(${(p.hue + 60) % 360},90%,75%,0.45)`);
          ctx.shadowBlur = 0; ctx.fillStyle = g; ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
        } else {
          ctx.fillStyle = `hsla(${p.hue},90%,78%,${a})`; ctx.shadowBlur = 12; ctx.shadowColor = `hsla(${p.hue},100%,70%,1)`;
          if (p.kind === 1) star(p.x, p.y, p.r * 2); else { ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill(); }
        }
      }
      for (let i = trail.length - 1; i >= 0; i--) {
        const p = trail[i]!; p.x += p.vx; p.y += p.vy + 0.3; p.life! -= 0.02;
        if (p.life! <= 0) { trail.splice(i, 1); continue; }
        ctx.fillStyle = `hsla(${p.hue},100%,80%,${p.life})`; ctx.shadowBlur = 15; ctx.shadowColor = `hsla(${p.hue},100%,70%,1)`;
        star(p.x, p.y, p.r * 2 * p.life! + 1);
      }
      if (!shoot && Math.random() < 0.004) shoot = { x: Math.random() * w, y: Math.random() * h * 0.4, l: 1 };
      if (shoot) {
        const g = ctx.createLinearGradient(shoot.x, shoot.y, shoot.x - 120, shoot.y - 60);
        g.addColorStop(0, `hsla(50,100%,90%,${shoot.l})`); g.addColorStop(1, "transparent");
        ctx.strokeStyle = g; ctx.lineWidth = 2; ctx.shadowBlur = 10; ctx.beginPath(); ctx.moveTo(shoot.x, shoot.y); ctx.lineTo(shoot.x - 120, shoot.y - 60); ctx.stroke();
        shoot.x += 9; shoot.y += 4.5; shoot.l -= 0.015; if (shoot.l <= 0) shoot = null;
      }
      raf = requestAnimationFrame(loop);
    };
    loop();
    addEventListener("resize", resize);
    addEventListener("pointermove", move);
    addEventListener("pointerleave", leave);
    return () => { cancelAnimationFrame(raf); removeEventListener("resize", resize); removeEventListener("pointermove", move); removeEventListener("pointerleave", leave); };
  }, []);
  return <canvas ref={ref} className="pointer-events-none fixed inset-0 h-full w-full" />;
}
