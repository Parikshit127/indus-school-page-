import { Section } from "@/components/ui/section";
import { PageHero } from "@/components/ui/PageHero";
import { Monitor, FlaskConical, Library, Utensils, HeartPulse, Bus, ShoppingBag, Laptop, HeartHandshake, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

const facilities = [
    {
        icon: Monitor,
        title: "Smart Class Rooms",
        color: "bg-blue-50 text-blue-600",
        description: "Interactive Smart-Class by 'Educomp'. A revolutionary teaching-learning system with mapped-to-curriculum digital lessons (animation, graphics, audio & video)."
    },
    {
        icon: FlaskConical,
        title: "Science Labs",
        color: "bg-purple-50 text-purple-600",
        description: "Well-designed Physics, Chemistry, and Life Science labs. Equipped with modern apparatus for experiments. A hub for self-discovery and innovation."
    },
    {
        icon: Library,
        title: "Library",
        color: "bg-amber-50 text-amber-600",
        description: "The brightest and best library housing tons of books and reference materials. Aimed at inculcating reading habits."
    },
    {
        icon: Utensils,
        title: "Hostel & Food",
        color: "bg-orange-50 text-orange-600",
        description: "Weekday boarding available. Nutritious vegetarian food provided in a dining hall catering to 500 students, prepared in hygienic conditions."
    },
    {
        icon: HeartPulse,
        title: "School Clinic",
        color: "bg-red-50 text-red-600",
        description: "Regular medical check-ups with maintained records. Parents are immediately informed if special medical attention is needed."
    },
    {
        icon: Bus,
        title: "Transport",
        color: "bg-yellow-50 text-yellow-600",
        description: "Safe and comfortable transport with designated routes. Strict safety rules enforced with bus teachers and monitors ensuring discipline."
    },
    {
        icon: ShoppingBag,
        title: "Book & Uniform Shop",
        color: "bg-teal-50 text-teal-600",
        description: "One-stop shop for all school books, stationery, and uniforms to ensure uniformity and convenience."
    },
    {
        icon: Laptop,
        title: "Computer Lab",
        color: "bg-indigo-50 text-indigo-600",
        description: "Two modern ICT labs with latest hardware, software, and high-speed internet. Computer education surpassing CBSE stipulations."
    },
    {
        icon: HeartHandshake,
        title: "Psychological Counselling",
        color: "bg-pink-50 text-pink-600",
        description: "Professional counselor providing one-to-one therapy for stress, anxiety, and behavioral issues."
    }
];

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
};

export default function FacilitiesPage() {
    return (
        <div className="bg-slate-50 min-h-screen">
            <PageHero
                title="World Class Facilities"
                subtitle="A vast lush green campus on National Highway-10. We provide an environment that nurtures growth."
                image="https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=1986" // Modern architecture
            />

            <Section className="py-20">
                <motion.div
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    {facilities.map((facility, index) => {
                        const Icon = facility.icon;
                        return (
                            <motion.div
                                key={index}
                                variants={item}
                                className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group relative overflow-hidden"
                            >
                                <div className={`w-14 h-14 ${facility.color} rounded-2xl flex items-center justify-center mb-6 text-current group-hover:scale-110 transition-transform duration-300`}>
                                    <Icon size={28} />
                                </div>

                                <h3 className="text-xl font-bold text-royal mb-3 group-hover:text-gold transition-colors">
                                    {facility.title}
                                </h3>

                                <p className="text-slate-600 text-sm leading-relaxed mb-8">
                                    {facility.description}
                                </p>

                                {/* Decorative elements */}
                                <div className="absolute right-4 bottom-4 opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-4 group-hover:translate-x-0">
                                    <ArrowUpRight className="text-royal/20" size={32} />
                                </div>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </Section>
        </div>
    );
}
