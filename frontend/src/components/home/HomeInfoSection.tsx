import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, Bell, ArrowRight } from 'lucide-react';

const newsItems = [
    { text: "MUN DAY2 02.11.2025", date: "02 Nov", isNew: true },
    { text: "MUN DAY 1 01.11.2025", date: "01 Nov", isNew: true },
    { text: "One-day capacity building program on stress management", date: "24 Oct", isNew: false },
    { text: "Inter-school Debate Competition Results", date: "15 Oct", isNew: false },
    { text: "Annual Sports Meet Registration Open", date: "10 Oct", isNew: false },
];

const infraImages = [
    "/assets/home/infrastructure.png", // Existing generated image
    "https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=2086&auto=format&fit=crop", // Science Lab
    "https://images.unsplash.com/photo-1599687351724-dfa3c4ff81b1?q=80&w=2070&auto=format&fit=crop", // Sports
];

export function HomeInfoSection() {
    const [currentSlide, setCurrentSlide] = useState(0);

    // Auto-slide functionality
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % infraImages.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % infraImages.length);
    const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + infraImages.length) % infraImages.length);

    return (
        <section className="py-16 bg-white relative">
            {/* Decorative background element */}
            <div className="absolute top-0 right-0 w-1/3 h-full bg-slate-50 skew-x-12 -z-10" />

            <div className="container mx-auto px-4 md:px-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">

                    {/* COLUMN 1: OUR INFRASTRUCTURE (SLIDER) */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden group hover:shadow-xl transition-all duration-300"
                    >
                        {/* Header */}
                        <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-white">
                            <h2 className="text-xl font-bold text-royal uppercase tracking-wide flex items-center gap-2">
                                Infrastructure
                            </h2>
                            {/* Slider Controls */}
                            <div className="flex gap-1">
                                <button onClick={prevSlide} className="p-1 rounded-full hover:bg-slate-100 text-slate-400 hover:text-royal transition-colors">
                                    <ChevronLeft size={18} />
                                </button>
                                <button onClick={nextSlide} className="p-1 rounded-full hover:bg-slate-100 text-slate-400 hover:text-royal transition-colors">
                                    <ChevronRight size={18} />
                                </button>
                            </div>
                        </div>

                        {/* Image Slider */}
                        <div className="relative h-56 overflow-hidden bg-slate-200 group">
                            <AnimatePresence mode="wait">
                                <motion.img
                                    key={currentSlide}
                                    src={infraImages[currentSlide]}
                                    alt="Infrastructure"
                                    initial={{ opacity: 0, scale: 1.1 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.5 }}
                                    className="absolute inset-0 w-full h-full object-cover"
                                />
                            </AnimatePresence>

                            {/* Overlay Gradient */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                        </div>

                        {/* Content */}
                        <div className="p-6">
                            <h3 className="text-lg font-bold text-gray-800 mb-2">
                                World-Class Facilities
                            </h3>
                            <p className="text-slate-600 text-sm leading-relaxed mb-6 border-l-2 border-royal/30 pl-3">
                                Experience learning in our Interactive Smart-Classes and state-of-the-art labs designed to foster innovation and curiosity.
                            </p>

                            <Link
                                to="/facilities"
                                className="inline-flex items-center gap-2 text-sm font-bold text-royal hover:text-gold transition-colors group/link"
                            >
                                Read More <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
                            </Link>
                        </div>
                    </motion.div>

                    {/* COLUMN 2: WELCOME */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden hover:shadow-xl transition-all duration-300"
                    >
                        <div className="px-6 py-4 border-b border-slate-100 bg-white">
                            <h2 className="text-xl font-bold text-royal uppercase tracking-wide">
                                Welcome
                            </h2>
                        </div>

                        <div className="relative h-56 overflow-hidden">
                            <img
                                src="/assets/home/welcome.png"
                                alt="Students Welcome"
                                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-royal/10 mix-blend-multiply" />
                        </div>

                        <div className="p-6">
                            <h3 className="text-lg font-bold text-gray-800 mb-2">
                                Indus Public School
                            </h3>
                            <p className="text-slate-600 text-sm leading-relaxed mb-6 border-l-2 border-royal/30 pl-3">
                                Nestled in a lush green campus on NH-10. We are affiliated with CBSE, offering a holistic environment for holistic growth.
                            </p>

                            <Link
                                to="/about"
                                className="inline-flex items-center gap-2 text-sm font-bold text-royal hover:text-gold transition-colors group/link"
                            >
                                Read More <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
                            </Link>
                        </div>
                    </motion.div>

                    {/* COLUMN 3: NEWS & EVENTS */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col"
                    >
                        <div className="px-6 py-4 border-b border-slate-100 bg-white flex justify-between items-center">
                            <h2 className="text-xl font-bold text-royal uppercase tracking-wide">
                                News & Events
                            </h2>
                            <Bell className="w-5 h-5 text-gold" />
                        </div>

                        <div className="flex-1 bg-slate-50/50 p-2 overflow-y-auto max-h-[340px] custom-scrollbar">
                            <ul className="space-y-1">
                                {newsItems.map((item, index) => (
                                    <li key={index} className="group hover:bg-white hover:shadow-sm rounded-lg p-3 transition-all duration-200 border border-transparent hover:border-slate-100">
                                        <div className="flex gap-3">
                                            {/* Date Box */}
                                            <div className="flex flex-col items-center justify-center w-12 h-12 bg-white border border-slate-200 rounded-lg shrink-0 group-hover:border-royal/20 transition-colors">
                                                <span className="text-[10px] text-slate-500 uppercase font-bold">{item.date.split(' ')[1]}</span>
                                                <span className="text-lg font-bold text-royal leading-none">{item.date.split(' ')[0]}</span>
                                            </div>

                                            <div className="flex-1">
                                                <p className="text-sm text-slate-700 font-medium line-clamp-2 group-hover:text-royal transition-colors">
                                                    {item.text}
                                                </p>
                                                {item.isNew && (
                                                    <span className="inline-block mt-1 text-[10px] font-bold text-red-500 bg-red-50 px-1.5 py-0.5 rounded tracking-wider">
                                                        NEW
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Footer styling for news box (optional viewing more) */}
                        <div className="p-3 bg-slate-50 border-t border-slate-100 text-center">
                            <Link to="/news-events" className="text-xs font-bold text-slate-400 hover:text-royal uppercase tracking-wider transition-colors">
                                View All
                            </Link>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}
