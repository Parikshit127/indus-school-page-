"use client";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Section } from "@/components/ui/section";
import { motion } from "framer-motion";
import { Quote, Target, Lightbulb, Heart, User, Users } from "lucide-react";
import { useState } from "react";

const LeadershipCard = ({ name, title, message, image, isOpen, onClick }: { name: string, title: string, message: string, image: string, isOpen: boolean, onClick: () => void }) => {
    return (
        <motion.div
            layout
            onClick={onClick}
            className={`cursor-pointer overflow-hidden rounded-xl border border-gold/20 bg-white shadow-lg transition-all duration-300 ${isOpen ? 'col-span-1 md:col-span-3' : 'col-span-1 hover:shadow-xl'}`}
        >
            <div className={`flex ${isOpen ? 'flex-col md:flex-row' : 'flex-col h-full'}`}>
                <div className={`${isOpen ? 'md:w-1/3 h-64 md:h-auto' : 'h-64'} relative bg-royal/10`}>
                    {/* Placeholder Avatar / Image */}
                    <img
                        src={image}
                        alt={name}
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className={`p-6 ${isOpen ? 'md:w-2/3' : 'flex flex-col justify-between'}`}>
                    <div>
                        <h3 className="text-xl font-bold text-royal">{name}</h3>
                        <p className="text-gold font-medium mb-4">{title}</p>
                        <p className={`text-slate-600 leading-relaxed ${isOpen ? '' : 'line-clamp-4'}`}>
                            {message.split('\n')[0]}
                            {!isOpen && "..."}
                        </p>
                    </div>
                    {isOpen && (
                        <div className="mt-4 space-y-4 text-slate-600 leading-relaxed animate-fade-in">
                            {message.split('\n').slice(1).map((para, i) => (
                                <p key={i}>{para}</p>
                            ))}
                        </div>
                    )}
                    {!isOpen && (
                        <div className="mt-4 text-gold text-sm font-bold uppercase tracking-wider">Read Message &rarr;</div>
                    )}
                </div>
            </div>
        </motion.div>
    );
}

