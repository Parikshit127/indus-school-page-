
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/section";
import { Trophy, Users, Camera, Mic, BookOpen, Palette } from "lucide-react";
import { motion } from "framer-motion";

export default function ActivitiesPage() {
    return (
        <div className="min-h-screen bg-slate-50">
            <PageHero
                title="Co-Scholastic Activities"
                subtitle="The Third Dimension of Education"
                image="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070&auto=format&fit=crop"
            />

            {/* Introduction */}
            <Section className="bg-white">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl font-serif text-royal font-bold mb-6">Holistic Development</h2>
                    <p className="text-lg text-gray-700 leading-relaxed">
                        Co-curricular activities are "the Third Dimension of Education". They develop skills and are productively oriented. At Indus Public School, we believe that education goes beyond the classroom. Our diverse range of activities ensures that every student finds their passion and excels in it.
                    </p>
                </div>
            </Section>

            {/* MUN Section - Detailed */}
            <Section className="bg-slate-50">
                <div className="flex flex-col gap-12">
                    <div className="p-8 md:p-12 bg-white rounded-2xl shadow-xl border-l-4 border-gold">
                        <div className="flex flex-col md:flex-row gap-8 items-start">
                            <div className="flex-1">
                                <span className="inline-block px-4 py-1.5 bg-royal/10 text-royal font-bold text-sm rounded-full mb-4">
                                    Flagship Event
                                </span>
                                <h3 className="text-2xl md:text-4xl font-serif text-royal font-bold mb-6">
                                    IPSRMUN’22: 7th Edition
                                </h3>
                                <div className="space-y-4 text-gray-700 leading-relaxed">
                                    <p>
                                        Communal harmony along with Democracy went hand in hand during the two-day session of IPSRMUN’22, successfully conducted and concluded in the premises of Indus Public School, Rohtak. The whole world came under one roof to simulate, enhance and reciprocate cooperation, diplomacy with vows of perseverance to achieve the goal of cyber security, women upliftment, hygiene, and press freedom globally.
                                    </p>
                                    <p>
                                        Varied views, debate, and possible preventions were part and parcel of the discussion sessions held on 3rd and 4th December 2022. Expository, persuasive, and oratory skills of young minds got chiselled, enhanced, and sharpened to develop into many budding leaders and speakers.
                                    </p>
                                    <p>
                                        The closing ceremony was presided by <strong>Dr. Sunit Mukherjee</strong>, Assistant Professor and Director in the Department of Journalism and Mass Communication, Maharshi Dayanand University, Rohtak.
                                    </p>
                                </div>
                            </div>
                            <div className="w-full md:w-1/3 bg-gray-100 rounded-xl p-6 relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-4 opacity-10">
                                    <Users size={120} />
                                </div>
                                <h4 className="text-xl font-bold text-royal mb-4">Event Highlights</h4>
                                <ul className="space-y-3">
                                    <li className="flex items-center gap-3">
                                        <div className="w-2 h-2 rounded-full bg-gold" />
                                        <span>3rd & 4th December, 2022</span>
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <div className="w-2 h-2 rounded-full bg-gold" />
                                        <span>150+ Delegates</span>
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <div className="w-2 h-2 rounded-full bg-gold" />
                                        <span>Committees: UNHRC, UNSC, CSW, AIPPM</span>
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <div className="w-2 h-2 rounded-full bg-gold" />
                                        <span>Chief Guest: Dr. Sunit Mukherjee</span>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {/* Awards Grid */}
                        <div className="mt-12">
                            <h4 className="text-2xl font-serif text-royal font-bold mb-8 text-center flex items-center justify-center gap-3">
                                <Trophy className="text-gold" /> IPSRMUN’22 Awards
                            </h4>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                {/* Best Delegate */}
                                <AwardCategory
                                    title="Best Delegate"
                                    winners={[
                                        "China (Bhavya Singh)",
                                        "Korea (Laksh Kharb)",
                                        "India (Geetika)",
                                        "Yogi Aditya Nath (Yudhishthira Varma)"
                                    ]}
                                    color="bg-yellow-50 border-yellow-200"
                                    titleColor="text-yellow-700"
                                />

                                {/* High Commendation */}
                                <AwardCategory
                                    title="High Commendation"
                                    winners={[
                                        "Bharat (Saurya)",
                                        "France (Ishan Kajal)",
                                        "China (Ryan Malik)",
                                        "Russia (Arpit Siwach)",
                                        "Acudor (Jasmeet)",
                                        "Peru (Ayush Gill)",
                                        "Shashi Tharoor (Khushi)",
                                        "Narendra Modi (Nitesh)"
                                    ]}
                                    color="bg-blue-50 border-blue-200"
                                    titleColor="text-blue-700"
                                />

                                {/* Special Mention */}
                                <AwardCategory
                                    title="Special Mention"
                                    winners={[
                                        "Japan (Aastha)",
                                        "Australia (Aryan Singh)",
                                        "United Kingdom (Disha Bansal)",
                                        "Spain (Khushi Dhul)",
                                        "Syria (Anshul)",
                                        "France (Ravneet Singh)",
                                        "New Zealand (Riya)",
                                        "United Kingdom (Devyanshi)",
                                        "Nimbia (Pavitar)",
                                        "Rahul Gandhi (Lucky Deshwal)",
                                        "Arvind Kejriwal (Samridh)"
                                    ]}
                                    color="bg-purple-50 border-purple-200"
                                    titleColor="text-purple-700"
                                />

                                {/* Verbal Mention */}
                                <AwardCategory
                                    title="Verbal Mention"
                                    winners={[
                                        "Myanmar (Saranshi)",
                                        "Italy (Jayanth)",
                                        "Belgium (Akshita)",
                                        "Lithuania (Anya)",
                                        "Bulgaria (Abhimanyu Hooda)",
                                        "Ukraine (Akshit)",
                                        "Yemen (Tanishk Chauhan)",
                                        "Ireland (Suhani Singla)",
                                        "Nitin Gadkari (Advit Verma)"
                                    ]}
                                    color="bg-green-50 border-green-200"
                                    titleColor="text-green-700"
                                />
                            </div>

                            <div className="mt-8 flex flex-wrap justify-center gap-6">
                                <div className="flex items-center gap-3 bg-gray-50 px-6 py-3 rounded-lg border border-gray-200">
                                    <Camera className="text-royal" size={20} />
                                    <div>
                                        <div className="text-sm text-gray-500 uppercase tracking-wider font-semibold">Best Photographer</div>
                                        <div className="font-bold text-royal">Manish Rathee</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 bg-gray-50 px-6 py-3 rounded-lg border border-gray-200">
                                    <Mic className="text-royal" size={20} />
                                    <div>
                                        <div className="text-sm text-gray-500 uppercase tracking-wider font-semibold">Best Journalist</div>
                                        <div className="font-bold text-royal">Dakshita</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-10 p-6 bg-royal/5 rounded-lg text-center">
                            <p className="italic text-gray-700">
                                "Dr. (Mrs.) Ekta Sindhu, Chairperson, Indus Group of Institutions highly appreciated the endeavour of students in making the sessions a great success. Mr. Indranil Gupta, Director Principal, Indus Public School, Rohtak, extended his heartiest felicitation to EB members for guiding and motivating the students."
                            </p>
                        </div>
                    </div>
                </div>
            </Section>

            {/* Other Activities Grid */}
            <Section className="bg-white">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-serif text-royal font-bold mb-4">
                        Beyond Academics
                    </h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        We offer a vibrant ecosystem of activities that cater to every student's interest, fostering physical, cultural, and intellectual growth.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <ActivityCard
                        title="Sports & Athletics"
                        icon={<Trophy size={40} />}
                        description="State-of-the-art facilities for Cricket, Football, Basketball, Skating, and Judo. Our students regularly compete and win medals at State and National levels."
                        image="https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=2070&auto=format&fit=crop"
                        tags={["Cricket", "Football", "Skating", "Judo", "Badminton"]}
                    />
                    <ActivityCard
                        title="Arts & Culture"
                        icon={<Palette size={40} />}
                        description="Celebrating creativity through Dance, Music, Drama, and Fine Arts. Regular inter-house and inter-school competitions keep the artistic spirit alive."
                        image="https://images.unsplash.com/photo-1530103862676-de3c9a59af57?q=80&w=2070&auto=format&fit=crop"
                        tags={["Dance", "Music", "Theatre", "Fine Arts", "Festivals"]}
                    />
                    <ActivityCard
                        title="Academic Clubs"
                        icon={<BookOpen size={40} />}
                        description="Robotics, Science, Math, and Literary clubs that push the boundaries of classroom learning. Debate competitions and seminars hone critical thinking."
                        image="https://images.unsplash.com/photo-1581092921461-eab62e97a783?q=80&w=2070&auto=format&fit=crop"
                        tags={["Robotics", "Debate", "Science Club", "Literary Club"]}
                    />
                </div>
            </Section>
        </div>
    );
}

