import { Section } from "@/components/ui/section";
import { PageHero } from "@/components/ui/PageHero";
import {
    Trophy, Medal, Star, GraduationCap, Anchor, Award,
    Music, FlaskConical, Globe, Target, Sparkles, Users
} from "lucide-react";
import { motion } from "framer-motion";

// Academic achievers data
const academicAchievers = [
    { name: "Abhimanyu Balyan", achievement: "All India Rank in Civil Services", icon: Award },
    { name: "Niyanta", achievement: "MBBS from AIIMS", icon: GraduationCap },
    { name: "Harshit Beniwal", achievement: "IIT Guwahati", icon: Star },
    { name: "Vasu", achievement: "99.9 Percentile in JEE Advanced", icon: Target },
    { name: "Rohit Malik", achievement: "Indian Navy", icon: Anchor },
    { name: "Sameer Malik & Manshu Baraak", achievement: "Merchant Navy", icon: Anchor },
    { name: "Sumit", achievement: "NDA Cleared", icon: Medal },
    { name: "Jasvin", achievement: "NTSE Topper", icon: Trophy },
    { name: "Ankita Chaudhary, Yadvinder & Akanksha", achievement: "UPSC Cleared", icon: Award },
];

// Sports champions data
const sportsChampions = [
    { name: "Ashima Ahlawat", class: "", achievement: "International Shooting Player", medal: "gold", sport: "Shooting" },
    { name: "Jhankaar", class: "Class 9", achievement: "2nd Position in Jujutsu - World Championship", medal: "silver", sport: "Jujutsu" },
    { name: "Mahir", class: "Class 7", achievement: "3rd Position in Jujutsu - World Championship", medal: "bronze", sport: "Jujutsu" },
    { name: "Rayan", class: "Class 4", achievement: "3rd Position in Kurash", medal: "bronze", sport: "Kurash" },
    { name: "Harsh", class: "Class", achievement: "1st Position National Holder in Taekwondo", medal: "gold", sport: "Taekwondo" },
    { name: "Akshita", class: "Class 7", achievement: "1st Position in Table Tennis", medal: "gold", sport: "Table Tennis" },
    { name: "Dhruv", class: "Class 8", achievement: "1st Position in Swimming - District Level", medal: "gold", sport: "Swimming" },
    { name: "Manavjeet", class: "Class 10", achievement: "1st Position in Chess - District Level", medal: "gold", sport: "Chess" },
    { name: "Krishna", class: "Class 12", achievement: "International Player", medal: "gold", sport: "Sports" },
    { name: "Vineet, Amanpreet & Ishaan", class: "Various", achievement: "National Baseball Players", medal: "gold", sport: "Baseball" },
    { name: "Aryan Singh & Aryan", class: "Class 12 & 10", achievement: "National Football Players", medal: "gold", sport: "Football" },
    { name: "Kreytin", class: "Class 4", achievement: "Gold Medal in Skating", medal: "gold", sport: "Skating" },
];

// More sports achievements
const additionalSports = [
    { name: "Jagrit", class: "Class 4", sport: "Badminton", achievement: "Accolades" },
    { name: "Sikander", class: "Class 8", sport: "Badminton", achievement: "Accolades" },
    { name: "Manasvi", class: "Class 9", sport: "Badminton", achievement: "Accolades" },
    { name: "Seerat", class: "Class 10", sport: "Badminton", achievement: "Accolades" },
    { name: "Vidhi", class: "Class 9", sport: "Athletics", achievement: "State Level Athlete" },
    { name: "Ritika", class: "Class 3", sport: "Athletics", achievement: "State Level Athlete" },
    { name: "Prachi", class: "Class 7", sport: "Wrestling", achievement: "2nd Position - District Level" },
    { name: "Arpit", class: "Class 8", sport: "Shooting", achievement: "3rd Rank - District Level" },
    { name: "Daksh Chahar", class: "Class 9", sport: "Dragon Boat & Canoe Sprint", achievement: "National Championship" },
    { name: "Aman", class: "Class 11", sport: "Gymnastics", achievement: "State Level Gymnast" },
];

