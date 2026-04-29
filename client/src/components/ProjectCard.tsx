import type { Project } from "@/data/projects";
import ProjectImageGallery from "@/components/ProjectImageGallery";

interface ProjectCardProps {
  project: Project;
  getTierColor: (tier: Project["tier"]) => string;
  getTierBadge: (tier: string) => string;
  getCategoryLabel: (category: Project["category"]) => string;
  onProjectClick: (project: Project) => void;
}

export default function ProjectCard({
  project,
  getTierColor,
  getTierBadge,
  getCategoryLabel,
  onProjectClick,
}: ProjectCardProps) {
  return (
    <div
      className={`bg-gradient-to-br ${getTierColor(
        project.tier
      )} border rounded-lg overflow-hidden transition-all duration-300 hover:border-cyan-500/50 hover:shadow-lg hover:shadow-cyan-500/10 w-full text-left group`}
    >
      <ProjectImageGallery images={project.images} className="p-4 pb-0" />

      <button
        type="button"
        onClick={() => onProjectClick(project)}
        aria-label={`Open project: ${project.name}`}
        className="p-6 w-full text-left"
      >
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
      </button>
    </div>
  );
}

