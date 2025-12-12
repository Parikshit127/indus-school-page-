import { Section } from "@/components/ui/section";
import { GraduationCap, BookOpen, Users } from "lucide-react";

export function SchoolOverview() {
    return (
        <Section id="about" className="bg-white">
            <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                    <div className="inline-block bg-royal/5 text-royal px-4 py-1 rounded-full text-sm font-semibold tracking-wide">
                        Our Legacy
                    </div>
                    <h2 className="text-3xl md:text-5xl font-serif text-royal font-bold">
                        Two Decades of <br />Academic Distinction
                    </h2>
                    <p className="text-royal/70 text-lg leading-relaxed">
                        Founded in 2003, Indus Public School has stood as a beacon of educational excellence in Rohtak. We believe in nurturing not just students, but future leaders who are grounded in values and soaring in ambition.
                    </p>
                    <p className="text-royal/70 text-lg leading-relaxed">
                        Our philosophy blends traditional discipline with modern pedagogical methods, ensuring every child receives personalized attention to unlock their true potential.
                    </p>

                    <div className="grid grid-cols-3 gap-6 pt-6">
                        <div className="text-center space-y-2">
                            <div className="w-12 h-12 bg-gold/10 text-gold mx-auto flex items-center justify-center rounded-full">
                                <GraduationCap size={24} />
                            </div>
                            <div className="font-bold text-royal text-xl">20+</div>
                            <div className="text-sm text-royal/60">Years of Excellence</div>
                        </div>
                        <div className="text-center space-y-2">
                            <div className="w-12 h-12 bg-gold/10 text-gold mx-auto flex items-center justify-center rounded-full">
                                <Users size={24} />
                            </div>
                            <div className="font-bold text-royal text-xl">5000+</div>
                            <div className="text-sm text-royal/60">Alumni Network</div>
                        </div>
                        <div className="text-center space-y-2">
                            <div className="w-12 h-12 bg-gold/10 text-gold mx-auto flex items-center justify-center rounded-full">
                                <BookOpen size={24} />
                            </div>
                            <div className="font-bold text-royal text-xl">100%</div>
                            <div className="text-sm text-royal/60">College Acceptance</div>
                        </div>
                    </div>
                </div>

                <div className="relative">
                    <div className="aspect-[4/5] rounded-lg overflow-hidden relative shadow-2xl">
                        {/* Placeholder Image */}
                        <img
                            src="https://images.unsplash.com/photo-1544531586-fde5298cdd40?q=80&w=2070&auto=format&fit=crop"
                            alt="Student in library"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-cream rounded-lg shadow-xl p-6 flex flex-col justify-center items-center border border-gold/20 hidden md:flex">
                        <span className="text-gold text-5xl font-serif font-bold">1st</span>
                        <span className="text-royal text-sm text-center mt-2 font-medium">Ranked Day-Cum-Boarding School in Rohtak</span>
                    </div>
                </div>
            </div>
        </Section>
    );
}
