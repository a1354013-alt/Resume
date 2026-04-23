import { useEffect, useRef } from 'react';

interface OrbitalLinesProps {
  count?: number;
  speed?: number;
  color1?: string;
  color2?: string;
}

export default function OrbitalLines({
  count = 5,
  speed = 20,
  color1 = '#00d9ff',
  color2 = '#b300ff',
}: OrbitalLinesProps) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    // Clear existing elements
    svg.innerHTML = '';

    const width = window.innerWidth;
    const height = window.innerHeight;

    svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
    svg.setAttribute('width', String(width));
    svg.setAttribute('height', String(height));

    // Create orbital circles
    const centerX = width / 2;
    const centerY = height / 2;
    const maxRadius = Math.max(width, height) / 2;

    for (let i = 0; i < count; i++) {
      const radius = (maxRadius / count) * (i + 1);
      const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      circle.setAttribute('cx', String(centerX));
      circle.setAttribute('cy', String(centerY));
      circle.setAttribute('r', String(radius));
      circle.setAttribute('fill', 'none');
      circle.setAttribute('stroke', i % 2 === 0 ? color1 : color2);
      circle.setAttribute('stroke-width', '1');
      circle.setAttribute('opacity', String(0.5 - i * 0.08));
      svg.appendChild(circle);
    }

    // Create connecting lines
    const lineCount = 8;
    for (let i = 0; i < lineCount; i++) {
      const angle = (Math.PI * 2 * i) / lineCount;
      const x1 = centerX + Math.cos(angle) * (maxRadius * 0.3);
      const y1 = centerY + Math.sin(angle) * (maxRadius * 0.3);
      const x2 = centerX + Math.cos(angle) * maxRadius;
      const y2 = centerY + Math.sin(angle) * maxRadius;

      const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      line.setAttribute('x1', String(x1));
      line.setAttribute('y1', String(y1));
      line.setAttribute('x2', String(x2));
      line.setAttribute('y2', String(y2));
      line.setAttribute('stroke', i % 2 === 0 ? color1 : color2);
      line.setAttribute('stroke-width', '1');
      line.setAttribute('opacity', '0.3');
      svg.appendChild(line);
    }

    // Handle resize
    const handleResize = () => {
      const newWidth = window.innerWidth;
      const newHeight = window.innerHeight;
      svg.setAttribute('viewBox', `0 0 ${newWidth} ${newHeight}`);
      svg.setAttribute('width', String(newWidth));
      svg.setAttribute('height', String(newHeight));
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [count, color1, color2]);

  return (
    <svg
      ref={svgRef}
      className="absolute inset-0 pointer-events-none"
      style={{
        background: 'transparent',
        animation: `orbital-rotate ${speed}s linear infinite`,
      }}
    />
  );
}
