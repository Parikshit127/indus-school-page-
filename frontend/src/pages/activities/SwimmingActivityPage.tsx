
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/section";
import { Waves, Medal, ShieldCheck, Timer } from "lucide-react";
import { motion } from "framer-motion";

export default function SwimmingActivityPage() {
    return (
        <div className="min-h-screen bg-slate-50">
            <PageHero
                title="Swimming"
                subtitle="Dive into Excellence"
                image="https://images.unsplash.com/photo-1530549387789-4c1017266635?q=80&w=2070&auto=format&fit=crop"
            />

            <Section>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-24">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="text-4xl font-serif font-bold text-royal mb-6">Aquatic Excellence</h2>
                        <p className="text-lg text-slate-700 leading-relaxed mb-6">
                            Swimming at Indus Public School is more than just a sport; it's a life skill. Our state-of-the-art facilities ensure safe and professional training for students of all ages.
                        </p>
                        <p className="text-lg text-slate-700 leading-relaxed mb-6">
                            Whether you're a beginner learning the basics or a competitive swimmer aiming for gold, our pool is the perfect place to make a splash.
                        </p>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="relative h-[400px] rounded-3xl overflow-hidden shadow-2xl"
                    >
                        <img
                            src="https://images.unsplash.com/photo-1576610616656-d3aa5d1f4534?q=80&w=2070&auto=format&fit=crop"
                            alt="School Swimming Pool"
                            className="w-full h-full object-cover"
                            onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.src = 'https://via.placeholder.com/800x400/e2e8f0/64748b?text=School+Swimming+Pool';
                            }}
                        />
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    <FeatureCard
                        icon={<Waves size={32} />}
                        title="Half-Olympic Pool"
                        desc="A pristine, temperature-controlled half-Olympic size pool designed for both learning and competitive racing."
                    />
                    <FeatureCard
                        icon={<ShieldCheck size={32} />}
                        title="Safety First"
                        desc="Certified lifeguards are always on duty to ensure the highest safety standards for all students."
                    />
                    <FeatureCard
                        icon={<Medal size={32} />}
                        title="Pro Coaching"
                        desc="Expert coaches provide personalized training, focusing on technique, endurance, and speed."
                    />
                    <FeatureCard
                        icon={<Timer size={32} />}
                        title="Competitions"
                        desc="Regular inter-house and inter-school swimming meets to foster a competitive spirit."
                    />
                </div>
            </Section>
        </div>
    );
}

function FeatureCard({ icon, title, desc }: { icon: any, title: string, desc: string }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -10 }}
            className="bg-white p-8 rounded-2xl shadow-lg border border-slate-100 text-center"
        >
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl mb-6">
                {icon}
            </div>
            <h3 className="text-xl font-bold text-royal mb-4">{title}</h3>
            <p className="text-slate-600">{desc}</p>
        </motion.div>
    );
}
