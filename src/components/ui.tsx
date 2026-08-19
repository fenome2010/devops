import { useEffect, useRef, useState, type FC, type ReactNode } from "react";

/* ---------------- prefers-reduced-motion ---------------- */
export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return reduced;
}

/* ---------------- scroll reveal ---------------- */
export function Reveal({
  children,
  className = "",
  delay = 0,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "section" | "li" | "span" | "article";
}) {
  const ref = useRef<HTMLElement | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            el.classList.add("is-in");
            io.unobserve(el);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <Tag
      ref={ref as never}
      className={`reveal-base ${className}`}
      style={{ ["--reveal-delay" as never]: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}

/* ---------------- section heading ---------------- */
export function SectionHead({
  kicker,
  title,
  accent = "text-term-400",
  children,
}: {
  kicker: string;
  title: string;
  accent?: string;
  children?: ReactNode;
}) {
  return (
    <div className="mb-10 md:mb-14 max-w-3xl">
      <Reveal>
        <p className={`font-mono text-[13px] tracking-[0.22em] uppercase ${accent} mb-4 flex items-center gap-3`}>
          <span className="inline-block h-px w-10 bg-current opacity-60" />
          {kicker}
        </p>
      </Reveal>
      <Reveal delay={90}>
        <h2 className="font-display font-bold text-[clamp(1.55rem,3.6vw,2.6rem)] leading-[1.12] text-ink-50 tracking-tight">
          <span className="mask-line">
            <span>{title}</span>
          </span>
        </h2>
      </Reveal>
      {children && (
        <Reveal delay={160}>
          <div className="mt-5 text-ink-200 text-[15px] md:text-base leading-relaxed">{children}</div>
        </Reveal>
      )}
    </div>
  );
}

/* ---------------- animated counter ---------------- */
export function useCountUp(target: number, duration = 700): number {
  const reduced = usePrefersReducedMotion();
  const [value, setValue] = useState(target);
  const prev = useRef(target);
  useEffect(() => {
    if (reduced) {
      setValue(target);
      prev.current = target;
      return;
    }
    const from = prev.current;
    prev.current = target;
    if (from === target) return;
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(Math.round(from + (target - from) * eased));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration, reduced]);
  return value;
}

export const fmtMoney = (n: number) => n.toLocaleString("ru-RU") + " ₽";

/* ---------------- copy button ---------------- */
export function CopyButton({ text, className = "" }: { text: string; className?: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={() => {
        navigator.clipboard?.writeText(text).catch(() => {});
        setCopied(true);
        setTimeout(() => setCopied(false), 1600);
      }}
      className={`group/copy inline-flex items-center gap-1.5 font-mono text-[11px] px-2.5 py-1.5 rounded-md border transition-all duration-200 ${
        copied
          ? "border-term-400/60 text-term-300 bg-term-900/60"
          : "border-ink-600 text-ink-300 hover:text-term-300 hover:border-term-400/50 hover:bg-ink-800"
      } ${className}`}
      aria-label="Скопировать"
    >
      {copied ? <IconCheck className="w-3.5 h-3.5" /> : <IconCopy className="w-3.5 h-3.5" />}
      {copied ? "готово" : "copy"}
    </button>
  );
}

/* ---------------- custom inline icons ---------------- */
type IconProps = { className?: string };
const S = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export const IconBranch = ({ className = "w-5 h-5" }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} {...S}>
    <circle cx="6" cy="5" r="2.2" />
    <circle cx="6" cy="19" r="2.2" />
    <circle cx="18" cy="8" r="2.2" />
    <path d="M6 7.2v9.6" />
    <path d="M18 10.2c0 3.6-4 4.2-7.2 4.6-2.2.3-3.8 1-4.4 2.4" />
  </svg>
);

export const IconTerminal = ({ className = "w-5 h-5" }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} {...S}>
    <rect x="3" y="4.5" width="18" height="15" rx="2" />
    <path d="M7 9.5l3.2 2.8L7 15" />
    <path d="M12.5 15.5H17" />
  </svg>
);

export const IconContainer = ({ className = "w-5 h-5" }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} {...S}>
    <path d="M12 3l8 4v10l-8 4-8-4V7l8-4z" />
    <path d="M4 7l8 4 8-4" />
    <path d="M12 11v10" />
    <path d="M8 5l8 4" opacity=".45" />
  </svg>
);

