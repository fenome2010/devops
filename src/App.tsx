import { useEffect, useState } from "react";
import Hero from "./components/Hero";
import Roadmap from "./components/Roadmap";
import Modules from "./components/Modules";
import Quiz from "./components/Quiz";
import Flashcards from "./components/Flashcards";
import { LessonAnatomy, Projects, Stuck, FinalCta, Footer } from "./components/Extras";

const LS_KEY = "devops12-weeks-done";

function loadDone(): number[] {
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (!raw) return [];
    const arr = JSON.parse(raw);
    return Array.isArray(arr) ? arr.filter((n) => typeof n === "number" && n >= 1 && n <= 12) : [];
  } catch {
    return [];
  }
}

export default function App() {
  const [doneWeeks, setDoneWeeks] = useState<number[]>(loadDone);

  useEffect(() => {
    localStorage.setItem(LS_KEY, JSON.stringify(doneWeeks));
  }, [doneWeeks]);

  const toggleWeek = (id: number) =>
    setDoneWeeks((prev) => (prev.includes(id) ? prev.filter((n) => n !== id) : [...prev, id].sort((a, b) => a - b)));

  return (
    <div id="top" className="relative min-h-screen bg-ink-950 text-ink-100 antialiased">
      {/* ambient layers */}
      <div className="pointer-events-none fixed inset-0 z-0" aria-hidden>
        <div className="absolute inset-0 bg-blueprint" />
        <div
          className="absolute -top-40 -left-40 w-[560px] h-[560px] rounded-full opacity-[0.13]"
          style={{ background: "radial-gradient(circle, #17c07d 0%, transparent 62%)" }}
        />
        <div
          className="absolute top-1/3 -right-48 w-[620px] h-[620px] rounded-full opacity-[0.10]"
          style={{ background: "radial-gradient(circle, #ffb454 0%, transparent 62%)" }}
        />
        <div
          className="absolute bottom-[-260px] left-1/4 w-[560px] h-[560px] rounded-full opacity-[0.09]"
          style={{ background: "radial-gradient(circle, #56b8e6 0%, transparent 62%)" }}
        />
      </div>
      <div className="noise-overlay" aria-hidden />

      <div className="relative z-10">
        <Hero progress={doneWeeks.length} />
        <main>
          <Roadmap doneWeeks={doneWeeks} onToggle={toggleWeek} onReset={() => setDoneWeeks([])} />
          <LessonAnatomy />
          <Modules />
          <Quiz />
          <Flashcards />
          <Projects />
          <Stuck />
          <FinalCta />
        </main>
        <Footer />
      </div>
    </div>
  );
}
