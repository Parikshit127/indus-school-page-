import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { SchoolOverview } from "@/components/SchoolOverview";
import { Achievements } from "@/components/Achievements";
import { Infrastructure } from "@/components/Infrastructure";
import { Gallery } from "@/components/Gallery";
import { LeadForm } from "@/components/LeadForm";
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

      {/* Bottom Admission Form */}
      <section className="py-12 md:py-16 bg-cream">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-serif text-royal font-bold mb-4">Start Your Journey With Us</h2>
              <p className="text-royal/70">Applications are now open for the academic year 2025-26.</p>
            </div>
            <LeadForm />
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
