import { Link } from "wouter";
import { ChevronRight, ExternalLink } from "lucide-react";
import SEOHead from "@/components/SEOHead";
import PageAnchorNav, { type PageAnchor } from "@/components/PageAnchorNav";
import ScrollToTopButton from "@/components/ScrollToTopButton";
import StarFieldBackground from "@/components/StarFieldBackground";
import { experienceProgression, experienceTimeline } from "@/data/experience";
import { profile } from "@/data/profile";

const experienceAnchors: PageAnchor[] = [
  { id: "experience-overview", label: "總覽" },
  { id: "experience-timeline", label: "完整歷程" },
  { id: "experience-next", label: "延伸閱讀" },
];

function getStageLabel(index: number) {
  if (index === 0) return "目前職位";
  if (index === experienceTimeline.length - 1) return "職涯起點";
  if (index === experienceTimeline.length - 2) return "教學與支援";
  return "跨領域養成";
}

export default function Experience() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <>
      <SEOHead
        title={`工作經驗｜${profile.name}`}
        description="完整工作經歷，涵蓋 ERP 系統開發、Legacy 系統重構、Web 化、導入支援與跨領域設計背景。"
        canonicalPath="/experience"
      />

      <div className="min-h-screen bg-gradient-to-b from-slate-950 via-black to-slate-950 page-fade-in">
        <StarFieldBackground />

        <div className="relative z-10">
          <nav className="sticky top-0 z-50 border-b border-cyan-500/10 bg-slate-950/60 backdrop-blur-md">
            <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
              <Link
                href="/"
                className="font-mono text-cyan-400 transition-colors hover:text-cyan-300"
              >
                首頁
              </Link>

              <p className="font-mono text-sm text-slate-400">工作經驗</p>

              <div className="flex items-center gap-4">
                <Link
                  href="/resume"
                  className="font-mono text-xs text-slate-400 transition-colors hover:text-cyan-400"
                >
                  履歷
                </Link>
                <span className="text-slate-600">|</span>
                <Link
                  href="/projects"
                  className="font-mono text-xs text-slate-400 transition-colors hover:text-cyan-400"
                >
                  專案
                </Link>
                <span className="text-slate-600">|</span>
                <Link
                  href="/biography"
                  className="font-mono text-xs text-slate-400 transition-colors hover:text-cyan-400"
                >
                  自傳
                </Link>
              </div>
            </div>
          </nav>

          <div className="mx-auto grid max-w-7xl grid-cols-1 items-start gap-8 px-6 pb-16 pt-16 xl:grid-cols-[180px_minmax(0,1fr)]">
            <PageAnchorNav anchors={experienceAnchors} />

            <main className="min-w-0 space-y-10 xl:max-w-4xl">
              <header
                id="experience-overview"
                className="scroll-mt-24 space-y-6"
              >
                <div className="space-y-3">
                  <p className="font-mono text-sm text-cyan-300">
                    Full Employment Timeline
                  </p>
                  <h1
                    className="text-3xl font-bold text-cyan-400 sm:text-4xl md:text-5xl"
                    style={{ fontFamily: "'Orbitron', monospace" }}
                  >
                    工作經驗
                  </h1>
                  <p className="max-w-3xl leading-relaxed text-slate-300">
                    完整工作經歷從產品與視覺設計出發，逐步轉向 ERP
                    系統開發、Legacy 系統理解與 Web 化重構，最後延伸到 AI
                    方向的技術進修。這條路徑也塑造了我從使用情境、系統邏輯與交付穩定性三個面向思考問題的方式。
                  </p>
                </div>

                <div className="grid gap-3 md:grid-cols-2">
                  {experienceProgression.map(item => (
                    <div
                      key={item}
                      className="rounded-xl border border-slate-700/35 bg-slate-900/35 px-4 py-3 text-slate-200"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </header>

              <section
                id="experience-timeline"
                className="scroll-mt-24 space-y-5"
                aria-label="完整工作經歷"
              >
                {experienceTimeline.map((job, index) => (
                  <article
                    key={job.id}
                    className="rounded-2xl border border-slate-700/35 bg-slate-950/45 p-6 shadow-lg shadow-cyan-950/10"
                  >
                    <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
                      <div className="min-w-0 space-y-3">
                        <div className="flex items-start gap-4">
                          <div
                            className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-lg text-sm font-bold shadow-lg ${job.logoClass}`}
                          >
                            {job.logo ?? job.title.charAt(0)}
                          </div>

                          <div className="min-w-0">
                            <p className="font-mono text-xs text-cyan-300">
                              {getStageLabel(index)}
                            </p>
                            <h2 className="text-xl font-semibold text-slate-100">
                              {job.title}
                            </h2>
                            <p className="text-slate-200">{job.company}</p>
                            <p className="text-sm text-slate-400">{job.role}</p>
                          </div>
                        </div>

                        {job.technologies?.length ? (
                          <div className="flex flex-wrap gap-2">
                            {job.technologies.map(tech => (
                              <span
                                key={tech}
                                className="rounded-full border border-cyan-500/20 bg-slate-900/55 px-3 py-1 text-xs text-cyan-100"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        ) : null}
                      </div>

                      <div className="text-left text-sm text-slate-400 md:shrink-0 md:text-right">
                        <p>{job.period}</p>
                        {job.duration ? <p>{job.duration}</p> : null}
                      </div>
                    </div>

                    <ol className="mt-5 space-y-2 leading-relaxed text-slate-300">
                      {job.bullets.map((item, bulletIndex) => (
                        <li key={item}>
                          {bulletIndex + 1}. {item}
                        </li>
                      ))}
                    </ol>
                  </article>
                ))}
              </section>

              <section
                id="experience-next"
                className="scroll-mt-24 rounded-2xl border border-cyan-500/10 bg-slate-950/45 p-6"
              >
                <h2 className="text-2xl font-bold text-cyan-300">延伸閱讀</h2>
                <p className="mt-3 leading-relaxed text-slate-300">
                  如果你想先快速掌握我的能力重點，可以回到精簡版履歷；如果想看可公開的工程作品，則可直接前往專案頁。自傳頁則更完整整理了我如何從舊系統除錯、Web
                  化優化一路走到 AI 進修的脈絡。
                </p>

                <div className="mt-5 flex flex-wrap gap-3">
                  <Link
                    href="/resume"
                    className="inline-flex items-center gap-2 rounded-lg border border-cyan-500/40 bg-cyan-500/20 px-4 py-2 text-cyan-100 transition-colors hover:bg-cyan-500/30"
                  >
                    返回履歷
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                  <Link
                    href="/projects"
                    className="inline-flex items-center gap-2 rounded-lg border border-slate-700/40 bg-slate-900/40 px-4 py-2 text-slate-200 transition-colors hover:bg-slate-900/60"
                  >
                    查看專案
                    <ExternalLink className="h-4 w-4" />
                  </Link>
                </div>
              </section>
            </main>
          </div>

          <ScrollToTopButton onClick={scrollToTop} />
        </div>
      </div>
    </>
  );
}
