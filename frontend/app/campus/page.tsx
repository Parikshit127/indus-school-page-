"use client";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import {
    Monitor, FlaskConical, Library, Utensils,
    Stethoscope, Bus, Book, Brain, MapPin
} from "lucide-react";
import { motion } from "framer-motion";

export default function CampusPage() {
    const facilities = [
        { icon: Monitor, title: "Smart Class Rooms", desc: "Interactive digital learning spaces." },
        { icon: FlaskConical, title: "Science Lab", desc: "Modern physics, chemistry & bio labs." },
        { icon: Library, title: "Library", desc: "Extensive collection of books & digital resources." },
        { icon: Utensils, title: "Hostel & Food", desc: "Nutritious meals & comfortable boarding." },
        { icon: Stethoscope, title: "School Clinic", desc: "24/7 medical assistance & regular checkups." },
        { icon: Bus, title: "Transport", desc: "Safe & GPS-enabled bus fleet." },
        { icon: Book, title: "School Book Shop", desc: "On-campus store for academic resources." },
        { icon: Monitor, title: "Computer Lab", desc: "High-tech computer systems for IT education." },
        { icon: Brain, title: "Psychological Counselling", desc: "Expert guidance for mental wellbeing." },
    ];

    return (
        <main className="min-h-screen bg-slate-50">
            <Navbar />

            {/* Hero Section */}
            <div className="relative h-[60vh] flex items-center justify-center bg-royal overflow-hidden">
                <div className="absolute inset-0 bg-black/40 z-10" />
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: "url('https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=2086&auto=format&fit=crop')" }}
                />
                <div className="relative z-20 text-center text-white px-4 pt-20">
                    <motion.h1
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        className="text-5xl md:text-7xl font-serif font-bold mb-4"
                    >
                        Our Campus
                    </motion.h1>
                    <p className="text-xl text-white/90 max-w-2xl mx-auto font-light">
                        A lush green sanctuary for learning on National Highway-10.
                    </p>
                </div>
            </div>

            {/* Campus Intro */}
            <Section className="bg-white">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="text-3xl md:text-5xl font-serif font-bold text-royal mb-6 leading-tight">
                            State-of-the-art Infrastructure
                        </h2>
                        <p className="text-lg text-royal/70 leading-relaxed mb-6">
                            Indus Public School spreads over a vast <span className="font-bold text-royal">lush green campus</span> on National Highway-10,
                            just a 30-minute drive from the Delhi Border.
                        </p>
                        <p className="text-lg text-royal/70 leading-relaxed mb-8">
                            Affiliated to the Central Board of Secondary Education (CBSE), Delhi up to Class XII,
                            we provide premium education across Medical, Non-Medical, Commerce, and Humanity streams in a
                            serene and pollution-free environment.
                        </p>

                        <div className="flex items-center gap-4 text-royal/80 bg-cream p-4 rounded-lg border-l-4 border-gold">
                            <MapPin className="shrink-0 text-gold" />
                            <span className="font-medium">Strategic Location: NH-10, Rohtak (30 mins from Delhi Border)</span>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="relative h-[400px] rounded-2xl overflow-hidden shadow-2xl"
                    >
                        {/* Video/Image Placeholder */}
                        <div
                            className="absolute inset-0 bg-cover bg-center transition-transform hover:scale-105 duration-700"
                            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1592066575517-58fbcebe58df?q=80&w=2070&auto=format&fit=crop')" }}
                        />
                    </motion.div>
                </div>
            </Section>

            {/* Facilities Grid */}
            <Section className="bg-royal text-white">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-serif font-bold mb-4">World-Class Facilities</h2>
                    <p className="text-white/60 max-w-2xl mx-auto">
                        We provide an environment that stimulates physical, mental, and social growth.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {facilities.map((fac, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            whileHover={{ scale: 1.05 }}
                            className="bg-white/5 border border-white/10 p-6 rounded-xl hover:bg-white/10 transition-colors cursor-default"
                        >
                            <div className="w-12 h-12 bg-gold/20 text-gold rounded-lg flex items-center justify-center mb-4">
                                <fac.icon size={24} />
                            </div>
                            <h3 className="text-xl font-bold mb-2 text-white">{fac.title}</h3>
                            <p className="text-sm text-white/60">{fac.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </Section>

            {/* Hostel Teaser (Since it was mentioned) */}
            <Section className="bg-white">
                <div className="bg-cream rounded-2xl p-8 md:p-16 text-center border border-gold/20">
                    <h2 className="text-3xl font-serif font-bold text-royal mb-4">Home Away From Home</h2>
                    <p className="text-royal/70 max-w-3xl mx-auto mb-8 text-lg">
                        Our hostel facilities ensure that students from distant locations feel safe, cared for, and disciplined.
                        With nutritious food and a structured daily routine, we ensure holistic development 24/7.
                    </p>
                    <Button variant="gold" size="lg">
                        View Hostel Details
                    </Button>
                </div>
            </Section>

            <Footer />
        </main>
    );
}