function AwardCategory({ title, winners, color, titleColor }: { title: string, winners: string[], color: string, titleColor: string }) {
    return (
        <div className={`p-6 rounded-xl border ${color} h-full`}>
            <h5 className={`font-bold text-lg mb-4 ${titleColor} border-b border-current pb-2`}>{title}</h5>
            <ul className="space-y-2">
                {winners.map((winner, idx) => (
                    <li key={idx} className="text-sm text-gray-700 flex items-start">
                        <span className="mr-2 text-gold">•</span>
                        {winner}
                    </li>
                ))}
            </ul>
        </div>
    );
}

function ActivityCard({ title, icon, description, image, tags }: { title: string, icon: any, description: string, image: string, tags: string[] }) {
    return (
        <motion.div
            whileHover={{ y: -10 }}
            className="bg-white rounded-xl overflow-hidden shadow-lg border border-gray-100 flex flex-col h-full"
        >
            <div className="h-48 overflow-hidden relative">
                <div className="absolute inset-0 bg-royal/20 z-10" />
                <img src={image} alt={title} className="w-full h-full object-cover" />
                <div className="absolute bottom-4 left-4 z-20 bg-white/90 p-3 rounded-full text-royal shadow-lg">
                    {icon}
                </div>
            </div>
            <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-2xl font-bold text-royal mb-3">{title}</h3>
                <p className="text-gray-600 mb-6 flex-1">{description}</p>
                <div className="flex flex-wrap gap-2">
                    {tags.map(tag => (
                        <span key={tag} className="text-xs font-medium px-3 py-1 bg-gray-100 text-royal rounded-full">
                            {tag}
                        </span>
                    ))}
                </div>
            </div>
        </motion.div>
    );
}
