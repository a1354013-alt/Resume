import type { CSSProperties } from "react";

const meteors = [
  {
    top: "7%",
    left: "78%",
    length: "84px",
    angle: "-31deg",
    delay: "0.7s",
    duration: "6.4s",
    opacity: 0.34,
    travelX: "-220px",
    travelY: "130px",
  },
  {
    top: "19%",
    left: "94%",
    length: "122px",
    angle: "-39deg",
    delay: "4.1s",
    duration: "8.2s",
    opacity: 0.44,
    travelX: "-310px",
    travelY: "215px",
  },
  {
    top: "12%",
    left: "34%",
    length: "58px",
    angle: "-24deg",
    delay: "7.6s",
    duration: "7.1s",
    opacity: 0.24,
    travelX: "-150px",
    travelY: "72px",
  },
  {
    top: "43%",
    left: "86%",
    length: "96px",
    angle: "-44deg",
    delay: "10.8s",
    duration: "9.4s",
    opacity: 0.3,
    travelX: "-260px",
    travelY: "225px",
  },
  {
    top: "4%",
    left: "16%",
    length: "72px",
    angle: "-28deg",
    delay: "13.9s",
    duration: "8.7s",
    opacity: 0.22,
    travelX: "-170px",
    travelY: "90px",
  },
  {
    top: "64%",
    left: "72%",
    length: "80px",
    angle: "-35deg",
    delay: "17.3s",
    duration: "10.2s",
    opacity: 0.26,
    travelX: "-210px",
    travelY: "145px",
  },
  {
    top: "31%",
    left: "58%",
    length: "52px",
    angle: "-19deg",
    delay: "20.6s",
    duration: "7.8s",
    opacity: 0.18,
    travelX: "-130px",
    travelY: "45px",
  },
  {
    top: "72%",
    left: "24%",
    length: "68px",
    angle: "-41deg",
    delay: "24.2s",
    duration: "11s",
    opacity: 0.2,
    travelX: "-160px",
    travelY: "132px",
  },
];

export default function NightSkyBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 z-[1] overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_35%_35%,rgba(0,217,255,0.10),transparent_32%),radial-gradient(circle_at_70%_65%,rgba(179,0,255,0.10),transparent_34%),linear-gradient(to_bottom,rgba(2,6,23,0.16),rgba(0,0,0,0.86))]" />

      <div className="absolute inset-0 opacity-70 bg-[radial-gradient(circle_at_8%_18%,rgba(255,255,255,0.9)_0_1px,transparent_2px),radial-gradient(circle_at_17%_42%,rgba(0,217,255,0.75)_0_1px,transparent_2px),radial-gradient(circle_at_29%_25%,rgba(255,255,255,0.8)_0_1px,transparent_2px),radial-gradient(circle_at_43%_58%,rgba(255,255,255,0.65)_0_1px,transparent_2px),radial-gradient(circle_at_52%_19%,rgba(0,217,255,0.7)_0_1px,transparent_2px),radial-gradient(circle_at_61%_47%,rgba(255,255,255,0.85)_0_1px,transparent_2px),radial-gradient(circle_at_72%_30%,rgba(255,255,255,0.7)_0_1px,transparent_2px),radial-gradient(circle_at_83%_62%,rgba(0,217,255,0.65)_0_1px,transparent_2px),radial-gradient(circle_at_91%_22%,rgba(255,255,255,0.8)_0_1px,transparent_2px)]" />

      <div className="absolute inset-0 opacity-45 bg-[radial-gradient(circle_at_12%_76%,rgba(255,255,255,0.7)_0_1px,transparent_2px),radial-gradient(circle_at_23%_67%,rgba(0,217,255,0.6)_0_1px,transparent_2px),radial-gradient(circle_at_36%_84%,rgba(255,255,255,0.8)_0_1px,transparent_2px),radial-gradient(circle_at_48%_72%,rgba(255,255,255,0.55)_0_1px,transparent_2px),radial-gradient(circle_at_57%_88%,rgba(0,217,255,0.7)_0_1px,transparent_2px),radial-gradient(circle_at_69%_79%,rgba(255,255,255,0.75)_0_1px,transparent_2px),radial-gradient(circle_at_81%_91%,rgba(255,255,255,0.65)_0_1px,transparent_2px),radial-gradient(circle_at_94%_73%,rgba(0,217,255,0.55)_0_1px,transparent_2px)]" />

      <div className="absolute left-[-15%] top-[14%] h-[34rem] w-[65%] rounded-full bg-cyan-300/10 blur-[110px]" />
      <div className="absolute left-[10%] bottom-[10%] h-[24rem] w-[55%] rounded-full bg-slate-200/8 blur-[120px]" />
      <div className="absolute right-[-20%] bottom-[8%] h-[32rem] w-[75%] rounded-full bg-purple-500/12 blur-[130px]" />
      <div className="absolute right-[20%] top-[35%] h-[18rem] w-[35%] rounded-full bg-cyan-200/6 blur-[100px]" />

      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black via-black/70 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-black via-black/70 to-transparent" />

      <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-transparent to-black/35" />

      <div className="meteor-field" aria-hidden="true">
        {meteors.map((meteor, index) => (
          <span
            key={`${meteor.top}-${meteor.left}-${index}`}
            className="meteor"
            style={
              {
                "--meteor-top": meteor.top,
                "--meteor-left": meteor.left,
                "--meteor-length": meteor.length,
                "--meteor-angle": meteor.angle,
                "--meteor-delay": meteor.delay,
                "--meteor-duration": meteor.duration,
                "--meteor-opacity": meteor.opacity,
                "--meteor-travel-x": meteor.travelX,
                "--meteor-travel-y": meteor.travelY,
              } as CSSProperties
            }
          />
        ))}
      </div>
    </div>
  );
}