export default function AboutPage() {
    const [activeLeader, setActiveLeader] = useState<number | null>(null);

    const committeeMembers = [
        { no: 1, name: "Mr. Davender singh Balain", spouse: "Sh. Balbir Singh", designation: "President" },
        { no: 2, name: "Mr Dalbir Rathee", spouse: "Mr. Dibagh Rathee", designation: "Manager" },
        { no: 3, name: "Ms.Sushma Jha", spouse: "Mr.Anirudha Jha", designation: "Ex-officio secy." },
        { no: 4, name: "Mr. Subhash Sheoran", spouse: "Sh. Raghubir Singh", designation: "Member" },
        { no: 5, name: "Mrs.Shushma jakhar", spouse: "Sh.Iqbal singh Jakhar", designation: "Member" },
        { no: 6, name: "Prof. Kuldeep Chikkara", spouse: "Sh. Sher Singh Chikkara", designation: "Member Educationist" },
        { no: 7, name: "Dr.Shashi Banerjee", spouse: "Dr.B.G.Banerjee", designation: "Member Educationist" },
        { no: 8, name: "Ms Charu Madaan", spouse: "Mr. Ajay Madaan", designation: "Teacher Member" },
        { no: 9, name: "Mrs.Sunita Khera", spouse: "Sh. Nitin Khera", designation: "Teacher Member" },
        { no: 10, name: "Mrs. Rani", spouse: "MR.Ram Rishi Parashar", designation: "Parent Member" },
        { no: 11, name: "Ms.Kavita Rathi", spouse: "Mr.Suresh Rathee", designation: "Parent Member" },
        { no: 12, name: "Mrs. Aruna Sharma", spouse: "Dr. Arun Sharma", designation: "Principal Member" },
        { no: 13, name: "Mrs. Tanu Punia", spouse: "Mr.V.k. Sharma", designation: "Principal Member" },
        { no: 14, name: "Mrs.Manoj Jattan", spouse: "Mr.Joginder singh", designation: "Member" },
        { no: 15, name: "Mr.Anoop Rathee", spouse: "Ms.Suman", designation: "Member" },
    ];

    return (
        <main className="min-h-screen bg-slate-50">
            <Navbar />

            {/* Hero */}
            <div className="relative h-[50vh] flex items-center justify-center bg-royal overflow-hidden">
                <div className="absolute inset-0 bg-black/50 z-10" />
                <div className="absolute inset-0">
                    <img
                        src="https://images.unsplash.com/photo-1594608661623-aa0bd3a69d98?q=80&w=2048&auto=format&fit=crop"
                        alt="School Building"
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="relative z-20 text-center text-white px-4 pt-20">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-7xl font-serif font-bold mb-4"
                    >
                        About Indus
                    </motion.h1>
                    <p className="text-xl text-white/90 max-w-2xl mx-auto font-light">
                        Heritage of Excellence. Future of Innovation.
                    </p>
                </div>
            </div>

            {/* Introduction */}
            <Section className="bg-white">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6">
                        <div className="inline-flex items-center gap-2 text-gold font-bold uppercase tracking-widest text-sm">
                            <div className="w-8 h-[2px] bg-gold"></div>
                            School Overview
                        </div>
                        <h2 className="text-3xl md:text-4xl font-serif font-bold text-royal">
                            Nurturing Minds, Building Character
                        </h2>
                        <p className="text-lg text-slate-600 leading-relaxed">
                            Indus Public School is spread over a vast lush green campus on National Highway-10, 30 minutes drive from Delhi Border.
                            The School is affiliated to Central Board of Secondary Education (CBSE), Delhi up to XII level providing education in
                            Medical, Non-Medical, and Commerce Streams.
                        </p>
                        <div className="bg-cream p-6 rounded-lg border-l-4 border-royal">
                            <p className="italic text-royal/80 font-medium">
                                "While the young minds go through the process of learning, it will automatically, continually and effortlessly imbibe values,
                                to give the individual a dynamic personality."
                            </p>
                        </div>
                    </div>
                    <div className="relative">
                        <div className="aspect-video rounded-xl overflow-hidden shadow-2xl skew-y-2 border-4 border-white">
                            <img
                                src="https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=2070&auto=format&fit=crop"
                                className="w-full h-full object-cover"
                                alt="School Campus"
                            />
                        </div>
                    </div>
                </div>
            </Section>

            {/* Founder Section */}
            <Section className="bg-royal text-white">
                <div className="max-w-4xl mx-auto text-center space-y-8">
                    <div className="w-24 h-24 mx-auto bg-white/10 rounded-full flex items-center justify-center text-gold">
                        <User size={48} />
                    </div>
                    <h2 className="text-3xl font-serif font-bold text-gold">Founder's Vision</h2>
                    <div className="prose prose-invert prose-lg mx-auto">
                        <p>
                            <strong>Sindhu Education Foundation</strong> is a Registered Charitable Trust, founded by
                            <span className="text-gold"> Ch. Mitter Sen Sindhu Ji</span>, an eminent philanthropist. The Founder felt that
                            "Education should liberate human beings from the shackles of ignorance, deprivation and misery".
                        </p>
                        <p>
                            He stressed that education should be rooted in Indian reality and its composite culture.
                            We adopt the openness of the Vedanta and Upanishads, encouraging children to have the moral courage to question
                            and the determination to seek the ultimate truth.
                        </p>
                    </div>
                </div>
            </Section>

            {/* Leadership Grid */}
            <Section className="bg-slate-50">
                <h2 className="text-3xl md:text-4xl font-serif font-bold text-royal text-center mb-12">Our Leadership</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Chairman */}
                    <LeadershipCard
                        name="Capt. Rudra Sen Sindhu"
                        title="Chairman, Sindhu Education Foundation"
                        image="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1974&auto=format&fit=crop"
                        isOpen={activeLeader === 0}
                        onClick={() => setActiveLeader(activeLeader === 0 ? null : 0)}
                        message={`Capt. Rudra Sen Sindhu on whose able shoulders falls the responsibility of Educational Institutions, has inherited the qualities that made his father an exceptional man. The Group has grown considerably in short span of time as a result of Capt. Sindhu’s meticulous planning, effective managerial skills and motivating drive.
                  
                  He is of the firm belief that an educational institution should cater to the educational needs of all the communities without differentiating on the grounds of race, creed, colour or religion and offer amiable optimum learning environment to children.

                  "Vidya Dedati Vinayam", learning makes a person humble. Indus Group of Institutions focuses on value based education which will enable students to discern between proper and improper, right and wrong.`}
                    />

                    {/* Chairperson */}
                    <LeadershipCard
                        name="Dr. Ekta Sindhu"
                        title="Chairperson, Indus Group of Institutions"
                        image="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1976&auto=format&fit=crop"
                        isOpen={activeLeader === 1}
                        onClick={() => setActiveLeader(activeLeader === 1 ? null : 1)}
                        message={`At Indus Group of Schools, we believe that education is the cornerstone of a progressive society. Rooted in the visionary ideals of our founder, Ch. Mitter Sen Sindhu Ji, we are steadfast in our mission to provide an education that is value-driven and future-ready.
                  
                  The world today is evolving at an unprecedented pace. At Indus, we embrace 21st-century learning methodologies that encourage critical thinking, collaboration, and innovation. We empower our students with the confidence to question, the resilience to adapt, and the vision to lead.

                  Welcome to Indus—where education is an adventure, and every child’s potential finds its wings.`}
                    />

                    {/* Principal */}
                    <LeadershipCard
                        name="Mr. Deepak Kumar"
                        title="Principal"
                        image="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070&auto=format&fit=crop"
                        isOpen={activeLeader === 2}
                        onClick={() => setActiveLeader(activeLeader === 2 ? null : 2)}
                        message={`"Education is the most powerful weapon which you can use to change the world" - Nelson Mandela.
                  
                  Indus Public School has been relentlessly attempting to deliver its best. Here education is not restricted to mere textbooks, but is a complete package aimed at holistic learning resulting in complete evolution of the body, mind and soul. 
                  
                  Childhood is a state of mind which ends the moment a puddle is first viewed as an obstacle instead of an opportunity. Neuroscience states that neurons are highly active between 0 to 8 years of age. Therefore real education needs to be imparted in these years so that the roots are strong.`}
                    />
                </div>
                <p className="text-center text-slate-400 mt-8 text-sm italic">Click on a card to read the full message</p>
            </Section>

            {/* Vision Mission Motto */}
            <Section className="bg-white">
                <div className="grid md:grid-cols-3 gap-8">
                    {[
                        {
                            icon: Target,
                            title: "Our Vision",
                            desc: "To initiate a ceaseless process of qualitative improvement. We view every individual as a unique person, promoting personalization of education by connecting the learner’s total life to the learning in the classroom."
                        },
                        {
                            icon: Lightbulb,
                            title: "Our Mission",
                            desc: "To be a 'Bodhi tree' - a source of knowledge. Providing Par Global education systems in rural and urban areas, offering undergraduate and postgraduate courses, and emerging as a role model in quality education."
                        },
                        {
                            icon: Heart,
                            title: "Our Motto",
                            desc: '"Vidya Dedati Vinayam" - Learning makes a person humble. Value-based education enables students to discern between right and wrong, promoting integrity and positive behavior beneficial for society.'
                        }
                    ].map((item, idx) => (
                        <motion.div
                            whileHover={{ y: -10 }}
                            key={idx}
                            className="p-8 rounded-2xl bg-cream border border-gold/20 shadow-lg text-center"
                        >
                            <div className="w-16 h-16 mx-auto bg-white rounded-full flex items-center justify-center text-royal mb-6 shadow-sm">
                                <item.icon size={32} />
                            </div>
                            <h3 className="text-2xl font-bold text-royal mb-4">{item.title}</h3>
                            <p className="text-royal/80 leading-relaxed text-sm">{item.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </Section>

            {/* Managing Committee */}
            <Section className="bg-slate-50">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-10">
                        <h2 className="text-3xl font-serif font-bold text-royal mb-4">Managing Committee</h2>
                        <p className="text-slate-500">The pillars supporting our institution</p>
                    </div>

                    <div className="bg-white rounded-xl shadow-xl overflow-hidden border border-royal/10">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-royal text-white uppercase text-xs tracking-wider">
                                    <tr>
                                        <th className="px-6 py-4 font-bold">No.</th>
                                        <th className="px-6 py-4 font-bold">Member Name</th>
                                        <th className="px-6 py-4 font-bold">Father/Spouse Name</th>
                                        <th className="px-6 py-4 font-bold">Designation</th>
                                    </tr>
                                </thead>
                                <tbody className="text-sm text-slate-700 divide-y divide-slate-100">
                                    {committeeMembers.map((member) => (
                                        <tr key={member.no} className="hover:bg-slate-50 transition-colors">
                                            <td className="px-6 py-4 font-medium">{member.no}</td>
                                            <td className="px-6 py-4 font-bold text-royal">{member.name}</td>
                                            <td className="px-6 py-4">{member.spouse}</td>
                                            <td className="px-6 py-4">
                                                <span className="inline-block bg-gold/10 text-royal px-3 py-1 rounded-full text-xs font-semibold">
                                                    {member.designation}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </Section>

            {/* Why Indus */}
            <Section className="bg-royal text-white">
                <div className="grid md:grid-cols-2 gap-16 items-center">
                    <div>
                        <h2 className="text-4xl font-serif font-bold mb-8">Why Indus Public School?</h2>
                        <div className="space-y-8">
                            <div>
                                <h3 className="text-xl font-bold text-gold mb-2">The Right Approach</h3>
                                <p className="text-white/80 leading-relaxed">
                                    Our vision has led us to adopt a persuasive and learner-centric teaching methodology
                                    that focuses on an <span className="font-bold text-white">Explore-Experience-Implement</span> model.
                                </p>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-gold mb-2">The Right Curriculum</h3>
                                <p className="text-white/80 leading-relaxed">
                                    Highly skilled staff focuses on visual, auditory, and kinesthetic learning styles.
                                    Thought-provoking content and Centrally created lesson plans ensure standardized quality.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        {[1, 2, 3, 4].map(i => (
                            <div key={i} className={`rounded-xl bg-white/10 h-40 ${i % 2 === 0 ? 'mt-8' : ''}`}></div>
                        ))}
                        {/* Decorative abstract grid */}
                    </div>
                </div>
            </Section>

            <Footer />
        </main>
    );
}
