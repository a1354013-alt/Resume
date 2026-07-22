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
  name: "羅揚文",
  nameEn: "Yang-Wen Luo",
  title: "ERP Software Engineer / Full-Stack Developer",
  tagline:
    "專注 ERP 系統現代化、Legacy System Refactor，以及 Vue / React / Go / Node.js 前後端整合。",
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
      "正在尋找全端工程、ERP 系統開發、企業系統現代化相關職缺，歡迎透過 Email、LinkedIn 或 GitHub 與我聯繫。",
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
