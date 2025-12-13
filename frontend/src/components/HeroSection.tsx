import { useState, useEffect } from "react";
import { LeadForm } from "@/components/LeadForm";
import { Trophy, Users, GraduationCap, Medal, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Slide {
    type: 'image' | 'video';
    url: string;
}

interface HeroContent {
    slides?: Slide[];
    mediaType?: 'image' | 'video'; // Legacy support
    mediaUrl?: string; // Legacy support
    announcement: {
        text: string;
        isActive: boolean;
        link: string;
    };
    admission: {
        deadline: string;
        gradesOpen: string;
        ctaText: string;
    };
    stats: {
        years: number;
        students: number;
        teachers: number;
        boardResults: string;
    };
}

export function HeroSection() {
    const [content, setContent] = useState<HeroContent | null>(null);
    const [loading, setLoading] = useState(true);
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const fetchContent = async () => {
            try {
                const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:4000';
                const response = await fetch(`${apiUrl}/api/content/hero`);
                if (response.ok) {
                    const data = await response.json();
                    setContent(data);
                }
            } catch (error) {
                console.error("Failed to fetch hero content", error);
            } finally {
                setLoading(false);
            }
        };

        fetchContent();
    }, []);

    // Construct display content with fallback and migration logic
    const getSlides = (): Slide[] => {
        if (!content) {
            // Default fallback
            return [{ type: 'image', url: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=2070' }];
        }

        if (content.slides && content.slides.length > 0) {
            return content.slides;
        }

        // Legacy fallback
        if (content.mediaUrl) {
            return [{ type: content.mediaType || 'image', url: content.mediaUrl }];
        }

        return [{ type: 'image', url: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=2070' }];
    };

    const slides = getSlides();
    const displayContent = content || {
        announcement: { text: "Admissions Open 2025-26", isActive: true, link: "#" },
        admission: { deadline: "", gradesOpen: "", ctaText: "" },
        stats: { years: 22, students: 2500, teachers: 150, boardResults: "100%" }
    };

    // Auto-advance slides
    useEffect(() => {
        if (slides.length <= 1) return;
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 5000);
        return () => clearInterval(timer);
    }, [slides.length, currentSlide]); // Reset timer on manual interaction

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    };

    if (loading) {
        return (
            <div className="h-screen bg-royal flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gold"></div>
            </div>
        );
    }

    return (
        <section id="admissions" className="relative min-h-[100dvh] flex flex-col md:flex-row items-center justify-center overflow-hidden pt-20 pb-12 md:py-0">
            {/* Background Slider */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-b md:bg-gradient-to-r from-royal/95 via-royal/80 to-royal/40 z-10" />

                <AnimatePresence mode="popLayout">
                    <motion.div
                        key={currentSlide}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1 }}
                        className="absolute inset-0"
                    >
                        {slides[currentSlide].type === 'video' ? (
                            <video
                                src={slides[currentSlide].url}
                                autoPlay
                                muted
                                loop
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <div
                                className="w-full h-full bg-cover bg-center"
                                style={{ backgroundImage: `url('${slides[currentSlide].url}')` }}
                            />
                        )}
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Navigation Arrows */}
            {slides.length > 1 && (
                <div className="absolute bottom-8 right-8 z-30 flex gap-2">
                    <button
                        onClick={prevSlide}
                        className="p-2 bg-black/30 hover:bg-black/50 text-white/80 hover:text-white rounded-full backdrop-blur-sm transition-all border border-white/10"
                        aria-label="Previous Slide"
                    >
                        <ChevronLeft size={18} />
                    </button>
                    <button
                        onClick={nextSlide}
                        className="p-2 bg-black/30 hover:bg-black/50 text-white/80 hover:text-white rounded-full backdrop-blur-sm transition-all border border-white/10"
                        aria-label="Next Slide"
                    >
                        <ChevronRight size={18} />
                    </button>
                </div>
            )}

            <div className="container mx-auto px-4 md:px-6 relative z-10 grid md:grid-cols-12 gap-8 items-center mt-12 md:mt-0">
                {/* Left Content */}
                <div className="md:col-span-7 text-white space-y-8 text-center md:text-left">
                    {displayContent.announcement?.isActive && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="inline-block px-4 py-1.5 bg-gold/20 text-gold border border-gold/40 backdrop-blur-sm rounded-full text-xs font-bold tracking-widest uppercase mb-2 hover:bg-gold/30 transition-colors"
                        >
                            {displayContent.announcement.text}
                        </motion.div>
                    )}

                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-bold leading-tight mb-4">
                            Shaping Excellence <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold to-gold-light">
                                Since 2003
                            </span>
                        </h1>
                        <p className="text-lg md:text-xl text-white/90 max-w-lg mx-auto md:mx-0 font-light leading-relaxed">
                            Indus Public School offers a heritage of discipline blended with modern academic rigor. Join a legacy of leaders.
                        </p>
                    </motion.div>

                    {/* Stats Grid */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-white/10"
                    >
                        <div className="text-center md:text-left">
                            <h4 className="text-2xl md:text-3xl font-bold text-gold flex items-center justify-center md:justify-start gap-2">
                                <Medal size={24} className="text-gold" />
                                {displayContent.stats?.years}+
                            </h4>
                            <p className="text-xs text-white/60 uppercase tracking-wider">Years of Excellence</p>
                        </div>
                        <div className="text-center md:text-left">
                            <h4 className="text-2xl md:text-3xl font-bold text-white flex items-center justify-center md:justify-start gap-2">
                                <Users size={24} className="text-white" />
                                {displayContent.stats?.students}+
                            </h4>
                            <p className="text-xs text-white/60 uppercase tracking-wider">Students Enrolled</p>
                        </div>
                        <div className="text-center md:text-left">
                            <h4 className="text-2xl md:text-3xl font-bold text-white flex items-center justify-center md:justify-start gap-2">
                                <GraduationCap size={24} className="text-white" />
                                {displayContent.stats?.teachers}+
                            </h4>
                            <p className="text-xs text-white/60 uppercase tracking-wider">Expert Teachers</p>
                        </div>
                        <div className="text-center md:text-left">
                            <h4 className="text-2xl md:text-3xl font-bold text-gold flex items-center justify-center md:justify-start gap-2">
                                <Trophy size={24} className="text-gold" />
                                {displayContent.stats?.boardResults}
                            </h4>
                            <p className="text-xs text-white/60 uppercase tracking-wider">Board Results</p>
                        </div>
                    </motion.div>
                </div>

                {/* Right Form */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 }}
                    className="md:col-span-5 w-full max-w-md mx-auto md:ml-auto"
                >
                    <LeadForm />
                </motion.div>
            </div>
        </section>
    );
}
