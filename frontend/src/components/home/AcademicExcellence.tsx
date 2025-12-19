import { motion } from "framer-motion";
import { BookOpen, Brain, Laptop, Target, Lightbulb, Sparkles } from "lucide-react";

const academicFeatures = [
    {
        icon: BookOpen,
        title: "Comprehensive Curriculum",
        description: "CBSE-aligned curriculum enhanced with supplementary learning modules for holistic development",
        highlights: ["NCERT + Beyond Textbook", "Experiential Learning", "Project-Based Learning"]
    },
    {
        icon: Brain,
        title: "Concept-First Approach",
        description: "Focus on understanding over rote learning with visual aids, experiments, and real-world applications",
        highlights: ["Visual Learning", "Lab Experiments", "Real-World Projects"]
    },
    {
        icon: Laptop,
        title: "Technology Integration",
        description: "Smart classrooms, digital assessments, and AI-powered learning platforms",
        highlights: ["Smart Boards", "Digital Library", "Online Assessments"]
    },
    {
        icon: Target,
        title: "Future Skills Program",
        description: "Coding, robotics, financial literacy, and communication skills for 21st-century readiness",
        highlights: ["Coding & Robotics", "Public Speaking", "Critical Thinking"]
    }
];

const keyStats = [
    { value: "100%", label: "Pass Rate" },
    { value: "92%", label: "Distinction Rate" },
    { value: "1:20", label: "Teacher Ratio" },
    { value: "15+", label: "Olympiad Medals" }
];

export function AcademicExcellence() {
    return (
        <section className="py-16 md:py-24 bg-royal">
            <div className="container mx-auto px-4 md:px-8">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-12 md:mb-16"
                >
                    <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-gold/20 text-gold rounded-full text-xs font-bold tracking-widest uppercase mb-4 border border-gold/30">
                        <Sparkles className="w-3 h-3" />
                        Academic Excellence
                    </span>
                    <h2 className="text-3xl md:text-5xl font-serif font-bold text-white mb-4">
                        Where Learning Meets <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold to-gold-light">Innovation</span>
                    </h2>
                    <p className="text-white/70 max-w-2xl mx-auto text-lg">
                        Our curriculum goes beyond textbooks to develop analytical thinking, creativity, and real-world problem-solving skills.
                    </p>
                </motion.div>

                {/* Key Stats Bar */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="flex flex-wrap justify-center gap-8 md:gap-16 mb-12 md:mb-16 py-6 border-y border-white/10"
                >
                    {keyStats.map((stat, index) => (
                        <div key={index} className="text-center">
                            <div className="text-3xl md:text-4xl font-bold text-gold">{stat.value}</div>
                            <div className="text-sm text-white/60 uppercase tracking-wider">{stat.label}</div>
                        </div>
                    ))}
                </motion.div>

                {/* Features Grid */}
                <div className="grid md:grid-cols-2 gap-6 md:gap-8">
                    {academicFeatures.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="group bg-white/5 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-white/10 hover:bg-white/10 hover:border-gold/30 transition-all duration-300"
                        >
                            <div className="flex items-start gap-4">
                                <div className="w-14 h-14 bg-gradient-to-br from-gold/20 to-gold/10 rounded-xl flex items-center justify-center shrink-0 group-hover:from-gold/30 group-hover:to-gold/20 transition-all">
                                    <feature.icon className="w-7 h-7 text-gold" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                                    <p className="text-white/70 mb-4">{feature.description}</p>
                                    <div className="flex flex-wrap gap-2">
                                        {feature.highlights.map((highlight, hIndex) => (
                                            <span
                                                key={hIndex}
                                                className="inline-flex items-center gap-1 px-3 py-1 bg-white/5 rounded-full text-xs text-white/80 border border-white/10"
                                            >
                                                <Lightbulb className="w-3 h-3 text-gold" />
                                                {highlight}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Bottom CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mt-12"
                >
                    <a
                        href="/academics"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-gold text-royal font-bold rounded-full hover:bg-gold-light transition-colors shadow-lg shadow-gold/20"
                    >
                        Explore Our Curriculum
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </a>
                </motion.div>
            </div>
        </section>
    );
}
