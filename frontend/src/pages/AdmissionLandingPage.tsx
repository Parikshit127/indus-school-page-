import { HeroSection } from "@/components/HeroSection";
import { SchoolOverview } from "@/components/SchoolOverview";
import { Infrastructure } from "@/components/Infrastructure";
import { Achievements } from "@/components/Achievements";
import { Gallery } from "@/components/Gallery";
import { LeadForm } from "@/components/LeadForm";
import { Footer } from "@/components/Footer";

export default function AdmissionLandingPage() {
    return (
        <>
            <HeroSection staticImage="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=2070&auto=format&fit=crop" hideStats={true} removeMobilePadding={true} />
            <SchoolOverview />
            <Infrastructure />
            <Achievements />
            <Gallery />
            <div className="container mx-auto px-4 py-12 max-w-4xl">
                <h2 className="text-3xl md:text-4xl font-serif text-royal text-center mb-8">
                    Apply for Admission
                </h2>
                <LeadForm />
            </div>
            <Footer />
        </>
    );
}
