import { useState } from "react";
import { QUIZ } from "../data";
import { Reveal, SectionHead, IconCheck, IconWarn, IconArrow } from "./ui";

const CHALLENGES = [
  {
    tag: "git · уровень: больно",
    title: "Гонка двух клонов",
    task: "Склонируй свой репозиторий в две папки (как будто два разработчика). В обеих измени один и тот же файл, закоммить и запушь сначала из первой. Второй push отклонят — разрули через pull --rebase и запушь снова.",
    criteria: "История линейная, без merge-коммита «Merge branch», оба изменения на месте.",
  },
  {
    tag: "docker · уровень: потеть",
    title: "Образ худее 50 МБ",
    task: "Возьми простое Python-приложение (Flask, «hello» + /health). Собери его через multi-stage так, чтобы финальный образ на alpine весил меньше 50 МБ и отвечал на запросы.",
    criteria: "docker images показывает < 50 MB, docker run поднимает приложение с первого раза.",
  },
  {
    tag: "ci/cd · уровень: как на проде",
    title: "Красные ворота",
    task: "Добавь в проект тест, который проходит на main, но намеренно падает в отдельной ветке (assert 1 == 2 под if). Открой PR и покажи, что пайплайн не даёт его смержить.",
    criteria: "На PR красные чеки, мерж заблокирован; после фикса — зелёные и мерж разрешён.",
  },
];

type Phase = "idle" | "ask" | "answered" | "done";

