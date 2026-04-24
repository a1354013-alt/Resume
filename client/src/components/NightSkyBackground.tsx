export default function NightSkyBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 z-[1] overflow-hidden">
      {/* 夜空底色 */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_35%_35%,rgba(0,217,255,0.10),transparent_32%),radial-gradient(circle_at_70%_65%,rgba(179,0,255,0.10),transparent_34%),linear-gradient(to_bottom,rgba(2,6,23,0.16),rgba(0,0,0,0.86))]" />

      {/* 不規則星點 */}
      <div className="absolute inset-0 opacity-70 bg-[radial-gradient(circle_at_8%_18%,rgba(255,255,255,0.9)_0_1px,transparent_2px),radial-gradient(circle_at_17%_42%,rgba(0,217,255,0.75)_0_1px,transparent_2px),radial-gradient(circle_at_29%_25%,rgba(255,255,255,0.8)_0_1px,transparent_2px),radial-gradient(circle_at_43%_58%,rgba(255,255,255,0.65)_0_1px,transparent_2px),radial-gradient(circle_at_52%_19%,rgba(0,217,255,0.7)_0_1px,transparent_2px),radial-gradient(circle_at_61%_47%,rgba(255,255,255,0.85)_0_1px,transparent_2px),radial-gradient(circle_at_72%_30%,rgba(255,255,255,0.7)_0_1px,transparent_2px),radial-gradient(circle_at_83%_62%,rgba(0,217,255,0.65)_0_1px,transparent_2px),radial-gradient(circle_at_91%_22%,rgba(255,255,255,0.8)_0_1px,transparent_2px)]" />

      <div className="absolute inset-0 opacity-45 bg-[radial-gradient(circle_at_12%_76%,rgba(255,255,255,0.7)_0_1px,transparent_2px),radial-gradient(circle_at_23%_67%,rgba(0,217,255,0.6)_0_1px,transparent_2px),radial-gradient(circle_at_36%_84%,rgba(255,255,255,0.8)_0_1px,transparent_2px),radial-gradient(circle_at_48%_72%,rgba(255,255,255,0.55)_0_1px,transparent_2px),radial-gradient(circle_at_57%_88%,rgba(0,217,255,0.7)_0_1px,transparent_2px),radial-gradient(circle_at_69%_79%,rgba(255,255,255,0.75)_0_1px,transparent_2px),radial-gradient(circle_at_81%_91%,rgba(255,255,255,0.65)_0_1px,transparent_2px),radial-gradient(circle_at_94%_73%,rgba(0,217,255,0.55)_0_1px,transparent_2px)]" />

      {/* 雲霧 */}
      <div className="absolute left-[-15%] top-[14%] h-[34rem] w-[65%] rounded-full bg-cyan-300/10 blur-[110px]" />
      <div className="absolute left-[10%] bottom-[10%] h-[24rem] w-[55%] rounded-full bg-slate-200/8 blur-[120px]" />
      <div className="absolute right-[-20%] bottom-[8%] h-[32rem] w-[75%] rounded-full bg-purple-500/12 blur-[130px]" />
      <div className="absolute right-[20%] top-[35%] h-[18rem] w-[35%] rounded-full bg-cyan-200/6 blur-[100px]" />

      {/* 上下過渡遮罩：讓這區不要像硬切不同 DIV */}
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black via-black/70 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-black via-black/70 to-transparent" />

      {/* 暗部遮罩 */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-transparent to-black/35" />

      {/* 流星 */}
      <span className="meteor meteor-1" />
      <span className="meteor meteor-2" />
    </div>
  );
}
