import { motion } from "framer-motion";
import { Shield, Award, CheckCircle, Building2, Users, Clock } from "lucide-react";

const trustItems = [
    {
        icon: Clock,
        value: "22+",
        label: "Years of Excellence",
        description: "Nurturing young minds since 2003"
    },
    {
        icon: Building2,
        value: "CBSE",
        label: "Board Affiliation",
        description: "Affiliated to CBSE, New Delhi"
    },
    {
        icon: Award,
        value: "50+",
        label: "Awards Won",
        description: "Recognition for academic & sports excellence"
    },
    {
        icon: Shield,
        value: "100%",
        label: "Safety Compliant",
        description: "CCTV, Fire safety & Child protection policy"
    },
    {
        icon: Users,
        value: "5000+",
        label: "Alumni Network",
        description: "Successful professionals worldwide"
    },
    {
        icon: CheckCircle,
        value: "A+",
        label: "CBSE Grading",
        description: "Consistent academic performance"
    }
];

const badges = [
    "ISO 9001:2015 Certified",
    "Green Campus Initiative",
    "Smart School Enabled",
    "Sports Excellence Award 2024"
];

export function TrustAuthority() {
    return (
        <section className="py-16 md:py-24 bg-gradient-to-b from-white via-cream/30 to-white relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-72 h-72 bg-gold/5 rounded-full -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-royal/5 rounded-full translate-x-1/2 translate-y-1/2" />

            <div className="container mx-auto px-4 md:px-8 relative z-10">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-12 md:mb-16"
                >
                    <span className="inline-block px-4 py-1.5 bg-royal/5 text-royal rounded-full text-xs font-bold tracking-widest uppercase mb-4">
                        Trusted by 2500+ Families
                    </span>
                    <h2 className="text-3xl md:text-5xl font-serif font-bold text-royal mb-4">
                        A Legacy of <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-dark to-gold">Trust & Excellence</span>
                    </h2>
                    <p className="text-royal/70 max-w-2xl mx-auto text-lg">
                        For over two decades, we've been the preferred choice for parents seeking quality education combined with values and discipline.
                    </p>
                </motion.div>

                {/* Trust Metrics Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6 mb-12">
                    {trustItems.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="group bg-white rounded-2xl p-5 md:p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-royal/5 hover:border-gold/30 text-center"
                        >
                            <div className="w-12 h-12 mx-auto bg-gradient-to-br from-royal/10 to-royal/5 rounded-xl flex items-center justify-center mb-4 group-hover:from-gold/20 group-hover:to-gold/10 transition-all">
                                <item.icon className="w-6 h-6 text-royal group-hover:text-gold transition-colors" />
                            </div>
                            <div className="text-2xl md:text-3xl font-bold text-royal mb-1">{item.value}</div>
                            <div className="text-sm font-semibold text-royal/80 mb-2">{item.label}</div>
                            <p className="text-xs text-royal/60 leading-relaxed hidden md:block">{item.description}</p>
                        </motion.div>
                    ))}
                </div>

                {/* Badges Row */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="flex flex-wrap justify-center gap-3 md:gap-4"
                >
                    {badges.map((badge, index) => (
                        <div
                            key={index}
                            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cream to-white rounded-full border border-gold/20 shadow-sm"
                        >
                            <CheckCircle className="w-4 h-4 text-gold" />
                            <span className="text-sm font-medium text-royal">{badge}</span>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
