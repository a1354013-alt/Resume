export default function NightSkyBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* 深色夜空漸層 */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(0,217,255,0.08),transparent_35%),linear-gradient(to_bottom,rgba(2,6,23,0.2),rgba(0,0,0,0.9))]" />

      {/* 星星 */}
      <div className="absolute inset-0 opacity-60 [background-image:radial-gradient(circle,rgba(255,255,255,0.9)_1px,transparent_1px)] [background-size:90px_90px]" />
      <div className="absolute inset-0 opacity-30 [background-image:radial-gradient(circle,rgba(0,217,255,0.8)_1px,transparent_1px)] [background-size:140px_140px] [background-position:40px_60px]" />

      {/* 淡淡雲霧 */}
      <div className="absolute left-[-10%] top-[18%] h-56 w-[60%] rounded-full bg-cyan-300/8 blur-3xl" />
      <div className="absolute right-[-15%] bottom-[20%] h-64 w-[70%] rounded-full bg-purple-500/8 blur-3xl" />
      <div className="absolute left-[20%] bottom-[10%] h-44 w-[45%] rounded-full bg-slate-300/6 blur-3xl" />

      {/* 流星 */}
      <span className="meteor meteor-1" />
      <span className="meteor meteor-2" />
    </div>
  );
}