import {
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Github,
  X,
} from "lucide-react";
import { useEffect, useId, useRef } from "react";
import ProjectImageGallery from "@/components/ProjectImageGallery";
import { Project, projects } from "@/data/projects";
import { useBodyScrollLock } from "@/hooks/useBodyScrollLock";
import { useEscapeKey } from "@/hooks/useEscapeKey";
import { useFocusTrap } from "@/hooks/useFocusTrap";
import { useRestoreFocus } from "@/hooks/useRestoreFocus";

interface ProjectDialogProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
  onProjectChange?: (project: Project) => void;
}

const text = {
  categoryEnterprise: "企業 / ERP",
  categoryLearning: "學習",
  screenshots: "Screenshots",
  closeDialog: "關閉對話框",
  technologies: "使用技術",
  role: "角色",
  outcome: "成果",
  problem: "問題",
  solution: "解法",
  contribution: "我的貢獻",
  highlights: "亮點",
  result: "結果",
  challenges: "挑戰",
  nextSteps: "下一步",
  demo: "線上展示",
  repo: "原始碼",
  previousTitle: "上一個：",
  previous: "上一個",
  nextTitle: "下一個：",
  next: "下一個",
  bullet: "▸",
} as const;

function getCategoryLabel(category: Project["category"]) {
  switch (category) {
    case "enterprise":
      return text.categoryEnterprise;
    case "ai":
      return "AI / ML";
    case "learning":
      return text.categoryLearning;
    default:
      return category;
  }
}

