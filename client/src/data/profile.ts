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
    line2: string;
  };
  footer: {
    tagline: string;
  };
};

export const profile: Profile = {
  name: "羅揚文",
  nameEn: "Yang-Wen Luo",
  title: "全端工程師｜企業系統現代化與整合",
  tagline:
    "善於與使用者與客戶溝通需求，能將複雜問題轉化為可落地的解法；具備獨立作業能力，也能在跨部門或客戶討論中清楚表達技術方案與實作方向。",
  background:
    "具備企業 ERP 與內部系統整合經驗，熟悉從既有系統盤點、需求拆解、資料與流程梳理，到前後端落地與部署。重視可讀性、可觀測性與長期維護成本，偏好用工程化方法把問題一次解到位。",
  contact: {
    email: "whois512139@gmail.com",
    github: "https://github.com/a1354013-alt",
    linkedin:
      "https://www.linkedin.com/in/%E6%8F%9A%E6%96%87-%E7%BE%85-a9b9849a/",
  },
  contactMessage: {
    line1:
      "若你正在找能把需求落地、把舊系統帶進現代化架構的工程師，我很樂意聊聊。",
    line2:
      "歡迎透過 Email 或 LinkedIn 聯絡我，也可以直接到 GitHub 看我的公開作品。",
  },
  footer: {
    tagline: "React + Vite + TypeScript + Tailwind CSS",
  },
};

export default profile;
