export type PageKey =
  | "home"
  | "resume"
  | "experience"
  | "projects"
  | "biography";

export const pageLinks: Array<{ key: PageKey; href: string; label: string }> = [
  { key: "home", href: "/", label: "首頁" },
  { key: "resume", href: "/resume", label: "履歷" },
  { key: "experience", href: "/experience", label: "工作經歷" },
  { key: "projects", href: "/projects", label: "專案" },
  { key: "biography", href: "/biography", label: "自傳" },
];

export const pageTitles: Record<PageKey, string> = {
  home: "首頁",
  resume: "履歷",
  experience: "工作經歷",
  projects: "專案",
  biography: "自傳",
};
