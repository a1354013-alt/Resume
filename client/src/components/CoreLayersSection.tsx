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
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_50%,rgba(0,217,255,0.08),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(179,0,255,0.06),transparent_55%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/25 via-black to-black" />
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
        @keyframes pulse-subtle {
          0%, 100% { opacity: 0.55; }
          50% { opacity: 1; }
        }
      `}</style>
    </section>
  );
}
