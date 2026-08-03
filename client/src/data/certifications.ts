export type CredentialType = "certification" | "digital-badge";

export type CertificationItem = {
  id: string;
  name: string;
  nameEn?: string;
  nameZh?: string;
  issuer?: string;
  credentialType: CredentialType;
  verificationUrl?: string;
};

export type CertificationSubgroup = {
  id: string;
  title: string;
  items: CertificationItem[];
};

export type CertificationGroup = {
  id: string;
  title: string;
  items?: CertificationItem[];
  subgroups?: CertificationSubgroup[];
};

export const certificationGroups: CertificationGroup[] = [
  {
    id: "engineering-ai",
    title: "資訊工程與 AI",
    items: [
      {
        id: "computer-software-application-level-b",
        name: "電腦軟體應用乙級技術士",
        credentialType: "certification",
      },
      {
        id: "web-design-level-c",
        name: "網頁設計丙級技術士",
        credentialType: "certification",
      },
      {
        id: "ipas-ai-application-planner-junior",
        name: "iPAS 經濟部AI應用規劃師 初級",
        credentialType: "certification",
      },
      {
        id: "gemini-certification-for-educators",
        name: "Gemini Certification for Educators",
        issuer: "Google",
        credentialType: "certification",
      },
    ],
  },
  {
    id: "google-digital-marketing-analytics",
    title: "Google 數位行銷與分析",
    subgroups: [
      {
        id: "google-core-certifications",
        title: "核心認證",
        items: [
          {
            id: "google-analytics-certification",
            name: "Google Analytics Certification",
            nameEn: "Google Analytics Certification",
            nameZh: "Google Analytics（分析）認證",
            issuer: "Google",
            credentialType: "certification",
          },
          {
            id: "google-ads-measurement-certification",
            name: "Google Ads Measurement Certification",
            nameEn: "Google Ads Measurement Certification",
            nameZh: "Google Ads 評估認證",
            issuer: "Google",
            credentialType: "certification",
          },
          {
            id: "google-ads-search-certification",
            name: "Google Ads Search Certification",
            nameEn: "Google Ads Search Certification",
            nameZh: "Google Ads 搜尋廣告認證",
            issuer: "Google",
            credentialType: "certification",
          },
          {
            id: "google-ads-display-certification",
            name: "Google Ads Display Certification",
            nameEn: "Google Ads Display Certification",
            nameZh: "Google Ads 多媒體廣告認證",
            issuer: "Google",
            credentialType: "certification",
          },
        ],
      },
      {
        id: "google-professional-digital-badges",
        title: "專業數位徽章",
        items: [
          {
            id: "ai-powered-ads-certification",
            name: "AI 技術輔助高效廣告認證",
            issuer: "Google",
            credentialType: "digital-badge",
          },
          {
            id: "demand-generation-conversions-badge",
            name: "運用需求開發創造需求並促成轉換",
            issuer: "Google",
            credentialType: "digital-badge",
          },
          {
            id: "ai-powered-search-ads-foundations-practitioner",
            name: "從業人員適用的 AI 技術輔助搜尋廣告基礎課程徽章",
            issuer: "Google",
            credentialType: "digital-badge",
          },
          {
            id: "ai-powered-search-ads-foundations-strategist",
            name: "策略專家適用的 AI 技術輔助搜尋廣告基礎課程徽章",
            issuer: "Google",
            credentialType: "digital-badge",
          },
        ],
      },
      {
        id: "other-google-certifications",
        title: "其他 Google 認證",
        items: [
          {
            id: "google-digital-talent-self-learning-certification",
            name: "Google 數位人才自學認證",
            issuer: "Google",
            credentialType: "certification",
          },
        ],
      },
    ],
  },
  {
    id: "enterprise-data-governance",
    title: "企業電子化與資料治理",
    items: [
      {
        id: "enterprise-e-business-assistant-planner",
        name: "企業電子化助理規劃師",
        credentialType: "certification",
      },
      {
        id: "enterprise-e-business-software-application",
        name: "企業電子化軟體應用師",
        credentialType: "certification",
      },
      {
        id: "enterprise-talent-e-commerce-overview",
        name: "企業人才技能認證－電子商務概論",
        credentialType: "certification",
      },
      {
        id: "enterprise-e-business-network-marketing",
        name: "企業電子化人才能力鑑定－網路行銷",
        credentialType: "certification",
      },
      {
        id: "pims-personal-information-manager",
        name: "PIMS 個人資料管理師",
        credentialType: "certification",
      },
    ],
  },
  {
    id: "design-cad-web-tools",
    title: "設計、CAD 與網頁工具",
    items: [
      {
        id: "autocad-2014-certified-professional",
        name: "AutoCAD 2014 Certified Professional",
        credentialType: "certification",
      },
      {
        id: "adobe-certified-associate-photoshop-cs6",
        name: "Adobe Certified Associate - Photoshop CS6",
        credentialType: "certification",
      },
      {
        id: "adobe-certified-associate-illustrator",
        name: "Adobe Certified Associate - Illustrator",
        credentialType: "certification",
      },
      {
        id: "adobe-certified-associate-indesign",
        name: "Adobe Certified Associate - InDesign",
        credentialType: "certification",
      },
      {
        id: "adobe-certified-associate-dreamweaver-cs6",
        name: "Adobe Certified Associate - Dreamweaver CS6",
        credentialType: "certification",
      },
      {
        id: "tqc-plus-computer-aided-graphic-design",
        name: "TQC+專業設計人才認證－電腦輔助平面製圖",
        credentialType: "certification",
      },
    ],
  },
];

export const getCertificationItems = () =>
  certificationGroups.flatMap(group => [
    ...(group.items ?? []),
    ...(group.subgroups ?? []).flatMap(subgroup => subgroup.items),
  ]);
