import { LESSON_ANATOMY, PROJECTS, STUCK_STEPS, RESOURCES } from "../data";
import { Reveal, SectionHead, IconCheck, IconLink, IconArrow } from "./ui";

/* ================= lesson anatomy ================= */
export function LessonAnatomy() {
  return (
    <section id="method" className="relative max-w-6xl mx-auto px-5 md:px-8 py-20 md:py-28">
      <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-12 lg:gap-16 items-start">
        <div className="lg:sticky lg:top-24">
          <SectionHead
            kicker="методика · анатомия занятия"
            title="Каждое занятие — по одному и тому же скелету"
            accent="text-coral-400"
          >
            <p>
              Новичку важна предсказуемость: ты всегда знаешь, где сейчас находишься и что будет дальше. Поэтому любая
              тема — от git commit до Helm-чартов — раскладывается на 7 шагов. Теории — 20%, руки — 80%.
            </p>
          </SectionHead>
          <Reveal delay={200}>
            <div className="rounded-xl border border-ink-700 bg-ink-900/80 p-5 font-mono text-[12.5px] leading-[2] text-ink-200">
              <p className="text-ink-400 mb-1"># распределение времени занятия (3 часа)</p>
              <div className="flex items-center gap-3">
                <span className="w-24 text-ink-300">теория</span>
                <span className="flex-1 h-2.5 rounded-full bg-ink-800 overflow-hidden">
                  <span className="block h-full w-[20%] bg-sky-450" />
                </span>
                <span className="text-sky-350">20%</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-24 text-ink-300">практика</span>
                <span className="flex-1 h-2.5 rounded-full bg-ink-800 overflow-hidden">
                  <span className="block h-full w-[80%] bg-term-400 stripes-live" />
                </span>
                <span className="text-term-300">80%</span>
              </div>
            </div>
          </Reveal>
        </div>

        <ol className="relative space-y-4">
          <span className="absolute left-[22px] top-4 bottom-4 w-px bg-ink-700" aria-hidden />
          {LESSON_ANATOMY.map((s, i) => (
            <Reveal as="li" key={s.num} delay={i * 70} className="relative">
              <div className="group flex gap-5 rounded-xl border border-ink-700 bg-ink-900/70 p-5 md:p-6 transition-all duration-300 hover:border-ink-500 hover:bg-ink-850 hover:-translate-y-0.5">
                <span className="relative z-10 shrink-0 w-11 h-11 rounded-lg bg-ink-950 border border-coral-400/35 grid place-items-center font-mono text-[13px] font-bold text-coral-400 group-hover:bg-coral-900 transition-colors">
                  {s.num}
                </span>
                <div>
                  <h3 className="font-display font-bold text-[16px] text-ink-50">{s.title}</h3>
                  <p className="mt-1.5 text-[13.5px] leading-relaxed text-ink-200">{s.desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ================= portfolio projects ================= */
export function Projects() {
  return (
    <section id="projects" className="relative max-w-6xl mx-auto px-5 md:px-8 py-20 md:py-28">
      <SectionHead
        kicker="портфолио · проект каждые 2 недели"
        title="6 проектов, которые продают тебя вместо резюме"
        accent="text-term-400"
      >
        <p>
          Рекрутер тратит на резюме 7 секунд, на GitHub — минуты. Каждый проект ниже заканчивается артефактом:
          репозиторий, README с «зачем», скриншоты работы. К 12-й неделе у тебя полная витрина.
        </p>
      </SectionHead>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {PROJECTS.map((p, i) => (
          <Reveal key={p.title} delay={(i % 3) * 90}>
            <article className="group h-full rounded-xl border border-ink-700 bg-ink-900/80 p-6 flex flex-col transition-all duration-300 hover:border-term-400/45 hover:-translate-y-1 hover:shadow-[0_24px_60px_-30px_rgba(23,192,125,0.35)]">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[11px] px-2.5 py-1 rounded-md border border-ink-600 text-ink-300">
                  {p.weeks}
                </span>
                <span className="font-mono text-[26px] font-bold text-ink-700 group-hover:text-term-400/60 transition-colors">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <h3 className="font-display font-bold text-[17px] text-ink-50 mt-4 leading-snug">{p.title}</h3>
              <p className="mt-2.5 text-[13px] leading-relaxed text-ink-200">{p.desc}</p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {p.stack.map((s) => (
                  <span key={s} className="font-mono text-[10.5px] px-2 py-0.5 rounded bg-ink-800 border border-ink-700 text-ink-300">
                    {s}
                  </span>
                ))}
              </div>
              <ul className="mt-4 pt-4 border-t border-ink-700 space-y-1.5">
                {p.done.map((d) => (
                  <li key={d} className="flex items-center gap-2 text-[12px] text-ink-300">
                    <IconCheck className="w-3.5 h-3.5 text-term-400 shrink-0" />
                    {d}
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ================= stuck protocol ================= */
export function Stuck() {
  return (
    <section id="help" className="relative border-t border-ink-800 bg-ink-900/40">
      <div className="max-w-6xl mx-auto px-5 md:px-8 py-20 md:py-28">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          <div>
            <SectionHead
              kicker="если застрял · протокол из 5 шагов"
              title="Застрять — это часть плана, а не провал"
              accent="text-coral-400"
            >
              <p>
                Ошибка в терминале — не приговор, а подсказка. Инженеры с 10-летним опытом гуглят каждый день;
                разница лишь в том, что они знают, как именно искать. Вот алгоритм, который экономит часы:
              </p>
            </SectionHead>
            <div className="space-y-3.5">
              {STUCK_STEPS.map((s, i) => (
                <Reveal key={s.num} delay={i * 70}>
                  <div className="group flex gap-4 rounded-xl border border-ink-700 bg-ink-900/70 p-5 transition-all duration-300 hover:border-coral-400/40 hover:bg-ink-850">
                    <span className="shrink-0 w-9 h-9 rounded-full border border-coral-400/40 bg-ink-950 grid place-items-center font-mono text-[13px] font-bold text-coral-400">
                      {s.num}
                    </span>
                    <div>
                      <h3 className="font-display font-bold text-[15px] text-ink-50">{s.title}</h3>
                      <p className="mt-1 text-[13px] leading-relaxed text-ink-200">{s.desc}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
            <Reveal delay={380}>
              <p className="mt-6 font-mono text-[12.5px] text-ink-400 leading-relaxed">
                <span className="text-term-400">$</span> правило наставника: вопрос «а это вообще нормально, что я не
                понимаю?» — <span className="text-ink-100">да, нормально. спрашивай.</span>
              </p>
            </Reveal>
          </div>

          {/* resources */}
          <div id="resources">
            <SectionHead
              kicker="ресурсы · только проверенное"
              title="Закладки, которые работают в 2026"
              accent="text-sky-450"
            >
              <p>Официальная документация, бесплатные песочницы и тренажёры. Ничего платного — всё открывается в браузере.</p>
            </SectionHead>
            <div className="space-y-5">
              {RESOURCES.map((group, gi) => (
                <Reveal key={group.group} delay={gi * 90}>
                  <div className="rounded-xl border border-ink-700 bg-ink-900/70 p-5 md:p-6">
                    <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-sky-450 mb-4">{group.group}</p>
                    <ul className="space-y-3">
                      {group.items.map((it) => (
                        <li key={it.url}>
                          <a
                            href={it.url}
                            target="_blank"
                            rel="noreferrer"
                            className="group flex items-start gap-3 rounded-lg border border-ink-700 bg-ink-950/60 px-4 py-3 transition-all duration-200 hover:border-sky-450/50 hover:bg-ink-850"
                          >
                            <IconLink className="w-4 h-4 mt-0.5 text-ink-400 group-hover:text-sky-350 transition-colors shrink-0" />
                            <span className="min-w-0">
                              <span className="block font-mono text-[13px] text-ink-100 group-hover:text-sky-350 transition-colors">
                                {it.label}
                              </span>
                              <span className="block text-[12px] text-ink-400 mt-0.5">{it.note}</span>
                            </span>
                            <IconArrow className="w-3.5 h-3.5 ml-auto mt-1 text-ink-600 group-hover:text-sky-350 transition-all group-hover:translate-x-0.5 shrink-0" />
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================= final CTA + footer ================= */
export function FinalCta() {
  return (
    <section className="relative max-w-6xl mx-auto px-5 md:px-8 py-20 md:py-28">
      <Reveal>
        <div className="relative rounded-2xl border border-term-400/30 bg-ink-900/90 overflow-hidden glow-term scanlines">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-term-400 to-transparent" />
          <div className="p-8 md:p-14 grid lg:grid-cols-[1.2fr_0.8fr] gap-10 items-center">
            <div>
              <p className="font-mono text-[12.5px] text-term-400 mb-5">
                <span className="select-none">➜ </span>
                <span className="text-sky-450">~</span> ./start.sh --today
              </p>
              <h2 className="font-display font-extrabold text-[clamp(1.7rem,4vw,2.9rem)] leading-[1.08] text-ink-50 tracking-tight">
                Через 12 недель ты либо инженер с портфолио,
                <br className="hidden md:block" /> либо всё ещё «начну с понедельника»
              </h2>
              <p className="mt-5 text-ink-200 text-[15px] leading-relaxed max-w-xl">
                Неделя 1 не требует ничего, кроме Git и желания: создай репозиторий, сделай 5 коммитов, запушь.
                20 часов в неделю, 12 недель, цель — {`200 000 ₽`}. Поехали?
              </p>
              <div className="mt-7 flex flex-wrap gap-4">
                <a
                  href="#roadmap"
                  className="group inline-flex items-center gap-2.5 font-display font-semibold text-[13.5px] px-6 py-3.5 rounded-lg bg-term-400 text-ink-950 hover:bg-term-300 transition-all duration-200 hover:-translate-y-0.5 shadow-[0_10px_36px_-10px_rgba(61,220,151,0.55)]"
                >
                  Открыть неделю 1
                  <IconArrow className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </a>
                <a
                  href="#check"
                  className="inline-flex items-center gap-2 font-mono text-[13px] px-5 py-3.5 rounded-lg border border-ink-600 text-ink-200 hover:border-term-400/50 hover:text-term-300 transition-colors"
                >
                  $ quiz --проверить-базу
                </a>
              </div>
            </div>
            <div className="rounded-xl border border-ink-700 bg-ink-950/80 p-5 font-mono text-[12.5px] leading-[2.1]">
              <p className="text-ink-400"># чек-лист первого вечера</p>
              <p className="text-ink-100"><span className="text-term-400">✓</span> поставить Git (git-scm.com)</p>
              <p className="text-ink-100"><span className="text-term-400">✓</span> аккаунт на GitHub</p>
              <p className="text-ink-100"><span className="text-term-400">✓</span> git init → add → commit → push</p>
              <p className="text-ink-100"><span className="text-term-400">✓</span> открыть неделю 1 в карте</p>
              <p className="text-amber-350">→ время в пути: ~2 часа</p>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-ink-800 bg-ink-950">
      <div className="max-w-6xl mx-auto px-5 md:px-8 py-10">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
          <a href="#top" className="flex items-center gap-2.5">
            <span className="w-8 h-8 rounded-lg border border-term-400/40 bg-ink-900 grid place-items-center font-mono text-term-400 text-[13px] font-bold">
              &gt;_
            </span>
            <span className="font-display font-bold text-[14px] text-ink-50">
              devops<span className="text-term-400">://</span>старт
            </span>
          </a>
          <nav className="flex flex-wrap gap-x-5 gap-y-2 font-mono text-[12px] text-ink-400">
            {[
              ["#roadmap", "карта"],
              ["#modules", "модули"],
              ["#method", "методика"],
              ["#check", "тест"],
              ["#interview", "флэш-карты"],
              ["#projects", "портфолио"],
              ["#help", "помощь"],
            ].map(([href, label]) => (
              <a key={href} href={href} className="hover:text-term-300 transition-colors">
                {label}
              </a>
            ))}
          </nav>
          <p className="md:ml-auto font-mono text-[11.5px] text-ink-500 leading-relaxed">
            exit 0 · сделано для будущих инженеров · 2026
          </p>
        </div>
        <p className="mt-6 font-mono text-[11px] text-ink-600 leading-relaxed max-w-3xl">
          # дисклеймер: 200 000 ₽ — реалистичная цель для junior+ в крупных городах и удалёнке при устойчивой практике;
          скорость у всех своя, но маршрут проверен. главное — не останавливаться на неделе 3.
        </p>
      </div>
    </footer>
  );
}
