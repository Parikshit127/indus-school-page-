import { useState, useEffect } from "react";
import { LeadForm } from "@/components/LeadForm";
import { Trophy, Users, GraduationCap, Medal } from "lucide-react";
import { motion } from "framer-motion";

interface HeroContent {
    mediaType: 'image' | 'video';
    mediaUrl: string;
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

    if (loading) {
        return (
            <div className="h-screen bg-royal flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gold"></div>
            </div>
        );
    }

    // Default Fallback content if API fails or while loading (skeleton could be better but this is safer)
    const displayContent = content || {
        mediaType: 'image',
        mediaUrl: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=2070',
        announcement: { text: "Admissions Open 2025-26", isActive: true, link: "#" },
        admission: { deadline: "", gradesOpen: "", ctaText: "" },
        stats: { years: 22, students: 2500, teachers: 150, boardResults: "100%" }
    };

    return (
        <section className="relative min-h-[100dvh] flex flex-col md:flex-row items-center justify-center overflow-hidden pt-20 pb-12 md:py-0">
            {/* Background with Overlay */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-b md:bg-gradient-to-r from-royal/95 via-royal/80 to-royal/40 z-10" />
                {displayContent.mediaType === 'video' ? (
                    <video
                        src={displayContent.mediaUrl}
                        autoPlay
                        muted
                        loop
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <div
                        className="w-full h-full bg-cover bg-center transition-all duration-1000"
                        style={{ backgroundImage: `url('${displayContent.mediaUrl}')` }}
                    />
                )}
            </div>



            <div className="container mx-auto px-4 md:px-6 relative z-10 grid md:grid-cols-12 gap-8 items-center mt-12 md:mt-0">
                {/* Left Content */}
                <div className="md:col-span-7 text-white space-y-8 text-center md:text-left">
                    {displayContent.announcement.isActive && (
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
                                {displayContent.stats.years}+
                            </h4>
                            <p className="text-xs text-white/60 uppercase tracking-wider">Years of Excellence</p>
                        </div>
                        <div className="text-center md:text-left">
                            <h4 className="text-2xl md:text-3xl font-bold text-white flex items-center justify-center md:justify-start gap-2">
                                <Users size={24} className="text-white" />
                                {displayContent.stats.students}+
                            </h4>
                            <p className="text-xs text-white/60 uppercase tracking-wider">Students Enrolled</p>
                        </div>
                        <div className="text-center md:text-left">
                            <h4 className="text-2xl md:text-3xl font-bold text-white flex items-center justify-center md:justify-start gap-2">
                                <GraduationCap size={24} className="text-white" />
                                {displayContent.stats.teachers}+
                            </h4>
                            <p className="text-xs text-white/60 uppercase tracking-wider">Expert Teachers</p>
                        </div>
                        <div className="text-center md:text-left">
                            <h4 className="text-2xl md:text-3xl font-bold text-gold flex items-center justify-center md:justify-start gap-2">
                                <Trophy size={24} className="text-gold" />
                                {displayContent.stats.boardResults}
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