export const IconPipeline = ({ className = "w-5 h-5" }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} {...S}>
    <circle cx="4.5" cy="12" r="2" />
    <circle cx="12" cy="5.5" r="2" />
    <circle cx="12" cy="18.5" r="2" />
    <circle cx="19.5" cy="12" r="2" />
    <path d="M6.3 10.8L10.3 6.7M6.3 13.2l4 4.1M13.8 6.8l3.9 3.9M13.8 17.2l3.9-3.9" />
  </svg>
);

export const IconServer = ({ className = "w-5 h-5" }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} {...S}>
    <rect x="3.5" y="4" width="17" height="6.5" rx="1.5" />
    <rect x="3.5" y="13.5" width="17" height="6.5" rx="1.5" />
    <path d="M6.5 7.2h.01M9.3 7.2h.01M6.5 16.7h.01M9.3 16.7h.01" strokeWidth="2.2" />
    <path d="M13.5 7.2h4M13.5 16.7h4" opacity=".5" />
  </svg>
);

export const IconWheel = ({ className = "w-5 h-5" }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} {...S}>
    <circle cx="12" cy="12" r="8.5" />
    <circle cx="12" cy="12" r="3" />
    <path d="M12 3.5v5.6M12 14.9v5.6M3.5 12h5.6M14.9 12h5.6M6 6l4 4M14 14l4 4M18 6l-4 4M10 14l-4 4" opacity=".7" />
  </svg>
);

export const IconPulse = ({ className = "w-5 h-5" }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} {...S}>
    <path d="M2.5 12h4l2.5-6.5 4 13 2.5-6.5h6" />
    <circle cx="20" cy="12" r="1.4" fill="currentColor" stroke="none" />
  </svg>
);

export const IconRocket = ({ className = "w-5 h-5" }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} {...S}>
    <path d="M12 15.5c5-3.5 6.5-8 6.5-11.5-3.5 0-8 1.5-11.5 6.5" />
    <path d="M7 10.5L3.5 12l3 1.5M13.5 17L12 20.5 10.5 17.5" />
    <circle cx="13.6" cy="10.4" r="1.6" />
    <path d="M9 15l-2.5 2.5M6.5 13.5c-1.5 1-2 3-2 4.5 1.5 0 3.5-.5 4.5-2" />
  </svg>
);

export const IconCheck = ({ className = "w-4 h-4" }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} {...S} strokeWidth={2.4}>
    <path d="M4.5 12.5l5 5L19.5 7" />
  </svg>
);

export const IconCopy = ({ className = "w-4 h-4" }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} {...S}>
    <rect x="8.5" y="8.5" width="12" height="12" rx="2" />
    <path d="M15.5 8.5v-3a2 2 0 0 0-2-2h-8a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h3" />
  </svg>
);

export const IconArrow = ({ className = "w-4 h-4" }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} {...S} strokeWidth={2}>
    <path d="M4 12h15M13.5 5.5L20 12l-6.5 6.5" />
  </svg>
);

export const IconFlag = ({ className = "w-4 h-4" }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} {...S}>
    <path d="M5 21V4" />
    <path d="M5 4c4-2.2 7 2 11 0v9c-4 2-7-2.2-11 0" />
  </svg>
);

export const IconWarn = ({ className = "w-4 h-4" }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} {...S}>
    <path d="M12 3.5L21.5 20h-19L12 3.5z" />
    <path d="M12 10v4.5" />
    <path d="M12 17.4h.01" strokeWidth="2.6" />
  </svg>
);

export const IconBook = ({ className = "w-4 h-4" }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} {...S}>
    <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15.5H6.5A2.5 2.5 0 0 0 4 21V5.5z" />
    <path d="M4 18.5A2.5 2.5 0 0 1 6.5 16H20" />
    <path d="M8 7.5h8M8 11h5" opacity=".55" />
  </svg>
);

export const IconLink = ({ className = "w-4 h-4" }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} {...S}>
    <path d="M10 14a4 4 0 0 0 6 .4l3-3a4 4 0 1 0-5.6-5.6l-1.5 1.5" />
    <path d="M14 10a4 4 0 0 0-6-.4l-3 3a4 4 0 1 0 5.6 5.6l1.5-1.5" />
  </svg>
);

export const ICONS: Record<string, FC<IconProps>> = {
  branch: IconBranch,
  terminal: IconTerminal,
  container: IconContainer,
  pipeline: IconPipeline,
  server: IconServer,
  wheel: IconWheel,
  pulse: IconPulse,
  rocket: IconRocket,
};
