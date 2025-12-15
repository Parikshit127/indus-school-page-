import { useState, useEffect } from "react";
import { Section } from "@/components/ui/section";
import { PageHero } from "@/components/ui/PageHero";
import { Quote, Target, Lightbulb, Users, Award } from "lucide-react";
import { motion } from "framer-motion";

const committeeMembers = [
    { no: 1, name: "Mr. Davender singh Balain", relation: "Sh. Balbir Singh", designation: "President" },
    { no: 2, name: "Mr Dalbir Rathee", relation: "Mr. Dibagh Rathee", designation: "Manager" },
    { no: 3, name: "Ms.Sushma Jha", relation: "Mr.Anirudha Jha", designation: "Ex-officio secy." },
    { no: 4, name: "Mr. Subhash Sheoran", relation: "Sh. Raghubir Singh", designation: "Member" },
    { no: 5, name: "Mrs.Shushma jakhar", relation: "Sh.Iqbal singh Jakhar", designation: "Member" },
    { no: 6, name: "Prof. Kuldeep Chikkara", relation: "Sh. Sher Singh Chikkara", designation: "Member Educationist" },
    { no: 7, name: "Dr.Shashi Banerjee", relation: "Dr.B.G.Banerjee", designation: "Member Educationist" },
    { no: 8, name: "Ms Charu Madaan", relation: "Mr. Ajay Madaan", designation: "Teacher Member" },
    { no: 9, name: "Mrs.Sunita Khera", relation: "Sh. Nitin Khera", designation: "Teacher Member" },
    { no: 10, name: "Mrs. Rani", relation: "MR.Ram Rishi Parashar", designation: "Parent Member" },
    { no: 11, name: "Ms.Kavita Rathi", relation: "Mr.Suresh Rathee", designation: "Parent Member" },
    { no: 12, name: "Mrs. Aruna Sharma", relation: "Dr. Arun Sharma", designation: "Principal Member" },
    { no: 13, name: "Mrs. Tanu Punia", relation: "Mr.V.k. Sharma", designation: "Principal Member" },
    { no: 14, name: "Mrs.Manoj Jattan", relation: "Mr.Joginder singh", designation: "Member" },
    { no: 15, name: "Mr.Anoop Rathee", relation: "Ms.Suman", designation: "Member" },
];

const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

