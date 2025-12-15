
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/section";
import { BookOpen, Brain, MoveRight } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const academicsData = [
    {
        title: "Teaching Methodology",
        desc: "Indus follows a comprehensive curriculum reviewed and updated yearly. Teachers are dynamic, life changing, charismatic and life transforming mentors to students.",
        image: "https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=1974&auto=format&fit=crop",
        icon: <Brain size={32} />,
        link: "/academics/methodology",
        align: "left"
    },
    {
        title: "Curriculum",
        desc: "Indus follows a comprehensive curriculum designed and viewed yearly. Apart from imparting knowledge to students, equal emphasis is laid on the development of skills.",
        image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=2070&auto=format&fit=crop",
        icon: <BookOpen size={32} />,
        link: "/academics/curriculum",
        align: "right"
    }
];

export default function AcademicsPage() {
    return (
        <div className="min-h-screen bg-slate-50">
            <PageHero
                title="Academics"
                subtitle="Excellence in Education"
                image="https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=2070&auto=format&fit=crop"
            />

            <Section>
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-serif text-royal font-bold max-w-4xl mx-auto">
                        Empowering Minds, Shaping Futures
                    </h2>
                    <p className="text-lg text-slate-600 mt-6 max-w-2xl mx-auto leading-relaxed">
                        At Indus, we go beyond traditional learning. Our holistic approach integrates innovative methodology with a robust curriculum to prepare students for a rapidly evolving world.
                    </p>
                </div>

                <div className="flex flex-col gap-16">
                    {academicsData.map((item, index) => (
                        <CategoryRow
                            key={index}
                            title={item.title}
                            desc={item.desc}
                            image={item.image}
                            icon={item.icon}
                            link={item.link}
                            align={item.align as 'left' | 'right'}
                        />
                    ))}
                </div>
            </Section>
        </div>
    );
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
                    Learn More <MoveRight />
                </Link>
            </div>
        </motion.div>
    );
}
