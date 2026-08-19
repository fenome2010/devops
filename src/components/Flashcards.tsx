import { useState } from "react";
import { FLASHCARDS } from "../data";
import { Reveal, SectionHead } from "./ui";

function Card({ topic, q, a, index }: { topic: string; q: string; a: string; index: number }) {
  const [flipped, setFlipped] = useState(false);
  return (
    <Reveal delay={(index % 3) * 90}>
      <button
        onClick={() => setFlipped((v) => !v)}
        className={`flip-scene block w-full h-full text-left ${flipped ? "flipped" : ""}`}
        aria-pressed={flipped}
        style={{ minHeight: 232 }}
      >
        <div className="flip-inner">
          {/* front */}
          <div className="flip-face rounded-xl border border-ink-600 bg-ink-900/85 p-5 flex flex-col hover:border-sky-450/50 transition-colors">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-sky-450">{topic}</span>
              <svg viewBox="0 0 24 24" className="w-4 h-4 text-ink-400" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 8a8 8 0 1 0 2 5.3" />
                <path d="M22 3v5h-5" />
              </svg>
            </div>
            <p className="font-display font-semibold text-[15px] leading-snug text-ink-50 mt-4">{q}</p>
            <span className="mt-auto pt-4 font-mono text-[11px] text-ink-400">клик → ответ</span>
          </div>
          {/* back */}
          <div className="flip-face flip-back rounded-xl border border-term-400/40 bg-term-900/60 p-5 flex flex-col">
            <span className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-term-400">// ответ</span>
            <p className="text-[13px] leading-relaxed text-ink-50 mt-3.5">{a}</p>
            <span className="mt-auto pt-4 font-mono text-[11px] text-ink-400">клик → назад</span>
          </div>
        </div>
      </button>
    </Reveal>
  );
}

export default function Flashcards() {
  return (
    <section id="interview" className="relative border-y border-ink-800 bg-ink-900/40">
      <div className="max-w-6xl mx-auto px-5 md:px-8 py-20 md:py-28">
        <SectionHead
          kicker="подготовка к собеседованиям · с 8 недели"
          title="Флэш-карты: прогони себя перед интервью"
          accent="text-sky-450"
        >
          <p>
            Типичные вопросы первичного скрининга DevOps-джуна. Правило тренировки: сначала ответь вслух, только потом
            переворачивай. Если ответил 9 из 10 без подглядывания — ты готов к техническому этапу.
          </p>
        </SectionHead>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {FLASHCARDS.map((c, i) => (
            <Card key={c.q} topic={c.topic} q={c.q} a={c.a} index={i} />
          ))}
        </div>

        <Reveal className="mt-8">
          <p className="font-mono text-[12px] text-ink-400 text-center">
            совет ментора: <span className="text-ink-200">«не знаю» + план рассуждения сильнее уверенного бреда.</span>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
