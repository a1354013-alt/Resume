import ProjectImageGallery from "@/components/ProjectImageGallery";
import type { Project } from "@/data/projects";

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

  return (
    <div
      className={`group flex min-h-[520px] max-h-[520px] w-full flex-col overflow-hidden rounded-lg border bg-gradient-to-br text-left transition-all duration-300 hover:border-cyan-500/50 hover:shadow-lg hover:shadow-cyan-500/10 md:min-h-[560px] md:max-h-[560px] ${getTierColor(
        project.tier
      )}`}
    >
      <div className="p-4 pb-0">
        <div className="relative h-[140px]">
          <ProjectImageGallery
            images={project.images}
            projectName={project.name}
            tier={project.tier}
          />
        </div>
      </div>

      <button
        type="button"
        onClick={() => onProjectClick(project)}
        aria-label={`Open project: ${project.name}`}
        className="flex min-h-0 flex-1 flex-col overflow-hidden p-6 text-left"
      >
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0 flex-1">
            <div className="mb-2 flex items-center gap-3">
              <span className="rounded bg-slate-800/50 px-2 py-1 text-sm font-semibold text-slate-300">
                {project.tierLabel}
              </span>
              <span className="text-xs text-slate-500">
                {getCategoryLabel(project.category)}
              </span>
            </div>

            <h3 className="text-lg font-bold text-slate-100 transition-colors group-hover:text-cyan-300">
              {project.name}
            </h3>

            <p className="mt-2 line-clamp-2 text-sm text-slate-300/80">
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
            <p className="text-sm font-semibold text-cyan-300">{project.role}</p>
          </div>

          <div>
            <p className="text-xs text-slate-500">成果摘要</p>
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
            <p className="text-xs text-slate-500">Result</p>
            <p className="line-clamp-2 text-sm font-medium text-slate-200">
              {project.details.result}
            </p>
          </div>
        </div>
      </button>
    </div>
  );
}

function getCategoryLabel(category: Project["category"]) {
  switch (category) {
    case "enterprise":
      return "企業 / ERP";
    case "ai":
      return "AI / ML";
    case "learning":
      return "學習";
    default:
      return category;
  }
}
