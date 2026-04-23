import HeroSection from "@/components/HeroSection";
import SEOHead from "@/components/SEOHead";
import StructureSection from "@/components/StructureSection";
import AtmosphereSection from "@/components/AtmosphereSection";
import CoreLayersSection from "@/components/CoreLayersSection";
import ContactSection from "@/components/ContactSection";
import FloatingNavbar from "@/components/FloatingNavbar";
import { profile } from "@/data/profile";

export default function Home() {
  const title = `${profile.name}｜作品集`;
  const description = `${profile.title}。${profile.tagline}`;

  return (
    <>
      <SEOHead title={title} description={description} canonicalPath="/" />
      <div className="w-full bg-black overflow-hidden page-fade-in">
        <FloatingNavbar />
        <HeroSection />
        <StructureSection />
        <AtmosphereSection />
        <CoreLayersSection />
        <ContactSection />
      </div>
    </>
  );
}
