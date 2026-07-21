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
      "?餉頠??銋??銵ㄚ",
      "蝬脤?閮剛?銝??銵ㄚ",
      "iPAS 蝬??杗I?閬?撣???",
      "Gemini Certification for Educators",
    ],
  },
  {
    category: "企業電子化與數位商務",
    priority: "primary",
    items: [
      "隡平?餃?????葦",
      "隡平?餃???擃??典葦",
      "隡平鈭箸???質?霅??餃???璁?",
      "隡平?餃??犖???摰?蝬脰楝銵",
    ],
  },
  {
    category: "資料治理與個資保護",
    priority: "primary",
    items: ["PIMS ?犖鞈?蝞∠??嗅漲撠平閮毀霅"],
  },
  {
    category: "設計、CAD 與網頁工具",
    priority: "secondary",
    items: [
      "AutoCAD 2014 Certified Professional",
      "Adobe Certified Associate - Photoshop CS6",
      "Adobe Certified Associate - Illustrator",
      "Adobe Certified Associate - InDesign",
      "Adobe Certified Associate - Dreamweaver CS6",
      "TQC+撠平閮剛?鈭箸?隤?嚗?西??拙像?Ｚˊ??,
    ],
  },
];
