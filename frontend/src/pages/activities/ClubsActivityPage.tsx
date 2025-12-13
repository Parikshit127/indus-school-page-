
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/section";
import { Brain, Globe, Microscope, BookOpen, Lightbulb, Users } from "lucide-react";

export default function ClubsActivityPage() {
    return (
        <div className="min-h-screen bg-slate-50">
            <PageHero
                title="Academic Clubs"
                subtitle="Fostering innovation, critical thinking, and leadership"
                image="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=2022&auto=format&fit=crop"
            />

            <Section className="bg-white">
                <div className="max-w-4xl mx-auto text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-royal/5 text-royal rounded-full font-bold text-sm mb-6">
                        <Brain size={16} />
                        <span>Intellectual Growth</span>
                    </div>
                    <h2 className="text-3xl md:text-5xl font-serif text-royal font-bold mb-6">
                        Beyond Classroom Learning
                    </h2>
                    <p className="text-lg text-slate-600 leading-relaxed">
                        Our academic clubs are designed to spark curiosity and encourage deep dives into subjects of interest. From simulating United Nations assemblies to building robots, students engage in practical applications of their knowledge.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    <div className="bg-slate-50 rounded-2xl p-8 border border-slate-100 flex gap-6 hover:shadow-lg transition-shadow">
                        <div className="bg-blue-100 text-blue-600 w-16 h-16 rounded-xl flex items-center justify-center shrink-0">
                            <Globe size={32} />
                        </div>
                        <div>
                            <h3 className="text-2xl font-serif font-bold text-royal mb-2">Model United Nations (MUN)</h3>
                            <p className="text-slate-600 mb-4">
                                Our flagship intellectual event. Students role-play delegates to the United Nations and simulate UN committees.
                            </p>
                            <ul className="space-y-2 text-sm text-slate-500">
                                <li className="flex items-center gap-2">✔ Public Speaking & Diplomacy</li>
                                <li className="flex items-center gap-2">✔ Research & Analysis</li>
                                <li className="flex items-center gap-2">✔ Conflict Resolution</li>
                            </ul>
                        </div>
                    </div>

                    <div className="bg-slate-50 rounded-2xl p-8 border border-slate-100 flex gap-6 hover:shadow-lg transition-shadow">
                        <div className="bg-purple-100 text-purple-600 w-16 h-16 rounded-xl flex items-center justify-center shrink-0">
                            <Microscope size={32} />
                        </div>
                        <div>
                            <h3 className="text-2xl font-serif font-bold text-royal mb-2">Science & Innovation Club</h3>
                            <p className="text-slate-600 mb-4">
                                A space for budding scientists to experiment and invent. Includes robotics, electronics, and environmental science projects.
                            </p>
                            <ul className="space-y-2 text-sm text-slate-500">
                                <li className="flex items-center gap-2">✔ STEM Workshops</li>
                                <li className="flex items-center gap-2">✔ ATL (Atal Tinkering Lab) Activities</li>
                                <li className="flex items-center gap-2">✔ Science Exhibitions</li>
                            </ul>
                        </div>
                    </div>

                    <div className="bg-slate-50 rounded-2xl p-8 border border-slate-100 flex gap-6 hover:shadow-lg transition-shadow">
                        <div className="bg-amber-100 text-amber-600 w-16 h-16 rounded-xl flex items-center justify-center shrink-0">
                            <BookOpen size={32} />
                        </div>
                        <div>
                            <h3 className="text-2xl font-serif font-bold text-royal mb-2">Literary Society</h3>
                            <p className="text-slate-600 mb-4">
                                For those who love words. The society organizes creative writing workshops, book clubs, and the school newsletter.
                            </p>
                            <ul className="space-y-2 text-sm text-slate-500">
                                <li className="flex items-center gap-2">✔ Creative Writing</li>
                                <li className="flex items-center gap-2">✔ Editorial Board</li>
                                <li className="flex items-center gap-2">✔ Poetry Slams</li>
                            </ul>
                        </div>
                    </div>

                    <div className="bg-slate-50 rounded-2xl p-8 border border-slate-100 flex gap-6 hover:shadow-lg transition-shadow">
                        <div className="bg-emerald-100 text-emerald-600 w-16 h-16 rounded-xl flex items-center justify-center shrink-0">
                            <Users size={32} />
                        </div>
                        <div>
                            <h3 className="text-2xl font-serif font-bold text-royal mb-2">Community Service</h3>
                            <p className="text-slate-600 mb-4">
                                NSS and social service clubs that teach empathy and civic responsibility through field trips and donation drives.
                            </p>
                            <ul className="space-y-2 text-sm text-slate-500">
                                <li className="flex items-center gap-2">✔ Village Adoptions</li>
                                <li className="flex items-center gap-2">✔ Cleanliness Drives</li>
                                <li className="flex items-center gap-2">✔ Blind School Visits</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </Section>

            <Section className="bg-royal-dark text-white">
                <div className="flex flex-col md:flex-row gap-12 items-center">
                    <div className="flex-1">
                        <h3 className="text-3xl font-serif font-bold text-gold mb-4">Workshops & Seminars</h3>
                        <p className="text-white/80 mb-8 leading-relaxed">
                            We regularly invite experts to conduct workshops on various topics ranging from mental health to career counseling.
                        </p>
                        <div className="space-y-4">
                            <WorkshopItem title="Stress Management Workshop" date="2025" />
                            <WorkshopItem title="Seminar on Adolescence" date="Apr 2025" />
                            <WorkshopItem title="Career Guidance Sessions" date="Regular" />
                            <WorkshopItem title="Cyber Security Awareness" date="Annual" />
                        </div>
                    </div>
                    <div className="flex-1">
                        <div className="bg-white/5 p-8 rounded-2xl border border-white/10 relative overflow-hidden">
                            <Lightbulb className="text-gold absolute -top-6 -right-6 opacity-20" size={150} />
                            <blockquote className="relative z-10 text-xl font-serif italic leading-relaxed">
                                "The capacity to learn is a gift; the ability to learn is a skill; the willingness to learn is a choice."
                            </blockquote>
                            <p className="text-gold mt-4 font-bold">– Brian Herbert</p>
                        </div>
                    </div>
                </div>
            </Section>
        </div>
    );
}

function WorkshopItem({ title, date }: { title: string, date: string }) {
    return (
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <span className="font-bold text-lg">{title}</span>
            <span className="text-sm bg-white/10 px-3 py-1 rounded-full">{date}</span>
        </div>
    )
}
