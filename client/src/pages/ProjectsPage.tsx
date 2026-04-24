import { useEffect, useId, useMemo, useRef, useState } from "react";
import { ChevronDown, Search, X } from "lucide-react";
import { Link } from "wouter";
import { projects, type Project } from "@/data/projects";
import ProjectDialog from "@/components/ProjectDialog";
import SEOHead from "@/components/SEOHead";
import { profile } from "@/data/profile";
import { useEscapeKey } from "@/hooks/useEscapeKey";

type Category = "all" | "enterprise" | "ai" | "learning";
type SortBy = "tier" | "name";

const tierOrder: Record<Project["tier"], number> = {
  gold: 0,
  silver: 1,
  bronze: 2,
};

const categoryLabels: Record<Category, string> = {
  all: "全部分類",
  enterprise: "Enterprise / 系統工程",
  ai: "AI / ML",
  learning: "Learning",
};

export default function ProjectsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<Category>("all");
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

  const projectStats = useMemo(() => {
    return {
      total: projects.length,
      gold: projects.filter(project => project.tier === "gold").length,
      silver: projects.filter(project => project.tier === "silver").length,
      bronze: projects.filter(project => project.tier === "bronze").length,
    };
  }, []);

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

      const matchesCategory =
        selectedCategory === "all" || project.category === selectedCategory;

      const matchesTechs =
        selectedTechs.size === 0 ||
        Array.from(selectedTechs).every(tech =>
          project.technologies.includes(tech)
        );

      return matchesSearch && matchesCategory && matchesTechs;
    });

    if (sortBy === "tier") {
      return [...filtered].sort(
        (a, b) =>
          tierOrder[a.tier] - tierOrder[b.tier] ||
          a.name.localeCompare(b.name)
      );
    }

    return [...filtered].sort((a, b) => a.name.localeCompare(b.name));
  }, [searchQuery, selectedCategory, sortBy, selectedTechs]);

  const getTierColor = (tier: Project["tier"]) => {
    switch (tier) {
      case "gold":
        return "from-yellow-500/20 to-yellow-600/10 border-yellow-500/30";
      case "silver":
        return "from-slate-400/20 to-slate-500/10 border-slate-400/30";
      case "bronze":
        return "from-orange-500/20 to-orange-600/10 border-orange-500/30";
      default:
        return "from-slate-500/20 to-slate-600/10 border-slate-500/30";
    }
  };

  const getTierBadge = (tier: string) => {
    switch (tier) {
      case "gold":
        return "金牌作品";
      case "silver":
        return "銀牌作品";
      case "bronze":
        return "銅牌作品";
      default:
        return tier;
    }
  };

  const getCategoryLabel = (category: Project["category"]) => {
    switch (category) {
      case "enterprise":
        return "Enterprise / 系統工程";
      case "ai":
        return "AI / ML";
      case "learning":
        return "Learning";
      default:
        return category;
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
        title={`專案｜${profile.name}`}
        description="整理可公開的作品與案例，包含全端系統、AI 應用、文件管理、PDF 引擎與學習平台。"
        canonicalPath="/projects"
      />

      <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-100 page-fade-in">
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(59,130,246,0.1),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(139,92,246,0.1),transparent_50%)]" />
        </div>

        <div className="relative z-10">
          <nav className="sticky top-0 z-50 bg-slate-950/60 backdrop-blur-md border-b border-cyan-500/10">
            <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
              <Link
                href="/"
                className="font-mono text-cyan-400 hover:text-cyan-300 transition-colors"
              >
                首頁
              </Link>

              <h1 className="font-mono text-sm text-slate-400">作品集</h1>

              <div className="flex gap-4 items-center">
                <Link
                  href="/resume"
                  className="font-mono text-xs text-slate-400 hover:text-cyan-400 transition-colors"
                >
                  履歷
                </Link>
                <span className="text-slate-600">|</span>
                <Link
                  href="/biography"
                  className="font-mono text-xs text-slate-400 hover:text-cyan-400 transition-colors"
                >
                  自傳
                </Link>
              </div>
            </div>
          </nav>

          <main className="max-w-6xl mx-auto px-4 py-12">
            <section className="mb-10">
              <p className="text-cyan-300 font-mono text-sm mb-3">
                Selected Projects
              </p>

              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                工程作品與實作專案
              </h2>

              <p className="text-slate-300 max-w-3xl leading-relaxed">
                這裡整理我目前較適合放在求職作品集中的專案，包含全端系統、AI
                應用、PDF 引擎、文件知識管理與學習平台。每個專案都著重在實作架構、資料流、測試與可維護性。
              </p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                <StatCard label="全部作品" value={projectStats.total} />
                <StatCard label="金牌作品" value={projectStats.gold} />
                <StatCard label="銀牌作品" value={projectStats.silver} />
                <StatCard label="銅牌作品" value={projectStats.bronze} />
              </div>
            </section>

      
            <section className="mb-10">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-3.5 w-4 h-4 text-slate-400" />
                  <input
                    value={searchQuery}
                    onChange={event => setSearchQuery(event.target.value)}
                    aria-label="Search projects"
                    placeholder="搜尋專案名稱、技術或描述…"
                    className="w-full pl-10 pr-3 py-3 bg-slate-950/40 border border-slate-700/40 rounded-lg text-slate-200 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/30"
                  />
                </div>

                <select
                  value={selectedCategory}
                  onChange={event =>
                    setSelectedCategory(event.target.value as Category)
                  }
                  aria-label="Category"
                  className="w-full px-3 py-3 bg-slate-950/40 border border-slate-700/40 rounded-lg text-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500/30"
                >
                  {Object.entries(categoryLabels).map(([value, label]) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
                </select>

                <select
                  value={sortBy}
                  onChange={event => setSortBy(event.target.value as SortBy)}
                  aria-label="Sort"
                  className="w-full px-3 py-3 bg-slate-950/40 border border-slate-700/40 rounded-lg text-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500/30"
                >
                  <option value="tier">排序：作品等級</option>
                  <option value="name">排序：專案名稱</option>
                </select>
              </div>

              <div className="mt-4" ref={techFilterRef}>
                <button
                  type="button"
                  onClick={() => setShowTechFilter(value => !value)}
                  aria-expanded={showTechFilter}
                  aria-controls={techFilterPanelId}
                  aria-label="Technologies filter"
                  className="inline-flex items-center gap-2 text-sm text-cyan-300 hover:text-cyan-200 transition-colors"
                >
                  技術篩選
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${
                      showTechFilter ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {showTechFilter && (
                  <div
                    id={techFilterPanelId}
                    className="mt-3 p-4 bg-slate-950/30 border border-slate-700/40 rounded-lg"
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
                            className={`px-3 py-1 rounded-full text-sm border transition-colors ${
                              active
                                ? "bg-cyan-500/20 border-cyan-500/40 text-cyan-200"
                                : "bg-slate-900/30 border-slate-700/40 text-slate-300 hover:border-slate-600/60"
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
                          className="px-3 py-1 rounded-full text-sm bg-red-500/15 border border-red-500/30 text-red-200 hover:bg-red-500/25 transition-colors inline-flex items-center gap-1"
                        >
                          清除 <X className="w-3 h-3" />
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

            <section aria-label="All projects">
              <h3 className="text-xl font-semibold mb-4">全部作品</h3>

              {filteredProjects.length === 0 ? (
                <div className="rounded-lg border border-slate-700/40 bg-slate-900/20 p-8 text-center text-slate-300">
                  沒有符合目前搜尋或篩選條件的作品。
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredProjects.map(project => (
                    <ProjectCard
                      key={project.id}
                      project={project}
                      getTierColor={getTierColor}
                      getTierBadge={getTierBadge}
                      getCategoryLabel={getCategoryLabel}
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
            getTierBadge={getTierBadge}
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
      <p className="text-xs text-slate-500 mb-1">{label}</p>
      <p className="text-2xl font-bold text-cyan-300">{value}</p>
    </div>
  );
}

interface ProjectCardProps {
  project: Project;
  getTierColor: (tier: Project["tier"]) => string;
  getTierBadge: (tier: string) => string;
  getCategoryLabel: (category: Project["category"]) => string;
  onProjectClick: (project: Project) => void;
}

function ProjectCard({
  project,
  getTierColor,
  getTierBadge,
  getCategoryLabel,
  onProjectClick,
}: ProjectCardProps) {
  return (
    <button
      type="button"
      onClick={() => onProjectClick(project)}
      className={`bg-gradient-to-br ${getTierColor(
        project.tier
      )} border rounded-lg overflow-hidden transition-all duration-300 hover:border-cyan-500/50 hover:shadow-lg hover:shadow-cyan-500/10 w-full text-left group`}
    >
      <div className="p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-sm font-semibold px-2 py-1 rounded bg-slate-800/50 text-slate-300">
                {getTierBadge(project.tier)}
              </span>

              <span className="text-xs text-slate-500">
                {getCategoryLabel(project.category)}
              </span>
            </div>

            <h3 className="text-lg font-bold text-slate-100 group-hover:text-cyan-300 transition-colors">
              {project.name}
            </h3>

            <p className="text-sm text-slate-300/80 mt-2 line-clamp-2">
              {project.tagline}
            </p>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {project.technologies.slice(0, 5).map(tech => (
            <span
              key={tech}
              className="px-2 py-1 rounded text-xs bg-slate-800/50 text-slate-300 border border-slate-700/30"
            >
              {tech}
            </span>
          ))}

          {project.technologies.length > 5 && (
            <span className="px-2 py-1 rounded text-xs bg-slate-800/50 text-slate-400 border border-slate-700/30">
              +{project.technologies.length - 5}
            </span>
          )}
        </div>

        <div className="mt-4 pt-4 border-t border-slate-700/30 space-y-2">
          <div>
            <p className="text-xs text-slate-500">角色</p>
            <p className="text-sm text-cyan-300 font-semibold">
              {project.role}
            </p>
          </div>

          <div>
            <p className="text-xs text-slate-500">成果</p>
            <p className="text-sm text-slate-200 font-medium">
              {project.metrics}
            </p>
          </div>
        </div>
      </div>
    </button>
  );
}