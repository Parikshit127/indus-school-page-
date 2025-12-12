import { Section } from "@/components/ui/section";
import { Trophy, Star, Award, TrendingUp } from "lucide-react";

export function Achievements() {
    const achievements = [
        {
            title: "Board Results",
            value: "100%",
            desc: "Class X & XII Pass Rate",
            icon: TrendingUp,
        },
        {
            title: "Distinctions",
            value: "450+",
            desc: "Subject Distinctions in 2024",
            icon: Star,
        },
        {
            title: "Olympiads",
            value: "50+",
            desc: "National Level Medalists",
            icon: Trophy,
        },
        {
            title: "Awards",
            value: "#1",
            desc: "Best Infrastructure Award 2024",
            icon: Award,
        },
    ];

    return (
        <Section className="bg-royal text-white">
            <div className="text-center mb-16">
                <h2 className="text-3xl md:text-5xl font-serif font-bold mb-4">
                    Academic Excellence
                </h2>
                <p className="text-white/70 max-w-2xl mx-auto">
                    Our consistent track record in CBSE Board Examinations and competitive arenas speaks to our commitment to academic rigor.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {achievements.map((item, index) => (
                    <div
                        key={index}
                        className="p-6 md:p-8 border border-white/10 rounded-xl bg-white/5 hover:bg-white/10 transition-colors text-center group"
                    >
                        <div className="w-16 h-16 mx-auto bg-gold/10 rounded-full flex items-center justify-center text-gold mb-6 group-hover:scale-110 transition-transform">
                            <item.icon size={32} />
                        </div>
                        <h3 className="text-4xl font-bold text-gold mb-2">{item.value}</h3>
                        <h4 className="text-xl font-medium text-white mb-2">{item.title}</h4>
                        <p className="text-sm text-white/60">{item.desc}</p>
                    </div>
                ))}
            </div>
        </Section>
    );
}