export default function AboutUsPage() {
    const [dynamicMembers, setDynamicMembers] = useState<any[]>([]);

    useEffect(() => {
        const fetchMembers = async () => {
            try {
                const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:4000';
                const response = await fetch(`${apiUrl}/api/members`);
                if (response.ok) {
                    const data = await response.json();
                    setDynamicMembers(data);
                }
            } catch (error) {
                console.error("Failed to fetch members", error);
            }
        };
        fetchMembers();
    }, []);

    const allMembers = [...committeeMembers, ...dynamicMembers];

    return (
        <div className="bg-slate-50 min-h-screen">
            <PageHero
                title="Our Legacy"
                subtitle="Dedicated to liberating human beings from the shackles of ignorance. Rooted in Indian reality."
                image="https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=2070&auto=format&fit=crop"
            />

            <Section className="py-20 space-y-24">

                {/* Vision Mission Cards */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={{
                        hidden: { opacity: 0 },
                        visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
                    }}
                    className="grid md:grid-cols-3 gap-8 -mt-32 relative z-20"
                >
                    {[
                        { icon: Target, title: "Our Vision", desc: "To initiate a ceaseless process of searching qualitative improvement.", color: "text-blue-600" },
                        { icon: Lightbulb, title: "Our Mission", desc: "To be a 'Bodhi tree' of knowledge. Providing global education systems.", color: "text-amber-500" },
                        { icon: Quote, title: "Our Motto", desc: "'Vidya Dedati Vinayam' - Learning makes a person humble.", color: "text-emerald-600" }
                    ].map((item, idx) => (
                        <motion.div
                            key={idx}
                            variants={fadeIn}
                            className="bg-white p-8 rounded-2xl shadow-xl border border-slate-100 flex flex-col items-center text-center hover:transform hover:-translate-y-2 transition-transform duration-300"
                        >
                            <div className={`w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center mb-6 ${item.color}`}>
                                <item.icon size={32} />
                            </div>
                            <h3 className="text-xl font-bold text-royal mb-3">{item.title}</h3>
                            <p className="text-slate-600 text-sm">{item.desc}</p>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Founder Section */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeIn}
                    className="bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-100"
                >
                    <div className="md:flex">
                        <div className="md:w-1/3 bg-royal-dark relative min-h-[400px]">
                            <img
                                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974" // Placeholder for Founder
                                alt="Founder"
                                className="absolute inset-0 w-full h-full object-cover opacity-50 mix-blend-overlay"
                            />
                            <div className="absolute inset-0 p-10 flex flex-col justify-end text-white">
                                <h3 className="text-2xl font-serif font-bold mb-1">Ch. Mitter Sen Sindhu Ji</h3>
                                <p className="text-gold text-sm font-bold uppercase tracking-widest">Founder</p>
                                <p className="text-xs text-white/60 mt-2">Sindhu Education Foundation</p>
                            </div>
                        </div>
                        <div className="md:w-2/3 p-10 md:p-16 flex flex-col justify-center">
                            <Quote size={40} className="text-gold/20 mb-6" />
                            <blockquote className="text-xl md:text-2xl font-serif text-royal/90 leading-relaxed mb-6">
                                "Education should liberate human being from the shackles of ignorance, deprivation and misery."
                            </blockquote>
                            <p className="text-slate-600 leading-relaxed">
                                He stressed that education should be rooted in Indian reality and its composite culture.
                                Sindhu Education Foundation has been deeply involved in the education and social transformation evolving in our motherland for decades.
                            </p>
                        </div>
                    </div>
                </motion.div>

                {/* Leadership Grid */}
                <div className="grid md:grid-cols-2 gap-8">
                    {/* Chairman */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeIn}
                        className="bg-slate-900 text-white rounded-3xl p-10 relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 p-10 opacity-10">
                            <Award size={100} />
                        </div>
                        <h3 className="text-3xl font-serif font-bold text-gold mb-2">Capt. Rudra Sen Sindhu</h3>
                        <p className="text-white/60 text-sm uppercase tracking-widest mb-8">Chairman</p>
                        <p className="text-white/80 leading-relaxed mb-6">
                            "Vidya Dedati Vinayam" - learning makes a person humble.
                        </p>
                        <div className="h-1 w-20 bg-gold rounded-full"></div>
                    </motion.div>

                    {/* Principal */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeIn}
                        className="bg-royal rounded-3xl p-10 text-white relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 p-10 opacity-10">
                            <Users size={100} />
                        </div>
                        <h3 className="text-3xl font-serif font-bold text-white mb-2">Mr. Deepak Kumar</h3>
                        <p className="text-white/60 text-sm uppercase tracking-widest mb-8">Principal</p>
                        <p className="text-white/80 leading-relaxed mb-6">
                            "Education is the most powerful weapon which you can use to change the world."
                        </p>
                        <div className="h-1 w-20 bg-white/50 rounded-full"></div>
                    </motion.div>
                </div>

                {/* Chairperson Note */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeIn}
                    className="bg-white p-10 rounded-3xl border border-slate-200 text-center max-w-4xl mx-auto"
                >
                    <div className="w-16 h-16 mx-auto bg-gold/10 rounded-full flex items-center justify-center text-gold mb-6">
                        <Quote size={24} />
                    </div>
                    <p className="text-xl md:text-2xl text-royal font-light italic mb-8">
                        "Welcome to Indus—where education is an adventure, and every child’s potential finds its wings."
                    </p>
                    <h4 className="font-bold text-royal text-lg">Dr. Ekta Sindhu</h4>
                    <p className="text-slate-500 text-sm">Chairperson</p>
                </motion.div>

                {/* Committee Table */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeIn}
                >
                    <div className="flex items-center gap-4 mb-8">
                        <div className="h-px bg-slate-200 flex-1"></div>
                        <h2 className="text-2xl font-bold text-royal uppercase tracking-widest">Managing Committee</h2>
                        <div className="h-px bg-slate-200 flex-1"></div>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left">
                                <thead className="text-xs text-royal uppercase bg-slate-50/50">
                                    <tr>
                                        <th className="px-6 py-4">#</th>
                                        <th className="px-6 py-4">Member Name</th>
                                        <th className="px-6 py-4">Father/Spouse Name</th>
                                        <th className="px-6 py-4">Designation</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {allMembers.map((member, index) => (
                                        <tr key={index} className="hover:bg-slate-50/50 transition-colors">
                                            <td className="px-6 py-4 font-medium text-slate-400">{index + 1}</td>
                                            <td className="px-6 py-4 font-bold text-royal">{member.name}</td>
                                            <td className="px-6 py-4 text-slate-600">{member.relation}</td>
                                            <td className="px-6 py-4">
                                                <span className={`px-3 py-1 rounded-full text-xs font-bold ${member.designation.includes("Principal") ? "bg-purple-100 text-purple-700" :
                                                        member.designation.includes("President") ? "bg-amber-100 text-amber-700" :
                                                            "bg-blue-50 text-blue-700"
                                                    }`}>
                                                    {member.designation}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </motion.div>

            </Section>
        </div>
    );
}
