import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Particles } from "@/components/Particles";
import { Balloons, Butterflies, Garlands, Lanterns } from "@/components/Decor";
import { Carousel } from "@/components/Carousel";
import { heartBurst, starShower, startFireworks, startMusicBox } from "@/lib/magic";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Happy Birthday, Shreya! 🌟✨" },
      { name: "description", content: "A magical fairytale birthday card for Shreya, with all my love from Shivay." },
      { property: "og:title", content: "Happy Birthday, Shreya! 🌟✨" },
      { property: "og:description", content: "A magic letter is waiting for you — open it." },
    ],
  }),
  component: Index,
});

function Envelope({ onOpen }: { onOpen: () => void }) {
  const [opening, setOpening] = useState(false);
  const click = () => { if (opening) return; setOpening(true); setTimeout(onOpen, 1300); };
  return (
    <motion.button onClick={click} aria-label="Open the magic letter"
      initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: [0, -10, 0] }}
      transition={{ y: { duration: 4, repeat: Infinity, ease: "easeInOut" }, opacity: { duration: 1 } }}
      exit={{ opacity: 0, scale: 0.7, z: -300, rotateX: 18, filter: "blur(10px)", transition: { type: "spring", stiffness: 70, damping: 15 } }}
      whileHover={{ scale: 1.03 }}
      style={{ transformPerspective: 1200 }}
      className="relative z-30 flex flex-col items-center gap-8 outline-none">
      <div className="relative h-56 w-80 sm:h-64 sm:w-[26rem] [perspective:1200px]">
        <div className="absolute -inset-6 rounded-full bg-gold/20 blur-3xl pulse-glow" />
        <div className="absolute inset-0 rounded-xl border-2 border-gold/60 bg-gradient-to-br from-pink/90 to-primary/80 shadow-2xl" />
        <motion.div className="absolute inset-x-5 top-5 bottom-5 rounded-lg bg-foreground"
          animate={opening ? { y: -110 } : { y: 0 }} transition={{ delay: 0.55, duration: 0.7, ease: "easeOut" }}>
          <p className="mt-5 text-center font-script text-3xl text-primary">With love ✨</p>
        </motion.div>
        <div className="absolute inset-0 rounded-xl bg-gradient-to-t from-primary to-pink/80 [clip-path:polygon(0_0,50%_55%,100%_0,100%_100%,0_100%)]" />
        <div className="absolute inset-2 rounded-lg border border-dashed border-gold/50 [clip-path:polygon(0_0,50%_55%,100%_0,100%_100%,0_100%)]" />
        <p className="absolute inset-x-0 bottom-6 z-10 text-center font-script text-4xl text-foreground text-glow-gold sm:text-5xl">To Shreya 💖</p>
        <motion.div className="absolute inset-x-0 top-0 h-[55%] origin-top bg-gradient-to-b from-pink to-primary [clip-path:polygon(0_0,100%_0,50%_100%)]"
          animate={opening ? { rotateX: 180 } : { rotateX: 0 }} transition={{ duration: 0.6 }}
          style={{ transformStyle: "preserve-3d", zIndex: opening ? 0 : 20 }} />
        <motion.div animate={opening ? { scale: 0, opacity: 0 } : { scale: 1 }}
          className="absolute left-1/2 top-[55%] z-30 grid h-14 w-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-2 border-gold bg-gradient-to-br from-gold to-pink text-2xl shadow-lg">♥</motion.div>
      </div>
      <span className="pulse-glow rounded-full border border-gold/60 bg-background/30 px-6 py-2 text-xs uppercase tracking-[0.3em] text-gold backdrop-blur sm:text-sm">
        Tap to open the magic ✨
      </span>
    </motion.button>
  );
}

const WISH = "Thank you for bringing endless joy, laughter, and magic into my life. On your special day, I wish you all the happiness in the world. 🌸🎂✨";

function Wish() {
  const words = WISH.split(" ");
  return (
    <motion.p initial="h" whileInView="s" viewport={{ once: true, amount: 0.4 }}
      variants={{ s: { transition: { staggerChildren: 0.07 } } }}
      className="text-base leading-relaxed text-foreground sm:text-lg">
      {words.map((w, i) => (
        <motion.span key={i} className="inline-block" variants={{ h: { opacity: 0, y: 10, filter: "blur(6px)" }, s: { opacity: 1, y: 0, filter: "blur(0px)" } }}>
          {w}&nbsp;
        </motion.span>
      ))}
    </motion.p>
  );
}

