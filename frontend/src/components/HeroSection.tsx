import { useState, useEffect } from "react";
import { LeadForm } from "@/components/LeadForm";
import { Trophy, Users, GraduationCap, Medal, ChevronLeft, ChevronRight, Calendar, MapPin, Star } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Slide {
    type: 'image' | 'video';
    url: string;
}

interface HeroContent {
    slides?: Slide[];
    mediaType?: 'image' | 'video';
    mediaUrl?: string;
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

export function HeroSection({ staticImage, hideStats, removeMobilePadding }: { staticImage?: string; hideStats?: boolean; removeMobilePadding?: boolean }) {
    const [content, setContent] = useState<HeroContent | null>(null);
    const [loading, setLoading] = useState(!staticImage);
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        if (staticImage) {
            setLoading(false);
            return;
        }
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
    }, [staticImage]);

    const getSlides = (): Slide[] => {
        if (staticImage) return [{ type: 'image', url: staticImage }];
        if (!content) return [{ type: 'image', url: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=2070' }];
        if (content.slides && content.slides.length > 0) return content.slides;
        if (content.mediaUrl) return [{ type: content.mediaType || 'image', url: content.mediaUrl }];
        return [{ type: 'image', url: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=2070' }];
    };

    const slides = getSlides();
    const displayContent = content || {
        announcement: { text: "Admissions Open 2025-26", isActive: true, link: "#" },
        admission: { deadline: "", gradesOpen: "", ctaText: "" },
        stats: { years: 22, students: 2500, teachers: 150, boardResults: "100%" }
    };

    useEffect(() => {
        if (slides.length <= 1) return;
        const timer = setInterval(() => setCurrentSlide((prev) => (prev + 1) % slides.length), 5000);
        return () => clearInterval(timer);
    }, [slides.length, currentSlide]);

    const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
    const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

    if (loading) {
        return (
            <div className="h-screen bg-royal flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gold"></div>
            </div>
        );
    }

    return (
        <section id="admissions" className={`relative min-h-[100dvh] flex flex-col md:flex-row items-center justify-center overflow-hidden ${removeMobilePadding ? 'pt-0 pb-0' : 'pt-20 pb-12'} md:py-0`}>
            {/* Background Slider */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-b md:bg-gradient-to-r from-royal/80 via-royal/60 to-royal/30 z-10" />
                <AnimatePresence mode="popLayout">
                    <motion.div key={currentSlide} initial={{ opacity: 0, scale: 1.1 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1.2 }} className="absolute inset-0">
                        {slides[currentSlide].type === 'video' ? (
                            <video src={slides[currentSlide].url} autoPlay muted loop className="w-full h-full object-cover" />
                        ) : (
                            <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: `url('${slides[currentSlide].url}')` }} />
                        )}
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Navigation Arrows */}
            {slides.length > 1 && (
                <div className="absolute bottom-8 right-8 z-30 flex gap-2">
                    <button onClick={prevSlide} className="p-2.5 bg-white/10 hover:bg-white/20 text-white rounded-full backdrop-blur-md transition-all border border-white/20" aria-label="Previous Slide"><ChevronLeft size={20} /></button>
                    <button onClick={nextSlide} className="p-2.5 bg-white/10 hover:bg-white/20 text-white rounded-full backdrop-blur-md transition-all border border-white/20" aria-label="Next Slide"><ChevronRight size={20} /></button>
                </div>
            )}

            <div className="container mx-auto px-4 md:px-6 relative z-10 grid md:grid-cols-12 gap-8 items-center mt-12 md:mt-0">
                {/* Left Content */}
                <div className="md:col-span-7 text-white space-y-6 text-center md:text-left">
                    {displayContent.announcement?.isActive && (
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-gold/30 to-gold/20 text-gold border border-gold/40 backdrop-blur-md rounded-full text-xs font-bold tracking-widest uppercase mb-2 animate-pulse">
                            <Star className="w-3 h-3 fill-gold" />{displayContent.announcement.text}
                        </motion.div>
                    )}

                    <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
                        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-bold leading-tight mb-4">
                            Where Future <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold via-gold-light to-gold">Leaders</span> Are Made
                        </h1>
                        <p className="text-lg md:text-xl text-white/90 max-w-xl mx-auto md:mx-0 font-light leading-relaxed">
                            Join 2500+ successful students at Rohtak's premier CBSE school. 22 years of academic excellence, character building, and holistic development.
                        </p>
                    </motion.div>

                    {/* CTAs */}
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="flex flex-wrap gap-4 justify-center md:justify-start">
                        <a href="#admission-cta" className="group inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-gold to-gold-light text-royal font-bold rounded-full hover:shadow-lg hover:shadow-gold/30 transition-all">
                            Apply for Admission<Calendar className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </a>
                        <a href="/contact" className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 text-white font-bold rounded-full backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all">
                            <MapPin className="w-4 h-4" />Book Campus Visit
                        </a>
                    </motion.div>

                    {/* Stats Grid */}
                    {!hideStats && (
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-white/10">
                            <div className="text-center md:text-left">
                                <h4 className="text-2xl md:text-3xl font-bold text-gold flex items-center justify-center md:justify-start gap-2"><Medal size={22} />{displayContent.stats?.years}+</h4>
                                <p className="text-xs text-white/60 uppercase tracking-wider">Years Legacy</p>
                            </div>
                            <div className="text-center md:text-left">
                                <h4 className="text-2xl md:text-3xl font-bold text-white flex items-center justify-center md:justify-start gap-2"><Users size={22} />{displayContent.stats?.students}+</h4>
                                <p className="text-xs text-white/60 uppercase tracking-wider">Happy Students</p>
                            </div>
                            <div className="text-center md:text-left">
                                <h4 className="text-2xl md:text-3xl font-bold text-white flex items-center justify-center md:justify-start gap-2"><GraduationCap size={22} />{displayContent.stats?.teachers}+</h4>
                                <p className="text-xs text-white/60 uppercase tracking-wider">Expert Faculty</p>
                            </div>
                            <div className="text-center md:text-left">
                                <h4 className="text-2xl md:text-3xl font-bold text-gold flex items-center justify-center md:justify-start gap-2"><Trophy size={22} />{displayContent.stats?.boardResults}</h4>
                                <p className="text-xs text-white/60 uppercase tracking-wider">Pass Rate</p>
                            </div>
                        </motion.div>
                    )}
                </div>

                {/* Right Form */}
                <motion.div initial={{ opacity: 0, x: 20, y: 20 }} animate={{ opacity: 1, x: 0, y: 0 }} transition={{ delay: 0.6 }} className="md:col-span-5 w-full max-w-md mx-auto md:ml-auto">
                    <LeadForm />
                </motion.div>
            </div>
        </section>
    );
}
