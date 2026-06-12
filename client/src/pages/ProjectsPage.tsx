import { useEffect, useId, useMemo, useRef, useState } from "react";
import { ChevronDown, Search, X } from "lucide-react";
import { Link } from "wouter";
import { projects, type Project } from "@/data/projects";
import ProjectDialog from "@/components/ProjectDialog";
import ProjectCard from "@/components/ProjectCard";
import SEOHead from "@/components/SEOHead";
import PageAnchorNav, { type PageAnchor } from "@/components/PageAnchorNav";
import { profile } from "@/data/profile";
import { useEscapeKey } from "@/hooks/useEscapeKey";

type TierFilter = "all" | "production" | "gold" | "silver";
type SortBy = "tier" | "name";

const tierOrder: Record<Project["tier"], number> = {
  production: 0,
  gold: 1,
  silver: 2,
};

const projectAnchors: PageAnchor[] = [
  { id: "projects-overview", label: "總覽" },
  { id: "projects-filter", label: "篩選" },
  { id: "projects-list", label: "全部作品" },
];

const tierOptions: Array<{ value: TierFilter; label: string }> = [
  { value: "all", label: "全部作品" },
  { value: "production", label: "已上線專案" },
  { value: "gold", label: "金牌作品" },
  { value: "silver", label: "銀牌作品" },
];

