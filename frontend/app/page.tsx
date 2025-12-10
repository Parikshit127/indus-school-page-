import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { SchoolOverview } from "@/components/SchoolOverview";
import { Achievements } from "@/components/Achievements";
import { Infrastructure } from "@/components/Infrastructure";
import { Gallery } from "@/components/Gallery";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <HeroSection />
      <SchoolOverview />
      <Achievements />
      <Infrastructure />
      <Gallery />
      <Footer />
    </main>
  );
}
