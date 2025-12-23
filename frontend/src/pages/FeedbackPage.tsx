import { PageHero } from "@/components/ui/PageHero";
import { LeadForm } from "@/components/LeadForm";

export default function FeedbackPage() {
    return (
        <div className="bg-white min-h-screen">
            <PageHero
                title="Feedback Form"
                subtitle="We value your feedback. Help us improve our services."
                image="/assets/home/infrastructure.png"
            />

            <div className="container mx-auto px-4 py-16">
                <div className="max-w-2xl mx-auto">
                    <div className="mb-8 text-center">
                        <p className="text-gray-600 text-lg leading-relaxed">
                            Your feedback is important to us. Please share your thoughts, suggestions, or concerns to help us serve you better.
                        </p>
                    </div>
                    <LeadForm />
                </div>
            </div>
        </div>
    );
}
