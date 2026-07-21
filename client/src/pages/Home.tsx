import AtmosphereSection from "@/components/AtmosphereSection";
import ContactSection from "@/components/ContactSection";
import CoreLayersSection from "@/components/CoreLayersSection";
import FloatingNavbar from "@/components/FloatingNavbar";
import HeroSection from "@/components/HeroSection";
import ScrollToTopButton from "@/components/ScrollToTopButton";
import SEOHead from "@/components/SEOHead";
import StructureSection from "@/components/StructureSection";
import { profile } from "@/data/profile";
import { scrollPageToTop } from "@/lib/scroll";

export default function Home() {
  const title = `${profile.name}${profile.nameEn ? ` ${profile.nameEn}` : ""}｜個人作品集`;
  const description = `${profile.title}｜${profile.tagline}`;

  return (
    <>
      <SEOHead title={title} description={description} canonicalPath="/" />
      <FloatingNavbar />
      <div className="w-full overflow-hidden bg-black page-fade-in">
        <HeroSection />
        <StructureSection />
        <AtmosphereSection />
        <CoreLayersSection />
        <ContactSection />
        <ScrollToTopButton onClick={scrollPageToTop} />
      </div>
    </>
  );
}
