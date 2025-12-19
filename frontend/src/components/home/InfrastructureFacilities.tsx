import { motion } from "framer-motion";
import { useState } from "react";
import {
    Monitor, FlaskConical, Trophy, Library, Bus, HeartPulse,
    Shield, Wifi, Camera, TreeDeciduous, ChevronLeft, ChevronRight
} from "lucide-react";

const facilities = [
    {
        id: 1,
        icon: Monitor,
        title: "Smart Classrooms",
        description: "Interactive digital boards, projectors, and audio-visual learning tools in every classroom",
        image: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?q=80&w=2000"
    },
    {
        id: 2,
        icon: FlaskConical,
        title: "Science & Computer Labs",
        description: "State-of-the-art Physics, Chemistry, Biology labs with advanced equipment for hands-on experiments",
        image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=2000"
    },
    {
        id: 3,
        icon: Trophy,
        title: "Sports Complex",
        description: "International standard facilities for cricket, basketball, badminton, swimming pool, and athletics track",
        image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=2000"
    },
    {
        id: 4,
        icon: Library,
        title: "Digital Library",
        description: "25,000+ books, e-learning resources, quiet reading zones, and research facilities",
        image: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=2000"
    },
    {
        id: 5,
        icon: Bus,
        title: "Safe Transport",
        description: "GPS-enabled buses covering all major routes with trained staff and real-time tracking",
        image: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?q=80&w=2000"
    },
    {
        id: 6,
        icon: HeartPulse,
        title: "Medical Facility",
        description: "On-campus infirmary with qualified nurse, first-aid stations, and tie-up with nearby hospitals",
        image: "https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?q=80&w=2000"
    }
];

const safetyFeatures = [
    { icon: Camera, label: "24/7 CCTV" },
    { icon: Shield, label: "Secure Campus" },
    { icon: Wifi, label: "Smart Monitoring" },
    { icon: TreeDeciduous, label: "Green Environment" }
];

export function InfrastructureFacilities() {
    const [activeIndex, setActiveIndex] = useState(0);

    const nextSlide = () => {
        setActiveIndex((prev) => (prev + 1) % facilities.length);
    };

    const prevSlide = () => {
        setActiveIndex((prev) => (prev - 1 + facilities.length) % facilities.length);
    };

    return (
        <section className="py-16 md:py-24 bg-slate-50 relative overflow-hidden">
            <div className="container mx-auto px-4 md:px-8">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-12 md:mb-16"
                >
                    <span className="inline-block px-4 py-1.5 bg-royal/5 text-royal rounded-full text-xs font-bold tracking-widest uppercase mb-4">
                        World-Class Campus
                    </span>
                    <h2 className="text-3xl md:text-5xl font-serif font-bold text-royal mb-4">
                        Infrastructure That <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-dark to-gold">Inspires</span>
                    </h2>
                    <p className="text-royal/70 max-w-2xl mx-auto text-lg">
                        A sprawling campus equipped with modern facilities designed to provide the best learning environment for your child.
                    </p>
                </motion.div>

                {/* Featured Facility Showcase */}
                <div className="grid lg:grid-cols-2 gap-8 mb-12">
                    {/* Image Display */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="relative rounded-2xl overflow-hidden aspect-[4/3] lg:aspect-auto lg:h-[450px] shadow-2xl"
                    >
                        <div
                            className="absolute inset-0 bg-cover bg-center transition-all duration-500"
                            style={{ backgroundImage: `url('${facilities[activeIndex].image}')` }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-royal/80 via-transparent to-transparent" />

                        {/* Navigation Arrows */}
                        <div className="absolute bottom-4 right-4 flex gap-2">
                            <button
                                onClick={prevSlide}
                                className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                            >
                                <ChevronLeft className="w-5 h-5" />
                            </button>
                            <button
                                onClick={nextSlide}
                                className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                            >
                                <ChevronRight className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Current Facility Info Overlay */}
                        <div className="absolute bottom-0 left-0 right-0 p-6">
                            <div className="flex items-center gap-3 mb-2">
                                {(() => {
                                    const Icon = facilities[activeIndex].icon;
                                    return <Icon className="w-6 h-6 text-gold" />;
                                })()}
                                <h3 className="text-2xl font-bold text-white">{facilities[activeIndex].title}</h3>
                            </div>
                            <p className="text-white/80">{facilities[activeIndex].description}</p>
                        </div>
                    </motion.div>

                    {/* Facilities Grid */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="grid grid-cols-2 gap-3 md:gap-4"
                    >
                        {facilities.map((facility, index) => (
                            <button
                                key={facility.id}
                                onClick={() => setActiveIndex(index)}
                                className={`group p-4 md:p-5 rounded-xl text-left transition-all duration-300 border ${activeIndex === index
                                    ? 'bg-royal text-white border-royal shadow-lg'
                                    : 'bg-white border-royal/10 hover:border-gold/30 hover:shadow-md'
                                    }`}
                            >
                                <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 transition-colors ${activeIndex === index
                                    ? 'bg-gold/20'
                                    : 'bg-royal/5 group-hover:bg-gold/10'
                                    }`}>
                                    <facility.icon className={`w-5 h-5 ${activeIndex === index
                                        ? 'text-gold'
                                        : 'text-royal group-hover:text-gold'
                                        }`} />
                                </div>
                                <h4 className={`font-bold mb-1 text-sm md:text-base ${activeIndex === index ? '' : 'text-royal'
                                    }`}>{facility.title}</h4>
                                <p className={`text-xs md:text-sm line-clamp-2 ${activeIndex === index ? 'text-white/70' : 'text-royal/60'
                                    }`}>{facility.description}</p>
                            </button>
                        ))}
                    </motion.div>
                </div>

                {/* Safety Features Bar */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="flex flex-wrap justify-center gap-4 md:gap-8 p-6 bg-royal/5 rounded-2xl border border-royal/10"
                >
                    <span className="text-sm font-bold text-royal uppercase tracking-wider">Safety & Security:</span>
                    {safetyFeatures.map((feature, index) => (
                        <div key={index} className="flex items-center gap-2">
                            <feature.icon className="w-5 h-5 text-gold" />
                            <span className="text-sm text-royal/80">{feature.label}</span>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
