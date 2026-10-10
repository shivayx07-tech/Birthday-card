import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import m1 from "@/assets/memory1.jpg";
import m2 from "@/assets/memory2.jpg";
import m3 from "@/assets/memory3.jpg";

const SLIDES = [
  { src: m1, cap: "Every late-night talk under the stars" },
  { src: m2, cap: "Every celebration, sweeter with you" },
  { src: m3, cap: "Dreaming side by side, always" },
];

export function Carousel() {
  const [[i, dir], set] = useState([0, 1]);
  const go = (d: number) => set(([x]) => [(x + d + SLIDES.length) % SLIDES.length, d]);
  useEffect(() => { const t = setInterval(() => go(1), 5000); return () => clearInterval(t); }, [i]);
  return (
    <div>
      <p className="mb-3 font-script text-3xl text-gold">Our magical moments ✨</p>
      <div className="relative mx-auto aspect-[4/3] w-full max-w-md overflow-hidden rounded-2xl border border-pink/40 shadow-[0_0_30px_oklch(0.85_0.1_350/35%)]">
        <AnimatePresence initial={false} custom={dir}>
          <motion.img key={i} src={SLIDES[i]!.src} alt={SLIDES[i]!.cap} width={944} height={704} loading="lazy"
            custom={dir}
            initial={{ x: `${dir * 100}%`, opacity: 0.4 }} animate={{ x: 0, opacity: 1 }} exit={{ x: `${-dir * 100}%`, opacity: 0.4 }}
            transition={{ type: "spring", stiffness: 70, damping: 18 }}
            drag="x" dragConstraints={{ left: 0, right: 0 }}
            onDragEnd={(_, info) => { if (info.offset.x < -50) go(1); else if (info.offset.x > 50) go(-1); }}
            className="absolute inset-0 h-full w-full cursor-grab object-cover active:cursor-grabbing" />
        </AnimatePresence>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-background/90 to-transparent px-4 pb-3 pt-10 text-sm text-foreground">
          {SLIDES[i]!.cap}
        </div>
        <button onClick={() => go(-1)} aria-label="Previous" className="absolute left-2 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full bg-background/40 text-lg backdrop-blur hover:bg-primary/60">‹</button>
        <button onClick={() => go(1)} aria-label="Next" className="absolute right-2 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full bg-background/40 text-lg backdrop-blur hover:bg-primary/60">›</button>
      </div>
      <div className="mt-3 flex justify-center gap-2">
        {SLIDES.map((_, k) => (
          <button key={k} onClick={() => set([k, k > i ? 1 : -1])} aria-label={`Slide ${k + 1}`}
            className={`text-sm transition-all ${k === i ? "scale-125 text-pink" : "text-muted-foreground/50"}`}>♥</button>
        ))}
      </div>
    </div>
  );
}