function Card({ onWish }: { onWish: () => void }) {
  const fade = (d: number) => ({ initial: { opacity: 0, y: 24 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { delay: d, duration: 0.9 } });
  return (
    <motion.article initial={{ opacity: 0, scale: 0.9, filter: "blur(14px)" }} animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
      transition={{ type: "spring", stiffness: 70, damping: 15, filter: { duration: 0.9 }, opacity: { duration: 0.8 } }}
      className="glass gold-line relative z-30 w-full max-w-2xl rounded-[2rem] px-6 py-12 text-center backdrop-blur-lg sm:px-14 sm:py-16">
      <motion.p {...fade(0.4)} className="text-xs uppercase tracking-[0.4em] text-gold">✦ A day made of magic ✦</motion.p>
      <motion.h1 {...fade(0.6)} className="mt-4 break-words px-1 pb-2 font-script text-[3.2rem] leading-[1.2] sm:text-8xl">
        <span className="text-title">Happy Birthday,</span><br /><span className="text-title">Shreya!</span> <span className="font-sans text-4xl sm:text-5xl">🌟</span>
      </motion.h1>
      <motion.p {...fade(0.8)} className="mx-auto mt-5 max-w-md text-base leading-loose text-foreground sm:text-lg">Wishing you a day as magical and beautiful as you are.</motion.p>
      <div className="mx-auto my-10 h-px w-32 bg-gradient-to-r from-transparent via-gold to-transparent" />
      <motion.div {...fade(0.9)}><Carousel /></motion.div>
      <div className="mx-auto my-10 h-px w-32 bg-gradient-to-r from-transparent via-pink to-transparent" />
      <h2 className="mb-6 font-script text-3xl leading-normal text-gold text-glow-gold sm:text-4xl">To my most special & amazing best friend...</h2>
      <Wish />
      <motion.button {...fade(0.2)} onClick={onWish} whileTap={{ scale: 0.94 }}
        className="btn-liquid pulse-glow mt-12 rounded-full px-7 py-3.5 text-sm font-semibold sm:text-base">
        Press here for a Birthday Wish 💫
      </motion.button>
      <motion.footer {...fade(0.3)} className="mt-12 text-sm text-muted-foreground">
        Best wishes from
        <span className="mt-1 block font-script text-5xl text-pink text-glow-gold">Shivay</span>
      </motion.footer>
    </motion.article>
  );
}

function Loader() {
  return (
    <motion.div key="loader" exit={{ opacity: 0, transition: { duration: 0.8 } }}
      className="fixed inset-0 z-[60] grid place-items-center bg-background">
      <div className="flex flex-col items-center gap-5">
        <motion.div className="text-5xl" animate={{ scale: [1, 1.25, 1], rotate: [0, 10, -10, 0] }} transition={{ duration: 1.4, repeat: Infinity }}>💖</motion.div>
        <div className="flex gap-2">
          {[0, 1, 2].map((i) => (
            <motion.span key={i} className="h-2.5 w-2.5 rounded-full bg-gold" animate={{ y: [0, -10, 0], opacity: [0.4, 1, 0.4] }} transition={{ duration: 1, repeat: Infinity, delay: i * 0.18 }} />
          ))}
        </div>
        <p className="font-script text-3xl text-pink">Gathering the magic...</p>
      </div>
    </motion.div>
  );
}

function WishSent({ show }: { show: boolean }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div initial={{ opacity: 0, y: -40, filter: "blur(8px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -30, filter: "blur(6px)" }}
          transition={{ type: "spring", stiffness: 90, damping: 16 }}
          className="pointer-events-none fixed inset-x-0 top-4 z-[70] flex justify-center px-4">
          <div className="glass gold-line flex items-center gap-3 rounded-2xl px-5 py-3 text-left">
            <span className="text-2xl">🏮</span>
            <div>
              <p className="font-script text-3xl leading-none text-gold">Wish Sent! ✨</p>
              <p className="mt-1 text-xs text-foreground/90">May every dream of yours come true, Shreya.</p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Index() {
  const [loading, setLoading] = useState(true);
  const [sent, setSent] = useState(false);
  useEffect(() => { const t = setTimeout(() => setLoading(false), 1800); return () => clearTimeout(t); }, []);
  const sendWish = () => { setWave((w) => w + 1); starShower(); setSent(true); setTimeout(() => setSent(false), 2800); };
  const [open, setOpen] = useState(false);
  const [wave, setWave] = useState(0);
  const [music, setMusic] = useState(false);
  const stopRef = useRef<null | (() => void)>(null);
  const fwRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!open || !fwRef.current) return;
    return startFireworks(fwRef.current);
  }, [open]);
  useEffect(() => () => stopRef.current?.(), []);

  const toggleMusic = () => {
    if (music) { stopRef.current?.(); stopRef.current = null; setMusic(false); }
    else { stopRef.current = startMusicBox(); setMusic(true); }
  };
  const openCard = () => {
    setOpen(true); heartBurst();
    if (!stopRef.current) { stopRef.current = startMusicBox(); setMusic(true); }
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-x-hidden px-4 py-24 sm:py-28">
      <Particles />
      <canvas ref={fwRef} className="pointer-events-none fixed inset-0 h-full w-full" />
      <Garlands />
      <Butterflies />
      {open && <Balloons />}
      <Lanterns wave={wave} />
      <button onClick={toggleMusic} aria-label={music ? "Mute music" : "Play music"}
        className="glass fixed right-3 top-3 z-50 grid h-12 w-12 place-items-center rounded-full text-xl transition hover:scale-110">
        {music ? "🎵" : "🔇"}
      </button>
      <AnimatePresence>{loading && <Loader />}</AnimatePresence>
      <WishSent show={sent} />
      <AnimatePresence mode="wait">
        {loading ? null : !open ? <Envelope key="env" onOpen={openCard} /> : <Card key="card" onWish={sendWish} />}
      </AnimatePresence>
    </main>
  );
}