export default function ProjectDialog({
  project,
  isOpen,
  onClose,
  onProjectChange,
}: ProjectDialogProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const titleId = useId();

  const isVisible = isOpen && project != null;

  useBodyScrollLock(isVisible);
  useRestoreFocus(isVisible);
  useFocusTrap(dialogRef, isVisible);
  useEscapeKey(onClose, isVisible);

  useEffect(() => {
    if (!isVisible) return;
    closeButtonRef.current?.focus({ preventScroll: true });
  }, [isVisible]);

  if (!isVisible || !project) return null;

  const currentIndex = projects.findIndex(p => p.id === project.id);
  const nextProject =
    currentIndex < projects.length - 1
      ? projects[currentIndex + 1]
      : projects[0];
  const prevProject =
    currentIndex > 0
      ? projects[currentIndex - 1]
      : projects[projects.length - 1];

  const handleNextProject = () => onProjectChange?.(nextProject);
  const handlePrevProject = () => onProjectChange?.(prevProject);

  return (
    <>
      <div
        className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          tabIndex={-1}
          className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-lg border border-slate-700/50 bg-gradient-to-br from-slate-900 to-slate-950 shadow-2xl animate-in fade-in zoom-in-95 duration-300"
        >
          <div className="sticky top-0 flex items-start justify-between gap-4 border-b border-slate-700/30 bg-gradient-to-b from-slate-900 to-slate-900/80 px-6 py-4 backdrop-blur-sm">
            <div className="flex-1">
              <div className="mb-2 flex items-center gap-3">
                <span className="rounded bg-slate-800/50 px-2 py-1 text-sm font-semibold text-slate-300">
                  {project.tierLabel}
                </span>
                <span className="text-xs text-slate-500">
                  {getCategoryLabel(project.category)}
                </span>
              </div>
              <h2 id={titleId} className="text-2xl font-bold text-slate-100">
                {project.name}
              </h2>
              <p className="mt-1 text-sm text-slate-400">{project.tagline}</p>
            </div>
            <button
              ref={closeButtonRef}
              onClick={onClose}
              className="flex-shrink-0 rounded-lg p-2 text-slate-400 transition-colors hover:bg-slate-800/50 hover:text-slate-200"
              aria-label={text.closeDialog}
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="space-y-8 px-6 py-6">
            {project.images && project.images.length >= 2 && (
              <div>
                <h3 className="mb-3 text-sm font-semibold text-cyan-400">
                  {text.screenshots}
                </h3>
                <ProjectImageGallery
                  images={project.images}
                  projectName={project.name}
                  tier={project.tier}
                />
              </div>
            )}

            <div>
              <h3 className="mb-3 text-sm font-semibold text-cyan-400">
                {text.technologies}
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map(tech => (
                  <span
                    key={tech}
                    className="rounded-full border border-slate-700/50 bg-slate-800/50 px-3 py-1 text-xs text-slate-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <h3 className="mb-2 text-sm font-semibold text-cyan-400">
                  {text.role}
                </h3>
                <p className="text-sm text-slate-300">{project.role}</p>
              </div>
              <div>
                <h3 className="mb-2 text-sm font-semibold text-cyan-400">
                  {text.outcome}
                </h3>
                <p className="text-sm font-medium text-slate-200">
                  {project.metrics}
                </p>
              </div>
            </div>

            <div>
              <h3 className="mb-3 text-sm font-semibold text-cyan-400">
                {text.problem}
              </h3>
              <p className="text-sm leading-relaxed text-slate-300">
                {project.details.problem}
              </p>
            </div>

            <div>
              <h3 className="mb-3 text-sm font-semibold text-cyan-400">
                {text.solution}
              </h3>
              <p className="text-sm leading-relaxed text-slate-300">
                {project.details.solution}
              </p>
            </div>

            <div>
              <h3 className="mb-3 text-sm font-semibold text-cyan-400">
                {text.contribution}
              </h3>
              <p className="text-sm leading-relaxed text-slate-300">
                {project.details.contribution}
              </p>
            </div>

            <div>
              <h3 className="mb-3 text-sm font-semibold text-cyan-400">
                {text.highlights}
              </h3>
              <ul className="space-y-2">
                {project.details.highlights.map((highlight, idx) => (
                  <li key={idx} className="flex gap-3 text-sm text-slate-300">
                    <span className="flex-shrink-0 text-cyan-400" aria-hidden="true">
                      {text.bullet}
                    </span>
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="mb-3 text-sm font-semibold text-cyan-400">
                {text.result}
              </h3>
              <p className="text-sm leading-relaxed text-slate-300">
                {project.details.result}
              </p>
            </div>

            <div>
              <h3 className="mb-3 text-sm font-semibold text-cyan-400">
                {text.challenges}
              </h3>
              <p className="text-sm leading-relaxed text-slate-300">
                {project.details.challenges}
              </p>
            </div>

            <div>
              <h3 className="mb-3 text-sm font-semibold text-cyan-400">
                {text.nextSteps}
              </h3>
              <p className="text-sm leading-relaxed text-slate-300">
                {project.details.nextSteps}
              </p>
            </div>

            <div className="space-y-4 border-t border-slate-700/30 pt-4">
              {(project.details.demoUrl || project.details.githubUrl) && (
                <div className="flex flex-wrap gap-3">
                  {project.details.demoUrl && (
                    <a
                      href={project.details.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      referrerPolicy="no-referrer"
                      className="flex items-center gap-2 rounded-lg border border-cyan-500/50 bg-cyan-500/20 px-4 py-2 text-sm text-cyan-200 transition-colors hover:bg-cyan-500/30"
                    >
                      <ExternalLink className="h-4 w-4" />
                      {text.demo}
                    </a>
                  )}
                  {project.details.githubUrl && (
                    <a
                      href={project.details.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      referrerPolicy="no-referrer"
                      className="flex items-center gap-2 rounded-lg border border-slate-700/50 bg-slate-800/50 px-4 py-2 text-sm text-slate-200 transition-colors hover:bg-slate-800"
                    >
                      <Github className="h-4 w-4" />
                      {text.repo}
                    </a>
                  )}
                </div>
              )}

              <div className="flex justify-between gap-3">
                <button
                  onClick={handlePrevProject}
                  className="flex items-center gap-2 rounded-lg border border-slate-700/50 bg-slate-800/50 px-4 py-2 text-sm text-slate-200 transition-colors hover:border-slate-600/50 hover:bg-slate-800"
                  title={`${text.previousTitle}${prevProject.name}`}
                >
                  <ChevronLeft className="h-4 w-4" />
                  {text.previous}
                </button>
                <button
                  onClick={handleNextProject}
                  className="flex items-center gap-2 rounded-lg border border-cyan-500/50 bg-cyan-500/20 px-4 py-2 text-sm text-cyan-200 transition-colors hover:bg-cyan-500/30"
                  title={`${text.nextTitle}${nextProject.name}`}
                >
                  {text.next}
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