export default function Quiz() {
  const [phase, setPhase] = useState<Phase>("idle");
  const [idx, setIdx] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [best, setBest] = useState<number | null>(() => {
    const v = localStorage.getItem("devops12-quiz-best");
    return v === null ? null : Number(v);
  });

  const q = QUIZ[idx];

  const start = () => {
    setPhase("ask");
    setIdx(0);
    setPicked(null);
    setScore(0);
  };

  const pick = (i: number) => {
    if (phase !== "ask") return;
    setPicked(i);
    setPhase("answered");
    if (i === q.answer) setScore((s) => s + 1);
  };

  const next = () => {
    if (idx + 1 >= QUIZ.length) {
      setPhase("done");
      const final = score;
      setBest((b) => {
        const nb = b === null ? final : Math.max(b, final);
        localStorage.setItem("devops12-quiz-best", String(nb));
        return nb;
      });
    } else {
      setIdx((v) => v + 1);
      setPicked(null);
      setPhase("ask");
    }
  };

  const verdict = () => {
    const pct = score / QUIZ.length;
    if (pct === 1)
      return { t: "Идеально. Ты уже рассуждаешь как инженер", m: "Ни одной ошибки — такой результат на реальном скрининге открывает двери. Сохрани форму: практика, проекты, отклики.", c: "text-term-300" };
    if (pct >= 0.7)
      return { t: "Сильный результат!", m: "База есть, gaps точечные. Вернись к модулям, где ошибся, прогони практику — и перепроходи тест через пару дней.", c: "text-term-300" };
    if (pct >= 0.4)
      return { t: "Хорошее начало — именно отсюда все стартуют", m: "Не бывает «слишком рано» для таких вопросов: каждый неверный ответ сейчас — это вопрос, который ты НЕ завалишь на собеседовании.", c: "text-amber-350" };
    return { t: "Нормально. Серьёзно — нормально", m: "Никто не рождается со знанием exit code. Открой неделю 1, сделай практику руками — и вернись. Второй заход всегда сильнее первого.", c: "text-amber-350" };
  };

  return (
    <section id="check" className="relative max-w-6xl mx-auto px-5 md:px-8 py-20 md:py-28">
      <SectionHead
        kicker="проверка знаний · как на скрининге"
        title="8 вопросов, которые задают новичкам"
        accent="text-amber-450"
      >
        <p>
          Формат настоящего первичного интервью: вопрос → твой ответ → разбор. После каждого ответа ментор объясняет,
          почему правильно именно так. Лучший результат запоминается.
        </p>
      </SectionHead>

      <div className="max-w-3xl">
        {/* idle */}
        {phase === "idle" && (
          <Reveal>
            <div className="rounded-xl border border-ink-700 bg-ink-900/80 p-8 md:p-10 text-center relative overflow-hidden">
              <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-amber-450 via-coral-400 to-amber-450 opacity-70" />
              <p className="font-mono text-[13px] text-ink-300">
                <span className="text-term-400">$</span> mentor run quiz --вопросов {QUIZ.length} --темы git,linux,docker,cicd,ansible,k8s,monitoring
              </p>
              <h3 className="font-display font-bold text-[24px] md:text-[30px] text-ink-50 mt-5">
                Готов проверить себя?
              </h3>
              <p className="text-ink-200 mt-3 text-[14.5px] max-w-md mx-auto leading-relaxed">
                Ошибаться здесь — бесплатно и полезно. На собеседовании — дороже.
              </p>
              {best !== null && (
                <p className="mt-4 font-mono text-[12.5px] text-amber-350">
                  твой лучший результат: {best}/{QUIZ.length}
                </p>
              )}
              <button
                onClick={start}
                className="group mt-7 inline-flex items-center gap-2.5 font-display font-semibold text-[13.5px] px-7 py-3.5 rounded-lg bg-amber-450 text-ink-950 hover:bg-amber-350 transition-all duration-200 hover:-translate-y-0.5 shadow-[0_10px_36px_-10px_rgba(255,180,84,0.5)]"
              >
                Поехали
                <IconArrow className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </Reveal>
        )}

        {/* question */}
        {(phase === "ask" || phase === "answered") && (
          <div className="rounded-xl border border-ink-700 bg-ink-900/85 p-6 md:p-8">
            <div className="flex items-center gap-3 flex-wrap">
              <span className="font-mono text-[11.5px] px-2.5 py-1 rounded-md border border-amber-450/30 bg-amber-900/50 text-amber-350">
                {q.topic}
              </span>
              <span className="font-mono text-[11.5px] text-ink-400">
                вопрос {idx + 1} / {QUIZ.length}
              </span>
              <span className="ml-auto font-mono text-[11.5px] text-term-400">счёт: {score}</span>
            </div>

            {/* progress dots */}
            <div className="mt-4 flex gap-1.5">
              {QUIZ.map((_, i) => (
                <span
                  key={i}
                  className={`h-1 flex-1 rounded-full transition-colors duration-300 ${
                    i < idx ? "bg-term-400/70" : i === idx ? "bg-amber-450" : "bg-ink-700"
                  }`}
                />
              ))}
            </div>

            <h3 className="font-display font-bold text-[18px] md:text-[21px] text-ink-50 mt-6 leading-snug">{q.q}</h3>

            <div className="mt-6 space-y-2.5">
              {q.options.map((opt, i) => {
                const isAnswer = i === q.answer;
                const isPicked = i === picked;
                let cls = "border-ink-600 hover:border-ink-400 hover:bg-ink-800 text-ink-100";
                if (phase === "answered") {
                  if (isAnswer) cls = "border-term-400/70 bg-term-900/60 text-term-300";
                  else if (isPicked) cls = "border-coral-400/70 bg-coral-900/50 text-coral-400";
                  else cls = "border-ink-700 text-ink-400 opacity-60";
                }
                return (
                  <button
                    key={i}
                    onClick={() => pick(i)}
                    disabled={phase === "answered"}
                    className={`w-full text-left flex items-center gap-3.5 px-4 py-3.5 rounded-lg border transition-all duration-200 ${cls} ${
                      phase === "ask" ? "cursor-pointer active:scale-[0.995]" : "cursor-default"
                    }`}
                  >
                    <span className="shrink-0 w-6 h-6 rounded-md border border-current/40 grid place-items-center font-mono text-[11px] opacity-80">
                      {String.fromCharCode(65 + i)}
                    </span>
                    <span className="text-[14px] leading-snug">{opt}</span>
                    {phase === "answered" && isAnswer && <IconCheck className="w-4.5 h-4.5 ml-auto shrink-0" />}
                    {phase === "answered" && isPicked && !isAnswer && <IconWarn className="w-4.5 h-4.5 ml-auto shrink-0" />}
                  </button>
                );
              })}
            </div>

            {phase === "answered" && (
              <div
                className={`mt-5 rounded-lg border p-5 ${
                  picked === q.answer ? "border-term-400/35 bg-term-900/40" : "border-amber-450/35 bg-amber-900/40"
                }`}
              >
                <p className={`font-mono text-[11.5px] uppercase tracking-wider mb-2 ${picked === q.answer ? "text-term-400" : "text-amber-450"}`}>
                  {picked === q.answer ? "✓ верно — вот почему" : "✕ мимо — разберём"}
                </p>
                <p className="text-[13.5px] leading-relaxed text-ink-100">{q.explain}</p>
                <button
                  onClick={next}
                  className="group mt-4 inline-flex items-center gap-2 font-mono text-[12.5px] px-4 py-2.5 rounded-lg bg-ink-800 border border-ink-600 text-ink-100 hover:border-term-400/50 hover:text-term-300 transition-colors"
                >
                  {idx + 1 >= QUIZ.length ? "показать результат" : "следующий вопрос"}
                  <IconArrow className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            )}
          </div>
        )}

        {/* done */}
        {phase === "done" && (
          <div className="rounded-xl border border-ink-700 bg-ink-900/85 p-8 md:p-10 text-center">
            <p className="font-mono text-[12.5px] text-ink-400">результат прогона:</p>
            <p className="font-display font-extrabold text-[56px] md:text-[68px] leading-none mt-3 text-ink-50">
              {score}
              <span className="text-ink-400 text-[32px] md:text-[40px]">/{QUIZ.length}</span>
            </p>
            <div className="mt-5 h-2 max-w-sm mx-auto rounded-full bg-ink-800 overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-amber-450 to-term-400 transition-all duration-1000"
                style={{ width: `${(score / QUIZ.length) * 100}%` }}
              />
            </div>
            <h3 className={`font-display font-bold text-[20px] md:text-[24px] mt-6 ${verdict().c}`}>{verdict().t}</h3>
            <p className="text-ink-200 text-[14.5px] leading-relaxed max-w-lg mx-auto mt-3">{verdict().m}</p>
            {best !== null && (
              <p className="mt-4 font-mono text-[12px] text-ink-400">
                лучший результат: <span className="text-amber-350">{best}/{QUIZ.length}</span>
              </p>
            )}
            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <button
                onClick={start}
                className="inline-flex items-center gap-2 font-display font-semibold text-[13px] px-6 py-3 rounded-lg bg-term-400 text-ink-950 hover:bg-term-300 transition-colors"
              >
                пройти ещё раз
              </button>
              <a
                href="#modules"
                className="inline-flex items-center gap-2 font-mono text-[12.5px] px-5 py-3 rounded-lg border border-ink-600 text-ink-200 hover:border-amber-450/50 hover:text-amber-350 transition-colors"
              >
                $ закрыть пробелы в модулях
              </a>
            </div>
          </div>
        )}
      </div>

      {/* challenges */}
      <div className="mt-14">
        <Reveal>
          <p className="font-mono text-[12.5px] uppercase tracking-[0.2em] text-coral-400 mb-6 flex items-center gap-3">
            <span className="inline-block h-px w-10 bg-current opacity-60" />
            челленджи для тех, кому мало
          </p>
        </Reveal>
        <div className="grid md:grid-cols-3 gap-4">
          {CHALLENGES.map((c, i) => (
            <Reveal key={c.title} delay={i * 90}>
              <article className="group h-full rounded-xl border border-coral-400/25 bg-ink-900/75 p-6 flex flex-col transition-all duration-300 hover:border-coral-400/50 hover:-translate-y-1 hover:shadow-[0_24px_60px_-30px_rgba(242,85,74,0.35)]">
                <span className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-coral-400">{c.tag}</span>
                <h3 className="font-display font-bold text-[17px] text-ink-50 mt-3 leading-snug">{c.title}</h3>
                <p className="mt-3 text-[13px] leading-relaxed text-ink-200">{c.task}</p>
                <div className="mt-auto" />
                <p className="pt-4 text-[12px] leading-relaxed text-ink-300 border-t border-ink-700 mt-4">
                  <span className="font-mono text-[10.5px] uppercase tracking-wider text-term-400 block mb-1.5">
                    критерий успеха
                  </span>
                  {c.criteria}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
