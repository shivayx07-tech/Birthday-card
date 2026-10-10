import { motion } from "framer-motion";
import garland from "@/assets/garland.png";

export function Garlands() {
  const base = "pointer-events-none fixed z-0 w-28 opacity-70 sm:w-56 sm:opacity-85 lg:w-80 sway";
  return (
    <>
      <img src={garland} alt="" width={1024} height={1024} className={`${base} left-0 top-0`} />
      <img src={garland} alt="" width={1024} height={1024} className={`${base} right-0 top-0 -scale-x-100`} />
      <img src={garland} alt="" width={1024} height={1024} loading="lazy" className={`${base} bottom-0 left-0 -scale-y-100 sm:opacity-70`} />
      <img src={garland} alt="" width={1024} height={1024} loading="lazy" className={`${base} bottom-0 right-0 -scale-100 sm:opacity-70`} />
    </>
  );
}

function ButterflySvg({ hue }: { hue: number }) {
  return (
    <svg viewBox="0 0 40 30" className="h-full w-full" style={{ filter: `drop-shadow(0 0 6px hsl(${hue} 100% 75%))` }}>
      <motion.g style={{ originX: "20px", originY: "15px" }} animate={{ scaleX: [1, 0.2, 1] }} transition={{ duration: 0.35, repeat: Infinity }}>
        <path d="M20 15 C10 0 0 4 4 14 C0 22 10 28 20 16 C30 28 40 22 36 14 C40 4 30 0 20 15Z" fill={`hsl(${hue} 90% 78% / .85)`} />
      </motion.g>
      <rect x="19.3" y="9" width="1.4" height="13" rx=".7" fill={`hsl(${hue} 40% 30%)`} />
    </svg>
  );
}

const PATHS = [
  { hue: 330, x: ["-10vw", "30vw", "18vw", "46vw", "38vw"], y: ["70vh", "40vh", "22vh", "30vh", "20vh"], dur: 18 },
  { hue: 280, x: ["110vw", "70vw", "80vw", "58vw", "62vw"], y: ["20vh", "35vh", "60vh", "52vh", "70vh"], dur: 22 },
  { hue: 45, x: ["50vw", "20vw", "8vw", "25vw", "12vw"], y: ["110vh", "75vh", "50vh", "42vh", "80vh"], dur: 26 },
];

export function Butterflies() {
  return (
    <div className="pointer-events-none fixed inset-0 z-10">
      {PATHS.map((p, i) => (
        <motion.div key={i} className="absolute h-8 w-10 sm:h-10 sm:w-12"
          initial={{ x: p.x[0]!, y: p.y[0]! }}
          animate={{ x: p.x, y: p.y, rotate: [0, 10, -8, 6, 0] }}
          transition={{ duration: p.dur, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}>
          <ButterflySvg hue={p.hue} />
        </motion.div>
      ))}
    </div>
  );
}

const BALLOONS = [
  { left: "6%", hue: 330, dur: 16, delay: 0, size: 64 }, { left: "10%", hue: 45, dur: 20, delay: 3, size: 52 },
  { left: "2%", hue: 280, dur: 18, delay: 7, size: 60 }, { left: "84%", hue: 350, dur: 22, delay: 1, size: 72 },
  { left: "93%", hue: 50, dur: 17, delay: 5, size: 56 }, { left: "90%", hue: 300, dur: 21, delay: 9, size: 64 },
];

export function Balloons() {
  return (
    <div className="pointer-events-none fixed inset-0 z-[5] overflow-hidden">
      {BALLOONS.map((b, i) => (
        <motion.div key={i} className="absolute" style={{ left: b.left }}
          initial={{ y: "110vh" }}
          animate={{ y: "-40vh", x: [0, 25, -20, 18, 0] }}
          transition={{ y: { duration: b.dur, delay: b.delay, repeat: Infinity, ease: "linear" }, x: { duration: 6, repeat: Infinity, ease: "easeInOut" } }}>
          <svg width={b.size} height={b.size * 1.9} viewBox="0 0 50 95">
            <defs>
              <radialGradient id={`bl${i}`} cx="35%" cy="30%" r="70%">
                <stop offset="0%" stopColor={`hsl(${b.hue} 100% 92%)`} />
                <stop offset="55%" stopColor={`hsl(${b.hue} 85% 68%)`} />
                <stop offset="100%" stopColor={`hsl(${b.hue} 70% 38%)`} />
              </radialGradient>
            </defs>
            <ellipse cx="25" cy="25" rx="21" ry="25" fill={`url(#bl${i})`} opacity=".9" />
            <ellipse cx="17" cy="15" rx="4" ry="7" fill="hsl(0 0% 100% / .5)" />
            <path d="M22 49 L28 49 L25 54 Z" fill={`hsl(${b.hue} 70% 45%)`} />
            <path d="M25 54 Q20 70 27 80 T24 95" stroke="hsl(0 0% 100% / .5)" fill="none" strokeWidth=".8" />
          </svg>
        </motion.div>
      ))}
    </div>
  );
}

export function Lanterns({ wave }: { wave: number }) {
  if (!wave) return null;
  return (
    <div key={wave} className="pointer-events-none fixed inset-0 z-40 overflow-hidden">
      {Array.from({ length: 22 }, (_, i) => {
        const s = 26 + ((i * 37) % 30);
        return (
          <div key={i} className="lantern absolute" style={{ left: `${(i * 47) % 96}%`, bottom: "-80px", animationDuration: `${9 + (i % 5) * 1.5}s`, animationDelay: `${(i % 7) * 0.45}s`, opacity: 0 }}>
            <svg width={s} height={s * 1.3} viewBox="0 0 30 40" className="flicker">
              <defs>
                <linearGradient id={`ln${i}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(40 100% 85%)" /><stop offset="100%" stopColor="hsl(25 100% 55%)" />
                </linearGradient>
              </defs>
              <path d="M5 2 H25 L28 34 Q15 38 2 34 Z" fill={`url(#ln${i})`} />
              <ellipse cx="15" cy="34" rx="5" ry="2" fill="hsl(50 100% 90%)" />
            </svg>
          </div>
        );
      })}
    </div>
  );
}
