import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/section";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";

interface ResultBanner {
    imageUrl: string;
    caption?: string;
}

interface ResultSession {
    _id: string;
    sessionLabel: string;
    description?: string;
    banners: ResultBanner[];
}

export default function ResultsPage() {
    const [sessions, setSessions] = useState<ResultSession[]>([]);
    const [selectedSessionId, setSelectedSessionId] = useState<string | null>(null);
    const [currentSlide, setCurrentSlide] = useState(0);

    const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:4000";

    useEffect(() => {
        const fetchSessions = async () => {
            try {
                const res = await fetch(`${apiUrl}/api/result-sessions/public`);
                const data = await res.json();
                if (res.ok && Array.isArray(data) && data.length > 0) {
                    setSessions(data);
                    setSelectedSessionId(data[0]._id);
                    setCurrentSlide(0);
                }
            } catch (err) {
                console.error("Failed to load result sessions", err);
            }
        };
        fetchSessions();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const selectedSession = sessions.find((s) => s._id === selectedSessionId) || sessions[0];
    const bannerImages: ResultBanner[] = selectedSession?.banners || [];

    useEffect(() => {
        if (!bannerImages || bannerImages.length <= 1) return;
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % bannerImages.length);
        }, 5000);
        return () => clearInterval(timer);
    }, [bannerImages?.length]);

    const nextSlide = () => {
        if (!bannerImages || bannerImages.length === 0) return;
        setCurrentSlide((prev) => (prev + 1) % bannerImages.length);
    };

    const prevSlide = () => {
        if (!bannerImages || bannerImages.length === 0) return;
        setCurrentSlide((prev) => (prev - 1 + bannerImages.length) % bannerImages.length);
    };

    return (
        <div className="min-h-screen bg-slate-50">
            <PageHero
                title="Academic Results"
                subtitle="CBSE Board Examination - Outstanding Performance"
                image="https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=2070&auto=format&fit=crop"
            />

            {/* Session Filter */}
            <Section className="bg-white py-8">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-8">
                        <h3 className="text-2xl font-serif font-bold text-royal mb-4">Select Academic Session</h3>
                        <p className="text-slate-600">Choose a session to view archived results</p>
                    </div>
                    <div className="flex flex-wrap justify-center gap-4">
                        {sessions.map((session) => (
                            <button
                                key={session._id}
                                onClick={() => {
                                    setSelectedSessionId(session._id);
                                    setCurrentSlide(0);
                                }}
                                className={`px-8 py-3 rounded-full font-bold text-lg transition-all duration-300 ${selectedSession?._id === session._id
                                        ? "bg-royal text-white shadow-lg scale-105"
                                        : "bg-slate-100 text-slate-600 hover:bg-slate-200 hover:scale-105"
                                    }`}
                            >
                                Session {session.sessionLabel}
                            </button>
                        ))}
                    </div>
                </div>
            </Section>

            {/* Results Banner Slider */}
            <Section className="bg-white py-8">
                <div className="max-w-7xl mx-auto">
                    <div className="relative">
                        {/* Main Slider */}
                        <div className="relative overflow-hidden rounded-2xl shadow-2xl bg-slate-100">
                            <div className="relative aspect-[16/10] md:aspect-[16/9]">
                                {bannerImages.map((banner, index) => (
                                    <div
                                        key={index}
                                        className={`absolute inset-0 transition-opacity duration-700 ${index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
                                            }`}
                                    >
                                        <img
                                            src={banner.imageUrl}
                                            alt={banner.caption || `Academic Results Banner ${index + 1}`}
                                            className="w-full h-full object-contain bg-white"
                                        />
                                    </div>
                                ))}
                            </div>

                            {/* Navigation Buttons */}
                            {bannerImages.length > 1 && (
                                <>
                                    <button
                                        onClick={prevSlide}
                                        className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 hover:bg-white rounded-full flex items-center justify-center text-royal shadow-lg transition-all duration-300 hover:scale-110 z-20"
                                        aria-label="Previous slide"
                                    >
                                        <ChevronLeft size={24} />
                                    </button>
                                    <button
                                        onClick={nextSlide}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 hover:bg-white rounded-full flex items-center justify-center text-royal shadow-lg transition-all duration-300 hover:scale-110 z-20"
                                        aria-label="Next slide"
                                    >
                                        <ChevronRight size={24} />
                                    </button>
                                </>
                            )}
                        </div>

                        {/* Slide Indicators */}
                        {bannerImages.length > 1 && (
                            <div className="flex justify-center gap-3 mt-6">
                                {bannerImages.map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setCurrentSlide(index)}
                                        className={`transition-all duration-300 rounded-full ${index === currentSlide
                                                ? "bg-royal w-12 h-3"
                                                : "bg-slate-300 hover:bg-slate-400 w-3 h-3"
                                            }`}
                                        aria-label={`Go to slide ${index + 1}`}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </Section>

            {/* Message Section */}
            <Section className="bg-slate-50 py-8">
                <div className="max-w-4xl mx-auto text-center">
                    <p className="text-royal font-medium text-lg leading-relaxed">
                        Our students' outstanding results are a testament to their dedication, hard work, and the unwavering support of our faculty and parents.
                    </p>
                </div>
            </Section>
        </div>
    );
}

// Celebration gallery removed per request
