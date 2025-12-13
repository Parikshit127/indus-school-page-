
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/section";
import { Trophy, Users, Palette, BookOpen, MoveRight, Star, Heart, Lightbulb, Target } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function ActivitiesPage() {
    return (
        <div className="min-h-screen bg-slate-50">
            <PageHero
                title="Co-Scholastic Activities"
                subtitle="The Third Dimension of Education"
                image="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070&auto=format&fit=crop"
            />

            {/* Core Values Section - New */}
            <Section className="bg-white pb-0">
                <div className="max-w-4xl mx-auto text-center mb-16">
                    <h2 className="text-3xl font-serif text-royal font-bold mb-6">Why Co-Curriculars?</h2>
                    <p className="text-lg text-gray-700 leading-relaxed max-w-2xl mx-auto">
                        We believe in education that transcends the classroom. Our thoughtfully designed activities foster character, creativity, and confidence.
                    </p>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                    <ValueCard icon={<Heart size={28} />} title="Character" desc="Building moral fibre & empathy" />
                    <ValueCard icon={<Users size={28} />} title="Teamwork" desc="Collaboration over competition" />
                    <ValueCard icon={<Lightbulb size={28} />} title="Creativity" desc="Thinking beyond boundaries" />
                    <ValueCard icon={<Target size={28} />} title="Discipline" desc="The bridge between goals and accomplishment" />
                </div>
            </Section>

            {/* Main Categories Navigation - Enlarged & Staggered */}
            <Section className="bg-slate-50">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-5xl font-serif text-royal font-bold">Explore Our World</h2>
                </div>
                <div className="flex flex-col gap-16">
                    <CategoryRow
                        title="Sports & Athletics"
                        desc="Champions aren't born; they are made here. Our world-class facilities for Cricket, Football, Skating, and Martial Arts reshape potential into performance."
                        image="https://images.unsplash.com/photo-1519766304800-c9519d080c48?q=80&w=2070&auto=format&fit=crop"
                        icon={<Trophy size={32} />}
                        link="/activities/sports"
                        align="left"
                    />
                    <CategoryRow
                        title="Arts & Culture"
                        desc="From the grace of Kathak to the rhythm of drums, we celebrate expression. Our students find their voice in Theatre, Music, Dance, and Fine Arts."
                        image="https://images.unsplash.com/photo-1543946207-395069171836?q=80&w=1968&auto=format&fit=crop"
                        icon={<Palette size={32} />}
                        link="/activities/cultural"
                        align="right"
                    />
                    <CategoryRow
                        title="Academic Clubs"
                        desc="Where intellect meets innovation. MUNs, Science Clubs, and Literary Debates challenge students to think critically and lead globally."
                        image="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=2022&auto=format&fit=crop"
                        icon={<BookOpen size={32} />}
                        link="/activities/clubs"
                        align="left"
                    />
                </div>
            </Section>

            {/* Testimonial Quote - New */}
            <Section className="bg-royal-dark text-white text-center py-20">
                <div className="max-w-4xl mx-auto">
                    <Star className="text-gold mx-auto mb-6 opacity-80" size={40} />
                    <blockquote className="text-2xl md:text-4xl font-serif leading-relaxed italic opacity-90 mb-8">
                        "The diverse range of activities at Indus gave me the confidence to stand on any stage in the world. It wasn't just about winning; it was about growing."
                    </blockquote>
                    <cite className="not-italic font-bold text-gold text-lg tracking-wider block">— Alumnus, Class of 2018</cite>
                </div>
            </Section>

            {/* Featured Event: MUN (Redesigned) */}
            <Section className="bg-white">
                <div className="max-w-6xl mx-auto">
                    <div className="bg-slate-50 rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row">
                        <div className="md:w-1/2 relative min-h-[400px]">
                            <img
                                src="https://images.unsplash.com/photo-1577962917302-cd874c4e31d2?q=80&w=2000&auto=format&fit=crop"
                                alt="MUN Conference"
                                className="absolute inset-0 w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-royal/20" />
                            <div className="absolute top-6 left-6 bg-white/90 backdrop-blur px-4 py-2 rounded-lg text-royal font-bold text-sm shadow-md">
                                FEATURED EVENT
                            </div>
                        </div>
                        <div className="md:w-1/2 p-10 md:p-16 flex flex-col justify-center">
                            <h3 className="text-3xl md:text-4xl font-serif text-royal font-bold mb-6">IPSRMUN’22</h3>
                            <p className="text-gray-600 mb-6 leading-relaxed">
                                A congregation of young diplomats. Over 150 delegates from across the region gathered to debate global crises, simulate UN committees, and draft resolutions for a better future.
                            </p>

                            <div className="grid grid-cols-2 gap-6 mb-8">
                                <div>
                                    <div className="text-3xl font-bold text-gold">150+</div>
                                    <div className="text-sm text-gray-500 uppercase tracking-wide">Delegates</div>
                                </div>
                                <div>
                                    <div className="text-3xl font-bold text-gold">4</div>
                                    <div className="text-sm text-gray-500 uppercase tracking-wide">Committees</div>
                                </div>
                            </div>

                            <Link
                                to="/activities/clubs"
                                className="inline-block bg-royal text-white px-8 py-3 rounded-full font-bold hover:bg-royal-light transition-colors self-start shadow-lg hover:shadow-xl hover:-translate-y-1 transform duration-300"
                            >
                                View Event Report
                            </Link>
                        </div>
                    </div>
                </div>
            </Section>
        </div>
    );
}

function ValueCard({ icon, title, desc }: any) {
    return (
        <div className="p-6 rounded-xl bg-slate-50 border border-slate-100 text-center hover:shadow-md transition-shadow">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-white text-royal rounded-full shadow-sm mb-4">
                {icon}
            </div>
            <h4 className="font-bold text-royal mb-2">{title}</h4>
            <p className="text-sm text-gray-500">{desc}</p>
        </div>
    )
}

function CategoryRow({ title, desc, icon, image, link, align }: { title: string, desc: string, icon: any, image: string, link: string, align: 'left' | 'right' }) {
    const isLeft = align === 'left';

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className={`flex flex-col ${isLeft ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-12 group`}
        >
            <div className="w-full lg:w-1/2 relative h-[400px] rounded-3xl overflow-hidden shadow-2xl">
                <img
                    src={image}
                    alt={title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
            </div>

            <div className="w-full lg:w-1/2 text-center lg:text-left">
                <div className={`inline-flex items-center justify-center w-16 h-16 bg-gold/10 text-gold-dark rounded-2xl mb-6 transform transition-transform duration-500 group-hover:rotate-6`}>
                    {icon}
                </div>
                <h3 className="text-4xl md:text-5xl font-serif text-royal font-bold mb-6">{title}</h3>
                <p className="text-lg text-slate-600 leading-relaxed mb-8 max-w-lg mx-auto lg:mx-0">
                    {desc}
                </p>
                <Link
                    to={link}
                    className="inline-flex items-center gap-3 text-royal font-bold text-lg hover:text-gold transition-colors group-hover:gap-4 duration-300"
                >
                    Explore Section <MoveRight />
                </Link>
            </div>
        </motion.div>
    );
}
