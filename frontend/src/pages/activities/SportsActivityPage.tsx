
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/section";
import { Trophy, Medal, Star, Target, Activity } from "lucide-react";

export default function SportsActivityPage() {
    return (
        <div className="min-h-screen bg-slate-50">
            <PageHero
                title="Sports & Athletics"
                subtitle="Champions are made when no one is watching"
                image="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=2070&auto=format&fit=crop"
            />

            <Section className="bg-white">
                <div className="max-w-4xl mx-auto text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-serif text-royal font-bold mb-6">
                        Sporting Excellence
                    </h2>
                    <p className="text-lg text-slate-600 leading-relaxed">
                        At Indus Public School, sports are not just an extra-curricular activity but a way of life. We believe in nurturing physical fitness, teamwork, discipline, and a competitive spirit. Our state-of-the-art infrastructure and expert coaching have produced national and state-level champions.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <FeatureCard
                        icon={<Target size={32} />}
                        title="Professional Coaching"
                        desc="Specialized coaches for Cricket, Football, Basketball, Skating, and Martial Arts ensure students receive the best training."
                    />
                    <FeatureCard
                        icon={<Activity size={32} />}
                        title="Physical Fitness"
                        desc="Regular physical education periods and fitness assessments to ensure holistic health and well-being."
                    />
                    <FeatureCard
                        icon={<Trophy size={32} />}
                        title="Competitive Exposure"
                        desc="Students actively participate and win in CBSE Cluster, Zonal, State, and National level tournaments."
                    />
                </div>
            </Section>

            <Section className="bg-slate-900 text-white">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div>
                        <h3 className="text-3xl font-serif font-bold text-gold mb-6">World-Class Facilities</h3>
                        <ul className="space-y-6">
                            <FacilityItem title="Cricket Academy" desc="Full-sized ground with practiced nets and pitch." />
                            <FacilityItem title="Football Turf" desc="Standard football field for practice and matches." />
                            <FacilityItem title="Skating Rink" desc="Dedicated rink for speed and artistic skating." />
                            <FacilityItem title="Indoor Sports Hall" desc="Badminton courts, Table Tennis, and Judo arena." />
                            <FacilityItem title="Basketball Court" desc="Synthetic court for professional play." />
                        </ul>
                    </div>
                    <div className="relative h-[600px] rounded-2xl overflow-hidden shadow-2xl border border-white/10">
                        <img
                            src="https://ipsrohtak.edu.in/templates/indus-rtk/images/featured3.jpg"
                            alt="Sports Facilities"
                            className="absolute inset-0 w-full h-full object-cover"
                            onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.src = 'https://via.placeholder.com/800x600/e2e8f0/64748b?text=Sports+Facilities';
                            }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                        <div className="absolute bottom-6 left-6">
                            <p className="text-gold font-bold text-xl">Annual Sports Meet</p>
                            <p className="text-sm opacity-80">A celebration of athleticism and spirit</p>
                        </div>
                    </div>
                </div>
            </Section>

            <Section className="bg-off-white">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-serif text-royal font-bold">Hall of Fame</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <AchievementCard title="Gold Medal in Judo" event="State Championship" />
                    <AchievementCard title="Gold Medal in Skating" event="National Level" />
                    <AchievementCard title="Gold Medal in Badminton" event="Zonal Tournament" />
                    <AchievementCard title="Best Athlete" event="Annual Sports Day" />
                </div>
            </Section>
        </div>
    );
}

function FeatureCard({ icon, title, desc }: { icon: any, title: string, desc: string }) {
    return (
        <div className="bg-slate-50 p-8 rounded-xl border border-slate-100 hover:shadow-lg transition-shadow">
            <div className="bg-royal/10 w-14 h-14 rounded-full flex items-center justify-center text-royal mb-6">
                {icon}
            </div>
            <h3 className="text-xl font-bold text-royal mb-3">{title}</h3>
            <p className="text-slate-600 leading-relaxed">{desc}</p>
        </div>
    )
}

function FacilityItem({ title, desc }: { title: string, desc: string }) {
    return (
        <li className="flex items-start gap-4">
            <div className="bg-gold/20 p-2 rounded-lg mt-1">
                <Star size={16} className="text-gold" />
            </div>
            <div>
                <h4 className="font-bold text-lg">{title}</h4>
                <p className="text-slate-400 text-sm">{desc}</p>
            </div>
        </li>
    )
}

function AchievementCard({ title, event }: { title: string, event: string }) {
    return (
        <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-gold">
            <Medal className="text-gold mb-3" size={28} />
            <h4 className="font-bold text-royal text-lg mb-1">{title}</h4>
            <p className="text-sm text-slate-500">{event}</p>
        </div>
    )
}
