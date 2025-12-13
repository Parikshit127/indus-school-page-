
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/section";
import { Brain, Users, Lightbulb } from "lucide-react";
import { motion } from "framer-motion";

export default function TeachingMethodologyPage() {
    return (
        <div className="min-h-screen bg-slate-50">
            <PageHero
                title="Teaching Methodology"
                subtitle="Nurturing Curiosity through Innovation"
                image="https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=1974&auto=format&fit=crop"
            />

            <Section>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-4xl font-serif font-bold text-royal mb-6">Innovative Teaching</h2>
                        <p className="text-lg text-slate-600 leading-relaxed mb-6">
                            Indus follows a comprehensive curriculum reviewed and updated yearly. Teachers are dynamic, life-changing, charismatic, and life-transforming mentors to students.
                        </p>
                        <p className="text-lg text-slate-600 leading-relaxed mb-6">
                            They are trained to use simple and comprehensive methods to impart knowledge. Both verbal, non-verbal, visual, and performance methods are used to engage students effectively.
                        </p>
                        <ul className="space-y-4">
                            <ListItem>Discovery-based learning approach</ListItem>
                            <ListItem>Multi-sensory educational tools</ListItem>
                            <ListItem>Individualized attention & mentorship</ListItem>
                        </ul>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="relative h-[450px] rounded-3xl overflow-hidden shadow-2xl"
                    >
                        <img
                            src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070&auto=format&fit=crop"
                            alt="Interactive Classroom"
                            className="w-full h-full object-cover"
                        />
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <FeatureCard
                        icon={<Brain size={32} />}
                        title="Cognitive Growth"
                        desc="Sequential and scientifically designed tools are used for different learning activities meant for multi-sensory aspects and individualized education."
                    />
                    <FeatureCard
                        icon={<Users size={32} />}
                        title="Interactive Learning"
                        desc="Our dedicated teachers adopt methodologies that suit the child’s inherent pursuit to discover and learn by 'doing'."
                    />
                    <FeatureCard
                        icon={<Lightbulb size={32} />}
                        title="Skill Application"
                        desc="We motivate our students to discover and probe; merge and attach; spread and connect; preserve and demonstrate what they learn."
                    />
                </div>
            </Section>
        </div>
    );
}

function ListItem({ children }: { children: React.ReactNode }) {
    return (
        <li className="flex items-center gap-3 text-slate-700">
            <span className="w-2 h-2 rounded-full bg-gold flex-shrink-0" />
            {children}
        </li>
    );
}

function FeatureCard({ icon, title, desc }: { icon: any, title: string, desc: string }) {
    return (
        <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-100 hover:-translate-y-2 transition-transform duration-300">
            <div className="inline-flex items-center justify-center w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl mb-6">
                {icon}
            </div>
            <h3 className="text-xl font-bold text-royal mb-4">{title}</h3>
            <p className="text-slate-600 leading-relaxed">{desc}</p>
        </div>
    );
}
