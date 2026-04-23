'use client';

import { useState } from 'react';
import { aiProjects, getAllTechStacks, type AiProject } from '@/data/aiProjects';
import { Badge } from '@/components/ui/badge';
import { ChevronRight } from 'lucide-react';

/**
 * AI Project Gallery - 互動式 AI 專案展示
 * 
 * 布局：
 * - 左側：ProjectList
 * - 右側：ProjectDetail
 * 
 * 功能：
 * - 技術棧篩選
 * - 專案詳情展示
 * - Results 使用 stats row
 */

interface AiProjectGalleryProps {
  onSelectProject?: (project: AiProject) => void;
}

export default function AiProjectGallery({ onSelectProject }: AiProjectGalleryProps) {
  const [selectedProject, setSelectedProject] = useState<AiProject>(aiProjects[0]);
  const [selectedTech, setSelectedTech] = useState<string | null>(null);

  const techStacks = getAllTechStacks();
  const filteredProjects = selectedTech
    ? aiProjects.filter(p => p.stack.includes(selectedTech))
    : aiProjects;

  const handleSelectProject = (project: AiProject) => {
    setSelectedProject(project);
    onSelectProject?.(project);
  };

  return (
    <section className="relative py-20 px-4 md:px-8 max-w-7xl mx-auto">
      {/* Section title */}
      <div className="mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-cyan-300 mb-2">AI 專案展示</h2>
        <p className="text-slate-400">機器學習與深度學習的實戰應用</p>
      </div>

      {/* Tech filter */}
      <div className="mb-8">
        <p className="text-sm text-slate-400 mb-3">按技術棧篩選：</p>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedTech(null)}
            className={`px-3 py-1 rounded-full text-sm transition-all ${
              selectedTech === null
                ? 'bg-cyan-500/30 border border-cyan-400 text-cyan-300'
                : 'bg-slate-800/50 border border-slate-700 text-slate-400 hover:border-slate-600'
            }`}
          >
            全部
          </button>
          {techStacks.map(tech => (
            <button
              key={tech}
              onClick={() => setSelectedTech(tech)}
              className={`px-3 py-1 rounded-full text-sm transition-all ${
                selectedTech === tech
                  ? 'bg-cyan-500/30 border border-cyan-400 text-cyan-300'
                  : 'bg-slate-800/50 border border-slate-700 text-slate-400 hover:border-slate-600'
              }`}
            >
              {tech}
            </button>
          ))}
        </div>
      </div>

      {/* Gallery layout */}
      <div className="grid md:grid-cols-3 gap-6">
        {/* Left: Project list */}
        <div className="md:col-span-1">
          <div className="space-y-3">
            {filteredProjects.map(project => (
              <button
                key={project.id}
                onClick={() => handleSelectProject(project)}
                className={`w-full text-left p-4 rounded-lg border transition-all duration-300 ${
                  selectedProject.id === project.id
                    ? 'bg-cyan-500/20 border-cyan-400 shadow-lg shadow-cyan-400/20'
                    : 'bg-slate-900/30 border-slate-700 hover:border-slate-600 hover:bg-slate-900/50'
                }`}
              >
                <h3 className="font-semibold text-slate-100 mb-1">{project.title}</h3>
                <p className="text-xs text-slate-400">{project.period}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Right: Project detail */}
        <div className="md:col-span-2">
          {selectedProject ? (
            <div className="border border-slate-700 rounded-lg p-6 bg-slate-900/30 backdrop-blur-sm">
              {/* Header */}
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-cyan-300 mb-2">{selectedProject.title}</h2>
                <div className="flex items-center gap-4 text-sm text-slate-400">
                  <span>{selectedProject.role}</span>
                  <span>•</span>
                  <span>{selectedProject.period}</span>
                </div>
              </div>

              {/* Tech stack */}
              <div className="mb-6">
                <p className="text-sm text-slate-400 mb-2">技術棧：</p>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.stack.map(tech => (
                    <Badge key={tech} variant="outline" className="bg-slate-800/50">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Problem */}
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-slate-300 mb-2">問題</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{selectedProject.problem}</p>
              </div>

              {/* Approach */}
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-slate-300 mb-2">解決方案</h3>
                <ul className="space-y-2">
                  {selectedProject.approach.map((item, idx) => (
                    <li key={idx} className="flex gap-3 text-sm text-slate-400">
                      <span className="text-cyan-400 flex-shrink-0">▸</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Results */}
              <div>
                <h3 className="text-sm font-semibold text-slate-300 mb-3">成果</h3>
                <div className="grid grid-cols-2 gap-3">
                  {selectedProject.results.map((result, idx) => (
                    <div key={idx} className="bg-slate-800/50 rounded-lg p-3 border border-slate-700">
                      <p className="text-xs text-slate-400 mb-1">{result.label}</p>
                      <p className="text-lg font-semibold text-cyan-300">{result.value}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Demo button */}
              {selectedProject.demoPrompts && (
                <button className="mt-6 flex items-center gap-2 px-4 py-2 bg-cyan-500/20 border border-cyan-400 text-cyan-300 rounded-lg hover:bg-cyan-500/30 transition-colors text-sm font-semibold">
                  <span>查看 Demo</span>
                  <ChevronRight size={16} />
                </button>
              )}
            </div>
          ) : (
            <div className="text-center py-12 text-slate-400">
              選擇一個專案查看詳情
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
