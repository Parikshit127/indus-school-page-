import { motion } from "framer-motion";
import { Users, GraduationCap, HeartHandshake, BookOpenCheck, Star, Award } from "lucide-react";

const facultyFeatures = [
    {
        icon: GraduationCap,
        title: "Qualified Teachers",
        stat: "150+",
        description: "Experienced educators with post-graduate degrees and specialized training in modern pedagogy"
    },
    {
        icon: Users,
        title: "Optimal Ratio",
        stat: "1:20",
        description: "Teacher-to-student ratio ensuring personalized attention and effective learning outcomes"
    },
    {
        icon: HeartHandshake,
        title: "Mentorship Program",
        stat: "100%",
        description: "Every student is assigned a mentor for academic guidance and emotional support"
    },
    {
        icon: BookOpenCheck,
        title: "Continuous Training",
        stat: "50+",
        description: "Annual hours of professional development for teaching staff"
    }
];

const careAspects = [
    {
        title: "Counseling Support",
        description: "Full-time counselor for academic, career, and personal guidance",
        icon: "🧠"
    },
    {
        title: "Parent Communication",
        description: "Regular PTMs, app-based updates, and open-door policy",
        icon: "💬"
    },
    {
        title: "Health Monitoring",
        description: "Regular health check-ups and wellness programs",
        icon: "🏥"
    },
    {
        title: "Discipline & Values",
        description: "Strong moral foundation with zero-tolerance for bullying",
        icon: "⚖️"
    }
];

export function FacultyStudentCare() {
    return (
        <section className="py-16 md:py-24 bg-white relative overflow-hidden">
            {/* Decorative background */}
            <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-cream/50 to-transparent" />

            <div className="container mx-auto px-4 md:px-8 relative z-10">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                    {/* Left - Faculty Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <span className="inline-block px-4 py-1.5 bg-royal/5 text-royal rounded-full text-xs font-bold tracking-widest uppercase mb-4">
                            Our Team
                        </span>
                        <h2 className="text-3xl md:text-4xl font-serif font-bold text-royal mb-4">
                            Dedicated Faculty, <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-dark to-gold">Nurturing Environment</span>
                        </h2>
                        <p className="text-royal/70 text-lg mb-8">
                            Our teachers are not just educators – they are mentors, guides, and role models who go beyond the curriculum to shape well-rounded individuals.
                        </p>

                        <div className="grid grid-cols-2 gap-4">
                            {facultyFeatures.map((feature, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className="group bg-gradient-to-br from-cream/80 to-white p-5 rounded-xl border border-royal/5 hover:border-gold/30 hover:shadow-lg transition-all"
                                >
                                    <div className="flex items-center gap-3 mb-3">
                                        <div className="w-10 h-10 bg-royal/5 rounded-lg flex items-center justify-center group-hover:bg-gold/10 transition-colors">
                                            <feature.icon className="w-5 h-5 text-royal group-hover:text-gold transition-colors" />
                                        </div>
                                        <span className="text-2xl font-bold text-gold">{feature.stat}</span>
                                    </div>
                                    <h4 className="font-bold text-royal mb-1">{feature.title}</h4>
                                    <p className="text-sm text-royal/60">{feature.description}</p>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Right - Student Care */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="relative"
                    >
                        {/* Main Card */}
                        <div className="bg-royal rounded-2xl p-6 md:p-8 shadow-2xl">
                            <div className="flex items-center gap-2 mb-6">
                                <Star className="w-6 h-6 text-gold" />
                                <h3 className="text-xl font-bold text-white">Student Well-Being First</h3>
                            </div>

                            <div className="space-y-4">
                                {careAspects.map((aspect, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, x: 20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 0.3 + index * 0.1 }}
                                        className="flex items-start gap-4 p-4 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-colors"
                                    >
                                        <span className="text-2xl">{aspect.icon}</span>
                                        <div>
                                            <h4 className="font-bold text-white mb-1">{aspect.title}</h4>
                                            <p className="text-sm text-white/70">{aspect.description}</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>

                            {/* Quote */}
                            <div className="mt-6 pt-6 border-t border-white/10">
                                <blockquote className="text-white/80 italic text-sm">
                                    "Every child is unique, and we nurture their individual strengths while guiding them to overcome challenges."
                                </blockquote>
                                <p className="text-gold text-sm mt-2 font-semibold">— Principal, Indus Public School</p>
                            </div>
                        </div>

                        {/* Floating Badge */}
                        <div className="absolute -top-4 -right-4 md:-top-6 md:-right-6 bg-white rounded-2xl p-4 shadow-xl border border-gold/20">
                            <div className="flex items-center gap-2">
                                <Award className="w-8 h-8 text-gold" />
                                <div>
                                    <div className="text-lg font-bold text-royal">Best Teacher Award</div>
                                    <div className="text-xs text-royal/60">State Level 2024</div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
