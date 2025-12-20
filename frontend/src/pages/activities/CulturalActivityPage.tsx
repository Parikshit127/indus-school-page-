
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/section";
import { Music, Palette, Mic, Drama } from "lucide-react";

export default function CulturalActivityPage() {
    return (
        <div className="min-h-screen bg-slate-50">
            <PageHero
                title="Arts & Culture"
                subtitle="Expressing the soul through creativity"
                image="https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=2070&auto=format&fit=crop"
            />

            <Section className="bg-white">
                <div className="flex flex-col md:flex-row gap-12 items-center">
                    <div className="flex-1">
                        <h2 className="text-3xl md:text-5xl font-serif text-royal font-bold mb-6">
                            Unleashing Creativity
                        </h2>
                        <p className="text-lg text-slate-600 leading-relaxed mb-6">
                            We believe that art is the highest form of hope. Our cultural activities provide a platform for students to explore their artistic talents, build confidence, and understand our rich heritage. From classical dance to modern theatre, every student finds their stage.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <span className="px-4 py-2 bg-pink-50 text-pink-700 rounded-full text-sm font-bold border border-pink-100">Classical Dance</span>
                            <span className="px-4 py-2 bg-purple-50 text-purple-700 rounded-full text-sm font-bold border border-purple-100">Theatre</span>
                            <span className="px-4 py-2 bg-orange-50 text-orange-700 rounded-full text-sm font-bold border border-orange-100">Fine Arts</span>
                            <span className="px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-bold border border-blue-100">Vocal Music</span>
                        </div>
                    </div>
                    <div className="flex-1 grid grid-cols-2 gap-4 items-start">
                        <img
                            src="https://images.unsplash.com/photo-1518834107812-67b0b7c58434?q=80&w=400&auto=format&fit=crop"
                            className="rounded-2xl shadow-lg w-full"
                            alt="Dance"
                            onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.src = 'https://via.placeholder.com/400x300/e2e8f0/64748b?text=Dance+Activity';
                            }}
                        />
                        <img
                            src="https://images.unsplash.com/photo-1501594907352-04cda38ebc29?q=80&w=400&auto=format&fit=crop"
                            className="rounded-2xl shadow-lg w-full"
                            alt="Celebration"
                            onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.src = 'https://via.placeholder.com/400x300/e2e8f0/64748b?text=Cultural+Event';
                            }}
                        />
                    </div>
                </div>
            </Section>

            <Section className="bg-off-white">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-serif text-royal font-bold">Cultural Clubs</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    <ClubCard
                        icon={<Music size={40} />}
                        title="Music Club"
                        desc="Indian Classical, Western, and Instrumental training. Regular jams and choir practices."
                        color="bg-rose-50 border-rose-100 text-rose-600"
                    />
                    <ClubCard
                        icon={<Palette size={40} />}
                        title="Fine Arts"
                        desc="Painting, sketching, and craft workshops. Organizing exhibitions and gallery walks."
                        color="bg-amber-50 border-amber-100 text-amber-600"
                    />
                    <ClubCard
                        icon={<Drama size={40} />}
                        title="Theatre & Drama"
                        desc="Street plays (Nukkad Natak), English plays, and mimes that sharpen expression and empathy."
                        color="bg-indigo-50 border-indigo-100 text-indigo-600"
                    />
                    <ClubCard
                        icon={<Mic size={40} />}
                        title="Public Speaking"
                        desc="Debates, declamations, and poetry recitation competitions to build oratory skills."
                        color="bg-emerald-50 border-emerald-100 text-emerald-600"
                    />
                </div>
            </Section>

            <Section className="bg-royal text-white">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-serif font-bold">Annual Festivities</h2>
                    <p className="text-white/60 mt-4">Celebrating our diverse heritage with joy</p>
                </div>
                <div className="grid md:grid-cols-3 gap-8">
                    <FestivalCard title="Annual Function" date="December" desc="The grandest event of the year featuring over 500 students on stage." />
                    <FestivalCard title="Teej & Diwali" date="Seasonal" desc="Traditional celebrations with rangoli, mehendi, and cultural performances." />
                    <FestivalCard title="Janmashtami" date="August" desc="Depicting the life of Lord Krishna through tableau and dance dramas." />
                </div>
            </Section>
        </div>
    );
}

function ClubCard({ icon, title, desc, color }: any) {
    return (
        <div className={`p-8 rounded-2xl border ${color} bg-white hover:-translate-y-2 transition-transform duration-300 shadow-sm hover:shadow-md`}>
            <div className={`mb-6 ${color.split(" ")[2]}`}>
                {icon}
            </div>
            <h3 className="text-xl font-bold text-royal mb-3">{title}</h3>
            <p className="text-slate-600 text-sm leading-relaxed">{desc}</p>
        </div>
    )
}

function FestivalCard({ title, date, desc }: any) {
    return (
        <div className="bg-royal-dark p-8 rounded-xl border border-white/10 hover:border-gold/50 transition-colors">
            <div className="text-gold text-sm font-bold uppercase tracking-widest mb-2">{date}</div>
            <h3 className="text-2xl font-serif font-bold mb-4">{title}</h3>
            <p className="text-white/70 leading-relaxed">{desc}</p>
        </div>
    )
}
