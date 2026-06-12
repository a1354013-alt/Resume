import HeroSection from "@/components/HeroSection";
import SEOHead from "@/components/SEOHead";
import StructureSection from "@/components/StructureSection";
import AtmosphereSection from "@/components/AtmosphereSection";
import CoreLayersSection from "@/components/CoreLayersSection";
import ContactSection from "@/components/ContactSection";
import FloatingNavbar from "@/components/FloatingNavbar";
import PageAnchorNav, { type PageAnchor } from "@/components/PageAnchorNav";
import { profile } from "@/data/profile";

const homeAnchors: PageAnchor[] = [
  { id: "hero", label: "首頁" },
  { id: "structure", label: "工程能力" },
  { id: "atmosphere", label: "工作亮點" },
  { id: "core", label: "技術能力" },
  { id: "contact", label: "聯絡方式" },
];

export default function Home() {
  const title = `${profile.name}${profile.nameEn ? ` ${profile.nameEn}` : ""} | Portfolio`;
  const description = `${profile.title} — ${profile.tagline}`;

  return (
    <>
      <SEOHead title={title} description={description} canonicalPath="/" />
      <FloatingNavbar />
      <div className="w-full bg-black overflow-hidden page-fade-in">
        <PageAnchorNav anchors={homeAnchors} />
        <HeroSection />
        <StructureSection />
        <AtmosphereSection />
        <CoreLayersSection />
        <ContactSection />
      </div>
    </>
  );
}
