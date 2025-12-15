
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/section";
import { Bird, Map, GraduationCap, Heart } from "lucide-react"; // Using Bird as an approximation for horse/animal if Horse isn't available
import { motion } from "framer-motion";

export default function HorseRidingActivityPage() {
    return (
        <div className="min-h-screen bg-slate-50">
            <PageHero
                title="Horse Riding"
                subtitle="Grace, Power, and Harmony"
                image="https://images.unsplash.com/photo-1578662996442-48f60103fc96?q=80&w=2070&auto=format&fit=crop"
            />

            <Section>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-24">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="order-2 md:order-1 relative h-[450px] rounded-3xl overflow-hidden shadow-2xl"
                    >
                        <img
                            src="https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?q=80&w=2070&auto=format&fit=crop"
                            alt="Student Horse Riding"
                            className="w-full h-full object-cover"
                            onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.src = 'https://via.placeholder.com/800x450/e2e8f0/64748b?text=Horse+Riding+Program';
                            }}
                        />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="order-1 md:order-2"
                    >
                        <h2 className="text-4xl font-serif font-bold text-royal mb-6">Equestrian Excellence</h2>
                        <p className="text-lg text-slate-700 leading-relaxed mb-6">
                            Horse riding is a noble sport that instills discipline, confidence, and empathy. At Indus Public School, we offer a unique opportunity for students to connect with these majestic animals.
                        </p>
                        <p className="text-lg text-slate-700 leading-relaxed mb-6">
                            Our riding school is equipped with well-trained horses and ponies, catering to both beginners and advanced riders under the guidance of expert instructors.
                        </p>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    <FeatureCard
                        icon={<Bird size={32} />} // Placeholder for Horse
                        title="The Stable"
                        desc="Home to a variety of well-groomed and friendly horses and ponies, suitable for riders of all skill levels."
                    />
                    <FeatureCard
                        icon={<Map size={32} />}
                        title="Training Arena"
                        desc="A spacious, enclosed sand arena specifically designed for safe and effective riding lessons and practice."
                    />
                    <FeatureCard
                        icon={<GraduationCap size={32} />}
                        title="Expert Instructors"
                        desc="Qualified trainers ensuring personalized attention, safety precautions, and skill progression for every student."
                    />
                    <FeatureCard
                        icon={<Heart size={32} />}
                        title="Holistic Benefits"
                        desc="Riding develops core strength, balance, coordination, and teaches valuable lessons in animal care and responsibility."
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
            <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-50 text-amber-700 rounded-2xl mb-6">
                {icon}
            </div>
            <h3 className="text-xl font-bold text-royal mb-4">{title}</h3>
            <p className="text-slate-600">{desc}</p>
        </motion.div>
    );
}
