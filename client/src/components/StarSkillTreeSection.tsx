'use client';

import { useState, useEffect, useRef } from 'react';
import {
  skillNodes,
  skillEdges,
  skillGroups,
  groupLabels,
  getAdjacentSkills,
  searchSkills,
  type SkillNode
} from '@/data/skills';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

/**
 * Star Skill Tree Section - 星空技能樹
 * 
 * 功能：
 * - Canvas 背景星空
 * - requestAnimationFrame 動畫
 * - 星點緩慢漂移
 * - Nodes 為技能節點
 * - Level 越高節點越亮
 * - Hover 顯示 tooltip
 * - Click 節點高亮相鄰 nodes
 * - SVG 連線
 * - Group filter
 * - Search skill name
 * - prefers-reduced-motion 支援
 */

interface SkillNodeUIProps {
  node: SkillNode;
  x: number;
  y: number;
  isHighlighted: boolean;
  isAdjacent: boolean;
  onClick: () => void;
  onHover: (node: SkillNode | null) => void;
}

function SkillNodeUI({
  node,
  x,
  y,
  isHighlighted,
  isAdjacent,
  onClick,
  onHover
}: SkillNodeUIProps) {
  const opacity = Math.min(0.3 + node.level * 0.15, 1);
  const size = 8 + node.level * 2;

  return (
    <g
      key={node.id}
      className="cursor-pointer"
      onClick={onClick}
      onMouseEnter={() => onHover(node)}
      onMouseLeave={() => onHover(null)}
    >
      {/* Glow effect */}
      <circle
        cx={x}
        cy={y}
        r={size * 2}
        fill={isHighlighted ? '#00d9ff' : isAdjacent ? '#0ea5e9' : '#06b6d4'}
        opacity={isHighlighted ? 0.3 : isAdjacent ? 0.15 : 0.05}
        className="transition-all duration-300"
      />

      {/* Node */}
      <circle
        cx={x}
        cy={y}
        r={size}
        fill={isHighlighted ? '#00d9ff' : isAdjacent ? '#0ea5e9' : '#06b6d4'}
        opacity={opacity}
        className="transition-all duration-300"
      />

      {/* Highlight ring */}
      {(isHighlighted || isAdjacent) && (
        <circle
          cx={x}
          cy={y}
          r={size + 4}
          fill="none"
          stroke={isHighlighted ? '#00d9ff' : '#0ea5e9'}
          strokeWidth="1"
          opacity={0.6}
          className="animate-pulse"
        />
      )}
    </g>
  );
}