const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

export default function AchievementsPage() {
    return (
        <div className="bg-slate-50 min-h-screen">
            <PageHero
                title="Our Achievements"
                subtitle="Celebrating excellence in academics, sports, and beyond"
                image="https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2070"
            />

            <Section className="py-20 space-y-24">

                {/* Introduction Section */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeIn}
                    className="max-w-4xl mx-auto text-center -mt-20 relative z-20"
                >
                    <div className="bg-white p-10 rounded-3xl shadow-xl border border-slate-100">
                        <div className="w-16 h-16 mx-auto bg-gold/10 rounded-full flex items-center justify-center text-gold mb-6">
                            <Sparkles size={32} />
                        </div>
                        <h2 className="text-2xl md:text-3xl font-serif font-bold text-royal mb-6">
                            Session 2023-2024: A Year of Promises & Achievements
                        </h2>
                        <p className="text-slate-600 leading-relaxed text-lg">
                            The session 2023-2024 has been full of promises and achievements for our Indusians in the field of academics, sports, and career. The list is exhaustive. We have been highlighting our students on the school's website and informing our parents through WhatsApp groups.
                        </p>
                        <div className="mt-8 p-6 bg-gradient-to-r from-royal/5 to-gold/5 rounded-2xl">
                            <p className="text-royal font-serif italic text-xl">
                                "The future belongs to those who believe in the beauty of their dreams."
                            </p>
                        </div>
                    </div>
                </motion.div>

                {/* Academic Achievers Section */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={staggerContainer}
                >
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-serif font-bold text-royal mb-4">
                            Academic Excellence
                        </h2>
                        <p className="text-slate-600 max-w-2xl mx-auto">
                            Many of our students are doctors in PGI Rohtak, some from Russia, China etc. Our alumni are shining across the globe.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {academicAchievers.map((achiever, index) => (
                            <motion.div
                                key={index}
                                variants={fadeIn}
                                className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-lg hover:border-gold/30 transition-all duration-300 group"
                            >
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-gradient-to-br from-royal to-royal-light rounded-xl flex items-center justify-center text-white shrink-0 group-hover:scale-110 transition-transform">
                                        <achiever.icon size={24} />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-royal text-lg">{achiever.name}</h3>
                                        <p className="text-slate-600 text-sm mt-1">{achiever.achievement}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Global Success */}
                    <motion.div
                        variants={fadeIn}
                        className="mt-12 bg-gradient-to-r from-royal-dark to-royal p-8 rounded-3xl text-white text-center"
                    >
                        <Globe className="w-12 h-12 mx-auto mb-4 text-gold" />
                        <h3 className="text-2xl font-serif font-bold mb-4">Global Success Stories</h3>
                        <p className="text-white/80 max-w-3xl mx-auto">
                            Many Indusians have cleared their IELTS and are now working in <span className="text-gold font-bold">USA, UK, Australia, Canada</span> and other countries, making us proud on the global stage.
                        </p>
                    </motion.div>
                </motion.div>

                {/* Sports Champions Section */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={staggerContainer}
                >
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-serif font-bold text-royal mb-4">
                            Sports Champions
                        </h2>
                        <p className="text-slate-600 max-w-2xl mx-auto">
                            Our students excel in various sports disciplines, bringing laurels at national and international levels.
                        </p>
                    </div>

                    {/* Featured Champions Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        {sportsChampions.slice(0, 8).map((champion, index) => (
                            <motion.div
                                key={index}
                                variants={fadeIn}
                                className={`relative overflow-hidden rounded-2xl p-6 ${champion.medal === 'gold' ? 'bg-gradient-to-br from-amber-50 to-amber-100 border-2 border-amber-200' :
                                    champion.medal === 'silver' ? 'bg-gradient-to-br from-slate-50 to-slate-100 border-2 border-slate-300' :
                                        'bg-gradient-to-br from-orange-50 to-orange-100 border-2 border-orange-200'
                                    } hover:shadow-xl transition-all duration-300 group`}
                            >
                                <div className={`absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center ${champion.medal === 'gold' ? 'bg-amber-400 text-amber-900' :
                                    champion.medal === 'silver' ? 'bg-slate-400 text-slate-900' :
                                        'bg-orange-400 text-orange-900'
                                    }`}>
                                    <Medal size={18} />
                                </div>
                                <div className="mb-4">
                                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500">{champion.sport}</span>
                                </div>
                                <h3 className="font-bold text-royal text-lg mb-1">{champion.name}</h3>
                                {champion.class && <p className="text-slate-500 text-sm mb-3">{champion.class}</p>}
                                <p className="text-slate-700 text-sm font-medium">{champion.achievement}</p>
                            </motion.div>
                        ))}
                    </div>

                    {/* Additional Sports List */}
                    <motion.div
                        variants={fadeIn}
                        className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100"
                    >
                        <h3 className="text-xl font-bold text-royal mb-6 flex items-center gap-3">
                            <Trophy className="text-gold" />
                            More Sports Achievements
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {additionalSports.map((athlete, index) => (
                                <div key={index} className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors">
                                    <div className="w-2 h-2 bg-gold rounded-full"></div>
                                    <div>
                                        <span className="font-medium text-royal">{athlete.name}</span>
                                        <span className="text-slate-400 mx-2">•</span>
                                        <span className="text-slate-500 text-sm">{athlete.class}</span>
                                        <p className="text-slate-600 text-sm">{athlete.sport} - {athlete.achievement}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </motion.div>

                {/* Sports Gallery */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeIn}
                >
                    <h3 className="text-2xl font-serif font-bold text-royal mb-8 text-center">
                        Sports Highlights
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[
                            "https://images.unsplash.com/photo-1461896836934-28e4a8c39a01?q=80&w=500",
                            "https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=500",
                            "https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=500",
                            "https://images.unsplash.com/photo-1526676037777-05a232554f77?q=80&w=500",
                        ].map((img, idx) => (
                            <div key={idx} className="aspect-square rounded-2xl overflow-hidden group">
                                <img
                                    src={img}
                                    alt={`Sports achievement ${idx + 1}`}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                    onError={(e) => {
                                        e.currentTarget.src = `https://picsum.photos/500/500?random=${idx}`;
                                    }}
                                />
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Extracurricular Excellence */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={staggerContainer}
                >
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-serif font-bold text-royal mb-4">
                            Extracurricular Excellence
                        </h2>
                        <p className="text-slate-600 max-w-2xl mx-auto">
                            Beyond academics and sports, our students shine in arts, science, and innovation.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {/* ATL Labs */}
                        <motion.div variants={fadeIn} className="bg-gradient-to-br from-purple-500 to-indigo-600 p-8 rounded-3xl text-white">
                            <FlaskConical className="w-12 h-12 mb-6 text-purple-200" />
                            <h3 className="text-2xl font-serif font-bold mb-4">ATL Labs & Innovation</h3>
                            <p className="text-white/80 mb-4">
                                ATL Labs have given food for thought to our young scientists. Aryan Kumar of class 8B has been working on launching a website exclusively for school. Vedansh of 8A has made an animated short film and posted it on the website.
                            </p>
                            <div className="bg-white/10 rounded-xl p-4">
                                <p className="text-purple-100 text-sm italic">
                                    "Each child is gifted, we have to just unfurl that gift and bring it out as a life skill."
                                </p>
                            </div>
                        </motion.div>

                        {/* Music & Cultural */}
                        <motion.div variants={fadeIn} className="bg-gradient-to-br from-rose-500 to-pink-600 p-8 rounded-3xl text-white">
                            <Music className="w-12 h-12 mb-6 text-rose-200" />
                            <h3 className="text-2xl font-serif font-bold mb-4">Music & Cultural</h3>
                            <p className="text-white/80 mb-4">
                                Our musical choir won <span className="font-bold text-white">3rd position</span> in the interstate music competition. Students participate in dance, art, handwriting, and cultural activities.
                            </p>
                            <div className="bg-white/10 rounded-xl p-4">
                                <p className="text-rose-100 text-sm">Nimfiya of Class 5 has proved her mental grit in Abacus competitions.</p>
                            </div>
                        </motion.div>

                        {/* Academic Competitions */}
                        <motion.div variants={fadeIn} className="bg-gradient-to-br from-emerald-500 to-teal-600 p-8 rounded-3xl text-white">
                            <GraduationCap className="w-12 h-12 mb-6 text-emerald-200" />
                            <h3 className="text-2xl font-serif font-bold mb-4">Academic Competitions</h3>
                            <p className="text-white/80 mb-4">
                                Among 27 schools, our students won the <span className="font-bold text-white">1st position</span> in Mathematics Quiz. We conduct inter-house competitions in elocution, speeches, debates, quiz, and more.
                            </p>
                            <div className="bg-white/10 rounded-xl p-4">
                                <p className="text-emerald-100 text-sm">Parents witnessed amazing, innovative ideas at our science exhibition.</p>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>

                {/* Inter-House Activities */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeIn}
                    className="bg-royal-dark rounded-3xl p-10 text-white"
                >
                    <div className="flex items-center gap-4 mb-8">
                        <Users className="w-10 h-10 text-gold" />
                        <h3 className="text-2xl font-serif font-bold">Inter-House Competitions & Activities</h3>
                    </div>
                    <p className="text-white/80 mb-8 max-w-4xl">
                        Our students have been participating in various fields in their individual capacity as we groom them to face challenges. We have inter-house competitions wherein our students choose to participate in a wide range of activities.
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                        {["Elocution", "Speeches", "Debates", "Dialogue Delivery", "Music", "Dance", "Art", "Handwriting", "Spell Bee", "Quiz", "House Boards", "Displays"].map((activity, idx) => (
                            <div key={idx} className="bg-white/10 rounded-xl p-3 text-center hover:bg-white/20 transition-colors">
                                <span className="text-sm font-medium">{activity}</span>
                            </div>
                        ))}
                    </div>
                    <p className="text-white/70 mt-8 text-sm">
                        Our assembly activities encourage students to come up on the stage for extempore, skits, news reading, thought of the day and many more.
                    </p>
                </motion.div>

                {/* Achievement Gallery */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeIn}
                >
                    <h3 className="text-2xl font-serif font-bold text-royal mb-8 text-center">
                        Moments of Pride
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            { img: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?q=80&w=600", caption: "Academic Excellence" },
                            { img: "https://images.unsplash.com/photo-1461896836934-28e4a8c39a01?q=80&w=600", caption: "Sports Achievements" },
                            { img: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=600", caption: "Cultural Programs" },
                        ].map((item, idx) => (
                            <div key={idx} className="group relative overflow-hidden rounded-2xl aspect-[4/3]">
                                <img
                                    src={item.img}
                                    alt={item.caption}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6">
                                    <h4 className="text-white font-bold text-xl">{item.caption}</h4>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Inspirational Closing */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeIn}
                    className="text-center max-w-4xl mx-auto"
                >
                    <div className="bg-gradient-to-br from-gold/10 via-white to-royal/5 p-12 rounded-3xl border border-gold/20">
                        <Sparkles className="w-12 h-12 mx-auto mb-6 text-gold" />
                        <blockquote className="text-2xl md:text-3xl font-serif text-royal leading-relaxed mb-8">
                            "Every day of your life is another lesson. If you learn the lesson well and apply it; whether positive or negative, you determine what happens tomorrow."
                        </blockquote>
                        <p className="text-slate-600 text-lg mb-8">
                            We have often been taught that if we truly want to get somewhere in our lives, we have to work hard and stay focused on our goals.
                            <span className="font-bold text-royal"> Every skill you acquire doubles your odds of success.</span>
                        </p>
                        <div className="h-1 w-24 bg-gold mx-auto rounded-full"></div>
                    </div>
                </motion.div>

            </Section>
        </div>
    );
}
