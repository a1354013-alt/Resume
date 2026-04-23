import { useState, useMemo } from 'react';
import { ChevronDown, Search, X } from 'lucide-react';
import { Link } from 'wouter';
import { projects, Project } from '@/data/projects';
import ProjectDialog from '@/components/ProjectDialog';
import SEOHead from '@/components/SEOHead';

export default function ProjectsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'enterprise' | 'ai' | 'learning'>('all');
  const [sortBy, setSortBy] = useState<'tier' | 'name'>('tier');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedTechs, setSelectedTechs] = useState<Set<string>>(new Set());
  const [showTechFilter, setShowTechFilter] = useState(false);

  const featuredProjects = projects.filter(p => p.featured);
  
  // 收集所有技術棧
  const allTechnologies = useMemo(() => {
    const techs = new Set<string>();
    projects.forEach(p => {
      p.technologies.forEach(tech => techs.add(tech));
    });
    return Array.from(techs).sort();
  }, []);

  const filteredProjects = useMemo(() => {
    let filtered = projects.filter(p => {
      const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           p.tagline.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;
      
      // 技術棧篩選：如果選擇了技術，則只顯示包含所有選中技術的專案
      const matchesTechs = selectedTechs.size === 0 || 
        Array.from(selectedTechs).every(tech => p.technologies.includes(tech));
      
      return matchesSearch && matchesCategory && matchesTechs;
    });

    if (sortBy === 'tier') {
      const tierOrder = { gold: 0, silver: 1, bronze: 2 };
      filtered.sort((a, b) => tierOrder[a.tier] - tierOrder[b.tier]);
    } else {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    }

    return filtered;
  }, [searchQuery, selectedCategory, sortBy, selectedTechs]);

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'gold':
        return 'from-yellow-500/20 to-yellow-600/10 border-yellow-500/30';
      case 'silver':
        return 'from-slate-400/20 to-slate-500/10 border-slate-400/30';
      case 'bronze':
        return 'from-orange-500/20 to-orange-600/10 border-orange-500/30';
      default:
        return 'from-slate-500/20 to-slate-600/10 border-slate-500/30';
    }
  };

  const getTierBadge = (tier: string) => {
    switch (tier) {
      case 'gold':
        return '🏆 金牌';
      case 'silver':
        return '🥈 銀牌';
      case 'bronze':
        return '🥉 銅牌';
      default:
        return tier;
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setTimeout(() => setSelectedProject(null), 300);
  };

  const handleProjectChange = (project: Project) => {
    setSelectedProject(project);
  };

  const toggleTech = (tech: string) => {
    const newTechs = new Set(selectedTechs);
    if (newTechs.has(tech)) {
      newTechs.delete(tech);
    } else {
      newTechs.add(tech);
    }
    setSelectedTechs(newTechs);
  };

  const clearTechFilters = () => {
    setSelectedTechs(new Set());
  };

  return (
    <>
      <SEOHead
        title="我的作品 - 羅揚文 | 系統工程師"
        description="羅揚文的作品展示，包含 ERP 系統開發、Legacy 系統重構、AI 應用等上段作品。"
        ogTitle="我的作品 - 羅揚文"
        ogDescription="企業級系統開發的實戰案例。"
        canonical="https://animated-resume-portfolio.manus.space/projects"
      />
      <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-100 page-fade-in">
      {/* 星空背景 */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(59,130,246,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(139,92,246,0.1),transparent_50%)]" />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Navigation */}
        <nav className="sticky top-0 z-50 bg-slate-950/60 backdrop-blur-md border-b border-cyan-500/10">
          <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
            <Link href="/">
              <a className="font-mono text-cyan-400 hover:text-cyan-300 transition-colors">
                ← 回到首頁
              </a>
            </Link>
            <h1 className="font-mono text-sm text-slate-400">我的作品</h1>
            <div className="flex gap-4 items-center">
              <Link href="/resume">
                <a className="font-mono text-xs text-slate-400 hover:text-cyan-400 transition-colors">
                  我的履歷
                </a>
              </Link>
              <span className="text-slate-600">|</span>
              <Link href="/biography">
                <a className="font-mono text-xs text-slate-400 hover:text-cyan-400 transition-colors">
                  我的自傳
                </a>
              </Link>
              <span className="text-slate-600">|</span>
              <button
                onClick={scrollToTop}
                className="font-mono text-xs text-cyan-400 hover:text-cyan-300 transition-colors"
              >
                回到頂部 ↑
              </button>
            </div>
          </div>
        </nav>

        {/* 標題區 */}
        <div className="pt-20 pb-12 px-4 text-center border-b border-slate-800/50">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
            我的作品
          </h1>
          <p className="text-slate-400 max-w-2xl mx-auto">
            精選代表性專案，展示系統設計、技術決策與實際成果
          </p>
        </div>

        <div className="max-w-6xl mx-auto px-4 py-12">
          {/* 精選作品 Top 3 */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold mb-8 flex items-center gap-2">
              <span className="w-1 h-6 bg-gradient-to-b from-cyan-400 to-blue-400" />
              精選作品
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {featuredProjects.map(project => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  getTierColor={getTierColor}
                  getTierBadge={getTierBadge}
                  onProjectClick={handleProjectClick}
                />
              ))}
            </div>
          </section>

          {/* 搜尋與篩選 */}
          <section className="mb-12">
            <div className="flex flex-col gap-4 mb-6">
              {/* 搜尋框 */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                <input
                  type="text"
                  placeholder="搜尋專案名稱或描述..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-slate-800/50 border border-slate-700/50 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 transition-colors"
                />
              </div>

              {/* 篩選控制 */}
              <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
                {/* 分類篩選 */}
                <div className="flex gap-2 flex-wrap">
                  {(['all', 'enterprise', 'ai', 'learning'] as const).map(cat => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                        selectedCategory === cat
                          ? 'bg-cyan-500/20 border border-cyan-500/50 text-cyan-300'
                          : 'bg-slate-800/30 border border-slate-700/30 text-slate-400 hover:border-slate-600/50'
                      }`}
                    >
                      {cat === 'all' ? '全部' : cat === 'enterprise' ? '企業系統' : cat === 'ai' ? 'AI/ML' : '學習探索'}
                    </button>
                  ))}
                </div>

                {/* 技術篩選按鈕 */}
                <div className="relative">
                  <button
                    onClick={() => setShowTechFilter(!showTechFilter)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
                      selectedTechs.size > 0
                        ? 'bg-blue-500/20 border border-blue-500/50 text-blue-300'
                        : 'bg-slate-800/30 border border-slate-700/30 text-slate-400 hover:border-slate-600/50'
                    }`}
                  >
                    技術棧 {selectedTechs.size > 0 && `(${selectedTechs.size})`}
                    <ChevronDown className={`w-4 h-4 transition-transform ${showTechFilter ? 'rotate-180' : ''}`} />
                  </button>

                  {/* 技術篩選下拉菜單 */}
                  {showTechFilter && (
                    <div className="absolute top-full mt-2 right-0 bg-slate-900 border border-slate-700 rounded-lg p-4 z-40 min-w-96 max-h-96 overflow-y-auto shadow-lg">
                      <div className="flex justify-between items-center mb-3">
                        <h3 className="font-semibold text-slate-100">選擇技術棧</h3>
                        {selectedTechs.size > 0 && (
                          <button
                            onClick={clearTechFilters}
                            className="text-xs text-slate-400 hover:text-slate-200 transition-colors"
                          >
                            清除全部
                          </button>
                        )}
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        {allTechnologies.map(tech => (
                          <button
                            key={tech}
                            onClick={() => toggleTech(tech)}
                            className={`px-3 py-2 rounded text-sm text-left transition-all ${
                              selectedTechs.has(tech)
                                ? 'bg-blue-500/30 border border-blue-500/50 text-blue-300'
                                : 'bg-slate-800/50 border border-slate-700/30 text-slate-400 hover:border-slate-600/50'
                            }`}
                          >
                            {tech}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* 排序 */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as 'tier' | 'name')}
                  className="px-4 py-2 bg-slate-800/50 border border-slate-700/50 rounded-lg text-slate-100 text-sm focus:outline-none focus:border-cyan-500/50 transition-colors"
                >
                  <option value="tier">按等級排序</option>
                  <option value="name">按名稱排序</option>
                </select>
              </div>

              {/* 已選技術標籤 */}
              {selectedTechs.size > 0 && (
                <div className="flex flex-wrap gap-3 items-center">
                  <span className="text-sm text-slate-400">已選技術：</span>
                  {Array.from(selectedTechs).map(tech => (
                    <button
                      key={tech}
                      onClick={() => toggleTech(tech)}
                      className="px-3 py-1 rounded-full bg-blue-500/20 border border-blue-500/50 text-blue-300 text-sm flex items-center gap-2 hover:bg-blue-500/30 transition-colors"
                    >
                      {tech}
                      <X className="w-3 h-3" />
                    </button>
                  ))}
                  <button
                    onClick={clearTechFilters}
                    className="px-4 py-1 rounded-full bg-red-500/20 border border-red-500/50 text-red-300 text-sm hover:bg-red-500/30 transition-colors font-medium"
                  >
                    清除全部篩選
                  </button>
                </div>
              )}
            </div>

            {/* 結果計數 */}
            <div className="text-sm text-slate-400 mb-6">
              找到 {filteredProjects.length} 個專案
            </div>
          </section>

          {/* 全部作品 */}
          <section>
            <h2 className="text-2xl font-bold mb-8 flex items-center gap-2">
              <span className="w-1 h-6 bg-gradient-to-b from-cyan-400 to-blue-400" />
              全部作品
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredProjects.map(project => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  getTierColor={getTierColor}
                  getTierBadge={getTierBadge}
                  onProjectClick={handleProjectClick}
                  compact={false}
                />
              ))}
            </div>
          </section>
        </div>
      </div>

      {/* Project Dialog */}
      <ProjectDialog
        project={selectedProject}
        isOpen={isDialogOpen}
        onClose={handleCloseDialog}
        getTierBadge={getTierBadge}
        onProjectChange={handleProjectChange}
      />
    </div>
    </>
  );
}

interface ProjectCardProps {
  project: Project;
  getTierColor: (tier: string) => string;
  getTierBadge: (tier: string) => string;
  onProjectClick: (project: Project) => void;
  compact?: boolean;
}

function ProjectCard({
  project,
  getTierColor,
  getTierBadge,
  onProjectClick,
  compact = true
}: ProjectCardProps) {
  return (
    <button
      onClick={() => onProjectClick(project)}
      className={`bg-gradient-to-br ${getTierColor(project.tier)} border rounded-lg overflow-hidden transition-all duration-300 hover:border-cyan-500/50 hover:shadow-lg hover:shadow-cyan-500/10 w-full text-left group`}
    >
      <div className="p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-sm font-semibold px-2 py-1 rounded bg-slate-800/50 text-slate-300">
                {getTierBadge(project.tier)}
              </span>
              <span className="text-xs text-slate-500">
                {project.category === 'enterprise' ? '企業系統' : project.category === 'ai' ? 'AI/ML' : '學習探索'}
              </span>
            </div>
            <h3 className="text-lg font-bold text-slate-100 group-hover:text-cyan-300 transition-colors truncate">
              {project.name}
            </h3>
            <p className="text-sm text-slate-400 mt-2 line-clamp-2">
              {project.tagline}
            </p>
          </div>
        </div>

        {/* Technologies */}
        <div className="mt-4 flex flex-wrap gap-2">
          {project.technologies.slice(0, compact ? 3 : undefined).map(tech => (
            <span
              key={tech}
              className="px-2 py-1 rounded text-xs bg-slate-800/50 text-slate-300 border border-slate-700/30"
            >
              {tech}
            </span>
          ))}
          {compact && project.technologies.length > 3 && (
            <span className="px-2 py-1 rounded text-xs bg-slate-800/50 text-slate-400 border border-slate-700/30">
              +{project.technologies.length - 3}
            </span>
          )}
        </div>

        {/* Role & Metrics */}
        <div className="mt-4 pt-4 border-t border-slate-700/30 space-y-2">
          <div>
            <p className="text-xs text-slate-500">角色</p>
            <p className="text-sm text-cyan-400 font-semibold">{project.role}</p>
          </div>
          <div>
            <p className="text-xs text-slate-500">成果</p>
            <p className="text-sm text-cyan-400 font-semibold">{project.metrics}</p>
          </div>
        </div>
      </div>
    </button>
  );
}
