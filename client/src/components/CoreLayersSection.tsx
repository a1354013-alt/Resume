import { useEffect, useRef, useState } from "react";

interface SkillCard {
  title: string;
  subtitle: string;
  icon: string;
  items: string[];
  depth: "crust" | "mantle" | "core";
}

const skills: SkillCard[] = [
  {
    title: "Frontend",
    subtitle: "Web UI / Client",
    icon: "⚛️",
    depth: "crust",
    items: ["React", "Vue 3", "TypeScript", "Tailwind CSS"],
  },
  {
    title: "Backend",
    subtitle: "API / Data",
    icon: "🛠️",
    depth: "mantle",
    items: ["Go", "Node.js", "REST API", "SQL Server", "PostgreSQL"],
  },
  {
    title: "Engineering Practice",
    subtitle: "Quality / Reliability",
    icon: "🧪",
    depth: "core",
    items: ["CI/CD", "Testing", "Refactor", "Performance Optimization"],
  },
];

export default function CoreLayersSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visibleCards, setVisibleCards] = useState<boolean[]>([
    false,
    false,
    false,
  ]);

  useEffect(() => {
    let hasAnimated = false;
    const timeoutIds: number[] = [];

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          if (hasAnimated) return;
          hasAnimated = true;

          timeoutIds.push(
            window.setTimeout(() => setVisibleCards([true, false, false]), 100)
          );
          timeoutIds.push(
            window.setTimeout(() => setVisibleCards([true, true, false]), 320)
          );
          timeoutIds.push(
            window.setTimeout(() => setVisibleCards([true, true, true]), 540)
          );
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => {
      observer.disconnect();
      for (const id of timeoutIds) window.clearTimeout(id);
    };
  }, []);

  return (
    <section
      id="core"
      ref={sectionRef}
      className="scroll-mt-24 relative w-full min-h-screen bg-black py-24 px-4 overflow-hidden"
    >
      {/* Cyber night glow background */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div
          className="absolute inset-0 opacity-95"
          style={{
            background:
              "radial-gradient(circle at 82% 30%, rgba(34, 211, 238, 0.13), transparent 27rem), radial-gradient(circle at 10% 20%, rgba(168, 85, 247, 0.1), transparent 24rem), radial-gradient(circle at 50% 76%, rgba(14, 165, 233, 0.055), transparent 34rem), linear-gradient(135deg, rgba(5, 1, 12, 0.72) 0%, rgba(2, 6, 23, 0.82) 48%, rgba(3, 7, 18, 0.72) 100%)",
            maskImage:
              "linear-gradient(to bottom, transparent 0%, black 18%, black 76%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, transparent 0%, black 18%, black 76%, transparent 100%)",
          }}
        />
        <div
          className="absolute inset-0 opacity-35"
          style={{
            backgroundImage:
              "linear-gradient(rgba(34, 211, 238, 0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(34, 211, 238, 0.04) 1px, transparent 1px)",
            backgroundSize: "72px 72px",
            maskImage:
              "linear-gradient(to bottom, transparent 8%, black 28%, black 64%, transparent 88%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, transparent 8%, black 28%, black 64%, transparent 88%)",
          }}
        />
        <div
          className="absolute -left-[12%] -right-[12%] -bottom-[22%] h-[48%] blur-3xl opacity-75"
          style={{
            background:
              "radial-gradient(circle at 20% 68%, rgba(34, 211, 238, 0.11), transparent 18rem), radial-gradient(circle at 72% 72%, rgba(168, 85, 247, 0.075), transparent 21rem)",
            maskImage:
              "linear-gradient(to bottom, transparent 0%, black 24%, black 62%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, transparent 0%, black 24%, black 62%, transparent 100%)",
          }}
        />

        <div className="skills-cloud skills-cloud-a" />
        <div className="skills-cloud skills-cloud-b" />
        <div className="skills-twinkle skills-twinkle-a" />
        <div className="skills-twinkle skills-twinkle-b" />
        <div className="skills-twinkle skills-twinkle-c" />
        <div className="skills-twinkle skills-twinkle-d" />
        <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-black via-black/75 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-black via-black/80 to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="mb-14">
          <h2
            className="text-4xl md:text-5xl font-bold mb-4"
            style={{ fontFamily: "'Orbitron', monospace" }}
          >
            <span className="text-slate-200">技術能力</span>{" "}
            <span className="text-cyan-300">Technical Skills</span>
          </h2>
          <p className="font-mono text-slate-400 text-sm md:text-base max-w-2xl leading-relaxed">
            將技術能力整理成「前端 / 後端 /
            工程實踐」三個層次，方便快速對齊我能提供的即戰力範圍。
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {skills.map((skill, index) => {
            const depthClasses = {
              crust:
                "bg-slate-900/25 border-slate-700/35 hover:border-slate-600/55",
              mantle:
                "bg-slate-900/35 border-slate-700/45 hover:border-slate-600/65",
              core: "bg-slate-900/55 border-cyan-500/25 hover:border-cyan-400/55",
            } as const;

            return (
              <div
                key={skill.title}
                className={`transition-all duration-1000 transform ${
                  visibleCards[index]
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: `${index * 160}ms` }}
              >
                <div
                  className={`relative h-full rounded-2xl border backdrop-blur-sm ${depthClasses[skill.depth]} transition-all duration-300`}
                >
                  <div className="p-8 pb-6 border-b border-slate-700/25">
                    <div className="text-4xl mb-3">{skill.icon}</div>
                    <h3
                      className="text-2xl font-bold mb-1 text-slate-100"
                      style={{ fontFamily: "'Orbitron', monospace" }}
                    >
                      {skill.title}
                    </h3>
                    <p className="font-mono text-sm text-slate-400">
                      {skill.subtitle}
                    </p>
                  </div>

                  <div className="p-8">
                    <ul className="space-y-3">
                      {skill.items.map(item => (
                        <li
                          key={item}
                          className="flex items-start gap-3 text-slate-300 text-sm"
                        >
                          <span className="text-cyan-400 font-bold mt-1 flex-shrink-0">
                            →
                          </span>
                          <span className="font-mono leading-relaxed">
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {skill.depth === "core" && (
                    <div
                      className="absolute inset-0 rounded-2xl pointer-events-none"
                      style={{
                        background:
                          "radial-gradient(circle at center, rgba(0, 217, 255, 0.09) 0%, transparent 70%)",
                        animation: "pulse-subtle 3s ease-in-out infinite",
                      }}
                    />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        .skills-cloud {
          position: absolute;
          border-radius: 9999px;
          filter: blur(34px);
          opacity: 0.24;
          transform: translate3d(0, 0, 0);
          mix-blend-mode: screen;
          will-change: transform, opacity;
          mask-image: linear-gradient(to bottom, transparent 0%, black 24%, black 76%, transparent 100%);
          -webkit-mask-image: linear-gradient(to bottom, transparent 0%, black 24%, black 76%, transparent 100%);
        }

        .skills-cloud-a {
          width: 36rem;
          height: 9rem;
          left: -10rem;
          top: 24%;
          background:
            radial-gradient(circle at 18% 52%, rgba(34, 211, 238, 0.2), transparent 34%),
            radial-gradient(circle at 52% 44%, rgba(148, 163, 184, 0.12), transparent 42%),
            radial-gradient(circle at 78% 58%, rgba(168, 85, 247, 0.14), transparent 34%);
          animation: skills-cloud-drift-a 34s ease-in-out infinite alternate;
        }

        .skills-cloud-b {
          width: 46rem;
          height: 12rem;
          right: -16rem;
          top: 58%;
          opacity: 0.18;
          background:
            radial-gradient(circle at 22% 44%, rgba(168, 85, 247, 0.15), transparent 36%),
            radial-gradient(circle at 50% 56%, rgba(34, 211, 238, 0.13), transparent 42%),
            radial-gradient(circle at 82% 42%, rgba(14, 165, 233, 0.12), transparent 34%);
          animation: skills-cloud-drift-b 42s ease-in-out infinite alternate;
        }

        .skills-twinkle {
          position: absolute;
          width: 4px;
          height: 4px;
          border-radius: 9999px;
          background: rgba(165, 243, 252, 0.9);
          box-shadow: 0 0 12px rgba(34, 211, 238, 0.75), 0 0 28px rgba(168, 85, 247, 0.26);
          opacity: 0;
          animation: skills-twinkle 4.8s ease-in-out infinite;
        }

        .skills-twinkle-a {
          left: 16%;
          top: 30%;
          animation-delay: 0.1s;
        }

        .skills-twinkle-b {
          left: 72%;
          top: 24%;
          width: 3px;
          height: 3px;
          animation-delay: 1.35s;
        }

        .skills-twinkle-c {
          left: 88%;
          top: 52%;
          animation-delay: 2.4s;
        }

        .skills-twinkle-d {
          left: 44%;
          top: 70%;
          width: 3px;
          height: 3px;
          animation-delay: 3.15s;
        }

        @keyframes pulse-subtle {
          0%, 100% { opacity: 0.55; }
          50% { opacity: 1; }
        }

        @keyframes skills-cloud-drift-a {
          0% { transform: translate3d(-2%, 0, 0) scale(1); opacity: 0.18; }
          50% { transform: translate3d(20%, -6%, 0) scale(1.05); opacity: 0.28; }
          100% { transform: translate3d(42%, 4%, 0) scale(0.98); opacity: 0.2; }
        }

        @keyframes skills-cloud-drift-b {
          0% { transform: translate3d(8%, 4%, 0) scale(1); opacity: 0.13; }
          50% { transform: translate3d(-18%, -5%, 0) scale(1.06); opacity: 0.22; }
          100% { transform: translate3d(-38%, 2%, 0) scale(1); opacity: 0.16; }
        }

        @keyframes skills-twinkle {
          0%, 100% { opacity: 0.12; transform: scale(0.72); }
          42% { opacity: 0.18; transform: scale(0.82); }
          50% { opacity: 0.95; transform: scale(1.4); }
          58% { opacity: 0.22; transform: scale(0.9); }
        }

        @media (prefers-reduced-motion: reduce) {
          .skills-cloud,
          .skills-twinkle {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
}
