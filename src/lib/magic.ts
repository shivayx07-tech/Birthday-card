import confetti from "canvas-confetti";

export const COLORS = ["#ff8fc8", "#f5c542", "#c084fc", "#ffffff", "#ffd1e8"];

const heart = () => confetti.shapeFromPath({ path: "M167 72c19-38 37-56 75-56 42 0 76 33 76 75 0 76-76 151-151 227-76-76-151-151-151-227 0-42 33-75 75-75 38 0 57 18 76 56z" });

export function heartBurst() {
  const shapes = [heart(), "star" as const];
  confetti({ particleCount: 140, spread: 130, startVelocity: 45, origin: { y: 0.6 }, colors: COLORS, shapes, scalar: 1.6, zIndex: 40 });
  const end = Date.now() + 1800;
  (function f() {
    confetti({ particleCount: 4, angle: 60, spread: 60, origin: { x: 0, y: 0.85 }, colors: COLORS, shapes, scalar: 1.3, zIndex: 40 });
    confetti({ particleCount: 4, angle: 120, spread: 60, origin: { x: 1, y: 0.85 }, colors: COLORS, shapes, scalar: 1.3, zIndex: 40 });
    if (Date.now() < end) requestAnimationFrame(f);
  })();
}

/** Fireworks on a background canvas (sits behind the card, so never covers text). */
export function startFireworks(canvas: HTMLCanvasElement) {
  const fire = confetti.create(canvas, { resize: true });
  let n = 0;
  const id = setInterval(() => {
    fire({ particleCount: 60, spread: 360, startVelocity: 22, gravity: 0.5, ticks: 110, decay: 0.92, scalar: 0.8,
      origin: { x: 0.1 + Math.random() * 0.8, y: 0.1 + Math.random() * 0.35 }, colors: [COLORS[n++ % COLORS.length]!, "#ffffff"], shapes: ["star", "circle"] });
  }, 1400);
  return () => { clearInterval(id); fire.reset(); };
}

/** Soft, sweeter music-box Happy Birthday (slow tempo, gentle arpeggios & sparkles). Returns a stop function. */
export function startMusicBox() {
  const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
  const ac = new AC();
  const master = ac.createGain(); master.gain.value = 0.17;
  const soft = ac.createBiquadFilter(); soft.type = "lowpass"; soft.frequency.value = 2800; soft.Q.value = 0.4;
  soft.connect(master);
  const delay = ac.createDelay(); delay.delayTime.value = 0.36;
  const fb = ac.createGain(); fb.gain.value = 0.32;
  delay.connect(fb).connect(delay); delay.connect(soft); master.connect(ac.destination);
  soft.connect(ac.destination);

  const tone = (f: number, t: number, dur: number, vol: number, type: OscillatorType = "sine") => {
    for (const [mult, v, cents] of [[1, 1, -4], [1, 1, 4], [2, 0.18, 0]] as const) {
      const o = ac.createOscillator(), g = ac.createGain();
      o.type = type; o.frequency.value = f * mult; o.detune.value = cents;
      g.gain.setValueAtTime(0, t);
      g.gain.linearRampToValueAtTime(vol * v, t + 0.012);
      g.gain.exponentialRampToValueAtTime(0.0001, t + dur + 1.4);
      o.connect(g); g.connect(soft); g.connect(delay);
      o.start(t); o.stop(t + dur + 1.5);
    }
  };

  // Melody: Happy Birthday in G, slightly slower and rounder.
  const beat = 0.42;
  const notes: [number, number][] = [
    [784, .55], [784, .4], [880, .85], [784, .85], [1047, .85], [988, 1.7],
    [784, .55], [784, .4], [880, .85], [784, .85], [1175, .85], [1047, 1.7],
    [784, .55], [784, .4], [1568, .85], [1319, .85], [1047, .85], [988, .85], [880, 1.7],
    [1397, .55], [1397, .4], [1319, .85], [1047, .85], [1175, .85], [1047, 2.6],
  ];
  const phraseChords: [number, number[][]][] = [
    [0, [[196, 247, 294]]],                                  // G
    [6, [[262, 330, 392], [294, 370, 440]]],                 // C, then D
    [12, [[330, 392, 494], [262, 330, 392]]],                // Em, then C
    [19, [[262, 330, 392], [294, 370, 440], [196, 247, 294]]], // C, D, G
  ];

  const total = notes.reduce((a, [, d]) => a + d, 0);
  let next = ac.currentTime + 0.1;
  const schedule = () => {
    let t = next;
    notes.forEach(([f, d], i) => {
      tone(f, t, Math.min(d, 0.9), 1);              // melody
      if (d > 1.2) {                                 // twinkle on held notes
        tone(f * 2, t + 0.15, 0.5, 0.08, "triangle");
        tone(f * 3, t + 0.45, 0.4, 0.05, "sine");
      }
      for (const [start, chords] of phraseChords) {  // soft arpeggios under each phrase
        if (i === start) {
          const half = (total * beat) / chords.length;
          chords.forEach((chord, k) =>
            chord.forEach((c, m) => tone(c, t + k * half + m * 0.38, 0.7, 0.12, "triangle")));
        }
      }
      t += d * beat;
    });
    next += total * beat + 1.4;
  };
  schedule();
  const id = setInterval(() => { if (next - ac.currentTime < 3) schedule(); }, 1000);
  return () => { clearInterval(id); master.gain.linearRampToValueAtTime(0, ac.currentTime + 0.5); setTimeout(() => ac.close(), 600); };
}

export function starShower() {
  for (let i = 0; i < 8; i++)
    setTimeout(() => confetti({ particleCount: 50, spread: 170, startVelocity: 20, gravity: 0.5, ticks: 260, origin: { x: Math.random(), y: -0.1 }, colors: COLORS, shapes: ["star"], scalar: 1.2, zIndex: 40 }), i * 220);
}
