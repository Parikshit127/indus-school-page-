import { motion } from "framer-motion";
import { Palette, Trophy, Music, Users2, Target, Sparkles } from "lucide-react";

const developmentAreas = [
    {
        icon: Trophy,
        title: "Sports Excellence",
        outcomes: ["Physical Fitness", "Team Spirit", "Competitive Edge"],
        activities: "Cricket, Basketball, Swimming, Athletics, Table Tennis",
        color: "from-orange-400 to-red-500"
    },
    {
        icon: Palette,
        title: "Arts & Creativity",
        outcomes: ["Creative Expression", "Fine Motor Skills", "Cultural Awareness"],
        activities: "Painting, Craft, Drama, Dance, Photography",
        color: "from-purple-400 to-pink-500"
    },
    {
        icon: Music,
        title: "Performing Arts",
        outcomes: ["Stage Confidence", "Musical Aptitude", "Self-Expression"],
        activities: "Vocal Music, Instrumental, Theatre, Public Speaking",
        color: "from-blue-400 to-cyan-500"
    },
    {
        icon: Users2,
        title: "Leadership & Life Skills",
        outcomes: ["Decision Making", "Communication", "Empathy"],
        activities: "Student Council, Debates, Community Service, Clubs",
        color: "from-green-400 to-emerald-500"
    }
];

const transformationOutcomes = [
    { before: "Hesitant Speaker", after: "Confident Presenter" },
    { before: "Individual Player", after: "Team Leader" },
    { before: "Rote Learner", after: "Critical Thinker" },
    { before: "Shy Personality", after: "Stage Performer" }
];

export function HolisticDevelopment() {
    return (
        <section className="py-16 md:py-24 bg-gradient-to-b from-cream via-white to-cream relative overflow-hidden">
            {/* Background decorations */}
            <div className="absolute top-20 left-10 w-32 h-32 bg-gold/10 rounded-full blur-3xl" />
            <div className="absolute bottom-20 right-10 w-40 h-40 bg-royal/10 rounded-full blur-3xl" />

            <div className="container mx-auto px-4 md:px-8 relative z-10">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-12 md:mb-16"
                >
                    <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-royal/5 text-royal rounded-full text-xs font-bold tracking-widest uppercase mb-4">
                        <Sparkles className="w-3 h-3 text-gold" />
                        Beyond Academics
                    </span>
                    <h2 className="text-3xl md:text-5xl font-serif font-bold text-royal mb-4">
                        Holistic Development for <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-dark to-gold">Complete Growth</span>
                    </h2>
                    <p className="text-royal/70 max-w-2xl mx-auto text-lg">
                        We believe education extends beyond textbooks. Our programs develop character, confidence, and capabilities for lifelong success.
                    </p>
                </motion.div>

                {/* Development Areas Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                    {developmentAreas.map((area, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="group relative bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-royal/5 overflow-hidden"
                        >
                            {/* Gradient background on hover */}
                            <div className={`absolute inset-0 bg-gradient-to-br ${area.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />

                            <div className="relative z-10">
                                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${area.color} flex items-center justify-center mb-4 shadow-lg`}>
                                    <area.icon className="w-7 h-7 text-white" />
                                </div>

                                <h3 className="text-xl font-bold text-royal mb-3">{area.title}</h3>

                                {/* Outcomes */}
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {area.outcomes.map((outcome, oIndex) => (
                                        <span
                                            key={oIndex}
                                            className="inline-flex items-center gap-1 px-2 py-1 bg-cream/50 rounded-lg text-xs font-medium text-royal/80"
                                        >
                                            <Target className="w-3 h-3 text-gold" />
                                            {outcome}
                                        </span>
                                    ))}
                                </div>

                                <p className="text-sm text-royal/60 border-t border-royal/10 pt-3">
                                    <strong className="text-royal/80">Activities: </strong>
                                    {area.activities}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Child Transformation Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="bg-royal rounded-2xl p-6 md:p-10 shadow-2xl"
                >
                    <div className="text-center mb-8">
                        <h3 className="text-2xl md:text-3xl font-serif font-bold text-white mb-2">
                            The Indus Transformation
                        </h3>
                        <p className="text-white/70">
                            Watch your child grow from potential to performance
                        </p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                        {transformationOutcomes.map((outcome, index) => (
                            <div key={index} className="text-center">
                                <div className="bg-white/10 rounded-xl p-4 mb-3">
                                    <div className="text-sm text-white/60 mb-2 line-through">{outcome.before}</div>
                                    <div className="w-4 h-4 mx-auto border-2 border-gold rounded-full flex items-center justify-center my-2">
                                        <svg className="w-2 h-2 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                                        </svg>
                                    </div>
                                    <div className="text-base font-bold text-gold">{outcome.after}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
