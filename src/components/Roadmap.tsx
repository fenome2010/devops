import { useState } from "react";
import { WEEKS, type Week } from "../data";
import { Reveal, SectionHead, useCountUp, fmtMoney, IconCheck, IconFlag } from "./ui";

const ACCENT: Record<Week["accent"], { text: string; border: string; chip: string; bar: string }> = {
  term: { text: "text-term-400", border: "border-term-400/35", chip: "bg-term-900/70 text-term-300 border-term-400/25", bar: "bg-term-400" },
  amber: { text: "text-amber-450", border: "border-amber-450/35", chip: "bg-amber-900/70 text-amber-350 border-amber-450/25", bar: "bg-amber-450" },
  sky: { text: "text-sky-450", border: "border-sky-450/35", chip: "bg-sky-900/70 text-sky-350 border-sky-450/25", bar: "bg-sky-450" },
  coral: { text: "text-coral-400", border: "border-coral-400/35", chip: "bg-coral-900/70 text-coral-400 border-coral-400/25", bar: "bg-coral-400" },
};

function WeekCard({ week, done, onToggle }: { week: Week; done: boolean; onToggle: () => void }) {
  const a = ACCENT[week.accent];
  const [open, setOpen] = useState(false);
  return (
    <li className="relative pl-10 md:pl-14">
      {/* timeline node */}
      <span
        className={`absolute left-0 md:left-1 top-7 w-7 h-7 rounded-full border-2 grid place-items-center font-mono text-[10.5px] font-bold transition-all duration-300 ${
          done ? "bg-term-400 border-term-400 text-ink-950" : `bg-ink-900 ${a.border} ${a.text}`
        }`}
      >
        {done ? <IconCheck className="w-3.5 h-3.5" /> : week.id}
      </span>
      {week.id < 12 && (
        <span className="absolute left-[13px] md:left-[21px] top-14 bottom-[-26px] w-px bg-ink-700" aria-hidden />
      )}

      <Reveal className="h-full">
        <div
          className={`group rounded-xl border bg-ink-900/80 transition-all duration-300 overflow-hidden ${
            done ? "border-term-400/40" : "border-ink-700 hover:border-ink-600"
          } hover:-translate-y-0.5 hover:shadow-[0_18px_50px_-24px_rgba(0,0,0,0.9)]`}
        >
          <div className="p-5 md:p-6">
            <div className="flex flex-wrap items-center gap-2.5 mb-3">
              <span className={`font-mono text-[11px] px-2.5 py-1 rounded-md border ${a.chip}`}>{week.range}</span>
              <span className="font-mono text-[11px] text-ink-400">{week.theme}</span>
              <span className="ml-auto font-mono text-[11px] text-ink-400">≈ 20 ч</span>
            </div>
            <h3 className={`font-display font-bold text-[17px] md:text-[19px] leading-snug ${done ? "text-ink-300" : "text-ink-50"}`}>
              {week.title}
            </h3>

            <div className="mt-3.5 flex flex-wrap gap-1.5">
              {week.topics.map((t) => (
                <span key={t} className="font-mono text-[11px] text-ink-200 bg-ink-800 border border-ink-700 rounded px-2 py-0.5">
                  {t}
                </span>
              ))}
            </div>

            <button
              onClick={() => setOpen((v) => !v)}
              className={`mt-4 font-mono text-[12px] inline-flex items-center gap-1.5 transition-colors ${a.text} hover:opacity-80`}
            >
              <svg viewBox="0 0 24 24" className={`w-3.5 h-3.5 transition-transform duration-300 ${open ? "rotate-90" : ""}`} fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                <path d="M9 5l7 7-7 7" />
              </svg>
              {open ? "свернуть детали" : "практика и команды"}
            </button>

            <div
              className="grid transition-[grid-template-rows] duration-400 ease-out"
              style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
            >
              <div className="overflow-hidden">
                <div className="pt-4 mt-4 border-t border-ink-700 space-y-4">
                  <div>
                    <p className="font-mono text-[11px] uppercase tracking-wider text-ink-400 mb-1.5 flex items-center gap-1.5">
                      <IconFlag className="w-3.5 h-3.5 text-amber-450" /> практика недели
                    </p>
                    <p className="text-[13.5px] text-ink-200 leading-relaxed">{week.practice}</p>
                  </div>
                  <div>
                    <p className="font-mono text-[11px] uppercase tracking-wider text-ink-400 mb-1.5">критерий успеха → в портфолио</p>
                    <p className="text-[13.5px] text-term-300 leading-relaxed">{week.deliverable}</p>
                  </div>
                  <div className="rounded-lg bg-ink-950/90 border border-ink-700 p-3.5 font-mono text-[12px] leading-[1.9] overflow-x-auto code-scroll">
                    {week.commands.map((c) => (
                      <div key={c} className="whitespace-nowrap">
                        <span className="text-term-400 select-none">$ </span>
                        <span className="text-ink-100">{c}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={onToggle}
              aria-pressed={done}
              className={`mt-5 w-full sm:w-auto inline-flex items-center justify-center gap-2.5 font-mono text-[12.5px] px-4 py-2.5 rounded-lg border transition-all duration-200 ${
                done
                  ? "border-term-400/60 bg-term-900/70 text-term-300 hover:bg-term-900"
                  : "border-ink-600 text-ink-200 hover:border-term-400/50 hover:text-term-300"
              }`}
            >
              <span
                className={`w-4 h-4 rounded border grid place-items-center transition-colors ${
                  done ? "bg-term-400 border-term-400 text-ink-950" : "border-ink-400"
                }`}
              >
                {done && <IconCheck className="w-3 h-3" />}
              </span>
              {done ? "неделя закрыта ✓" : "отметить выполненной"}
            </button>
          </div>
          <span className={`block h-0.5 ${a.bar} opacity-0 group-hover:opacity-70 transition-opacity duration-300`} />
        </div>
      </Reveal>
    </li>
  );
}

export default function Roadmap({
  doneWeeks,
  onToggle,
  onReset,
}: {
  doneWeeks: number[];
  onToggle: (id: number) => void;
  onReset: () => void;
}) {
  const progress = doneWeeks.length;
  const salary = useCountUp(Math.round((progress / 12) * 200000), 900);
  const pct = Math.round((progress / 12) * 100);

  return (
    <section id="roadmap" className="relative max-w-6xl mx-auto px-5 md:px-8 py-20 md:py-28">
      <SectionHead
        kicker="дорожная карта · 12 недель"
        title="Маршрут, где каждая неделя закрывается результатом"
        accent="text-term-400"
      >
        <p>
          Отмечай закрытые недели — прогресс сохраняется в браузере. Справа — живой счётчик: столько примерно стоит
          инженер с твоим текущим набором навыков на рынке.
        </p>
      </SectionHead>

      <div className="grid lg:grid-cols-[340px_1fr] gap-10 lg:gap-12 items-start">
        {/* sticky progress panel */}
        <div className="lg:sticky lg:top-24">
          <Reveal>
            <div className="rounded-xl border border-ink-700 bg-ink-900/85 p-6 relative overflow-hidden">
              <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-term-400 via-sky-450 to-amber-450 opacity-70" />
              <p className="font-mono text-[11.5px] uppercase tracking-[0.18em] text-ink-400">твой прогресс</p>
              <div className="mt-3 flex items-baseline gap-2">
                <span className="font-display font-extrabold text-[44px] leading-none text-ink-50">{progress}</span>
                <span className="font-mono text-ink-300 text-sm">/ 12 недель</span>
              </div>

              <div className="mt-5">
                <div className="h-3 rounded-full bg-ink-800 border border-ink-700 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-term-400 stripes-live transition-all duration-700 ease-out"
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <div className="mt-2 flex justify-between font-mono text-[11px] text-ink-400">
                  <span>{pct}% маршрута</span>
                  <span>{12 - progress} нед. осталось</span>
                </div>
              </div>

              <div className="mt-6 rounded-lg border border-ink-700 bg-ink-950/70 p-4">
                <p className="font-mono text-[11px] uppercase tracking-wider text-ink-400">рыночная ценность</p>
                <p className="font-display font-bold text-[22px] text-term-300 mt-1">{fmtMoney(salary)}</p>
                <p className="text-[12px] text-ink-300 mt-1 leading-relaxed">
                  цель курса — <span className="text-amber-350 font-semibold">{fmtMoney(200000)}</span> к неделе 12
                </p>
                <div className="mt-3 h-1.5 rounded-full bg-ink-800 overflow-hidden">
                  <div
                    className="h-full bg-amber-450 transition-all duration-700"
                    style={{ width: `${(salary / 200000) * 100}%` }}
                  />
                </div>
              </div>

              <div className="mt-5 grid grid-cols-6 gap-1.5">
                {WEEKS.map((w) => {
                  const on = doneWeeks.includes(w.id);
                  return (
                    <button
                      key={w.id}
                      onClick={() => onToggle(w.id)}
                      title={`Неделя ${w.id}: ${w.title}`}
                      className={`h-8 rounded-md font-mono text-[11px] border transition-all duration-200 ${
                        on
                          ? "bg-term-400 border-term-400 text-ink-950 font-bold"
                          : "bg-ink-800 border-ink-600 text-ink-300 hover:border-term-400/50 hover:text-term-300"
                      }`}
                    >
                      {w.id}
                    </button>
                  );
                })}
              </div>

              {progress > 0 && (
                <button
                  onClick={onReset}
                  className="mt-5 font-mono text-[11.5px] text-ink-400 hover:text-coral-400 transition-colors underline underline-offset-4 decoration-ink-600"
                >
                  $ git reset --hard  # сбросить прогресс
                </button>
              )}
              {progress === 12 && (
                <p className="mt-5 font-mono text-[12.5px] text-term-300 border border-term-400/40 rounded-lg p-3 bg-term-900/50">
                  ✓ маршрут пройден. время обновлять резюме и брать оффер 🎯
                </p>
              )}
            </div>
          </Reveal>
        </div>

        {/* weeks list */}
        <ul className="space-y-7">
          {WEEKS.map((w) => (
            <WeekCard key={w.id} week={w} done={doneWeeks.includes(w.id)} onToggle={() => onToggle(w.id)} />
          ))}
        </ul>
      </div>
    </section>
  );
}
