
import { LeadForm } from "@/components/LeadForm";

export default function FeedbackPage() {
    return (
        <div className="bg-white min-h-screen pt-40">
            <div className="container mx-auto px-4 mb-8">
                <h1 className="text-4xl font-serif font-bold text-royal text-center">Feedback Form</h1>
                <p className="text-gray-500 text-center mt-2 font-medium">We value your feedback. Help us improve our services.</p>
            </div>

            <div className="container mx-auto px-4 py-8">
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
