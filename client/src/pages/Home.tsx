import HeroSection from '@/components/HeroSection';
import SEOHead from '@/components/SEOHead';
import StructureSection from '@/components/StructureSection';
import AtmosphereSection from '@/components/AtmosphereSection';
import CoreLayersSection from '@/components/CoreLayersSection';
import ContactSection from '@/components/ContactSection';
import FloatingNavbar from '@/components/FloatingNavbar';

/**
 * Home Page - Animated Resume Portfolio
 * 
 * Design Philosophy: Deep Space Techno
 * 
 * Narrative Journey:
 * 1. Hero (Universe | Chaos) - Introduction to the concept
 * 2. Structure (Orbits | Structure) - Capabilities and methods
 * 3. Atmosphere (Entry | Transition) - Bridge to projects
 * 4. Core (Layers & Core | About) - Experience and values
 * 5. Contact (Signal) - Call to action
 * 
 * Projects are now on a dedicated page: /projects
 * Reflection is now on the projects page
 */

export default function Home() {
  return (
    <>
      <SEOHead
        title="羅揚文 - 系統工程師 | 動畫履歷作品站"
        description="專注於企業級 Legacy 系統重構與現代化架構設計的系統工程師。展示 ERP 系統開發、全端開發和系統架構的實務經驗。"
        ogTitle="羅揚文 - 系統工程師 | 動畫履歷作品站"
        ogDescription="從混亂到秩序，從表象到核心。企業級系統重構與現代化架構設計的專家。"
        canonical="https://animated-resume-portfolio.manus.space"
      />
      <div className="w-full bg-black overflow-hidden page-fade-in">
      {/* Floating Navigation Bar */}
      <FloatingNavbar />

      {/* Hero Section - Universe | Chaos */}
      <HeroSection />

      {/* Structure Section - Orbits | Structure */}
      <StructureSection />

      {/* Atmosphere Section - Entry | Transition */}
      <AtmosphereSection />

      {/* Core Layers Section - Geological Stratification */}
      <CoreLayersSection />

      {/* Contact Section - Signal */}
      <ContactSection />
    </div>
    </>
  );
}