export default function ProjectsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTier, setSelectedTier] = useState<TierFilter>("all");
  const [sortBy, setSortBy] = useState<SortBy>("tier");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedTechs, setSelectedTechs] = useState<Set<string>>(new Set());
  const [showTechFilter, setShowTechFilter] = useState(false);

  const closeTimerRef = useRef<number | null>(null);
  const techFilterRef = useRef<HTMLDivElement>(null);
  const techFilterPanelId = useId();

  useEscapeKey(() => setShowTechFilter(false), showTechFilter);

  useEffect(() => {
    return () => {
      if (closeTimerRef.current != null) {
        window.clearTimeout(closeTimerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!showTechFilter) return;

    const onMouseDown = (event: MouseEvent) => {
      if (!techFilterRef.current) return;
      const target = event.target;
      if (!(target instanceof Node)) return;
      if (techFilterRef.current.contains(target)) return;
      setShowTechFilter(false);
    };

    document.addEventListener("mousedown", onMouseDown);
    return () => document.removeEventListener("mousedown", onMouseDown);
  }, [showTechFilter]);

  const projectStats = useMemo(
    () => ({
      total: projects.length,
      production: projects.filter(project => project.tier === "production")
        .length,
      gold: projects.filter(project => project.tier === "gold").length,
      silver: projects.filter(project => project.tier === "silver").length,
    }),
    []
  );

  const allTechnologies = useMemo(() => {
    const techs = new Set<string>();

    projects.forEach(project => {
      project.technologies.forEach(tech => techs.add(tech));
    });

    return Array.from(techs).sort((a, b) => a.localeCompare(b));
  }, []);

  const filteredProjects = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    const filtered = projects.filter(project => {
      const searchable = [
        project.name,
        project.tagline,
        project.role,
        project.metrics,
        project.details.problem,
        project.details.solution,
        project.details.contribution,
        ...project.technologies,
        ...project.details.highlights,
      ]
        .join(" ")
        .toLowerCase();

      const matchesSearch = query.length === 0 || searchable.includes(query);
      const matchesTier =
        selectedTier === "all" || project.tier === selectedTier;
      const matchesTechs =
        selectedTechs.size === 0 ||
        Array.from(selectedTechs).every(tech =>
          project.technologies.includes(tech)
        );

      return matchesSearch && matchesTier && matchesTechs;
    });

    if (sortBy === "name") {
      return [...filtered].sort((a, b) => a.name.localeCompare(b.name));
    }

    return [...filtered].sort(
      (a, b) =>
        tierOrder[a.tier] - tierOrder[b.tier] || a.name.localeCompare(b.name)
    );
  }, [searchQuery, selectedTier, sortBy, selectedTechs]);

  const getTierColor = (tier: Project["tier"]) => {
    switch (tier) {
      case "production":
        return "from-emerald-500/18 via-cyan-500/10 to-slate-900/60 border-emerald-400/45 shadow-emerald-500/10";
      case "gold":
        return "from-yellow-500/18 via-amber-500/10 to-slate-900/60 border-yellow-400/40";
      case "silver":
        return "from-slate-400/16 via-slate-500/10 to-slate-900/60 border-slate-400/30";
      default:
        return "from-slate-400/16 via-slate-500/10 to-slate-900/60 border-slate-400/30";
    }
  };

  const handleProjectClick = (project: Project) => {
    if (closeTimerRef.current != null) {
      window.clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }

    setSelectedProject(project);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);

    if (closeTimerRef.current != null) {
      window.clearTimeout(closeTimerRef.current);
    }

    closeTimerRef.current = window.setTimeout(() => {
      closeTimerRef.current = null;
      setSelectedProject(null);
    }, 300);
  };

  const toggleTech = (tech: string) => {
    setSelectedTechs(prev => {
      const next = new Set(prev);

      if (next.has(tech)) {
        next.delete(tech);
      } else {
        next.add(tech);
      }

      return next;
    });
  };

  const clearTechFilters = () => setSelectedTechs(new Set());

  return (
    <>
      <SEOHead
        title={`Projects | ${profile.name}`}
        description="Portfolio projects spanning production systems, gold-tier flagship work, and silver-tier experiments."
        canonicalPath="/projects"
      />

      <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-100 page-fade-in">
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(59,130,246,0.1),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(20,184,166,0.08),transparent_50%)]" />
        </div>

        <div className="relative z-10">
          <nav className="sticky top-0 z-50 border-b border-cyan-500/10 bg-slate-950/60 backdrop-blur-md">
            <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
              <Link
                href="/"
                className="font-mono text-cyan-400 transition-colors hover:text-cyan-300"
              >
                首頁
              </Link>

              <h1 className="font-mono text-sm text-slate-400">Projects</h1>

              <div className="flex items-center gap-4">
                <Link
                  href="/resume"
                  className="font-mono text-xs text-slate-400 transition-colors hover:text-cyan-400"
                >
                  履歷
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

          <main className="mx-auto max-w-6xl px-4 py-12">
            <section id="projects-overview" className="mb-10 scroll-mt-24">
              <p className="mb-3 font-mono text-sm text-cyan-300">精選作品</p>

              <h2 className="mb-4 text-3xl font-bold md:text-4xl">
                工程作品與實作專案
              </h2>

              <p className="max-w-3xl leading-relaxed text-slate-300">
                這裡整理我在企業系統、AI 工具、PDF
                工程、資料處理與前後端整合上的實作成果。每個專案都以問題、解法、技術選型與實際成果呈現，強調可維護、可驗證與可交付的工程能力。
              </p>

              <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
                <StatCard label="作品數量" value={projectStats.total} />
                <StatCard label="已上線專案" value={projectStats.production} />
                <StatCard label="金牌作品" value={projectStats.gold} />
                <StatCard label="銀牌作品" value={projectStats.silver} />
              </div>
            </section>

            <PageAnchorNav anchors={projectAnchors} />

            <section id="projects-filter" className="mb-10 scroll-mt-24">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <div className="relative">
                  <Search className="absolute left-3 top-3.5 h-4 w-4 text-slate-400" />
                  <input
                    value={searchQuery}
                    onChange={event => setSearchQuery(event.target.value)}
                    aria-label="Search projects"
                    placeholder="搜尋專案名稱、技術或描述..."
                    className="w-full rounded-lg border border-slate-700/40 bg-slate-950/40 py-3 pl-10 pr-3 text-slate-200 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/30"
                  />
                </div>

                <select
                  value={selectedTier}
                  onChange={event =>
                    setSelectedTier(event.target.value as TierFilter)
                  }
                  aria-label="Tier"
                  className="w-full rounded-lg border border-slate-700/40 bg-slate-950/40 px-3 py-3 text-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500/30"
                >
                  {tierOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>

                <select
                  value={sortBy}
                  onChange={event => setSortBy(event.target.value as SortBy)}
                  aria-label="Sort"
                  className="w-full rounded-lg border border-slate-700/40 bg-slate-950/40 px-3 py-3 text-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500/30"
                >
                  <option value="tier">排序：作品等級</option>
                  <option value="name">排序：名稱</option>
                </select>
              </div>

              <div className="mt-4" ref={techFilterRef}>
                <button
                  type="button"
                  onClick={() => setShowTechFilter(value => !value)}
                  aria-expanded={showTechFilter}
                  aria-controls={techFilterPanelId}
                  aria-label="Technologies filter"
                  className="inline-flex items-center gap-2 text-sm text-cyan-300 transition-colors hover:text-cyan-200"
                >
                  技術篩選
                  <ChevronDown
                    className={`h-4 w-4 transition-transform ${
                      showTechFilter ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {showTechFilter && (
                  <div
                    id={techFilterPanelId}
                    className="mt-3 rounded-lg border border-slate-700/40 bg-slate-950/30 p-4"
                  >
                    <div className="flex flex-wrap gap-2">
                      {allTechnologies.map(tech => {
                        const active = selectedTechs.has(tech);

                        return (
                          <button
                            key={tech}
                            type="button"
                            onClick={() => toggleTech(tech)}
                            aria-pressed={active}
                            className={`rounded-full border px-3 py-1 text-sm transition-colors ${
                              active
                                ? "border-cyan-500/40 bg-cyan-500/20 text-cyan-200"
                                : "border-slate-700/40 bg-slate-900/30 text-slate-300 hover:border-slate-600/60"
                            }`}
                          >
                            {tech}
                          </button>
                        );
                      })}

                      {selectedTechs.size > 0 && (
                        <button
                          type="button"
                          onClick={clearTechFilters}
                          className="inline-flex items-center gap-1 rounded-full border border-red-500/30 bg-red-500/15 px-3 py-1 text-sm text-red-200 transition-colors hover:bg-red-500/25"
                        >
                          清除 <X className="h-3 w-3" />
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-4 text-sm text-slate-400">
                目前顯示 {filteredProjects.length} / {projects.length} 個專案
              </div>
            </section>

            <section
              id="projects-list"
              aria-label="All projects"
              className="scroll-mt-24"
            >
              <h3 className="mb-4 text-xl font-semibold">全部作品</h3>

              {filteredProjects.length === 0 ? (
                <div className="rounded-lg border border-slate-700/40 bg-slate-900/20 p-8 text-center text-slate-300">
                  找不到符合條件的專案，請調整搜尋或篩選條件。
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  {filteredProjects.map(project => (
                    <ProjectCard
                      key={project.id}
                      project={project}
                      getTierColor={getTierColor}
                      onProjectClick={handleProjectClick}
                    />
                  ))}
                </div>
              )}
            </section>
          </main>

          <ProjectDialog
            project={selectedProject}
            isOpen={isDialogOpen}
            onClose={handleCloseDialog}
            onProjectChange={setSelectedProject}
          />
        </div>
      </div>
    </>
  );
}

interface StatCardProps {
  label: string;
  value: number;
}

function StatCard({ label, value }: StatCardProps) {
  return (
    <div className="rounded-lg border border-slate-700/40 bg-slate-900/30 p-4">
      <p className="mb-1 text-xs text-slate-500">{label}</p>
      <p className="text-2xl font-bold text-cyan-300">{value}</p>
    </div>
  );
}
