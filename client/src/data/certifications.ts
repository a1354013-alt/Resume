export type CertificationGroup = {
  category: string;
  items: string[];
  priority: "primary" | "secondary";
};

export const certificationGroups: CertificationGroup[] = [
  {
    category: "鞈?撌亦???AI",
    priority: "primary",
    items: [
      "?餉頠??銋??銵ㄚ",
      "蝬脤?閮剛?銝??銵ㄚ",
      "iPAS 蝬??杗I?閬?撣???",
      "Gemini Certification for Educators",
    ],
  },
  {
    category: "閮剛??AD ?雯?極??",
    priority: "secondary",
    items: [
      "AutoCAD 2014 Certified Professional",
      "Adobe Certified Associate - Photoshop CS6",
      "Adobe Certified Associate - Illustrator",
      "Adobe Certified Associate - InDesign",
      "Adobe Certified Associate - Dreamweaver CS6",
      "TQC+撠平閮剛?鈭箸?隤?嚗?西??拙像?Ｚˊ??",
    ],
  },
  {
    category: "隡平?餃????訾???",
    priority: "secondary",
    items: [
      "隡平?餃?????葦",
      "隡平?餃???擃??典葦",
      "隡平鈭箸???質?霅??餃???璁?",
      "隡平?餃??犖???摰?蝬脰楝銵",
    ],
  },
  {
    category: "鞈?瘝餌???靽風",
    priority: "secondary",
    items: ["PIMS ?犖鞈?蝞∠??嗅漲撠平閮毀霅"],
  },
];
