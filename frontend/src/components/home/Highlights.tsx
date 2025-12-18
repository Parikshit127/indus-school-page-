import { motion } from "framer-motion";
import { Megaphone, ChevronRight, Calendar, Award, Bell } from "lucide-react";

// Sample highlights data - this can be made dynamic via API later
const highlights = [
    { text: "Admission Open for classes Nur to IX and XI", icon: Bell, type: "admission" },
    { text: "Annual Sports Day on 15th January 2025", icon: Calendar, type: "event" },
    { text: "Science Exhibition Winners announced", icon: Award, type: "achievement" },
    { text: "Parent-Teacher Meeting on 20th December", icon: Calendar, type: "event" },
    { text: "Winter Vacation: 25th Dec to 5th Jan", icon: Calendar, type: "notice" },
];

export function Highlights() {
    return (
        <section className="relative overflow-hidden bg-gradient-to-r from-amber-500 via-orange-500 to-red-500">
            {/* Animated background pattern */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0" style={{
                    backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.1) 10px, rgba(255,255,255,0.1) 20px)`
                }} />
            </div>

            <div className="container mx-auto px-0">
                <div className="flex items-stretch">
                    {/* Highlights Label - Premium badge style */}
                    <div className="relative bg-white/20 backdrop-blur-sm px-5 md:px-8 py-4 flex items-center gap-3 shrink-0 border-r border-white/20">
                        <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-white/20 rotate-45 hidden md:block" />
                        <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg">
                            <Megaphone className="w-4 h-4 text-orange-600" />
                        </div>
                        <div className="hidden md:block">
                            <span className="text-white font-bold text-sm tracking-wide uppercase">Latest</span>
                            <span className="block text-white/90 text-xs">Updates</span>
                        </div>
                        <span className="md:hidden text-white font-bold text-sm">News</span>
                    </div>

                    {/* Scrolling Ticker */}
                    <div className="flex-1 overflow-hidden py-4 px-6 md:px-8">
                        <motion.div
                            className="flex whitespace-nowrap items-center"
                            animate={{ x: ["0%", "-50%"] }}
                            transition={{
                                x: {
                                    repeat: Infinity,
                                    repeatType: "loop",
                                    duration: 35,
                                    ease: "linear",
                                },
                            }}
                        >
                            {/* Duplicate highlights for seamless loop */}
                            {[...highlights, ...highlights].map((item, index) => (
                                <span
                                    key={index}
                                    className="inline-flex items-center mx-6 md:mx-10 group"
                                >
                                    <span className="flex items-center gap-2 px-4 py-1.5 bg-white/15 backdrop-blur-sm rounded-full border border-white/20 hover:bg-white/25 transition-colors">
                                        <item.icon className="w-4 h-4 text-white" />
                                        <span className="text-white font-medium text-sm md:text-base">{item.text}</span>
                                        <ChevronRight className="w-4 h-4 text-white/60 group-hover:text-white transition-colors" />
                                    </span>
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
