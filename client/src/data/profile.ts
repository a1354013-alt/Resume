export type Profile = {
  name: string;
  nameEn?: string;
  title: string;
  tagline: string;
  background: string;
  contact: {
    email: string;
    github: string;
    linkedin: string;
  };
  contactMessage: {
    line1: string;
    hashtags: string[];
  };
  footer: {
    tagline: string;
  };
};

export const profile: Profile = {
  name: "蝢???,
  nameEn: "Yang-Wen Luo",
  title: "ERP Software Engineer / Full-Stack Developer",
  tagline:
    "撠釣 ERP 蝟餌絞?曆誨?egacy System Refactor嚗誑??Vue / React / Go / Node.js ??蝡舀??,
  background:
    "自 2022 年 8 月起投入 ERP 軟體開發，累積跨領域工作經歷；曾將關鍵頁面查詢由 26 秒優化至 1 秒內，並持續推動 Delphi Legacy 系統逐步轉換為 Vue 3 + Go 架構。",
  contact: {
    email: "whois512139@gmail.com",
    github: "https://github.com/a1354013-alt",
    linkedin:
      "https://www.linkedin.com/in/%E6%8F%9A%E6%96%87-%E7%BE%85-a9b9849a/",
  },
  contactMessage: {
    line1:
      "甇?撠?函垢撌亦??RP 蝟餌絞???璆剔頂蝯梁隞???賊??瑞撩嚗迭餈? Email?inkedIn ??GitHub ???舐鼠??,
    hashtags: [
      "#ERP",
      "#LegacyRefactor",
      "#FullStack",
      "#PerformanceOptimization",
    ],
  },
  footer: {
    tagline: "React + Vite + TypeScript + Tailwind CSS",
  },
};

export default profile;
