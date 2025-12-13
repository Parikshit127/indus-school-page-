
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/section";
import { BookOpen, Users, Microscope, Calculator } from "lucide-react";
import { motion } from "framer-motion";

export default function CurriculumPage() {
    return (
        <div className="min-h-screen bg-slate-50">
            <PageHero
                title="Curriculum"
                subtitle="A Foundation for Future Leaders"
                image="https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=2132&auto=format&fit=crop"
            />

            <Section>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="order-2 md:order-1 relative h-[450px] rounded-3xl overflow-hidden shadow-2xl"
                    >
                        <img
                            src="https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=2070&auto=format&fit=crop"
                            alt="Science Laboratory"
                            className="w-full h-full object-cover"
                        />
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="order-1 md:order-2"
                    >
                        <h2 className="text-4xl font-serif font-bold text-royal mb-6">Holistic Curriculum</h2>
                        <p className="text-lg text-slate-600 leading-relaxed mb-6">
                            Indus follows a comprehensive curriculum designed and viewed yearly. Apart from imparting knowledge, equal emphasis is laid on the development of skills, values, and attitudes important for life and work.
                        </p>
                        <p className="text-lg text-slate-600 leading-relaxed mb-6">
                            Our curriculum is comprehensively designed to make learning enjoyable, curiosity-driven, practical, and experimental in order to prepare each little champ for bigger challenges.
                        </p>
                        <div className="bg-royal/5 p-6 rounded-2xl border border-royal/10">
                            <h4 className="font-bold text-royal mb-3">Academic Streams Offered:</h4>
                            <div className="grid grid-cols-2 gap-4">
                                <StreamItem icon={<Microscope size={20} />} title="Medical" />
                                <StreamItem icon={<Calculator size={20} />} title="Non-Medical" />
                                <StreamItem icon={<BookOpen size={20} />} title="Commerce" />
                                <StreamItem icon={<Users size={20} />} title="Humanities" />
                            </div>
                        </div>
                    </motion.div>
                </div>

                <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-slate-100">
                    <h3 className="text-3xl font-serif font-bold text-royal mb-8 text-center">Beyond Textbooks</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        <div>
                            <h4 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-3">
                                <span className="w-8 h-8 rounded-full bg-gold/20 text-gold-dark flex items-center justify-center text-sm font-bold">1</span>
                                Skill Development
                            </h4>
                            <p className="text-slate-600 leading-relaxed">
                                Within a safe and stimulating environment, we focus on both curriculum and skill development. We nurture communication, creative thinking, critical thinking, problem-solving, financial literacy, and self-management.
                            </p>
                        </div>
                        <div>
                            <h4 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-3">
                                <span className="w-8 h-8 rounded-full bg-gold/20 text-gold-dark flex items-center justify-center text-sm font-bold">2</span>
                                Comprehensive Assessment
                            </h4>
                            <p className="text-slate-600 leading-relaxed">
                                In order to understand the various levels of comprehension, the students are periodically assessed using creative assessment tools in all subjects, ensuring no child is left behind.
                            </p>
                        </div>
                    </div>
                </div>
            </Section>
        </div>
    );
}

function StreamItem({ icon, title }: { icon: any, title: string }) {
    return (
        <div className="flex items-center gap-3 bg-white p-3 rounded-xl border border-slate-100 shadow-sm">
            <div className="text-royal">
                {icon}
            </div>
            <span className="font-medium text-slate-700">{title}</span>
        </div>
    );
}
