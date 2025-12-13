import { Section } from "@/components/ui/section";
import { Library, FlaskConical, Monitor, Dna, Music, Trophy } from "lucide-react";

const facilities = [
    {
        icon: Monitor,
        title: "Smart Classrooms",
        desc: "Tech-enabled learning spaces with interactive panels."
    },
    {
        icon: FlaskConical,
        title: "Advanced Labs",
        desc: "State-of-the-art Physics, Chemistry, and Robotics labs."
    },
    {
        icon: Trophy,
        title: "Sports Complex",
        desc: "International standard courts for Basketball, Tennis, and more."
    },
    {
        icon: Library,
        title: "Digital Library",
        desc: "Extensive collection of books and digital resources."
    },
    {
        icon: Dna,
        title: "STEM Education",
        desc: "Focus on Science, Technology, Engineering, and Math."
    },
    {
        icon: Music,
        title: "Performing Arts",
        desc: "Dedicated studios for Music, Dance, and Theater."
    }
];

export function Infrastructure() {
    return (
        <Section id="campus" className="bg-cream">
            <div className="text-center mb-16">
                <h2 className="text-3xl md:text-5xl font-serif text-royal font-bold mb-4">
                    World-Class Infrastructure
                </h2>
                <p className="text-royal/70 max-w-2xl mx-auto">
                    Our campus is designed to provide a holistic environment where every student can explore their interests and excel.
                </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-8">
                {facilities.map((fac, idx) => (
                    <div
                        key={idx}
                        className="group bg-white p-4 md:p-8 rounded-xl shadow-sm hover:shadow-xl transition-all border border-royal/5 hover:border-gold/30"
                    >
                        <div className="w-10 h-10 md:w-14 md:h-14 bg-royal/5 text-royal rounded-lg flex items-center justify-center mb-3 md:mb-6 group-hover:bg-royal group-hover:text-gold transition-colors">
                            <fac.icon className="w-5 h-5 md:w-7 md:h-7" />
                        </div>
                        <h3 className="text-sm md:text-xl font-bold text-royal mb-1 md:mb-2">{fac.title}</h3>
                        <p className="text-xs md:text-base text-royal/60 line-clamp-2">{fac.desc}</p>
                    </div>
                ))}
            </div>
        </Section>
    );
}
