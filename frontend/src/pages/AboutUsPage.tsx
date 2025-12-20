import { useState, useEffect } from "react";
import { Section } from "@/components/ui/section";
import { PageHero } from "@/components/ui/PageHero";
import { Quote, Target, Lightbulb, ChevronDown, ChevronUp } from "lucide-react";
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
    const [showAllMembers, setShowAllMembers] = useState(false);

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
    const displayedMembers = showAllMembers ? allMembers : allMembers.slice(0, 5);

    return (
        <div className="bg-slate-50 min-h-screen">
            <PageHero
                title="About Us"
                subtitle="Know more about our school, vision, mission and values."
                image="https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?q=80&w=1974&auto=format&fit=crop"
            />

            <Section className="py-12 md:py-20 space-y-16 md:space-y-24">

                {/* 1. ABOUT SCHOOL */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeIn}
                    className="max-w-4xl mx-auto text-center"
                >
                    <div className="flex items-center justify-center gap-4 mb-6">
                        <div className="h-px bg-royal/20 w-16"></div>
                        <h2 className="text-3xl font-bold text-royal uppercase tracking-widest">About School</h2>
                        <div className="h-px bg-royal/20 w-16"></div>
                    </div>

                    <p className="text-lg md:text-xl text-slate-700 leading-relaxed font-serif text-justify md:text-center">
                        Indus Public School is spread over a vast lush green campus on National Highway-10. 30 minutes drive from Delhi Border. The School is affiliated to Central Board of Secondary Education, Delhi up to XII level providing education in Medical, Non-Medical, Commerce Streams.
                    </p>
                    <p className="text-lg md:text-xl text-slate-700 leading-relaxed font-serif mt-6 text-justify md:text-center">
                        Every initiative, effort at the upcoming institute is single-mindedly focused on these three basic values. So while the young minds go through the process of learning, it will automatically, continually and effortlessly imbibe them, to give the individual an dynamic personality.
                    </p>
                </motion.div>

                {/* 2. FOUNDER & LEADERSHIP */}
                <div className="grid md:grid-cols-2 gap-8">
                    {/* Founder */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeIn}
                        className="bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-100 flex flex-col md:flex-row"
                    >
                        <div className="md:w-1/3 bg-royal-dark relative h-64 md:h-auto min-h-[300px]">
                            <img
                                src="http://www.ipsrohtak.edu.in/downloads/ch-mitersen.jpg" // Placeholder for Founder
                                alt="Founder"
                                className="absolute inset-0 w-full h-full object-cover"
                            />
                        </div>
                        <div className="flex-1 p-8 flex flex-col justify-center">
                            <h3 className="text-2xl font-serif font-bold mb-2 text-black">Ch. Mitter Sen Sindhu Ji</h3>
                            <p className="text-gold text-sm font-bold uppercase tracking-widest mb-2">Founder</p>
                            <p className="text-xs text-slate-600 mb-6">Sindhu Education Foundation</p>
                            <blockquote className="text-lg font-serif text-slate-600 italic leading-relaxed border-l-4 border-gold pl-4">
                                "Education should liberate human being from the shackles of ignorance, deprivation and misery."
                            </blockquote>
                        </div>
                    </motion.div>

                    {/* Chairperson */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeIn}
                        className="bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-100 flex flex-col md:flex-row"
                    >
                        <div className="md:w-1/3 bg-royal-dark relative h-64 md:h-auto min-h-[300px]">
                            <img
                                src="https://ipsrohtak.edu.in/downloads/nimages/ekta-sindhu-chairperson.jpg"
                                alt="Chairperson"
                                className="absolute inset-0 w-full h-full object-cover"
                            />
                        </div>
                        <div className="flex-1 p-8 flex flex-col justify-center">
                            <h3 className="text-2xl font-serif font-bold mb-2 text-black">Dr. Ekta Sindhu</h3>
                            <p className="text-gold text-sm font-bold uppercase tracking-widest mb-2">Chairperson</p>
                            <p className="text-xs text-slate-600 mb-6">Indus Group of Institutions</p>
                            <blockquote className="text-lg font-serif text-slate-600 italic leading-relaxed border-l-4 border-gold pl-4">
                                "Welcome to Indus—where education is an adventure, and every child's potential finds its wings."
                            </blockquote>
                        </div>
                    </motion.div>

                    {/* Card 3 */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeIn}
                        className="bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-100 flex flex-col md:flex-row"
                    >
                        <div className="md:w-1/3 bg-royal-dark relative h-64 md:h-auto min-h-[300px]">
                            <img
                                src="http://www.ipsrohtak.edu.in/downloads/Capt.-R.S.-Sindhu_1.jpg"
                                alt="Member"
                                className="absolute inset-0 w-full h-full object-cover"
                            />
                        </div>
                        <div className="flex-1 p-8 flex flex-col justify-center">
                            <h3 className="text-2xl font-serif font-bold mb-2 text-black">Capt. Rudra Sen Sindhu</h3>
                            <p className="text-gold text-sm font-bold uppercase tracking-widest mb-2">Chairman</p>
                            <p className="text-xs text-slate-600 mb-6">Sindhu Education Foundation</p>
                            <blockquote className="text-lg font-serif text-slate-600 italic leading-relaxed border-l-4 border-gold pl-4">
                                "Under the visionary leadership of Capt. Rudra Sen Sindhu, Indus stands as a symbol of quality, inclusivity, and value-based education."
                            </blockquote>
                        </div>
                    </motion.div>

                    {/* Card 4 */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeIn}
                        className="bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-100 flex flex-col md:flex-row"
                    >
                        <div className="md:w-1/3 bg-royal-dark relative h-64 md:h-auto min-h-[300px]">
                            <img
                                src="https://ipsrohtak.edu.in/downloads/nimages/prinipal.jpg"
                                alt="Member"
                                className="absolute inset-0 w-full h-full object-cover"
                            />
                        </div>
                        <div className="flex-1 p-8 flex flex-col justify-center">
                            <h3 className="text-2xl font-serif font-bold mb-2 text-black">Mr. Deepak Kumar</h3>
                            <p className="text-gold text-sm font-bold uppercase tracking-widest mb-2">Principal</p>
                            <p className="text-xs text-slate-600 mb-6">Indus Group of Institutions</p>
                            <blockquote className="text-lg font-serif text-slate-600 italic leading-relaxed border-l-4 border-gold pl-4">
                                "At Indus, we don’t just teach children what to think; we empower them to think, grow, and lead."
                            </blockquote>
                        </div>
                    </motion.div>
                </div>

                {/* 3. VISION, MISSION, MOTTO */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={{
                        hidden: { opacity: 0 },
                        visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
                    }}
                    className="grid md:grid-cols-3 gap-8"
                >
                    <motion.div variants={fadeIn} className="bg-white p-8 rounded-2xl shadow-lg border-t-4 border-blue-600 hover:shadow-xl transition-all">
                        <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-6">
                            <Target size={28} />
                        </div>
                        <h3 className="text-xl font-bold text-gray-800 mb-4">Our Vision</h3>
                        <p className="text-gray-600 leading-relaxed">
                            To initiate a ceaseless process of searching qualitative improvement in the field of school education.
                        </p>
                    </motion.div>

                    <motion.div variants={fadeIn} className="bg-white p-8 rounded-2xl shadow-lg border-t-4 border-amber-500 hover:shadow-xl transition-all">
                        <div className="w-14 h-14 bg-amber-50 text-amber-600 rounded-full flex items-center justify-center mb-6">
                            <Lightbulb size={28} />
                        </div>
                        <h3 className="text-xl font-bold text-gray-800 mb-4">Our Mission</h3>
                        <p className="text-gray-600 leading-relaxed">
                            To be a 'Bodhi tree' of knowledge. Providing global education systems culturally and academically.
                        </p>
                    </motion.div>

                    <motion.div variants={fadeIn} className="bg-white p-8 rounded-2xl shadow-lg border-t-4 border-emerald-600 hover:shadow-xl transition-all">
                        <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mb-6">
                            <Quote size={28} />
                        </div>
                        <h3 className="text-xl font-bold text-gray-800 mb-4">Our Motto</h3>
                        <p className="text-gray-600 leading-relaxed font-serif italic text-lg dark:text-gray-400">
                            "Vidya Dedati Vinayam"
                        </p>
                        <p className="text-sm text-gray-500 mt-2">
                            - Learning makes a person humble.
                        </p>
                    </motion.div>
                </motion.div>

                {/* 4. WHY INDUS PUBLIC SCHOOL? (MANAGING COMMITTEE) */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeIn}
                >
                    <div className="flex items-center justify-center gap-4 mb-8">
                        <div className="h-px bg-royal/20 w-16"></div>
                        <h2 className="text-2xl font-bold text-royal uppercase tracking-widest text-center">Why Indus Public School?</h2>
                        <div className="h-px bg-royal/20 w-16"></div>
                    </div>
                    <p className="text-center text-slate-500 mb-8 max-w-2xl mx-auto">
                        Backed by a strong managing committee dedicated to educational excellence and social transformation.
                    </p>

                    <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden mb-8">
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
                                    {displayedMembers.map((member, index) => (
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

                    <div className="text-center">
                        <button
                            onClick={() => setShowAllMembers(!showAllMembers)}
                            className="inline-flex items-center gap-2 px-6 py-2.5 bg-white border border-slate-200 rounded-full text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-royal hover:border-royal transition-all duration-300 shadow-sm"
                        >
                            {showAllMembers ? (
                                <>
                                    Show Less <ChevronUp size={16} />
                                </>
                            ) : (
                                <>
                                    See All Members <ChevronDown size={16} />
                                </>
                            )}
                        </button>
                    </div>
                </motion.div>

            </Section>
        </div>
    );
}
