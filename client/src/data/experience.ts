export type ExperienceStage =
  | "software-engineering"
  | "design"
  | "product"
  | "teaching";

export type WorkExperience = {
  company: string;
  title: string;
  role: string;
  period: string;
  duration?: string;
  logo?: string;
  logoClass: string;
  stage: ExperienceStage;
  bullets: string[];
  technologies?: string[];
};

export const experienceTimeline: WorkExperience[] = [
  {
    logoClass: "bg-slate-100 text-blue-900",
    title: "頠?撌亦?撣?",
    company: "銝剔?鞈?憿批????砍嚗?西?擃??平嚗?",
    role: "頠?撌亦?撣?",
    period: "2022/8~隞??",
    stage: "software-engineering",
    bullets: [
      "銝餃? Delphi ERP 蝟餌絞?曆誨??頧???Vue3 + Go Web ?嗆???",
      "撱箇? RESTful API 銝行??敺垢蝟餌絞??",
      "??銴??平?摩嚗??頂蝯勗蝬剛風?扼?",
      "?舀摰Ｘ?瘙赤隢??????",
      "?蝟餌絞撠?蝙?刻??脰?蝺氬?",
      "?閮剛??亥岷瘚?嚗?????26 蝘? 1 蝘??",
    ],
    technologies: ["Delphi", "Vue 3", "Go", "RESTful API"],
  },
  {
    logoClass: "bg-green-500 text-white",
    title: "蝬脩?閮剛?撣?",
    company: "?啁銋??∩遢???砍嚗?憿ˊ?平 30~100鈭綽?",
    role: "撟喲閮剛? / 蝢楊嚚銝剖?憭折??",
    period: "2018/7~2022/2",
    duration: "3撟???",
    stage: "design",
    bullets: [
      "閮剛?鋆賭?撟喲?恐?絲?晞M?誨????閬死蝝???",
      "閬?????閮剛?鋆賭???啜?",
      "?脰??阮??獢???閮剛???",
      "??瑕??舐窗嚗??摯?嫘?璅??頛詨瘚???",
      "?蝬剛風?耨?孵?貊雯蝡摰嫘?",
    ],
  },
  {
    logoClass: "bg-green-500 text-white",
    title: "蝬脤?蝢極",
    company: "曀祈?訾??∩遢???砍嚗隞?平 1~30鈭綽?",
    role: "蝬脤?閮剛?撣恬??唬葉撣?撅臬?",
    period: "2017/2~2018/7",
    duration: "1撟???",
    stage: "design",
    bullets: [
      "鞎痊?啣?蝢極蝔蹂辣鋆賭???",
      "閮剛?鋆賭?撟喲?恐?絲?晞M?誨????蝝???",
      "?蝬脩?撌亦?撣怨ˊ雿?蝬剛風蝬脩???",
    ],
  },
  {
    logoClass: "bg-blue-600 text-white",
    title: "蝢楊銵",
    company: "撖??啣?∩遢???砍",
    role: "撟喲閮剛? / 蝢楊嚚銝剖?蟡瓷?",
    period: "2016/1~2017/2",
    duration: "1撟???",
    stage: "design",
    bullets: [
      "鞎痊?啣?蝢極蝔蹂辣鋆賭???",
      "靽格?楊蝜芰?撌亙?蝔踴?",
      "???訾??啣璈嚗???ˊ蝔踴蝔輯??寧阮??",
      "?? Adobe Illustrator?dobe Photoshop 蝑身閮極?瑯?",
      "???銝餌恣鈭方齒鈭???",
    ],
    technologies: ["Adobe Illustrator", "Adobe Photoshop"],
  },
  {
    logoClass: "bg-cyan-600 text-white",
    title: "?飛?拍?",
    company: "??銝剛?憭批飛嚗之撠?Ｘ??脖?璆哨?",
    role: "?拇?嚚銝剖???",
    period: "2015/1~2015/8",
    duration: "8??",
    stage: "teaching",
    bullets: [
      "?隤脩??飛??湔?氬?",
      "?摮貊??圾隤脩???瘚???",
      "?寥??銵牧??憿?撠??曉?舀?賢???",
    ],
  },
  {
    logo: "鋆?",
    logoClass: "bg-orange-500 text-white",
    title: "?Ｗ?閮剛?撌亦?撣?",
    company: "?典?憛?撌交平?∩遢???砍",
    role: "璈１閮剛?撌亦?撣恬??唬葉撣之??",
    period: "2012/3~2014/3",
    duration: "2撟???",
    stage: "product",
    bullets: [
      "???Ｗ?閮剛??ˊ??蝔???",
      "?圾?喟絞鋆賡平?曉瘚???璆剝??嗚?",
      "?寥?敺祕??雿?摨行頂蝯梯身閮??賢???",
    ],
  },
];

export const featuredResumeExperience = {
  role: experienceTimeline[0],
  bullets: [
    experienceTimeline[0].bullets[0],
    experienceTimeline[0].bullets[1],
    experienceTimeline[0].bullets[3],
    experienceTimeline[0].bullets[5],
  ],
};

export const experienceProgression = [
  "Product and manufacturing experience",
  "Visual and web design",
  "Enterprise software and ERP development",
  "Legacy modernization and AI application development",
];

export const earlierExperienceSummary =
  "Experience in product design, graphic design, web design, marketing support, and teaching assistance, providing a broad understanding of manufacturing, user workflows, visual communication, and practical business needs.";