export default function StarSkillTreeSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [highlightedNode, setHighlightedNode] = useState<SkillNode | null>(null);
  const [selectedNode, setSelectedNode] = useState<SkillNode | null>(null);
  const [hoveredNode, setHoveredNode] = useState<SkillNode | null>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [nodePositions, setNodePositions] = useState<Map<string, { x: number; y: number }>>(new Map());

  // Check prefers-reduced-motion
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    const handleChange = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Filter nodes
  const filteredNodes = searchQuery
    ? searchSkills(searchQuery)
    : selectedGroup
      ? skillNodes.filter(node => node.group === selectedGroup)
      : skillNodes;

  // Initialize node positions
  useEffect(() => {
    if (!svgRef.current) return;

    const width = svgRef.current.clientWidth;
    const height = svgRef.current.clientHeight;
    const newPositions = new Map<string, { x: number; y: number }>();

    skillNodes.forEach((node, index) => {
      const angle = (index / skillNodes.length) * Math.PI * 2;
      const radius = Math.min(width, height) * 0.35;
      const x = width / 2 + Math.cos(angle) * radius;
      const y = height / 2 + Math.sin(angle) * radius;
      newPositions.set(node.id, { x, y });
    });

    setNodePositions(newPositions);
  }, []);

  // Canvas star animation
  useEffect(() => {
    if (!canvasRef.current || prefersReducedMotion) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set DPR
    const dpr = window.devicePixelRatio || 1;
    canvas.width = canvas.offsetWidth * dpr;
    canvas.height = canvas.offsetHeight * dpr;
    ctx.scale(dpr, dpr);

    // Create stars
    const stars: Array<{ x: number; y: number; vx: number; vy: number; size: number; opacity: number }> = [];
    for (let i = 0; i < 100; i++) {
      stars.push({
        x: Math.random() * canvas.offsetWidth,
        y: Math.random() * canvas.offsetHeight,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 1.5,
        opacity: Math.random() * 0.5 + 0.3
      });
    }

    let animationId: number;

    const animate = () => {
      // Clear canvas
      ctx.fillStyle = 'rgba(15, 23, 42, 0.1)';
      ctx.fillRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);

      // Update and draw stars
      stars.forEach(star => {
        star.x += star.vx;
        star.y += star.vy;
        star.opacity += (Math.random() - 0.5) * 0.02;
        star.opacity = Math.max(0.1, Math.min(1, star.opacity));

        // Wrap around
        if (star.x < 0) star.x = canvas.offsetWidth;
        if (star.x > canvas.offsetWidth) star.x = 0;
        if (star.y < 0) star.y = canvas.offsetHeight;
        if (star.y > canvas.offsetHeight) star.y = 0;

        // Draw star
        ctx.fillStyle = `rgba(0, 217, 255, ${star.opacity})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => cancelAnimationFrame(animationId);
  }, [prefersReducedMotion]);

  const adjacentNodes = selectedNode ? getAdjacentSkills(selectedNode.id) : [];

  return (
    <section className="relative py-20 px-4 md:px-8 max-w-6xl mx-auto">
      {/* Section title */}
      <div className="mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-cyan-300 mb-2">技能星圖</h2>
        <p className="text-slate-400">互聯的技能體系與持續進階</p>
      </div>

      {/* Controls */}
      <div className="mb-8 space-y-4">
        {/* Search */}
        <div>
          <Input
            placeholder="搜尋技能..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="bg-slate-900/50 border-slate-700 text-slate-100 placeholder:text-slate-500"
          />
        </div>

        {/* Group filter */}
        <div>
          <p className="text-sm text-slate-400 mb-2">按分類篩選：</p>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedGroup(null)}
              className={`px-3 py-1 rounded-full text-sm transition-all ${
                selectedGroup === null
                  ? 'bg-cyan-500/30 border border-cyan-400 text-cyan-300'
                  : 'bg-slate-800/50 border border-slate-700 text-slate-400 hover:border-slate-600'
              }`}
            >
              全部
            </button>
            {skillGroups.map(group => (
              <button
                key={group}
                onClick={() => setSelectedGroup(group)}
                className={`px-3 py-1 rounded-full text-sm transition-all ${
                  selectedGroup === group
                    ? 'bg-cyan-500/30 border border-cyan-400 text-cyan-300'
                    : 'bg-slate-800/50 border border-slate-700 text-slate-400 hover:border-slate-600'
                }`}
              >
                {groupLabels[group]}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Star field canvas */}
      <div className="relative mb-8 rounded-lg overflow-hidden border border-slate-700 bg-slate-950">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-64"
          style={{ background: 'radial-gradient(circle at center, rgba(15,23,42,0.8), rgba(0,0,0,0.95))' }}
        />

        {/* SVG skill tree */}
        <svg
          ref={svgRef}
          className="relative w-full h-96 z-10"
          style={{ background: 'transparent' }}
        >
          {/* Edges */}
          {skillEdges.map((edge, idx) => {
            const fromPos = nodePositions.get(edge.from);
            const toPos = nodePositions.get(edge.to);
            if (!fromPos || !toPos) return null;

            const isEdgeHighlighted =
              selectedNode &&
              (edge.from === selectedNode.id || edge.to === selectedNode.id);

            return (
              <line
                key={idx}
                x1={fromPos.x}
                y1={fromPos.y}
                x2={toPos.x}
                y2={toPos.y}
                stroke={isEdgeHighlighted ? '#00d9ff' : '#334155'}
                strokeWidth={isEdgeHighlighted ? 2 : 0.5}
                opacity={isEdgeHighlighted ? 0.6 : 0.2}
                className="transition-all duration-300"
              />
            );
          })}

          {/* Nodes */}
          {filteredNodes.map(node => {
            const pos = nodePositions.get(node.id);
            if (!pos) return null;

            const isAdjacent = adjacentNodes.some(adj => adj.id === node.id);
            const isHighlighted = selectedNode?.id === node.id;

            return (
              <SkillNodeUI
                key={node.id}
                node={node}
                x={pos.x}
                y={pos.y}
                isHighlighted={isHighlighted}
                isAdjacent={isAdjacent}
                onClick={() => setSelectedNode(isHighlighted ? null : node)}
                onHover={setHoveredNode}
              />
            );
          })}
        </svg>

        {/* Tooltip */}
        {hoveredNode && (
          <div className="absolute bottom-4 left-4 bg-slate-900/90 border border-slate-700 rounded-lg p-3 text-sm z-20 max-w-xs">
            <p className="font-semibold text-cyan-300">{hoveredNode.name}</p>
            {hoveredNode.desc && <p className="text-slate-400 text-xs mt-1">{hoveredNode.desc}</p>}
            <p className="text-slate-500 text-xs mt-2">Level: {hoveredNode.level}/5</p>
          </div>
        )}
      </div>

      {/* Selected node details */}
      {selectedNode && (
        <div className="bg-slate-900/50 border border-slate-700 rounded-lg p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold text-cyan-300">{selectedNode.name}</h3>
              <Badge variant="outline" className="mt-2">
                {groupLabels[selectedNode.group]}
              </Badge>
            </div>
            <button
              onClick={() => setSelectedNode(null)}
              className="text-slate-400 hover:text-slate-300"
            >
              ✕
            </button>
          </div>

          {selectedNode.desc && (
            <p className="text-slate-300 mb-4">{selectedNode.desc}</p>
          )}

          {/* Adjacent skills */}
          {adjacentNodes.length > 0 && (
            <div>
              <p className="text-sm text-slate-400 mb-2">相關技能：</p>
              <div className="flex flex-wrap gap-2">
                {adjacentNodes.map(adj => (
                  <Badge key={adj.id} variant="secondary" className="cursor-pointer hover:bg-cyan-500/30">
                    {adj.name}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </section>
  );
}
