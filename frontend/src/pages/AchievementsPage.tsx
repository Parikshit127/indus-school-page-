import { useState, useEffect } from "react";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/section";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronUp, ChevronDown, ChevronLeft, ChevronRight, Trophy, Sparkles } from "lucide-react";

interface Achievement {
    _id: string;
    studentName: string;
    achievement: string;
    class?: string;
    category: string;
    date?: string;
    order: number;
}

interface AchievementBanner {
    _id: string;
    title?: string;
    imageUrl: string;
    order: number;
}

export default function AchievementsPage() {
    const [achievements, setAchievements] = useState<Achievement[]>([]);
    const [banners, setBanners] = useState<AchievementBanner[]>([]);
    const [loading, setLoading] = useState(true);
    const [showAllAchievements, setShowAllAchievements] = useState(false);
    const [currentBannerIndex, setCurrentBannerIndex] = useState(0);

    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:4000';

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [achievementsRes, bannersRes] = await Promise.all([
                    fetch(`${apiUrl}/api/achievements`),
                    fetch(`${apiUrl}/api/achievements/banners`)
                ]);

                if (achievementsRes.ok) {
                    const data = await achievementsRes.json();
                    setAchievements(data);
                }

                if (bannersRes.ok) {
                    const data = await bannersRes.json();
                    setBanners(data);
                }
            } catch (error) {
                console.error("Failed to fetch achievements data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // Banner Autoplay
    useEffect(() => {
        if (banners.length <= 1) return;
        const timer = setInterval(() => {
            setCurrentBannerIndex((prev) => (prev + 1) % banners.length);
        }, 5000);
        return () => clearInterval(timer);
    }, [banners.length]);

    const nextBanner = () => {
        setCurrentBannerIndex((prev) => (prev + 1) % banners.length);
    };

    const prevBanner = () => {
        setCurrentBannerIndex((prev) => (prev - 1 + banners.length) % banners.length);
    };

    const displayedAchievements = showAllAchievements ? achievements : achievements.slice(0, 10);

    return (
        <div className="bg-slate-50 min-h-screen">
            <PageHero
                title="Our Achievements"
                subtitle="Celebrating excellence in academics, sports, and beyond"
                image="https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2070"
            />

            {/* Tagline Section */}
            <Section className="py-16 md:py-20 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="max-w-4xl mx-auto"
                >
                    <Sparkles className="w-12 h-12 text-gold mx-auto mb-6" />
                    <h2 className="text-3xl md:text-5xl font-serif font-bold text-royal mb-6 leading-tight">
                        "Excellence is not an act, but a habit."
                    </h2>
                    <p className="text-lg md:text-xl text-slate-600 italic">
                        At Indus Public School, we nurture talent and celebrate every milestone of our students' journey towards greatness.
                    </p>
                    <div className="h-1 w-24 bg-gold mx-auto mt-8 rounded-full"></div>
                </motion.div>
            </Section>

            {/* Achievements Table - Just like Members */}
            <Section className="py-12 bg-white">
                <div className="max-w-6xl mx-auto">
                    <div className="flex items-center justify-center gap-4 mb-10">
                        <div className="h-px bg-royal/20 w-12 md:w-20"></div>
                        <h2 className="text-2xl md:text-3xl font-bold text-royal uppercase tracking-widest text-center">
                            Hall of Fame
                        </h2>
                        <div className="h-px bg-royal/20 w-12 md:w-20"></div>
                    </div>

                    {loading ? (
                        <div className="text-center py-12 text-slate-500">Loading achievements...</div>
                    ) : achievements.length > 0 ? (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden mb-8">
                                <div className="overflow-x-auto">
                                    <table className="w-full text-sm text-left whitespace-nowrap md:whitespace-normal">
                                        <thead className="text-xs text-royal uppercase bg-slate-50/50">
                                            <tr>
                                                <th className="px-6 py-4 rounded-tl-xl text-center">#</th>
                                                <th className="px-6 py-4">Student Name</th>
                                                <th className="px-6 py-4">Achievement</th>
                                                <th className="px-6 py-4">Class</th>
                                                <th className="px-6 py-4 rounded-tr-xl">Category</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-100">
                                            {displayedAchievements.map((item, index) => (
                                                <tr key={item._id} className="hover:bg-slate-50/50 transition-colors group">
                                                    <td className="px-6 py-4 font-medium text-slate-400 text-center w-16">
                                                        {index + 1}
                                                    </td>
                                                    <td className="px-6 py-4 text-base font-bold text-royal group-hover:text-gold transition-colors">
                                                        {item.studentName}
                                                    </td>
                                                    <td className="px-6 py-4 text-slate-700 font-medium">
                                                        {item.achievement}
                                                    </td>
                                                    <td className="px-6 py-4 text-slate-500">
                                                        {item.class || "-"}
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${item.category?.toLowerCase() === 'sports'
                                                                ? 'bg-orange-50 text-orange-700 border-orange-100'
                                                                : item.category?.toLowerCase() === 'academic'
                                                                    ? 'bg-blue-50 text-blue-700 border-blue-100'
                                                                    : 'bg-purple-50 text-purple-700 border-purple-100'
                                                            }`}>
                                                            {item.category || "General"}
                                                        </span>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            {achievements.length > 10 && (
                                <div className="text-center">
                                    <button
                                        onClick={() => setShowAllAchievements(!showAllAchievements)}
                                        className="inline-flex items-center gap-2 px-6 py-2.5 bg-white border border-slate-200 rounded-full text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-royal hover:border-royal transition-all duration-300 shadow-sm"
                                    >
                                        {showAllAchievements ? (
                                            <>Show Less <ChevronUp size={16} /></>
                                        ) : (
                                            <>See All Achievements ({achievements.length}) <ChevronDown size={16} /></>
                                        )}
                                    </button>
                                </div>
                            )}
                        </motion.div>
                    ) : (
                        <div className="text-center py-12 bg-slate-50 rounded-xl border border-dashed border-slate-300">
                            <Trophy className="mx-auto h-12 w-12 text-slate-300 mb-3" />
                            <p className="text-slate-500">No achievements added yet.</p>
                        </div>
                    )}
                </div>
            </Section>

            {/* Sliding Banners Section */}
            {banners.length > 0 && (
                <Section className="py-20 bg-royal text-white overflow-hidden relative">
                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-10 pointer-events-none">
                        <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
                        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gold rounded-full blur-3xl translate-x-1/3 translate-y-1/3"></div>
                    </div>

                    <div className="max-w-screen-xl mx-auto relative z-10 px-4">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-center mb-12"
                        >
                            <span className="text-gold font-bold tracking-widest uppercase text-sm mb-2 block">Gallery</span>
                            <h2 className="text-3xl md:text-5xl font-serif font-bold">Moments of Pride</h2>
                        </motion.div>

                        <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-royal-dark aspect-video md:aspect-[21/9]">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={currentBannerIndex}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.5 }}
                                    className="absolute inset-0"
                                >
                                    <img
                                        src={banners[currentBannerIndex].imageUrl}
                                        alt={banners[currentBannerIndex].title || "Achievement"}
                                        className="w-full h-full object-cover"
                                    />
                                    {banners[currentBannerIndex].title && (
                                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-8 pt-24">
                                            <h3 className="text-2xl md:text-3xl font-bold text-white text-center md:text-left drop-shadow-md">
                                                {banners[currentBannerIndex].title}
                                            </h3>
                                        </div>
                                    )}
                                </motion.div>
                            </AnimatePresence>

                            {/* Slider Navigation */}
                            {banners.length > 1 && (
                                <>
                                    <button
                                        onClick={prevBanner}
                                        className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/30 text-white hover:bg-white hover:text-royal transition-all backdrop-blur-sm shadow-lg"
                                    >
                                        <ChevronLeft size={24} />
                                    </button>
                                    <button
                                        onClick={nextBanner}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/30 text-white hover:bg-white hover:text-royal transition-all backdrop-blur-sm shadow-lg"
                                    >
                                        <ChevronRight size={24} />
                                    </button>

                                    {/* Dots */}
                                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
                                        {banners.map((_, idx) => (
                                            <button
                                                key={idx}
                                                onClick={() => setCurrentBannerIndex(idx)}
                                                className={`w-2.5 h-2.5 rounded-full transition-all ${idx === currentBannerIndex ? "bg-gold w-8" : "bg-white/50 hover:bg-white"
                                                    }`}
                                            />
                                        ))}
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </Section>
            )}
        </div>
    );
}
