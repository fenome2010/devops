import { useEffect, useRef, useState } from "react";
import { TICKER } from "../data";
import { Reveal, usePrefersReducedMotion, useCountUp, fmtMoney, IconArrow } from "./ui";

type Line = { type: "cmd" | "out" | "ok" | "accent"; text: string };

const SCRIPT: Line[] = [
  { type: "cmd", text: "whoami" },
  { type: "out", text: "новичок: 0 опыта, 20 ч/неделю, мотивация 100%" },
  { type: "cmd", text: "mentor init --цель 200000 --срок 12-недель" },
  { type: "out", text: "[■■■■■■■■■■] загрузка маршрута..." },
  { type: "ok", text: "✓ 8 модулей: git → linux → docker → ci/cd → ansible → k8s" },
  { type: "ok", text: "✓ практика 80% / теория 20%" },
  { type: "ok", text: "✓ 6 проектов в портфолио + mock-интервью" },
  { type: "accent", text: "план готов. begin: неделя 1, тема «Git: фундамент»" },
];

function TerminalWindow() {
  const reduced = usePrefersReducedMotion();
  const [lines, setLines] = useState<Line[]>(reduced ? SCRIPT : []);
  const [typing, setTyping] = useState("");
  const [busy, setBusy] = useState(!reduced);
  const idxRef = useRef(0);

  useEffect(() => {
    if (reduced) {
      setLines(SCRIPT);
      setBusy(false);
      return;
    }
    let alive = true;
    let timer: ReturnType<typeof setTimeout>;

    const playLine = () => {
      if (!alive) return;
      const i = idxRef.current;
      if (i >= SCRIPT.length) {
        setBusy(false);
        return;
      }
      const line = SCRIPT[i];
      if (line.type === "cmd") {
        let c = 0;
        const typeChar = () => {
          if (!alive) return;
          c++;
          setTyping(line.text.slice(0, c));
          if (c < line.text.length) {
            timer = setTimeout(typeChar, 34 + Math.random() * 40);
          } else {
            timer = setTimeout(() => {
              setLines((prev) => [...prev, line]);
              setTyping("");
              idxRef.current++;
              timer = setTimeout(playLine, 260);
            }, 320);
          }
        };
        timer = setTimeout(typeChar, 420);
      } else {
        timer = setTimeout(() => {
          setLines((prev) => [...prev, line]);
          idxRef.current++;
          timer = setTimeout(playLine, line.type === "accent" ? 60 : 210);
        }, 120);
      }
    };

    timer = setTimeout(playLine, 700);
    return () => {
      alive = false;
      clearTimeout(timer);
    };
  }, [reduced]);

  const lineColor = (t: Line["type"]) =>
    t === "cmd"
      ? "text-ink-50"
      : t === "ok"
        ? "text-term-400"
        : t === "accent"
          ? "text-amber-450"
          : "text-ink-300";

  return (
    <div className="relative rounded-xl border border-ink-600 bg-ink-900/95 glow-term scanlines overflow-hidden">
      {/* title bar */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-ink-700 bg-ink-850">
        <span className="w-3 h-3 rounded-full bg-coral-500/80" />
        <span className="w-3 h-3 rounded-full bg-amber-450/80" />
        <span className="w-3 h-3 rounded-full bg-term-400/80" />
        <span className="ml-3 font-mono text-[11.5px] text-ink-300 tracking-wide">
          student@devops-mentor: ~/путь-к-офферу
        </span>
        <span className="ml-auto flex items-center gap-1.5 font-mono text-[10.5px] text-term-400">
          <span className="w-1.5 h-1.5 rounded-full bg-term-400 pulse-dot" />
          live
        </span>
      </div>
      {/* body */}
      <div className="p-4 md:p-5 font-mono text-[12.5px] md:text-[13.5px] leading-[1.85] min-h-[268px]">
        {lines.map((l, i) => (
          <div key={i} className={lineColor(l.type)}>
            {l.type === "cmd" ? (
              <>
                <span className="text-term-400 select-none">➜ </span>
                <span className="text-sky-450 select-none">~ </span>
                {l.text}
              </>
            ) : (
              <span className="pl-1">{l.text}</span>
            )}
          </div>
        ))}
        {typing !== "" && (
          <div className="text-ink-50">
            <span className="text-term-400 select-none">➜ </span>
            <span className="text-sky-450 select-none">~ </span>
            {typing}
            <span className="cursor-blink text-term-400">▋</span>
          </div>
        )}
        {!busy && (
          <div className="text-ink-50">
            <span className="text-term-400 select-none">➜ </span>
            <span className="text-sky-450 select-none">~ </span>
            <span className="cursor-blink text-term-400">▋</span>
          </div>
        )}
      </div>
    </div>
  );
}

function HeroStat({ value, label, accent }: { value: string; label: string; accent: string }) {
  return (
    <div className="border-l-2 pl-4" style={{ borderColor: accent }}>
      <div className="font-display font-bold text-xl md:text-[26px] text-ink-50 leading-none">{value}</div>
      <div className="font-mono text-[11px] text-ink-300 mt-1.5 uppercase tracking-wider">{label}</div>
    </div>
  );
}

export default function Hero({ progress }: { progress: number }) {
  const goalValue = useCountUp(Math.round((progress / 12) * 200000));

  return (
    <header className="relative">
      {/* nav */}
      <nav className="sticky top-0 z-50 border-b border-ink-700/80 bg-ink-950/85 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-5 md:px-8 h-16 flex items-center gap-6">
          <a href="#top" className="flex items-center gap-2.5 group">
            <span className="w-9 h-9 rounded-lg border border-term-400/40 bg-ink-900 grid place-items-center font-mono text-term-400 text-sm font-bold group-hover:bg-term-900 transition-colors">
              &gt;_
            </span>
            <span className="font-display font-bold text-[15px] tracking-tight text-ink-50 hidden sm:block">
              devops<span className="text-term-400">://</span>старт
            </span>
          </a>
          <div className="hidden lg:flex items-center gap-5 font-mono text-[12.5px] text-ink-300">
            {[
              ["#roadmap", "дорожная карта"],
              ["#modules", "модули"],
              ["#check", "проверка"],
              ["#projects", "портфолио"],
              ["#help", "помощь"],
            ].map(([href, label]) => (
              <a key={href} href={href} className="hover:text-term-300 transition-colors">
                {label}
              </a>
            ))}
          </div>
          <a
            href="#roadmap"
            className="ml-auto inline-flex items-center gap-2 font-mono text-[12px] px-3.5 py-2 rounded-md border border-term-400/40 text-term-300 hover:bg-term-900/70 transition-colors"
          >
            прогресс {progress}/12
            <span className="w-14 h-1.5 rounded-full bg-ink-700 overflow-hidden">
              <span
                className="block h-full bg-term-400 transition-all duration-700"
                style={{ width: `${(progress / 12) * 100}%` }}
              />
            </span>
          </a>
        </div>
      </nav>

      {/* hero */}
      <div className="relative max-w-6xl mx-auto px-5 md:px-8 pt-14 md:pt-20 pb-14">
        <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-12 lg:gap-10 items-center">
          {/* left: headline */}
          <div>
            <Reveal>
              <p className="font-mono text-[12.5px] text-amber-450 tracking-[0.18em] uppercase mb-6 flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-amber-450 pulse-dot" />
                практикум для полных новичков · старт — сегодня
              </p>
            </Reveal>
            <h1 className="font-display font-extrabold text-ink-50 leading-[1.04] tracking-tight text-[clamp(2rem,5.4vw,3.7rem)]">
              <span className="mask-line">
                <span>Из нуля —</span>
              </span>
              <span className="mask-line" style={{ ["--reveal-delay" as never]: "120ms" }}>
                <span>
                  в <span className="text-term-400">DevOps</span>
                </span>
              </span>
              <span className="mask-line" style={{ ["--reveal-delay" as never]: "240ms" }}>
                <span>
                  за <span className="text-amber-450">12 недель</span>
                </span>
              </span>
            </h1>
            <Reveal delay={330}>
              <p className="mt-6 text-ink-200 text-[15.5px] md:text-[17px] leading-relaxed max-w-xl">
                Маршрут с наставником: <strong className="text-ink-50 font-semibold">80% практики</strong>, рабочие
                команды вместо теории ради теории, проект в портфолио каждые две недели и цель —{" "}
                <strong className="text-ink-50 font-semibold">оффер junior+ на {fmtMoney(200000)}</strong>.
              </p>
            </Reveal>
            <Reveal delay={420}>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <a
                  href="#roadmap"
                  className="group inline-flex items-center gap-2.5 font-display font-semibold text-[13.5px] px-6 py-3.5 rounded-lg bg-term-400 text-ink-950 hover:bg-term-300 transition-all duration-200 hover:-translate-y-0.5 shadow-[0_10px_36px_-10px_rgba(61,220,151,0.55)]"
                >
                  Начать с недели 1
                  <IconArrow className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </a>
                <a
                  href="#check"
                  className="inline-flex items-center gap-2 font-mono text-[13px] px-5 py-3.5 rounded-lg border border-ink-600 text-ink-200 hover:border-amber-450/60 hover:text-amber-350 transition-colors"
                >
                  $ пройти проверку знаний
                </a>
              </div>
            </Reveal>
            <Reveal delay={500}>
              <div className="mt-11 grid grid-cols-2 sm:grid-cols-4 gap-6">
                <HeroStat value="12" label="недель" accent="#3ddc97" />
                <HeroStat value="20" label="часов / нед" accent="#56b8e6" />
                <HeroStat value="8" label="модулей" accent="#ffb454" />
                <HeroStat value="200к" label="цель, ₽/мес" accent="#ff7a70" />
              </div>
            </Reveal>
          </div>

          {/* right: terminal */}
          <Reveal delay={200} className="float-slow lg:float-none">
            <TerminalWindow />
            <div className="mt-4 flex items-center justify-between font-mono text-[11.5px] text-ink-400">
              <span>твоя текущая рыночная ценность:</span>
              <span className="text-term-400 font-semibold text-[13px]">{fmtMoney(goalValue)}</span>
            </div>
          </Reveal>
        </div>
      </div>

      {/* tool ticker */}
      <div className="relative border-y border-ink-700 bg-ink-900/70 overflow-hidden py-3.5">
        <div className="ticker-track flex w-max items-center gap-8 pr-8">
          {[...TICKER, ...TICKER].map((t, i) => (
            <span key={i} className="flex items-center gap-8 font-mono text-[13px] text-ink-300 whitespace-nowrap">
              <span className="hover:text-term-300 transition-colors cursor-default">{t}</span>
              <svg viewBox="0 0 24 24" className="w-3 h-3 text-ink-600" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2v20M2 12h20" strokeLinecap="round" />
              </svg>
            </span>
          ))}
        </div>
      </div>
    </header>
  );
}
