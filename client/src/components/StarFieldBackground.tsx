import { useMemo } from "react";

type Star = {
  widthPx: number;
  heightPx: number;
  leftPct: number;
  topPct: number;
  opacity: number;
};

interface StarFieldBackgroundProps {
  count?: number;
}

export default function StarFieldBackground({
  count = 50,
}: StarFieldBackgroundProps) {
  const stars = useMemo<Star[]>(
    () =>
      Array.from({ length: count }, () => ({
        widthPx: Math.random() * 2 + 1,
        heightPx: Math.random() * 2 + 1,
        leftPct: Math.random() * 100,
        topPct: Math.random() * 100,
        opacity: Math.random() * 0.5 + 0.3,
      })),
    [count]
  );

  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden"
      aria-hidden="true"
    >
      <div className="absolute inset-0 opacity-20">
        {stars.map((s, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-cyan-400"
            style={{
              width: `${s.widthPx}px`,
              height: `${s.heightPx}px`,
              left: `${s.leftPct}%`,
              top: `${s.topPct}%`,
              opacity: s.opacity,
            }}
          />
        ))}
      </div>
    </div>
  );
}
