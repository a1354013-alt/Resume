import type { Project } from "@/data/projects";
import ProjectImageGallery from "@/components/ProjectImageGallery";

interface ProjectCardProps {
  project: Project;
  getTierColor: (tier: Project["tier"]) => string;
  onProjectClick: (project: Project) => void;
}

export default function ProjectCard({
  project,
  getTierColor,
  onProjectClick,
}: ProjectCardProps) {
  const highlights = project.details.highlights.slice(0, 4);
  const isProduction = project.tier === "production";

  return (
    <div
      className={`bg-gradient-to-br ${getTierColor(
        project.tier
      )} border rounded-lg overflow-hidden transition-all duration-300 hover:border-cyan-500/50 hover:shadow-lg hover:shadow-cyan-500/10 w-full text-left group flex flex-col min-h-[520px] max-h-[520px] md:min-h-[560px] md:max-h-[560px]`}
    >
      <div className="p-4 pb-0">
        <div className="relative h-[140px]">
          <ProjectImageGallery
            images={project.images}
            projectName={project.name}
            tier={project.tier}
          />
          {isProduction && (
            <div className="absolute left-2 top-2">
              <span className="inline-flex items-center rounded-full border border-emerald-400/35 bg-gradient-to-r from-emerald-500/40 via-cyan-500/25 to-slate-950/40 px-3 py-1 text-[11px] font-semibold tracking-wide text-emerald-100 backdrop-blur">
                已上線專案
              </span>
            </div>
          )}
        </div>
      </div>

      <button
        type="button"
        onClick={() => onProjectClick(project)}
        aria-label={`Open project: ${project.name}`}
        className="p-6 w-full text-left flex-1 min-h-0 flex flex-col overflow-hidden"
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-bold text-slate-100 group-hover:text-cyan-300 transition-colors">
              {project.name}
            </h3>

            <p className="text-sm text-slate-300/80 mt-2 line-clamp-2">
              {project.tagline}
            </p>
          </div>
        </div>

        <div className="mt-4 flex max-h-[3.25rem] flex-wrap gap-2 overflow-hidden">
          {project.technologies.map(tech => (
            <span
              key={tech}
              className="rounded border border-slate-700/30 bg-slate-800/50 px-2 py-1 text-xs text-slate-300"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="mt-4 flex min-h-0 flex-1 flex-col space-y-4 overflow-hidden border-t border-slate-700/30 pt-4">
          <div>
            <p className="text-xs text-slate-500">角色</p>
            <p className="text-sm font-semibold text-cyan-300">
              {project.role}
            </p>
          </div>

          <div>
            <p className="text-xs text-slate-500">指標</p>
            <p className="line-clamp-2 text-sm font-medium text-slate-200">
              {project.metrics}
            </p>
          </div>

          <div>
            <p className="text-xs text-slate-500">Highlights</p>
            <ul className="mt-2 max-h-[5.5rem] space-y-1 overflow-hidden">
              {highlights.map(highlight => (
                <li
                  key={highlight}
                  className="line-clamp-1 text-sm text-slate-200"
                >
                  - {highlight}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs text-slate-500">Outcome</p>
            <p className="line-clamp-2 text-sm font-medium text-slate-200">
              {project.details.result}
            </p>
          </div>
        </div>
      </button>
    </div>
  );
}
