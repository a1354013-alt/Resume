import { X, ExternalLink, Github, ChevronLeft, ChevronRight } from 'lucide-react';
import { Project, projects } from '@/data/projects';

interface ProjectDialogProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
  getTierBadge: (tier: string) => string;
  onProjectChange?: (project: Project) => void;
}

export default function ProjectDialog({
  project,
  isOpen,
  onClose,
  getTierBadge,
  onProjectChange
}: ProjectDialogProps) {
  if (!isOpen || !project) return null;

  const currentIndex = projects.findIndex(p => p.id === project.id);
  const nextProject = currentIndex < projects.length - 1 ? projects[currentIndex + 1] : projects[0];
  const prevProject = currentIndex > 0 ? projects[currentIndex - 1] : projects[projects.length - 1];

  const handleNextProject = () => {
    onProjectChange?.(nextProject);
  };

  const handlePrevProject = () => {
    onProjectChange?.(prevProject);
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Dialog */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-700/50 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-in fade-in zoom-in-95 duration-300">
          {/* Header */}
          <div className="sticky top-0 bg-gradient-to-b from-slate-900 to-slate-900/80 border-b border-slate-700/30 px-6 py-4 flex items-start justify-between gap-4 backdrop-blur-sm">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-sm font-semibold px-2 py-1 rounded bg-slate-800/50 text-slate-300">
                  {getTierBadge(project.tier)}
                </span>
                <span className="text-xs text-slate-500">
                  {project.category === 'enterprise' ? '企業系統' : project.category === 'ai' ? 'AI/ML' : '學習探索'}
                </span>
              </div>
              <h2 className="text-2xl font-bold text-slate-100">{project.name}</h2>
              <p className="text-sm text-slate-400 mt-1">{project.tagline}</p>
            </div>
            <button
              onClick={onClose}
              className="flex-shrink-0 p-2 hover:bg-slate-800/50 rounded-lg transition-colors text-slate-400 hover:text-slate-200"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content */}
          <div className="px-6 py-6 space-y-8">
            {/* Technologies */}
            <div>
              <h3 className="text-sm font-semibold text-cyan-400 mb-3">技術棧</h3>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map(tech => (
                  <span
                    key={tech}
                    className="px-3 py-1 rounded-full bg-slate-800/50 border border-slate-700/50 text-xs text-slate-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Role & Metrics */}
            <div className="grid grid-cols-2 gap-6">
              <div>
                <h3 className="text-sm font-semibold text-cyan-400 mb-2">我的角色</h3>
                <p className="text-sm text-slate-300">{project.role}</p>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-cyan-400 mb-2">核心成果</h3>
                <p className="text-sm text-cyan-400 font-semibold">{project.metrics}</p>
              </div>
            </div>

            {/* Problem */}
            <div>
              <h3 className="text-sm font-semibold text-cyan-400 mb-3">背景與問題</h3>
              <p className="text-sm text-slate-300 leading-relaxed">{project.details.problem}</p>
            </div>

            {/* Solution */}
            <div>
              <h3 className="text-sm font-semibold text-cyan-400 mb-3">解決方案</h3>
              <p className="text-sm text-slate-300 leading-relaxed">{project.details.solution}</p>
            </div>

            {/* Contribution */}
            <div>
              <h3 className="text-sm font-semibold text-cyan-400 mb-3">我的貢獻</h3>
              <p className="text-sm text-slate-300 leading-relaxed">{project.details.contribution}</p>
            </div>

            {/* Technical Highlights */}
            <div>
              <h3 className="text-sm font-semibold text-cyan-400 mb-3">技術亮點</h3>
              <ul className="space-y-2">
                {project.details.highlights.map((highlight, idx) => (
                  <li key={idx} className="text-sm text-slate-300 flex gap-3">
                    <span className="text-cyan-400 flex-shrink-0">✓</span>
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Result */}
            <div>
              <h3 className="text-sm font-semibold text-cyan-400 mb-3">成果與影響</h3>
              <p className="text-sm text-slate-300 leading-relaxed">{project.details.result}</p>
            </div>

            {/* Challenges */}
            <div>
              <h3 className="text-sm font-semibold text-cyan-400 mb-3">挑戰與學習</h3>
              <p className="text-sm text-slate-300 leading-relaxed">{project.details.challenges}</p>
            </div>

            {/* Next Steps */}
            <div>
              <h3 className="text-sm font-semibold text-cyan-400 mb-3">後續規劃</h3>
              <p className="text-sm text-slate-300 leading-relaxed">{project.details.nextSteps}</p>
            </div>

            {/* Links and Navigation */}
            <div className="pt-4 border-t border-slate-700/30 space-y-4">
              {/* External Links */}
              {(project.details.demoUrl || project.details.githubUrl) && (
                <div className="flex gap-3">
                  {project.details.demoUrl && (
                    <a
                      href={project.details.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-cyan-500/20 border border-cyan-500/50 rounded-lg text-sm text-cyan-300 hover:bg-cyan-500/30 transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                      查看演示
                    </a>
                  )}
                  {project.details.githubUrl && (
                    <a
                      href={project.details.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-slate-800/50 border border-slate-700/50 rounded-lg text-sm text-slate-300 hover:bg-slate-800 transition-colors"
                    >
                      <Github className="w-4 h-4" />
                      查看代碼
                    </a>
                  )}
                </div>
              )}

              {/* Project Navigation */}
              <div className="flex gap-3 justify-between">
                <button
                  onClick={handlePrevProject}
                  className="flex items-center gap-2 px-4 py-2 bg-slate-800/50 border border-slate-700/50 rounded-lg text-sm text-slate-300 hover:bg-slate-800 hover:border-slate-600/50 transition-colors"
                  title={`上一個專案: ${prevProject.name}`}
                >
                  <ChevronLeft className="w-4 h-4" />
                  上一個專案
                </button>
                <button
                  onClick={handleNextProject}
                  className="flex items-center gap-2 px-4 py-2 bg-cyan-500/20 border border-cyan-500/50 rounded-lg text-sm text-cyan-300 hover:bg-cyan-500/30 transition-colors"
                  title={`下一個專案: ${nextProject.name}`}
                >
                  下一個專案
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
