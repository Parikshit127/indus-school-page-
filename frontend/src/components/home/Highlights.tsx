import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Megaphone, ChevronRight, Calendar, Award, Bell } from "lucide-react";

interface HighlightItem {
    text: string;
    icon: any;
    type: string;
    link?: string;
}

// Sample highlights data - used as fallback
const defaultHighlights: HighlightItem[] = [
    { text: "Admission Open for classes Nur to IX and XI", icon: Bell, type: "admission", link: "/admissions" },
    { text: "Annual Sports Day on 15th January 2025", icon: Calendar, type: "event" },
    { text: "Science Exhibition Winners announced", icon: Award, type: "achievement" },
    { text: "Parent-Teacher Meeting on 20th December", icon: Calendar, type: "event" },
    { text: "Winter Vacation: 25th Dec to 5th Jan", icon: Calendar, type: "notice" },
];

export function Highlights() {
    const [highlights, setHighlights] = useState<HighlightItem[]>(defaultHighlights);

    useEffect(() => {
        const fetchAnnouncements = async () => {
            try {
                const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:4000';
                const response = await fetch(`${apiUrl}/api/announcements`);
                if (response.ok) {
                    const data = await response.json();
                    if (data.length > 0) {
                        const formattedData = data.map((item: any) => ({
                            text: item.text,
                            type: item.type,
                            icon: getIconByType(item.type),
                            link: item.link
                        }));
                        setHighlights(formattedData);
                    }
                }
            } catch (error) {
                console.error("Failed to fetch announcements", error);
            }
        };

        fetchAnnouncements();
    }, []);

    const getIconByType = (type: string) => {
        switch (type) {
            case 'admission': return Bell;
            case 'event': return Calendar;
            case 'achievement': return Award;
            case 'notice': return Megaphone;
            default: return Megaphone;
        }
    };

    return (
        <section className="relative w-full overflow-hidden bg-gradient-to-r from-amber-500 via-orange-500 to-red-500">
            {/* Animated background pattern */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0" style={{
                    backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.1) 10px, rgba(255,255,255,0.1) 20px)`
                }} />
            </div>

            <div className="w-full max-w-full">
                <div className="flex items-stretch w-full">
                    {/* Highlights Label - Premium badge style */}
                    <div className="relative bg-white/20 backdrop-blur-sm px-3 sm:px-5 md:px-8 py-4 flex items-center gap-2 md:gap-3 shrink-0 border-r border-white/20">
                        <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-white/20 rotate-45 hidden md:block" />
                        <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg shrink-0">
                            <Megaphone className="w-4 h-4 text-orange-600" />
                        </div>
                        <div className="hidden md:block">
                            <span className="text-white font-bold text-sm tracking-wide uppercase">Latest</span>
                            <span className="block text-white/90 text-xs">Updates</span>
                        </div>
                        <span className="md:hidden text-white font-bold text-sm whitespace-nowrap">News</span>
                    </div>

                    {/* Scrolling Ticker */}
                    <div className="flex-1 overflow-hidden py-4 px-4 sm:px-6 md:px-8 min-w-0">
                        <motion.div
                            className="flex whitespace-nowrap items-center"
                            animate={{ x: ["0%", "-50%"] }}
                            transition={{
                                x: {
                                    repeat: Infinity,
                                    repeatType: "loop",
                                    duration: Math.max(20, highlights.length * 5), // Adjust speed based on content length
                                    ease: "linear",
                                },
                            }}
                        >
                            {/* Duplicate highlights for seamless loop */}
                            {[...highlights, ...highlights].map((item, index) => (
                                <span
                                    key={index}
                                    className="inline-flex items-center mx-4 sm:mx-6 md:mx-10 group"
                                >
                                    <a
                                        href={item.link || '#'}
                                        className={`flex items-center gap-2 px-3 sm:px-4 py-1.5 bg-white/15 backdrop-blur-sm rounded-full border border-white/20 hover:bg-white/25 transition-colors ${!item.link ? 'cursor-default pointer-events-none' : ''}`}
                                    >
                                        <item.icon className="w-3 h-3 sm:w-4 sm:h-4 text-white shrink-0" />
                                        <span className="text-white font-medium text-xs sm:text-sm md:text-base">{item.text}</span>
                                        {item.link && <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 text-white/60 group-hover:text-white transition-colors shrink-0" />}
                                    </a>
                                </span>
                            ))}
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Subtle shine effect */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-black/10 pointer-events-none" />
        </section>
    );
}
