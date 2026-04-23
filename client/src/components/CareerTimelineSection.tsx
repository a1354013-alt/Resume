'use client';

import { useState, useEffect, useRef } from 'react';
import { timeline, timelineTags, filterTimelineByTags, formatDateRange, type TimelineItem } from '@/data/timeline';
import { Badge } from '@/components/ui/badge';
import { ChevronDown } from 'lucide-react';

/**
 * Career Timeline Section - 滾動式職涯時間軸
 * 
 * 功能：
 * - 垂直 timeline 布局
 * - IntersectionObserver 觸發進場動畫
 * - 展開/收起 highlights
 * - Tags 篩選
 * - 時間軸 line 使用 scaleY 延伸動畫
 */

interface TimelineItemProps {
  item: TimelineItem;
  isVisible: boolean;
  isExpanded: boolean;
  onToggle: () => void;
}

function TimelineItemCard({ item, isVisible, isExpanded, onToggle }: TimelineItemProps) {
  return (
    <div
      className={`relative pl-12 pb-12 transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      {/* Timeline dot */}
      <div className="absolute left-0 top-1 w-6 h-6 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full shadow-lg shadow-cyan-400/50" />

      {/* Card */}
      <div
        className={`border border-slate-700 rounded-lg p-6 backdrop-blur-sm transition-all duration-300 ${
          isExpanded
            ? 'bg-slate-900/60 border-cyan-500/50 shadow-lg shadow-cyan-400/10'
            : 'bg-slate-900/30 hover:bg-slate-900/50 hover:border-slate-600'
        }`}
      >
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="text-lg font-semibold text-cyan-300">{item.title}</h3>
            <p className="text-sm text-slate-400">{item.org}</p>
          </div>
          <span className="text-xs text-slate-500 whitespace-nowrap ml-4">
            {formatDateRange(item.start, item.end)}
          </span>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {item.tags.map(tag => (
            <Badge
              key={tag}
              variant="outline"
              className="bg-slate-800/50 border-slate-600 text-slate-300 text-xs"
            >
              {tag}
            </Badge>
          ))}
        </div>

        {/* Expand button and highlights */}
        <button
          onClick={onToggle}
          className="flex items-center gap-2 text-sm text-cyan-400 hover:text-cyan-300 transition-colors mb-3"
        >
          <ChevronDown
            size={16}
            className={`transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
          />
          <span>{isExpanded ? '收起' : '展開'} 亮點</span>
        </button>

        {/* Highlights */}
        {isExpanded && (
          <ul className="space-y-2 text-sm text-slate-300 animate-in fade-in duration-300">
            {item.highlights.map((highlight, idx) => (
              <li key={idx} className="flex gap-3">
                <span className="text-cyan-400 flex-shrink-0">▸</span>
                <span>{highlight}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default function CareerTimelineSection() {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());
  const [visibleItems, setVisibleItems] = useState<Set<string>>(new Set());
  const itemRefs = useRef<Map<string, IntersectionObserver>>(new Map());

  const filteredTimeline = filterTimelineByTags(selectedTags);

  // IntersectionObserver for animation
  useEffect(() => {
    const observers = new Map<string, IntersectionObserver>();

    filteredTimeline.forEach(item => {
      const observer = new IntersectionObserver(
        entries => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              setVisibleItems(prev => new Set([...Array.from(prev), item.id]));
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.1, rootMargin: '0px 0px -100px 0px' }
      );

      const element = document.getElementById(`timeline-item-${item.id}`);
      if (element) {
        observer.observe(element);
        observers.set(item.id, observer);
      }
    });

    return () => {
      observers.forEach(observer => observer.disconnect());
    };
  }, [filteredTimeline]);

  const toggleTag = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const toggleExpand = (id: string) => {
    setExpandedItems(prev => {
      const newSet = new Set(Array.from(prev));
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  return (
    <section className="relative py-20 px-4 md:px-8 max-w-4xl mx-auto">
      {/* Section title */}
      <div className="mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-cyan-300 mb-2">職涯歷程</h2>
        <p className="text-slate-400">從自動化工程到企業級系統開發的轉變</p>
      </div>

      {/* Tag filter */}
      <div className="mb-8">
        <p className="text-sm text-slate-400 mb-3">按技能篩選：</p>
        <div className="flex flex-wrap gap-2">
          {timelineTags.map(tag => (
            <button
              key={tag}
              onClick={() => toggleTag(tag)}
              className={`px-3 py-1 rounded-full text-sm transition-all duration-200 ${
                selectedTags.includes(tag)
                  ? 'bg-cyan-500/30 border border-cyan-400 text-cyan-300'
                  : 'bg-slate-800/50 border border-slate-700 text-slate-400 hover:border-slate-600'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
        {selectedTags.length > 0 && (
          <button
            onClick={() => setSelectedTags([])}
            className="mt-3 text-xs text-cyan-400 hover:text-cyan-300 transition-colors"
          >
            清除篩選
          </button>
        )}
      </div>

      {/* Timeline */}
      <div className="relative">
        {/* Vertical line */}
        <div
          className="absolute left-2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyan-400/50 to-transparent"
          style={{
            height: `${filteredTimeline.length * 200}px`,
            animation: 'scaleY 0.8s ease-out'
          }}
        />

        {/* Timeline items */}
        <div className="space-y-0">
          {filteredTimeline.length > 0 ? (
            filteredTimeline.map(item => (
              <div key={item.id} id={`timeline-item-${item.id}`}>
                <TimelineItemCard
                  item={item}
                  isVisible={visibleItems.has(item.id)}
                  isExpanded={expandedItems.has(item.id)}
                  onToggle={() => toggleExpand(item.id)}
                />
              </div>
            ))
          ) : (
            <div className="text-center py-12 text-slate-400">
              沒有符合篩選條件的職涯記錄
            </div>
          )}
        </div>
      </div>

      {/* Animation keyframes */}
      <style>{`
        @keyframes scaleY {
          from {
            transform: scaleY(0);
            transform-origin: top;
          }
          to {
            transform: scaleY(1);
          }
        }
      `}</style>
    </section>
  );
}
