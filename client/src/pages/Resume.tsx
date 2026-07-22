import { type ReactNode } from "react";
import { Link } from "wouter";
import { ExternalLink, Github, Linkedin, Mail } from "lucide-react";
import SEOHead from "@/components/SEOHead";
import ScrollToTopButton from "@/components/ScrollToTopButton";
import StarFieldBackground from "@/components/StarFieldBackground";
import PageAnchorNav, { type PageAnchor } from "@/components/PageAnchorNav";
import { profile } from "@/data/profile";
import { certificationGroups } from "@/data/certifications";
import {
  earlierExperienceSummary,
  experienceTimeline,
  featuredResumeExperience,
} from "@/data/experience";

function ResumeLink({
  href,
  label,
  icon,
}: {
  href: string;
  label: string;
  icon: ReactNode;
}) {
  return (
    <a
      href={href}
      target={href.startsWith("mailto:") ? undefined : "_blank"}
      rel={href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
      className="inline-flex items-center gap-2 rounded-lg border border-slate-700/40 bg-slate-900/40 px-4 py-2 text-slate-200 transition-colors hover:border-slate-600/50 hover:bg-slate-900/60"
    >
      {icon}
      <span className="text-sm font-medium">{label}</span>
      {!href.startsWith("mailto:") && (
        <ExternalLink className="h-4 w-4 text-slate-400" />
      )}
    </a>
  );
}

function Section({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      className="scroll-mt-24 space-y-5 rounded-2xl border border-cyan-500/10 bg-slate-950/45 p-6 shadow-lg shadow-cyan-950/10"
    >
      <h2 className="text-2xl font-bold text-cyan-300">{title}</h2>
      {children}
    </section>
  );
}

const resumeAnchors: PageAnchor[] = [
  { id: "summary", label: "個人摘要" },
  { id: "skills", label: "核心能力" },
  { id: "experience", label: "工作經驗" },
  { id: "achievements", label: "技術成果" },
  { id: "education", label: "教育背景" },
  { id: "certifications", label: "證照" },
];

const skills = [
  "Delphi",
  "Legacy System Refactor",
  "Vue 3",
  "React",
  "TypeScript",
  "Go",
  "Node.js",
  "RESTful API",
  "SQL Server",
  "ERP 系統導入",
  "效能優化",
  "Root Cause Analysis",
];

const primaryCertificationGroups = certificationGroups.filter(
  group => group.priority === "primary"
);
const secondaryCertificationGroups = certificationGroups.filter(
  group => group.priority === "secondary"
);

export default function Resume() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
  const earlierRoles = experienceTimeline
    .slice(1)
    .map(job => job.title)
    .join(" / ");

  return (
    <>
      <SEOHead
        title={`履歷｜${profile.name}`}
        description="精簡版履歷，聚焦 ERP 系統開發、Legacy 重構、Web 化與核心工程成果。"
        canonicalPath="/resume"
      />

      <div className="min-h-screen bg-gradient-to-b from-slate-950 via-black to-slate-950 page-fade-in">
        <StarFieldBackground />

        <div className="relative z-10">
          <nav className="sticky top-0 z-50 border-b border-cyan-500/10 bg-slate-950/60 backdrop-blur-md">
            <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-4">
              <Link
                href="/"
                className="font-mono text-cyan-400 transition-colors hover:text-cyan-300"
              >
                首頁
              </Link>

              <p className="font-mono text-sm text-slate-400">履歷</p>

              <div className="flex items-center gap-4">
                <Link
                  href="/experience"
                  className="font-mono text-xs text-slate-400 transition-colors hover:text-cyan-400"
                >
                  工作經驗
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
            <PageAnchorNav anchors={resumeAnchors} />

            <div className="min-w-0 space-y-10 xl:max-w-4xl">
              <header className="space-y-5">
                <div className="space-y-3">
                  <p className="font-mono text-sm text-cyan-300">
                    ERP Modernization / Legacy Refactor / Full-Stack Development
                  </p>
                  <h1
                    className="text-3xl font-bold text-cyan-400 sm:text-4xl md:text-5xl"
                    style={{ fontFamily: "'Orbitron', monospace" }}
                  >
                    {profile.name}
                  </h1>
                  <p className="text-xl text-slate-200">
                    全端工程師｜ERP 現代化｜Legacy System Refactor
                  </p>
                  <p className="leading-relaxed text-slate-300">
                    這份履歷保留最核心的工程能力與代表成果，聚焦 ERP
                    系統開發、舊系統重構、資料流整理與跨部門落地經驗。
                  </p>
                </div>

                <div className="flex flex-wrap gap-3 pt-2">
                  <ResumeLink
                    href={`mailto:${profile.contact.email}`}
                    label={profile.contact.email}
                    icon={<Mail className="h-4 w-4 text-cyan-300" />}
                  />
                  <ResumeLink
                    href={profile.contact.linkedin}
                    label="LinkedIn"
                    icon={<Linkedin className="h-4 w-4 text-cyan-300" />}
                  />
                  <ResumeLink
                    href={profile.contact.github}
                    label="GitHub"
                    icon={<Github className="h-4 w-4 text-cyan-300" />}
                  />
                </div>
              </header>

              <Section id="summary" title="個人摘要">
                <p className="leading-relaxed text-slate-300">
                  目前擔任 ERP 軟體工程師，擅長從 Delphi
                  遺留系統、資料庫結構與實際流程中反推商業邏輯，並將其整理為可維護、可擴充的
                  Web
                  化方案。過去累積的設計與現場溝通背景，讓我能同時兼顧技術穩定性與使用者情境。
                </p>
              </Section>

              <Section id="skills" title="核心能力">
                <div className="flex flex-wrap gap-2">
                  {skills.map(skill => (
                    <span
                      key={skill}
                      className="rounded-full border border-slate-700/40 bg-slate-900/50 px-3 py-1 text-sm text-slate-200"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </Section>

              <Section id="experience" title="工作經驗">
                <div className="space-y-6">
                  <article className="rounded-2xl border border-cyan-500/20 bg-cyan-500/10 p-5">
                    <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                      <div>
                        <p className="font-mono text-sm text-cyan-300">
                          目前職位
                        </p>
                        <h3 className="mt-2 text-xl font-semibold text-slate-100">
                          {featuredResumeExperience.role.title}
                        </h3>
                        <p className="text-slate-200">
                          {featuredResumeExperience.role.company}
                        </p>
                        <p className="text-sm text-slate-400">
                          {featuredResumeExperience.role.role}
                        </p>
                      </div>

                      <p className="text-left text-sm text-slate-400 md:text-right">
                        {featuredResumeExperience.role.period}
                      </p>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {featuredResumeExperience.role.technologies?.map(tech => (
                        <span
                          key={tech}
                          className="rounded-full border border-cyan-500/20 bg-slate-900/40 px-3 py-1 text-xs text-cyan-100"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <ol className="mt-5 space-y-2 leading-relaxed text-slate-300">
                      {featuredResumeExperience.bullets.map((item, index) => (
                        <li key={item}>
                          {index + 1}. {item}
                        </li>
                      ))}
                    </ol>
                  </article>

                  <article className="rounded-2xl border border-slate-700/35 bg-slate-900/35 p-5">
                    <h3 className="text-lg font-semibold text-slate-100">
                      其他職涯背景
                    </h3>
                    <p className="mt-3 leading-relaxed text-slate-300">
                      {earlierExperienceSummary}
                    </p>
                    <p className="mt-3 text-sm text-slate-400">
                      {earlierRoles}
                    </p>
                  </article>

                  <Link
                    href="/experience"
                    className="inline-flex items-center gap-2 rounded-lg border border-cyan-500/40 bg-cyan-500/20 px-4 py-2 text-cyan-200 transition-colors hover:bg-cyan-500/30"
                  >
                    查看完整工作經驗
                    <ExternalLink className="h-4 w-4" />
                  </Link>
                </div>
              </Section>

              <Section id="achievements" title="技術成果">
                <div className="grid gap-4 md:grid-cols-2">
                  <article className="rounded-xl border border-slate-700/30 bg-slate-900/35 p-5">
                    <p className="mb-2 font-mono text-sm text-cyan-300">
                      Performance Optimization
                    </p>
                    <h3 className="mb-3 text-lg font-semibold text-slate-100">
                      N+1 Query 效能優化
                    </h3>
                    <p className="leading-relaxed text-slate-300">
                      重新設計查詢流程後，將關鍵頁面回應時間由 26 秒壓縮至 1
                      秒內，同時降低資料庫 round-trip 與系統負載。
                    </p>
                  </article>

                  <article className="rounded-xl border border-slate-700/30 bg-slate-900/35 p-5">
                    <p className="mb-2 font-mono text-sm text-cyan-300">
                      Root Cause Analysis
                    </p>
                    <h3 className="mb-3 text-lg font-semibold text-slate-100">
                      跨系統資料異常排查
                    </h3>
                    <p className="leading-relaxed text-slate-300">
                      透過 ASCII 與資料欄位逐字分析，找出隱藏 CR/LF
                      字元造成的跨系統轉入異常，並完成資料清洗與防呆機制。
                    </p>
                  </article>
                </div>
              </Section>

              <Section id="education" title="教育背景">
                <div className="space-y-4 text-slate-300">
                  <div>
                    <h3 className="font-semibold text-slate-100">
                      國立彰化師範大學｜人工智慧科技應用碩士學位學程
                    </h3>
                    <p className="text-slate-400">2024/9 至 2026/6</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-100">
                      建國科技大學｜自動化工程系
                    </h3>
                    <p className="text-slate-400">2009/9 至 2013/6</p>
                  </div>
                </div>
              </Section>

              <Section id="certifications" title="證照">
                <div className="grid gap-4 md:grid-cols-2">
                  {primaryCertificationGroups.map(group => (
                    <article
                      key={group.category}
                      className="rounded-xl border border-slate-700/35 bg-slate-900/35 p-5"
                    >
                      <h3 className="mb-4 text-lg font-semibold text-slate-100">
                        {group.category}
                      </h3>
                      <ul className="space-y-2 text-sm leading-relaxed text-slate-300">
                        {group.items.map(item => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </article>
                  ))}
                </div>

                <details className="rounded-xl border border-slate-700/35 bg-slate-900/25 p-5">
                  <summary className="cursor-pointer text-lg font-semibold text-slate-100">
                    其他證照
                  </summary>
                  <div className="mt-4 grid gap-4 md:grid-cols-2">
                    {secondaryCertificationGroups.map(group => (
                      <article
                        key={group.category}
                        className="rounded-xl border border-slate-700/30 bg-slate-950/35 p-5"
                      >
                        <h3 className="mb-4 text-base font-semibold text-slate-100">
                          {group.category}
                        </h3>
                        <ul className="space-y-2 text-sm leading-relaxed text-slate-300">
                          {group.items.map(item => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                      </article>
                    ))}
                  </div>
                </details>
              </Section>
            </div>
          </div>

          <ScrollToTopButton onClick={scrollToTop} />
        </div>
      </div>
    </>
  );
}
