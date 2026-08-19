import { useState } from "react";
import { MODULES } from "../data";
import { Reveal, SectionHead, CopyButton, ICONS, IconCheck, IconWarn, IconLink, IconBook } from "./ui";

export default function Modules() {
  const [activeId, setActiveId] = useState(MODULES[0].id);
  const mod = MODULES.find((m) => m.id === activeId)!;
  const Icon = ICONS[mod.icon];

  return (
    <section id="modules" className="relative border-y border-ink-800 bg-ink-900/40">
      <div className="max-w-6xl mx-auto px-5 md:px-8 py-20 md:py-28">
        <SectionHead
          kicker="8 модулей · глубокое погружение"
          title="Что внутри каждого модуля"
          accent="text-sky-450"
        >
          <p>
            Каждый модуль собран по единой методике: <em className="text-ink-100 not-italic font-semibold">что это → зачем → теория → практика → чек-лист</em>.
            Выбери модуль и посмотри, как устроено занятие изнутри.
          </p>
        </SectionHead>

        <div className="grid lg:grid-cols-[300px_1fr] gap-8 items-start">
          {/* module tabs */}
          <Reveal className="lg:sticky lg:top-24">
            <div className="grid sm:grid-cols-2 lg:grid-cols-1 gap-2">
              {MODULES.map((m) => {
                const MIcon = ICONS[m.icon];
                const active = m.id === activeId;
                return (
                  <button
                    key={m.id}
                    onClick={() => setActiveId(m.id)}
                    className={`group text-left flex items-center gap-3.5 px-4 py-3.5 rounded-lg border transition-all duration-200 ${
                      active
                        ? "border-term-400/50 bg-ink-800 shadow-[inset_2px_0_0_0_#3ddc97]"
                        : "border-ink-700 bg-ink-900/60 hover:border-ink-600 hover:bg-ink-850"
                    }`}
                  >
                    <span className={`${active ? "text-term-400" : "text-ink-400 group-hover:text-ink-200"} transition-colors shrink-0`}>
                      <MIcon className="w-5 h-5" />
                    </span>
                    <span className="min-w-0">
                      <span className={`block font-semibold text-[13.5px] leading-tight ${active ? "text-ink-50" : "text-ink-200"}`}>
                        {m.title}
                      </span>
                      <span className="block font-mono text-[10.5px] text-ink-400 mt-0.5">{m.short}</span>
                    </span>
                    <span className={`ml-auto font-mono text-[10.5px] ${active ? "text-term-400" : "text-ink-600"}`}>{m.num}</span>
                  </button>
                );
              })}
            </div>
          </Reveal>

          {/* module detail */}
          <div key={mod.id} className="min-w-0">
            <Reveal>
              <div className="rounded-xl border border-ink-700 bg-ink-950/60 p-6 md:p-8">
                <div className="flex flex-wrap items-center gap-4">
                  <span className="w-12 h-12 rounded-lg border border-term-400/35 bg-term-900/50 grid place-items-center text-term-400">
                    <Icon className="w-6 h-6" />
                  </span>
                  <div>
                    <p className="font-mono text-[11px] text-ink-400 uppercase tracking-wider">
                      модуль {mod.num} · {mod.short}
                    </p>
                    <h3 className="font-display font-bold text-[22px] md:text-[26px] text-ink-50 leading-tight">{mod.title}</h3>
                  </div>
                </div>

                {/* что / зачем */}
                <div className="mt-7 grid md:grid-cols-2 gap-4">
                  <div className="rounded-lg border border-sky-450/25 bg-sky-900/40 p-5">
                    <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-sky-450 mb-2.5">// что это</p>
                    <p className="text-[13.5px] leading-relaxed text-ink-100">{mod.what}</p>
                  </div>
                  <div className="rounded-lg border border-amber-450/25 bg-amber-900/40 p-5">
                    <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-amber-450 mb-2.5">// зачем в работе</p>
                    <p className="text-[13.5px] leading-relaxed text-ink-100">{mod.why}</p>
                  </div>
                </div>

                {/* code */}
                <div className="mt-6 rounded-lg border border-ink-700 bg-ink-900 overflow-hidden">
                  <div className="flex items-center justify-between px-4 py-2.5 border-b border-ink-700 bg-ink-850">
                    <span className="font-mono text-[11px] text-ink-300">
                      <span className="text-term-400">~</span> ключевые команды модуля
                      <span className="ml-3 text-ink-500">({mod.lang})</span>
                    </span>
                    <CopyButton text={mod.code} />
                  </div>
                  <pre className="p-4 md:p-5 font-mono text-[12.5px] leading-[1.8] overflow-x-auto code-scroll text-ink-100">
                    {mod.code.split("\n").map((line, i) => (
                      <div key={i} className="whitespace-pre">
                        {line.trim().startsWith("#") ? (
                          <span className="text-ink-400 italic">{line}</span>
                        ) : (
                          line
                        )}
                      </div>
                    ))}
                  </pre>
                </div>

                {/* практика */}
                <div className="mt-6 rounded-lg border border-term-400/25 bg-term-900/30 p-5 md:p-6">
                  <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-term-400 mb-3">
                    // практика: {mod.practice.title}
                  </p>
                  <ol className="space-y-2.5">
                    {mod.practice.steps.map((s, i) => (
                      <li key={i} className="flex gap-3 text-[13.5px] leading-relaxed text-ink-100">
                        <span className="shrink-0 w-5 h-5 mt-0.5 rounded border border-term-400/40 grid place-items-center font-mono text-[10.5px] text-term-300">
                          {i + 1}
                        </span>
                        <span className={i === mod.practice.steps.length - 1 ? "text-term-300 font-medium" : ""}>{s}</span>
                      </li>
                    ))}
                  </ol>
                </div>

                {/* чек-лист + ошибки */}
                <div className="mt-6 grid md:grid-cols-2 gap-4">
                  <div className="rounded-lg border border-ink-700 bg-ink-900/70 p-5">
                    <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink-300 mb-3.5 flex items-center gap-2">
                      <IconCheck className="w-4 h-4 text-term-400" /> чек-лист «я умею»
                    </p>
                    <ul className="space-y-2.5">
                      {mod.checklist.map((c, i) => (
                        <li key={i} className="flex gap-2.5 text-[13px] leading-relaxed text-ink-200">
                          <span className="text-term-400 font-mono mt-px select-none">▸</span>
                          {c}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="rounded-lg border border-coral-400/25 bg-coral-900/30 p-5">
                    <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-coral-400 mb-3.5 flex items-center gap-2">
                      <IconWarn className="w-4 h-4" /> грабли новичков
                    </p>
                    <ul className="space-y-2.5">
                      {mod.mistakes.map((m, i) => (
                        <li key={i} className="flex gap-2.5 text-[13px] leading-relaxed text-ink-200">
                          <span className="text-coral-400 font-mono mt-px select-none">✕</span>
                          {m}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* docs */}
                <div className="mt-6 flex flex-wrap gap-2.5">
                  {mod.docs.map((d) => (
                    <a
                      key={d.url}
                      href={d.url}
                      target="_blank"
                      rel="noreferrer"
                      className="group inline-flex items-center gap-2 font-mono text-[11.5px] px-3.5 py-2 rounded-lg border border-ink-600 text-ink-200 hover:border-sky-450/60 hover:text-sky-350 transition-colors"
                    >
                      <IconBook className="w-3.5 h-3.5 opacity-70 group-hover:opacity-100" />
                      {d.label}
                      <IconLink className="w-3 h-3 opacity-50 group-hover:opacity-100 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </a>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
