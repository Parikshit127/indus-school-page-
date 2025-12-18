import { motion } from "framer-motion";
import { useState } from "react";
import { Quote, Star, ChevronLeft, ChevronRight, Award, Trophy, Medal } from "lucide-react";

const testimonials = [
    {
        id: 1,
        name: "Rajesh Sharma",
        role: "Parent of Aryan, Class X",
        content: "The transformation in my son's confidence has been remarkable. The teachers here don't just teach – they mentor.",
        rating: 5,
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop"
    },
    {
        id: 2,
        name: "Priya Gupta",
        role: "Parent of Ananya, Class VIII",
        content: "What sets Indus apart is the perfect balance of academics and extracurriculars. My daughter excels in both studies and dance.",
        rating: 5,
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop"
    },
    {
        id: 3,
        name: "Dr. Vikram Singh",
        role: "Parent of Kabir, Class XII",
        content: "Kabir scored 95% in boards and got admission to a top engineering college. The faculty's dedication is unmatched.",
        rating: 5,
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop"
    }
];

const studentAchievements = [
    { icon: Trophy, title: "CBSE Topper", name: "Rahul Mehra", achievement: "99.2% in Class XII", year: "2024" },
    { icon: Medal, title: "Olympiad Gold", name: "Sneha Kapoor", achievement: "IMO National Rank 1", year: "2024" },
    { icon: Award, title: "Sport Champion", name: "Arjun Thakur", achievement: "State Swimming Champion", year: "2024" }
];

export function Testimonials() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const nextTestimonial = () => setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    const prevTestimonial = () => setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

    return (
        <section className="py-16 md:py-24 bg-royal relative overflow-hidden">
            <div className="absolute top-10 left-10 text-white/5"><Quote className="w-32 h-32" /></div>
            <div className="container mx-auto px-4 md:px-8 relative z-10">
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
                    <span className="inline-block px-4 py-1.5 bg-gold/20 text-gold rounded-full text-xs font-bold tracking-widest uppercase mb-4 border border-gold/30">Voices of Trust</span>
                    <h2 className="text-3xl md:text-5xl font-serif font-bold text-white mb-4">What Parents Say <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold to-gold-light">About Us</span></h2>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-8 mb-16">
                    <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                        <div className="bg-white rounded-2xl p-6 md:p-8 shadow-2xl">
                            <Quote className="w-10 h-10 text-gold/20 mb-4" />
                            <p className="text-lg text-royal/80 italic mb-6">"{testimonials[currentIndex].content}"</p>
                            <div className="flex items-center gap-4">
                                <img src={testimonials[currentIndex].image} alt={testimonials[currentIndex].name} className="w-14 h-14 rounded-full object-cover border-2 border-gold" />
                                <div>
                                    <h4 className="font-bold text-royal">{testimonials[currentIndex].name}</h4>
                                    <p className="text-sm text-royal/60">{testimonials[currentIndex].role}</p>
                                </div>
                                <div className="ml-auto flex">{[...Array(testimonials[currentIndex].rating)].map((_, i) => <Star key={i} className="w-4 h-4 text-gold fill-gold" />)}</div>
                            </div>
                        </div>
                        <div className="flex justify-center gap-4 mt-6">
                            <button onClick={prevTestimonial} className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-gold hover:text-royal transition-colors"><ChevronLeft className="w-5 h-5" /></button>
                            <div className="flex items-center gap-2">{testimonials.map((_, index) => <button key={index} onClick={() => setCurrentIndex(index)} className={`w-2.5 h-2.5 rounded-full transition-all ${index === currentIndex ? 'bg-gold w-6' : 'bg-white/30'}`} />)}</div>
                            <button onClick={nextTestimonial} className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-gold hover:text-royal transition-colors"><ChevronRight className="w-5 h-5" /></button>
                        </div>
                    </motion.div>

                    <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="space-y-4">
                        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2"><Trophy className="w-5 h-5 text-gold" />Recent Achievements</h3>
                        {studentAchievements.map((a, i) => (
                            <div key={i} className="bg-white/5 backdrop-blur-sm rounded-xl p-5 border border-white/10 hover:bg-white/10 transition-colors">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-gold/20 rounded-xl flex items-center justify-center"><a.icon className="w-6 h-6 text-gold" /></div>
                                    <div className="flex-1">
                                        <div className="flex items-center justify-between mb-1"><h4 className="font-bold text-white">{a.name}</h4><span className="text-xs text-gold bg-gold/20 px-2 py-1 rounded-full">{a.year}</span></div>
                                        <p className="text-sm text-white/70">{a.title}: {a.achievement}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </motion.div>
                </div>

                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="flex flex-wrap justify-center gap-8 py-6 border-t border-white/10">
                    <div className="text-center"><div className="text-3xl font-bold text-gold">4.9/5</div><div className="text-sm text-white/60">Google Rating</div></div>
                    <div className="text-center"><div className="text-3xl font-bold text-white">500+</div><div className="text-sm text-white/60">Parent Reviews</div></div>
                    <div className="text-center"><div className="text-3xl font-bold text-gold">98%</div><div className="text-sm text-white/60">Parent Satisfaction</div></div>
                </motion.div>
            </div>
        </section>
    );
}
