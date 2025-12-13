import { Section } from "@/components/ui/section";
import { PageHero } from "@/components/ui/PageHero";
import { BookOpen, Brain, Users, Globe, Activity, CheckCircle2, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2
        }
    }
};

export default function AcademicsPage() {
    return (
        <div className="bg-slate-50 min-h-screen">
            <PageHero
                title="Academic Excellence"
                subtitle="Blending Indian heritage with international standards. We nurture distinct personalities."
                image="https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=2070"
            />

            {/* Introduction & Curriculum */}
            <Section className="py-20">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                    >
                        <h2 className="text-3xl font-serif font-bold text-royal mb-6 flex items-center gap-3">
                            <BookOpen className="text-gold" size={32} />
                            Holistic Curriculum
                        </h2>
                        <div className="space-y-4 text-slate-600 leading-relaxed text-lg">
                            <p>
                                Indus Public School is affiliated to <strong>CBSE Board</strong>, New Delhi till class XII.
                            </p>
                            <p>
                                For Class I to VIII, we follow a unique, holistic school-based curriculum. It fits international standards while remaining deeply rooted in enhancing wider areas of learning. Our curriculum is comprehensively designed to make learning enjoyable, full of curiosity, practical, and experimental.
                            </p>
                        </div>
                    </motion.div>

                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={staggerContainer}
                        className="grid grid-cols-2 gap-4"
                    >
                        {['Medical', 'Non-Medical', 'Commerce', 'Humanities'].map((stream, idx) => (
                            <motion.div
                                key={stream}
                                variants={fadeInUp}
                                className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-lg hover:-translate-y-1 transition-all group"
                            >
                                <div className="w-10 h-10 bg-royal/5 rounded-full flex items-center justify-center text-royal mb-3 group-hover:bg-gold group-hover:text-royal-dark transition-colors font-bold">
                                    {idx + 1}
                                </div>
                                <h3 className="font-bold text-royal text-lg">{stream}</h3>
                                <p className="text-sm text-slate-400 mt-1">Senior Secondary</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </Section>

            {/* House System - Dark Section */}
            <section className="py-20 bg-royal text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-gold/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
                <div className="container mx-auto px-4 relative z-10">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                        className="text-center max-w-3xl mx-auto mb-16"
                    >
                        <div className="w-16 h-16 mx-auto bg-gold/20 rounded-2xl flex items-center justify-center text-gold mb-6 backdrop-blur-sm">
                            <Users size={32} />
                        </div>
                        <h2 className="text-4xl font-serif font-bold mb-4">The House System</h2>
                        <p className="text-white/80 text-lg">
                            Inspired by the tributaries of the Indus River. Fostering camaraderie, competition, and leadership.
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-4 gap-6">
                        {['Beas', 'Jhelum', 'Ravi', 'Sutluj'].map((house) => (
                            <motion.div
                                key={house}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                whileHover={{ scale: 1.05 }}
                                viewport={{ once: true }}
                                className="bg-white/10 backdrop-blur-md border border-white/20 p-8 rounded-2xl text-center hover:bg-white/20 transition-all cursor-default"
                            >
                                <h3 className="text-2xl font-bold text-gold mb-2">{house}</h3>
                                <p className="text-xs text-white/60 uppercase tracking-widest">House</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Communication & Wellbeing */}
            <Section className="py-20">
                <div className="space-y-32">
                    {/* Communication */}
                    <div className="grid lg:grid-cols-12 gap-12 items-center">
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={fadeInUp}
                            className="lg:col-span-5 order-2 lg:order-1"
                        >
                            <div className="relative">
                                <div className="absolute -inset-4 bg-gold/20 rounded-2xl rotate-3"></div>
                                <img
                                    src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=2070"
                                    alt="Public Speaking"
                                    className="relative rounded-2xl shadow-xl w-full h-auto object-cover"
                                />
                            </div>
                        </motion.div>
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={fadeInUp}
                            className="lg:col-span-7 order-1 lg:order-2"
                        >
                            <div className="inline-block px-4 py-1 bg-royal/10 text-royal rounded-full text-sm font-bold mb-4">
                                Global Standards
                            </div>
                            <h2 className="text-3xl md:text-4xl font-serif font-bold text-royal mb-6 flex items-center gap-3">
                                <Globe className="text-gold" />
                                World Class English Communication
                            </h2>
                            <p className="text-slate-600 text-lg mb-8 leading-relaxed">
                                We are the first in Rohtak to introduce a system blending Indian accents with International standards.
                                Led by an <strong>IELTS expert</strong>, we prepare students to be dynamic, charismatic speakers.
                            </p>
                            <div className="grid sm:grid-cols-2 gap-4">
                                {[
                                    "Public Speaking & Confidence",
                                    "Accent Neutralization",
                                    "Body Language Mastery",
                                    "Verbal & Non-Verbal Skills"
                                ].map(item => (
                                    <div key={item} className="flex items-center gap-3">
                                        <CheckCircle2 size={20} className="text-green-500 flex-shrink-0" />
                                        <span className="text-slate-700 font-medium">{item}</span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>

                    {/* Wellbeing */}
                    <div className="grid lg:grid-cols-12 gap-12 items-center">
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={fadeInUp}
                            className="lg:col-span-7"
                        >
                            <div className="flex items-center gap-3 mb-4 text-emerald-600">
                                <Activity size={28} />
                                <span className="font-bold uppercase tracking-wider">Mental Health Matters</span>
                            </div>
                            <h2 className="text-3xl md:text-4xl font-serif font-bold text-royal mb-6">
                                Academic Excellence with Wellbeing
                            </h2>
                            <p className="text-slate-600 text-lg mb-6 leading-relaxed">
                                Without wellbeing, academic performance declines. Our expert psychotherapist, with international research experience,
                                encourages students to open up about stress, anxiety, or depression.
                            </p>
                            <div className="p-6 bg-emerald-50 rounded-2xl border border-emerald-100 italic text-emerald-800">
                                "We facilitate one-to-one therapy to ensure every child's mind is as healthy as their grades."
                            </div>
                        </motion.div>
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={fadeInUp}
                            className="lg:col-span-5"
                        >
                            <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-100 relative overflow-hidden group">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/3 transition-transform group-hover:scale-150"></div>
                                <h3 className="text-2xl font-bold text-emerald-900 mb-4">Counselling Support</h3>
                                <ul className="space-y-4">
                                    <li className="flex items-start gap-4">
                                        <div className="p-2 bg-emerald-100 rounded-lg text-emerald-600 mt-1"><Brain size={18} /></div>
                                        <div>
                                            <h4 className="font-bold text-slate-800">Psychological Support</h4>
                                            <p className="text-sm text-slate-500">Expert guidance for mental disturbances.</p>
                                        </div>
                                    </li>
                                    <li className="flex items-start gap-4">
                                        <div className="p-2 bg-emerald-100 rounded-lg text-emerald-600 mt-1"><ArrowRight size={18} /></div>
                                        <div>
                                            <h4 className="font-bold text-slate-800">Behavioral Therapy</h4>
                                            <p className="text-sm text-slate-500">For discipline and behavioral adjustments.</p>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </Section>
        </div>
    );
}
