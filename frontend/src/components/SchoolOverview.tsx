import { Section } from "@/components/ui/section";
import { GraduationCap, BookOpen, Users, Target, Heart, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

const keyHighlights = [
    { icon: GraduationCap, value: "22+", label: "Years of Excellence", desc: "Established legacy since 2003" },
    { icon: Users, value: "5000+", label: "Alumni Network", desc: "Successful professionals globally" },
    { icon: BookOpen, value: "100%", label: "College Acceptance", desc: "Every student placed" }
];

const coreValues = [
    { icon: Target, title: "Academic Rigor", desc: "CBSE curriculum with enhanced learning modules" },
    { icon: Heart, title: "Character Building", desc: "Values, discipline, and moral education" },
    { icon: Sparkles, title: "Holistic Growth", desc: "Sports, arts, and personality development" }
];

export function SchoolOverview() {
    return (
        <Section id="about" className="bg-white relative overflow-hidden">
            {/* Decorative background */}
            <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-cream/50 to-transparent -z-10" />

            <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
                {/* Left Content */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="space-y-6"
                >
                    <div className="inline-block bg-gradient-to-r from-royal/10 to-royal/5 text-royal px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase">
                        Our Legacy
                    </div>

                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-royal font-bold leading-tight">
                        Two Decades of <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-dark to-gold">Academic Distinction</span>
                    </h2>

                    <p className="text-royal/70 text-lg leading-relaxed">
                        Founded in 2003, <strong>Indus Public School</strong> has stood as a beacon of educational excellence in Rohtak. We believe in nurturing not just students, but future leaders who are grounded in values and soaring in ambition.
                    </p>

                    <p className="text-royal/70 text-lg leading-relaxed">
                        Our philosophy blends <strong>traditional discipline</strong> with <strong>modern pedagogical methods</strong>, ensuring every child receives personalized attention to unlock their true potential.
                    </p>

                    {/* Key Highlights */}
                    <div className="grid grid-cols-3 gap-4 pt-6 border-t border-royal/10">
                        {keyHighlights.map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="text-center space-y-2"
                            >
                                <div className="w-12 h-12 bg-gradient-to-br from-gold/20 to-gold/10 text-gold mx-auto flex items-center justify-center rounded-xl">
                                    <item.icon size={24} />
                                </div>
                                <div className="font-bold text-royal text-xl">{item.value}</div>
                                <div className="text-sm font-medium text-royal/80">{item.label}</div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Core Values */}
                    <div className="space-y-3 pt-4">
                        {coreValues.map((value, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.3 + index * 0.1 }}
                                className="flex items-start gap-3 p-3 bg-cream/50 rounded-xl hover:bg-cream transition-colors"
                            >
                                <div className="w-10 h-10 bg-royal/5 rounded-lg flex items-center justify-center shrink-0">
                                    <value.icon className="w-5 h-5 text-royal" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-royal">{value.title}</h4>
                                    <p className="text-sm text-royal/60">{value.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Right - Image Stack */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="relative"
                >
                    {/* Main Image */}
                    <div className="aspect-[4/5] rounded-2xl overflow-hidden relative shadow-2xl">
                        <img
                            src="https://www.ipsrohtak.edu.in/downloads/photos/images/n62416c2116451.jpg"
                            alt="Students at Indus Public School"
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-royal/40 via-transparent to-transparent" />
                    </div>

                    {/* Floating Badge - Left */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 }}
                        className="absolute -bottom-6 -left-6 md:-bottom-10 md:-left-10 bg-white rounded-2xl shadow-2xl p-4 md:p-6 flex flex-col justify-center items-center border border-gold/20 w-36 md:w-48"
                    >
                        <span className="text-gold text-4xl md:text-5xl font-serif font-bold">#1</span>
                        <span className="text-royal text-xs md:text-sm text-center mt-2 font-medium leading-tight">Ranked Day-Cum-Boarding School in Rohtak</span>
                    </motion.div>

                    {/* Floating Badge - Right */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5 }}
                        className="absolute -top-4 -right-4 md:-top-6 md:-right-6 bg-royal rounded-xl shadow-xl p-3 md:p-4 text-center"
                    >
                        <div className="text-gold font-bold text-xl md:text-2xl">CBSE</div>
                        <div className="text-white/80 text-xs">Affiliated</div>
                    </motion.div>
                </motion.div>
            </div>
        </Section>
    );
}
