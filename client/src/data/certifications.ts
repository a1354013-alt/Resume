export type CertificationGroup = {
  category: string;
  items: string[];
  priority: "primary" | "secondary";
};

export const certificationGroups: CertificationGroup[] = [
  {
    category: "資訊工程與 AI",
    priority: "primary",
    items: [
      "電腦軟體應用乙級技術士",
      "網頁設計丙級技術士",
      "iPAS 經濟部 AI 應用規劃師初級",
      "Gemini Certification for Educators",
    ],
  },
  {
    category: "設計、CAD 與網頁工具",
    priority: "primary",
    items: [
      "AutoCAD 2014 Certified Professional",
      "Adobe Certified Associate - Photoshop CS6",
      "Adobe Certified Associate - Illustrator",
      "Adobe Certified Associate - InDesign",
      "Adobe Certified Associate - Dreamweaver CS6",
    ],
  },
  {
    category: "企業電子化與數位商務",
    priority: "secondary",
    items: [
      "企業電子化助理規劃師",
      "企業電子化軟體應用師",
      "企業人才技能認證－電子商務概論",
      "企業電子化人才能力鑑定－網路行銷",
    ],
  },
  {
    category: "資料治理與個資保護",
    priority: "secondary",
    items: ["PIMS 個人資料管理制度專業訓練證書"],
  },
];
