import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { PageHero } from "@/components/ui/PageHero";
import { Monitor, FlaskConical, Library, Utensils, HeartPulse, Bus, ShoppingBag, Laptop, HeartHandshake, Building2, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Enhanced Facilities Data
const facilities = [
    {
        id: "campus",
        title: "Campus",
        icon: Building2,
        image: "https://ipsrohtak.edu.in//downloads/other/n568b858d186b6.jpg", // Reuse existing image for now
        description: `Indus Public School spreads over a vast lush green campus on National Highway-10, 30 minutes drive from Delhi Border. The school is affiliated to Central Board of Secondary Education, Delhi. 
        
        The campus is designed to provide a serene and conducive environment for learning. With sprawling lawns, modern architecture, and state-of-the-art infrastructure, every corner of the campus inspires students to explore and excel. We prioritize safety and hygiene, ensuring a healthy atmosphere for all.`,
    },
    {
        id: "smart-class",
        title: "Smart Class Rooms",
        icon: Monitor,
        image: "https://ipsrohtak.edu.in//downloads/other/n568b847b3c3e3.jpg", // Reuse existing image
        description: `Interactive Smart-Class is a revolutionary, teaching-learning system that comes from India's largest and most respected education company, 'Educomp'. With some 3000 progressive schools in the country that are already Smart-Class empowered, it is quickly acquiring the status of a movement for new age learning.
        
        We are proud to have joined this movement. With Smart Class, our teachers will be able to complement their traditional methods of teaching, on almost all school subjects with well researched, mapped-to-curriculum digital lessons (animation, graphics, audio & video) on an everyday basis during their teaching periods. We are confident that this would lead to a whole new learning experience for your wards. Aroused interest levels, sharper understanding of abstract and difficult concepts and yes, better academic performance.
        
        Smart-Class would also boost our teachers productivity immensely and leave them with enough time for revision and quicker assessment of your ward's comprehension and progress on every subject.
        
        We are proud to be among the early pioneers of this movement and the first in Rohtak.`,
    },
    {
        id: "science-lab",
        title: "Science Lab",
        icon: FlaskConical,
        image: "https://ipsrohtak.edu.in//downloads/other/n568b844a9d60a.jpg",
        description: `Our Science Laboratories are well-equipped to foster scientific temper and curiosity among students. We have separate labs for Physics, Chemistry, and Biology, each designed to meet the highest safety standards.
        
        The labs are spacious and provided with modern apparatus and chemicals to conduct experiments as per the CBSE curriculum. Students are encouraged to learn by doing, which helps in clarifying theoretical concepts. Regular practical classes are conducted under the guidance of experienced teachers and lab assistants.`,
    },
    {
        id: "library",
        title: "Library",
        icon: Library,
        image: "https://ipsrohtak.edu.in//downloads/other/n568b8466c1c8c.jpg",
        description: `The school library is a treasure trove of knowledge, housing a vast collection of books across various genres, including fiction, non-fiction, reference books, encyclopedias, and periodicals. It is a quiet sanctuary where students can immerse themselves in the world of reading.
        
        We also subscribe to daily newspapers and magazines to keep students updated with current affairs. The library has a comfortable seating arrangement and a digital section for research purposes. Regular library periods are scheduled to inculcate the habit of reading among students.`,
    },
    {
        id: "hostel-food",
        title: "Hostel & Food",
        icon: Utensils,
        image: "https://ipsrohtak.edu.in//downloads/other/n568b85c51db4a.jpg",
        description: `We offer excellent hostel facilities for students, providing a home away from home. The separate hostels for boys and girls are safe, secure, and comfortable, with wardens ensuring discipline and care.
        
        Our dining hall serves nutritious and hygienic vegetarian meals, planned by dieticians to ensure a balanced diet. We place a high emphasis on hygiene and cleanliness in the kitchen and dining area. The menu is varied to cater to the tastes of students while ensuring their health and well-being.`,
    },
    {
        id: "school-clinic",
        title: "School Clinic",
        icon: HeartPulse,
        image: "https://ipsrohtak.edu.in//downloads/other/n568babab69fbe.jpg",
        description: `The health and well-being of our students are of paramount importance. The school clinic is equipped to handle minor injuries and medical emergencies. a qualified nurse is present at all times during school hours.
        
        We conduct regular health check-ups for all students, including dental and eye check-ups. Health records are maintained for each student, and parents are kept informed about their child's health status. We also organize health awareness sessions to educate students about hygiene and healthy living.`,
    },
    {
        id: "transport",
        title: "Transport",
        icon: Bus,
        image: "https://ipsrohtak.edu.in//downloads/other/n568bb915ad40b.jpg",
        description: `The school provides safe and reliable transport facilities with a fleet of well-maintained buses covering Rohtak and surrounding areas. Each bus is equipped with GPS tracking and speed governors for safety.
        
        Drivers and conductors are trained and verified. A teacher or attendant is present in every bus to ensure discipline and safety of the students. We ensure that the commute to and from school is comfortable and hassle-free for our students.`,
    },
    {
        id: "book-shop",
        title: "School Book Shop",
        icon: ShoppingBag,
        image: "https://ipsrohtak.edu.in/templates/indus-rtk//img/flash-img.jpg",
        description: `To facilitate parents and students, the school has an in-house book and uniform shop. This one-stop shop ensures that all improved textbooks, notebooks, and stationery items are easily available.
        
        The uniform section provides high-quality school uniforms, shoes, and accessories, ensuring uniformity and adherence to the school's dress code. This facility saves time and effort for parents, making the start of the academic session smooth.`,
    },
    {
        id: "computer-lab",
        title: "Computer Lab",
        icon: Laptop,
        image: "https://ipsrohtak.edu.in//downloads/other/n568cc8ddd0ba3.jpg",
        description: `In the digital age, computer literacy is essential. Our school boasts two modern ICT labs equipped with the latest hardware and software. High-speed internet connectivity is available to facilitate research and project work.
        
        The curriculum is designed to go beyond basic computer skills, introducing students to programming, graphic design, and other advanced concepts. Qualified instructors guide students in exploring the limitless possibilities of technology in a responsible manner.`,
    },
    {
        id: "counselling",
        title: "Psychological Counselling",
        icon: HeartHandshake,
        image: "https://ipsrohtak.edu.in//downloads/other/n5869e17787504.jpg",
        description: `We understand that students may face various emotional and behavioral challenges. Our dedicated Psychological Counselling cell provides a supportive space for students to discuss their concerns.
        
        A professional school counselor is available to provide one-on-one therapy for stress, anxiety, peer pressure, and other issues. We also conduct workshops on mental health, study skills, and personality development to help students navigate their growing years with confidence and resilience.`,
    }
];

export default function FacilitiesPage() {
    const [selectedId, setSelectedId] = useState(facilities[0].id);
    const location = useLocation();

    const selectedFacility = facilities.find(f => f.id === selectedId) || facilities[0];

    // Allow deep-linking via hash e.g. /facilities#science-lab
    useEffect(() => {
        if (location.hash) {
            const hashId = location.hash.replace('#', '');
            const exists = facilities.some(f => f.id === hashId);
            if (exists) {
                setSelectedId(hashId);
            }
        }
    }, [location.hash]);

    return (
        <div className="bg-white min-h-screen">
            <PageHero
                title="World Class Facilities"
                subtitle="A vast lush green campus on National Highway-10. We provide an environment that nurtures growth."
                image="/assets/home/infrastructure.png"
            />

            <div className="container mx-auto px-4 py-16">
                <div className="flex flex-col md:flex-row gap-8">

                    {/* SIDEBAR NAVIGATION */}
                    <div className="w-full md:w-1/4 shrink-0">
                        <div className="bg-gray-100 rounded-lg overflow-hidden sticky top-24">
                            {facilities.map((facility) => (
                                <button
                                    key={facility.id}
                                    onClick={() => setSelectedId(facility.id)}
                                    className={`w-full text-left px-6 py-4 border-b border-gray-200 last:border-0 transition-all flex items-center justify-between group
                                        ${selectedId === facility.id
                                            ? 'bg-gray-200 text-royal font-bold border-l-4 border-l-royal'
                                            : 'text-gray-600 hover:bg-gray-50 hover:text-royal'
                                        }`}
                                >
                                    <span className="flex items-center gap-3">
                                        <ChevronRight size={16} className={`transition-opacity ${selectedId === facility.id ? 'opacity-100' : 'opacity-0 group-hover:opacity-50'}`} />
                                        {facility.title}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* MAIN CONTENT AREA */}
                    <div className="flex-1 min-h-[500px]">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={selectedId}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.3 }}
                                className="bg-white"
                            >
                                <h2 className="text-3xl font-bold text-royal mb-6 border-b pb-4">
                                    {selectedFacility.title}
                                </h2>

                                <div className="mb-8 rounded-xl overflow-hidden shadow-sm h-64 md:h-96 w-full">
                                    <img
                                        src={selectedFacility.image}
                                        alt={selectedFacility.title}
                                        className="w-full h-full object-cover"
                                    />
                                </div>

                                <div className="prose prose-lg max-w-none text-gray-600">
                                    {selectedFacility.description.split('\n\n').map((paragraph, idx) => (
                                        <p key={idx} className="mb-4 leading-relaxed">
                                            {paragraph.trim()}
                                        </p>
                                    ))}
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                </div>
            </div>
        </div>
    );
}
