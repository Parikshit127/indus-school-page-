"use client";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { BookOpen, Brain, Globe, Heart, Activity } from "lucide-react";
import { motion } from "framer-motion";

export default function AcademicsPage() {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <main className="min-h-screen bg-slate-50">
            <Navbar />

            {/* Hero Section */}
            <div className="relative h-[60vh] flex items-center justify-center bg-royal overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-royal/90 to-royal/60 z-10" />
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: "url('https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=2070&auto=format&fit=crop')" }}
                />
                <div className="relative z-20 text-center text-white px-4 max-w-4xl mx-auto pt-20">
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-5xl md:text-7xl font-serif font-bold mb-6"
                    >
                        Academic Excellence
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                        className="text-xl md:text-2xl text-white/90 font-light"
                    >
                        A comprehensive curriculum designed for the holistic development of every child.
                    </motion.p>
                </div>
            </div>

            {/* Curriculum Intro */}
            <Section className="bg-white">
                <div className="max-w-4xl mx-auto text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-serif text-royal font-bold mb-6">Our Curriculum</h2>
                    <p className="text-lg text-royal/70 leading-relaxed mb-6">
                        Indus follows a comprehensive curriculum designed and reviewed yearly. Apart from imparting knowledge,
                        equal emphasis is laid on the development of skills, values, and attitudes important for life and work.
                    </p>
                    <p className="text-lg text-royal/70 leading-relaxed">
                        We focus on both curriculum and skill development. As per experts, skills like communication, creative thinking,
                        critical thinking, finance, and self-management are best garnered at this stage.
                    </p>
                </div>

                {/* 4 Streams Grid */}
                <div className="grid md:grid-cols-4 gap-6 hover:cursor-default">
                    {['Medical', 'Non-Medical', 'Commerce', 'Humanities'].map((stream, idx) => (
                        <motion.div
                            whileHover={{ y: -10 }}
                            key={stream}
                            className="bg-cream border border-gold/20 p-8 rounded-xl text-center shadow-md hover:shadow-xl transition-all"
                        >
                            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 text-royal shadow-sm">
                                <BookOpen size={28} />
                            </div>
                            <h3 className="text-xl font-bold text-royal">{stream}</h3>
                            <div className="h-1 w-12 bg-gold mx-auto mt-4" />
                        </motion.div>
                    ))}
                </div>
            </Section>

            {/* House System */}
            <Section className="bg-royal text-white overflow-hidden">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6">
                        <h2 className="text-3xl md:text-4xl font-serif font-bold text-gold">The House System</h2>
                        <p className="text-white/80 leading-relaxed">
                            The school has a 4-house system named after the tributaries of the Indus River:
                            <span className="font-semibold text-white ml-1">Beas, Jhelum, Ravi, and Sutluj.</span>
                        </p>
                        <p className="text-white/80 leading-relaxed">
                            The River Indus system represents some of the largest habitations of the ancient world.
                            Naming our houses after these rivers connects our students to a legacy of civilization, strength, and flow.
                        </p>
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
                            {['Beas', 'Jhelum', 'Ravi', 'Sutluj'].map(house => (
                                <div key={house} className="bg-white/10 border border-white/20 rounded-lg p-4 text-center font-serif font-bold tracking-wider hover:bg-gold hover:text-royal transition-colors cursor-default">
                                    {house}
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="relative h-64 md:h-96 rounded-lg overflow-hidden  shadow-2xl border-4 border-white/10">
                        {/* Placeholder for River/Map Image */}
                        <div
                            className="absolute inset-0 bg-cover bg-center"
                            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2070&auto=format&fit=crop')" }}
                        />
                    </div>
                </div>
            </Section>

            {/* Communication & Well-being */}
            <Section className="bg-white">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={containerVariants}
                    className="grid md:grid-cols-2 gap-16"
                >
                    {/* Section 1 */}
                    <motion.div variants={itemVariants} className="space-y-6">
                        <div className="w-12 h-12 bg-royal/10 text-royal rounded-lg flex items-center justify-center">
                            <Globe size={28} />
                        </div>
                        <h3 className="text-2xl font-serif font-bold text-royal">World Class English Communication</h3>
                        <p className="text-royal/70 leading-relaxed">
                            We are one of the first schools in India to introduce a World Class English Communication System.
                            Students learn to blend Indian and International accents, master body language, and build confidence.
                        </p>
                        <ul className="space-y-2 text-royal/80">
                            <li className="flex items-center gap-2"><div className="w-2 h-2 bg-gold rounded-full" /> IELTS Expert Led Training</li>
                            <li className="flex items-center gap-2"><div className="w-2 h-2 bg-gold rounded-full" /> Public Speaking & Charisma</li>
                            <li className="flex items-center gap-2"><div className="w-2 h-2 bg-gold rounded-full" /> Verbal & Non-Verbal Skills</li>
                        </ul>
                    </motion.div>

                    {/* Section 2 */}
                    <motion.div variants={itemVariants} className="space-y-6">
                        <div className="w-12 h-12 bg-gold/20 text-royal rounded-lg flex items-center justify-center">
                            <Heart size={28} />
                        </div>
                        <h3 className="text-2xl font-serif font-bold text-royal">Academic Excellence with Wellbeing</h3>
                        <p className="text-royal/70 leading-relaxed">
                            Without wellbeing, academic performance declines. Our expert psychotherapist and counselor supports
                            students through stress, anxiety, or any mental disturbances.
                        </p>
                        <div className="bg-cream border-l-4 border-gold p-4 italic text-royal/80">
                            "We facilitate the wellbeing of students to improve their academic performance."
                        </div>
                        <p className="text-royal/70 leading-relaxed">
                            We encourage students to open up and share their problems, receiving one-on-one therapy to ensure they are mentally strong and ready to learn.
                        </p>
                    </motion.div>
                </motion.div>
            </Section>

            {/* Teaching Methodology */}
            <Section className="bg-slate-100">
                <div className="max-w-4xl mx-auto text-center space-y-8">
                    <div className="mx-auto w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-md text-gold">
                        <Brain size={32} />
                    </div>
                    <h2 className="text-3xl md:text-4xl font-serif font-bold text-royal">Our Teaching Methodology</h2>
                    <p className="text-lg text-royal/70 leading-relaxed">
                        Our teachers are dynamic, life-changing mentors. We adopt a methodology that suits the child’s inherent pursuit to
                        <span className="font-bold text-royal"> discover and learn by "doing"</span>.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8 text-left">
                        {[
                            { title: "Sequential Tools", desc: "Scientifically designed tools for different learning activities." },
                            { title: "Multi-sensory", desc: "Engaging all senses to deepen understanding." },
                            { title: "Individualized", desc: "Focus on the unique pace and style of every student." }
                        ].map((item, i) => (
                            <div key={i} className="bg-white p-6 rounded-lg shadow-sm">
                                <h4 className="font-bold text-royal mb-2">{item.title}</h4>
                                <p className="text-sm text-royal/60">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </Section>

            {/* CTA */}
            <div className="bg-royal py-16 text-center text-white">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-serif font-bold mb-6">Join the Legacy of Excellence</h2>
                    <p className="text-white/70 mb-8 max-w-xl mx-auto">
                        Give your child the advantage of a holistic, world-class education rooted in traditional values.
                    </p>
                    <Button size="lg" variant="gold" className="text-lg px-10">
                        Apply for Admission
                    </Button>
                </div>
            </div>

            <Footer />
        </main>
    );
}
