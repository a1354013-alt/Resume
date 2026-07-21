import { type ReactNode } from "react";
import { Link } from "wouter";
import {
  ChevronRight,
  ExternalLink,
  Github,
  Linkedin,
  Mail,
} from "lucide-react";
import SEOHead from "@/components/SEOHead";
import PageAnchorNav, { type PageAnchor } from "@/components/PageAnchorNav";
import ScrollToTopButton from "@/components/ScrollToTopButton";
import StarFieldBackground from "@/components/StarFieldBackground";
import { certificationGroups } from "@/data/certifications";
import {
  earlierExperienceSummary,
  experienceTimeline,
  featuredResumeExperience,
} from "@/data/experience";
import { profile } from "@/data/profile";

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

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3 text-slate-300 leading-relaxed">
      {items.map(item => (
        <li key={item} className="flex gap-3">
          <span
            aria-hidden="true"
            className="mt-2 h-2 w-2 shrink-0 rounded-full bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.55)]"
          />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

const resumeAnchors: PageAnchor[] = [
  { id: "summary", label: "Summary" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "achievements", label: "Impact" },
  { id: "education", label: "Education" },
  { id: "certifications", label: "Certifications" },
  { id: "portfolio", label: "Portfolio" },
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
  "ERP Workflow Support",
  "Performance Optimization",
  "Root Cause Analysis",
  "Python",
  "Computer Vision",
];

const summaryParagraphs = [
  "Focused on ERP software development, legacy system refactoring, and practical full-stack delivery across Delphi, Vue 3, Go, and RESTful API integration.",
  "Experienced in translating business workflows into maintainable systems, investigating production issues, identifying root causes, and improving the stability and performance of legacy applications.",
];

const conciseAchievements = [
  {
    label: "Performance Optimization",
    title: "Important query speedup",
    body: "Reduced an important page query from approximately 26 seconds to under 1 second.",
  },
  {
    label: "Stability",
    title: "Memory leak investigation",
    body: "Investigated and resolved stability issues by tracing memory leak behavior and narrowing the problem to the relevant execution path.",
  },
  {
    label: "Defensive Design",
    title: "Legacy workflow safeguards",
    body: "Added defensive handling to prevent duplicate Delphi workflow execution and reduce fragile legacy behavior.",
  },
  {
    label: "Root Cause Analysis",
    title: "Hidden data issue diagnosis",
    body: "Identified CR/LF-related data problems during production troubleshooting and isolated the data-cleaning fix required for stable processing.",
  },
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
        title={`Resume | ${profile.name}`}
        description="Concise recruiter-friendly overview covering ERP modernization, legacy refactoring, measurable technical impact, selected certifications, and portfolio entry points."
        canonicalPath="/resume"
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
                擐?
              </Link>

              <p className="font-mono text-sm text-slate-400">Resume</p>

              <div className="flex items-center gap-4">
                <Link
                  href="/experience"
                  className="font-mono text-xs text-slate-400 transition-colors hover:text-cyan-400"
                >
                  Experience
                </Link>
                <span className="text-slate-600">|</span>
                <Link
                  href="/projects"
                  className="font-mono text-xs text-slate-400 transition-colors hover:text-cyan-400"
                >
                  撠?
                </Link>
                <span className="text-slate-600">|</span>
                <Link
                  href="/biography"
                  className="font-mono text-xs text-slate-400 transition-colors hover:text-cyan-400"
                >
                  ?芸
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
                    ERP Software Engineer / Legacy System Refactor
                  </p>

                  <p className="max-w-3xl text-slate-300 leading-relaxed">
                    Recruiter-friendly overview of software engineering impact,
                    practical modernization work, and technical evidence across
                    ERP systems, API integration, and production support.
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

              <main className="space-y-10">
                <Section id="summary" title="Summary">
                  <div className="space-y-4 text-slate-300 leading-relaxed">
                    {summaryParagraphs.map(paragraph => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                </Section>

                <Section id="skills" title="Core Skills">
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

                <Section id="experience" title="Concise Work Experience">
                  <div className="space-y-6">
                    <article className="rounded-2xl border border-cyan-500/20 bg-cyan-500/8 p-5">
                      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                        <div className="space-y-2">
                          <p className="font-mono text-sm text-cyan-300">
                            Current Role
                          </p>
                          <h3 className="text-xl font-semibold text-slate-100">
                            {featuredResumeExperience.role.title}
                          </h3>
                          <p className="text-slate-200">
                            {featuredResumeExperience.role.company}
                          </p>
                          <p className="text-sm text-slate-400">
                            {featuredResumeExperience.role.role}
                          </p>
                        </div>

                        <p className="text-sm text-slate-400 md:text-right">
                          {featuredResumeExperience.role.period}
                        </p>
                      </div>

                      <div className="mt-4 flex flex-wrap gap-2">
                        {featuredResumeExperience.role.technologies?.map(
                          tech => (
                            <span
                              key={tech}
                              className="rounded-full border border-cyan-500/20 bg-slate-950/50 px-3 py-1 text-xs text-cyan-100"
                            >
                              {tech}
                            </span>
                          )
                        )}
                      </div>

                      <div className="mt-5">
                        <BulletList items={featuredResumeExperience.bullets} />
                      </div>
                    </article>

                    <article className="rounded-2xl border border-slate-700/35 bg-slate-900/35 p-5">
                      <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                        <div className="space-y-2">
                          <h3 className="text-lg font-semibold text-slate-100">
                            Earlier Cross-Disciplinary Experience
                          </h3>
                          <p className="text-slate-300 leading-relaxed">
                            {earlierExperienceSummary}
                          </p>
                        </div>

                        <p className="text-sm text-slate-400 md:max-w-xs md:text-right">
                          {earlierRoles}
                        </p>
                      </div>
                    </article>

                    <Link
                      href="/experience"
                      className="inline-flex items-center gap-2 rounded-lg border border-cyan-500/40 bg-cyan-500/20 px-4 py-2 font-medium text-cyan-100 transition-colors hover:bg-cyan-500/30"
                    >
                      View Full Work Experience
                      <ChevronRight className="h-4 w-4" />
                    </Link>
                  </div>
                </Section>

                <Section id="achievements" title="Key Technical Achievements">
                  <div className="grid gap-4 md:grid-cols-2">
                    {conciseAchievements.map(item => (
                      <article
                        key={item.title}
                        className="rounded-xl border border-slate-700/30 bg-slate-900/35 p-5"
                      >
                        <p className="mb-2 text-sm font-mono text-cyan-300">
                          {item.label}
                        </p>
                        <h3 className="mb-3 text-lg font-semibold text-slate-100">
                          {item.title}
                        </h3>
                        <p className="text-slate-300 leading-relaxed">
                          {item.body}
                        </p>
                      </article>
                    ))}
                  </div>
                </Section>

                <Section id="education" title="Education">
                  <div className="space-y-4 text-slate-300">
                    <div>
                      <h3 className="font-semibold text-slate-100">
                        Graduate Study
                      </h3>
                      <p className="text-slate-400">2024/9 ?? 2026/6</p>
                    </div>

                    <div>
                      <h3 className="font-semibold text-slate-100">
                        Undergraduate Study
                      </h3>
                      <p className="text-slate-400">2009/9 ?? 2013/6</p>
                    </div>
                  </div>
                </Section>

                <Section id="certifications" title="Selected Certifications">
                  <div className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                      {primaryCertificationGroups.map(group => (
                        <article
                          key={group.category}
                          className="rounded-xl border border-slate-700/35 bg-slate-900/35 p-5"
                        >
                          <h3 className="mb-4 text-lg font-semibold text-slate-100">
                            {group.category}
                          </h3>
                          <BulletList items={group.items} />
                        </article>
                      ))}
                    </div>

                    <details className="rounded-xl border border-slate-700/35 bg-slate-900/25 p-5">
                      <summary className="cursor-pointer list-none text-lg font-semibold text-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300">
                        Other Certifications
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
                            <BulletList items={group.items} />
                          </article>
                        ))}
                      </div>
                    </details>
                  </div>
                </Section>

                <Section id="portfolio" title="Projects and Portfolio">
                  <p className="text-slate-300 leading-relaxed">
                    Use the project page for hands-on implementation evidence
                    across ERP systems, internal tools, and technical
                    experiments, and use the biography page for longer-form
                    background and problem-solving context.
                  </p>

                  <div className="flex flex-wrap gap-3">
                    <Link
                      href="/projects"
                      className="inline-flex items-center gap-2 rounded-lg border border-cyan-500/40 bg-cyan-500/20 px-4 py-2 text-cyan-200 transition-colors hover:bg-cyan-500/30"
                    >
                      ??撠?
                      <ExternalLink className="h-4 w-4" />
                    </Link>
                    <Link
                      href="/biography"
                      className="inline-flex items-center gap-2 rounded-lg border border-slate-700/40 bg-slate-900/40 px-4 py-2 text-slate-200 transition-colors hover:bg-slate-900/60"
                    >
                      ?芸
                      <ChevronRight className="h-4 w-4" />
                    </Link>
                  </div>
                </Section>

                <div className="h-12" />
              </main>
            </div>
          </div>

          <ScrollToTopButton onClick={scrollToTop} />
        </div>
      </div>
    </>
  );
}
