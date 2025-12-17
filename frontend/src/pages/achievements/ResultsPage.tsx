import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/section";
import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

// Import result banner images
import resultBanner1 from "@/assets/results/result-banner-2.png";
import resultBanner2 from "@/assets/results/result-banner-2.png";

// Results data for Class X
const classXResults: Record<string, Array<{ name: string; percentage: number; subjects: string }>> = {
    "2024-25": [
        { name: "Ananya Sharma", percentage: 98.2, subjects: "All Subjects" },
        { name: "Rohan Verma", percentage: 97.8, subjects: "Science Stream" },
        { name: "Priya Singh", percentage: 97.5, subjects: "Mathematics" },
        { name: "Aditya Kumar", percentage: 97.2, subjects: "Science Stream" },
        { name: "Sneha Gupta", percentage: 96.8, subjects: "All Subjects" },
        { name: "Vikram Rao", percentage: 96.5, subjects: "Social Science" },
    ],
    "2023-24": [
        { name: "Rahul Sharma", percentage: 97.5, subjects: "All Subjects" },
        { name: "Meera Patel", percentage: 96.8, subjects: "Science Stream" },
        { name: "Arjun Singh", percentage: 96.2, subjects: "Mathematics" },
        { name: "Kavya Reddy", percentage: 95.8, subjects: "All Subjects" },
        { name: "Nikhil Kumar", percentage: 95.5, subjects: "Science Stream" },
        { name: "Pooja Gupta", percentage: 95.2, subjects: "Social Science" },
    ],
    "2022-23": [
        { name: "Amit Verma", percentage: 96.8, subjects: "All Subjects" },
        { name: "Sanya Kapoor", percentage: 96.2, subjects: "Science Stream" },
        { name: "Karan Malhotra", percentage: 95.8, subjects: "Mathematics" },
        { name: "Riya Sharma", percentage: 95.5, subjects: "All Subjects" },
        { name: "Varun Singh", percentage: 95.0, subjects: "Science Stream" },
        { name: "Neha Agarwal", percentage: 94.8, subjects: "Social Science" },
    ]
};

// Results data for Class XII
const classXIIResults: Record<string, Array<{ name: string; percentage: number; subjects: string }>> = {
    "2024-25": [
        { name: "Arjun Malhotra", percentage: 99.4, subjects: "Science Stream" },
        { name: "Ishita Kapoor", percentage: 98.6, subjects: "Commerce Stream" },
        { name: "Vikram Rao", percentage: 98.2, subjects: "Humanities" },
        { name: "Neha Sharma", percentage: 97.8, subjects: "Science Stream" },
        { name: "Karan Singh", percentage: 97.5, subjects: "Commerce Stream" },
        { name: "Riya Gupta", percentage: 97.2, subjects: "Humanities" },
    ],
    "2023-24": [
        { name: "Aditya Sharma", percentage: 98.8, subjects: "Science Stream" },
        { name: "Priya Mehta", percentage: 98.2, subjects: "Commerce Stream" },
        { name: "Rohan Patel", percentage: 97.8, subjects: "Science Stream" },
        { name: "Sneha Reddy", percentage: 97.5, subjects: "Humanities" },
        { name: "Harsh Kumar", percentage: 97.2, subjects: "Commerce Stream" },
        { name: "Ananya Singh", percentage: 96.8, subjects: "Science Stream" },
    ],
    "2022-23": [
        { name: "Siddharth Verma", percentage: 98.2, subjects: "Science Stream" },
        { name: "Kavya Sharma", percentage: 97.8, subjects: "Commerce Stream" },
        { name: "Aryan Gupta", percentage: 97.5, subjects: "Science Stream" },
        { name: "Diya Kapoor", percentage: 97.2, subjects: "Humanities" },
        { name: "Nikhil Malhotra", percentage: 96.8, subjects: "Commerce Stream" },
        { name: "Isha Agarwal", percentage: 96.5, subjects: "Science Stream" },
    ]
};

const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

export default function ResultsPage() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [selectedYear, setSelectedYear] = useState<string>("2024-25");
    
    const availableYears = Object.keys(classXResults).sort().reverse();

    const bannerImages = [
        {
            src: resultBanner1,
            alt: "Class X and XII Toppers - Session 2023-24",
            fallback: "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=2070&auto=format&fit=crop"
        },
        {
            src: resultBanner2,
            alt: "Grade 10 and 12 Toppers with NEET Results 2023",
            fallback: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2070&auto=format&fit=crop"
        }
    ];

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % bannerImages.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + bannerImages.length) % bannerImages.length);
    };

    return (
        <div className="min-h-screen bg-slate-50">
            <PageHero
                title="Academic Results"
                subtitle="CBSE Board Examination - Outstanding Performance"
                image="https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=2070&auto=format&fit=crop"
            />

            {/* Results Banner Slider */}
            <Section className="bg-white py-8">
                <div className="max-w-7xl mx-auto">
                    <div className="relative">
                        {/* Main Slider */}
                        <div className="relative overflow-hidden rounded-2xl shadow-2xl bg-slate-100">
                            <div className="relative aspect-[16/10] md:aspect-[16/9]">
                                {bannerImages.map((banner, index) => (
                                    <div
                                        key={index}
                                        className={`absolute inset-0 transition-opacity duration-700 ${
                                            index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
                                        }`}
                                    >
                                        <img
                                            src={banner.src}
                                            alt={banner.alt}
                                            className="w-full h-full object-contain bg-white"
                                            onError={(e) => {
                                                const target = e.target as HTMLImageElement;
                                                target.src = banner.fallback;
                                            }}
                                        />
                                    </div>
                                ))}
                            </div>

                            {/* Navigation Buttons */}
                            {bannerImages.length > 1 && (
                                <>
                                    <button
                                        onClick={prevSlide}
                                        className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 hover:bg-white rounded-full flex items-center justify-center text-royal shadow-lg transition-all duration-300 hover:scale-110 z-20"
                                        aria-label="Previous slide"
                                    >
                                        <ChevronLeft size={24} />
                                    </button>
                                    <button
                                        onClick={nextSlide}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 hover:bg-white rounded-full flex items-center justify-center text-royal shadow-lg transition-all duration-300 hover:scale-110 z-20"
                                        aria-label="Next slide"
                                    >
                                        <ChevronRight size={24} />
                                    </button>
                                </>
                            )}
                        </div>

                        {/* Slide Indicators */}
                        {bannerImages.length > 1 && (
                            <div className="flex justify-center gap-3 mt-6">
                                {bannerImages.map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setCurrentSlide(index)}
                                        className={`transition-all duration-300 rounded-full ${
                                            index === currentSlide
                                                ? "bg-royal w-12 h-3"
                                                : "bg-slate-300 hover:bg-slate-400 w-3 h-3"
                                        }`}
                                        aria-label={`Go to slide ${index + 1}`}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </Section>

            {/* Session Filter */}
            <Section className="bg-white py-8">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-8">
                        <h3 className="text-2xl font-serif font-bold text-royal mb-4">Select Academic Session</h3>
                        <p className="text-slate-600">View toppers from different academic years</p>
                    </div>
                    <div className="flex flex-wrap justify-center gap-4">
                        {availableYears.map((year) => (
                            <button
                                key={year}
                                onClick={() => setSelectedYear(year)}
                                className={`px-8 py-3 rounded-full font-bold text-lg transition-all duration-300 ${
                                    selectedYear === year
                                        ? "bg-royal text-white shadow-lg scale-105"
                                        : "bg-slate-100 text-slate-600 hover:bg-slate-200 hover:scale-105"
                                }`}
                            >
                                Session {year}
                            </button>
                        ))}
                    </div>
                </div>
            </Section>

            {/* Class X Toppers Section */}
            <Section className="bg-slate-50 py-8">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={staggerContainer}
                >
                    <div className="bg-gradient-to-br from-slate-50 to-white rounded-3xl p-6 md:p-8 shadow-lg border border-slate-200">
                        <div className="text-center mb-8">
                            <div className="inline-flex items-center justify-center gap-3 mb-3">
                                <div className="w-12 h-1 bg-gold rounded-full"></div>
                                <Sparkles className="text-gold" size={28} />
                                <div className="w-12 h-1 bg-gold rounded-full"></div>
                            </div>
                            <h4 className="text-2xl md:text-3xl font-serif font-bold text-royal mb-2">
                                Class X - School Toppers
                            </h4>
                            <p className="text-slate-600">Session {selectedYear}</p>
                        </div>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                            {classXResults[selectedYear] && classXResults[selectedYear].length > 0 ? (
                                classXResults[selectedYear].map((topper, index) => (
                                    <TopperCard key={index} topper={topper} rank={index + 1} />
                                ))
                            ) : (
                                <div className="col-span-full text-center py-12 text-slate-500">
                                    No results available for this session
                                </div>
                            )}
                        </div>
                    </div>
                </motion.div>
            </Section>

            {/* Class XII Toppers Section */}
            <Section className="bg-white py-8">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={staggerContainer}
                >
                    <div className="bg-gradient-to-br from-white to-slate-50 rounded-3xl p-6 md:p-8 shadow-lg border border-slate-200">
                        <div className="text-center mb-8">
                            <div className="inline-flex items-center justify-center gap-3 mb-3">
                                <div className="w-12 h-1 bg-gold rounded-full"></div>
                                <Sparkles className="text-gold" size={28} />
                                <div className="w-12 h-1 bg-gold rounded-full"></div>
                            </div>
                            <h4 className="text-2xl md:text-3xl font-serif font-bold text-royal mb-2">
                                Class XII - School Toppers
                            </h4>
                            <p className="text-slate-600">Session {selectedYear}</p>
                        </div>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                            {classXIIResults[selectedYear] && classXIIResults[selectedYear].length > 0 ? (
                                classXIIResults[selectedYear].map((topper, index) => (
                                    <TopperCard key={index} topper={topper} rank={index + 1} />
                                ))
                            ) : (
                                <div className="col-span-full text-center py-12 text-slate-500">
                                    No results available for this session
                                </div>
                            )}
                        </div>
                    </div>
                </motion.div>
            </Section>

            {/* Additional Results Gallery */}
            <Section className="bg-royal-dark text-white py-8">
                <div className="text-center mb-8">
                    <h3 className="text-2xl md:text-3xl font-serif font-bold mb-3">
                        Moments of Celebration
                    </h3>
                    <p className="text-white/80 max-w-2xl mx-auto">
                        Capturing the joy and pride of our students' remarkable achievements
                    </p>
                </div>
                <CelebrationGallery />
            </Section>

            {/* Message Section */}
            <Section className="bg-slate-50 py-8">
                <div className="max-w-4xl mx-auto text-center">
                    <p className="text-royal font-medium text-lg leading-relaxed">
                        Our students' outstanding results are a testament to their dedication, hard work, and the unwavering support of our faculty and parents.
                    </p>
                </div>
            </Section>
        </div>
    );
}

function TopperCard({ topper, rank }: { topper: any; rank: number }) {
    // Use real Indian student images
    const studentImages = [
        "https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=400&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=400&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=400&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop",
    ];

    return (
        <motion.div
            variants={fadeIn}
            className="relative bg-white p-6 rounded-2xl border-2 border-slate-200 hover:border-gold hover:shadow-2xl transition-all duration-300 group"
        >
            <div className="text-center">
                {/* Student Photo with Percentage Badge */}
                <div className="relative inline-block mb-4">
                    <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-royal shadow-lg group-hover:scale-105 transition-transform">
                        <img
                            src={studentImages[(rank - 1) % studentImages.length]}
                            alt={topper.name}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(topper.name)}&background=1e3a8a&color=fff&size=128`;
                            }}
                        />
                    </div>
                    {/* Percentage Badge */}
                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-gradient-to-r from-gold to-amber-500 text-white px-4 py-1 rounded-full font-bold text-lg shadow-lg">
                        {topper.percentage}%
                    </div>
                </div>

                {/* Congratulations Text */}
                <div className="mb-3">
                    <p className="text-xl font-serif italic text-royal mb-1">Congratulations</p>
                    <div className="w-12 h-0.5 bg-gold mx-auto rounded-full"></div>
                </div>

                {/* Student Name */}
                <h5 className="font-bold text-royal text-lg mb-2">{topper.name}</h5>
                
                {/* Class/Stream Info */}
                <p className="text-sm text-slate-600 bg-slate-50 inline-block px-4 py-1 rounded-full">
                    {topper.subjects}
                </p>
            </div>
        </motion.div>
    );
}

function CelebrationGallery() {
    const [currentSlide, setCurrentSlide] = useState(0);

    const images = [
        {
            url: "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=2070&auto=format&fit=crop",
            caption: "Result Declaration Ceremony"
        },
        {
            url: "https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=2070&auto=format&fit=crop",
            caption: "Celebrating Excellence"
        },
        {
            url: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=2070&auto=format&fit=crop",
            caption: "Proud Moments"
        },
        {
            url: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2070&auto=format&fit=crop",
            caption: "Academic Achievements"
        },
        {
            url: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=2070&auto=format&fit=crop",
            caption: "Success Stories"
        }
    ];

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % images.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + images.length) % images.length);
    };

    return (
        <div className="relative max-w-6xl mx-auto">
            <div className="relative h-[400px] md:h-[500px] rounded-3xl overflow-hidden shadow-2xl">
                {images.map((image, index) => (
                    <div
                        key={index}
                        className={`absolute inset-0 transition-opacity duration-700 ${
                            index === currentSlide ? "opacity-100" : "opacity-0"
                        }`}
                    >
                        <img
                            src={image.url}
                            alt={image.caption}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.src = `https://via.placeholder.com/1200x500/1e293b/f1f5f9?text=${encodeURIComponent(image.caption)}`;
                            }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                        <div className="absolute bottom-8 left-8 right-8">
                            <h4 className="text-2xl md:text-3xl font-serif font-bold text-white mb-2">{image.caption}</h4>
                            <div className="w-24 h-1 bg-gold rounded-full"></div>
                        </div>
                    </div>
                ))}

                <button
                    onClick={prevSlide}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-full flex items-center justify-center text-white transition-all duration-300 hover:scale-110"
                >
                    <ChevronLeft size={24} />
                </button>
                <button
                    onClick={nextSlide}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-full flex items-center justify-center text-white transition-all duration-300 hover:scale-110"
                >
                    <ChevronRight size={24} />
                </button>
            </div>

            <div className="flex justify-center gap-3 mt-6">
                {images.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${
                            index === currentSlide
                                ? "bg-gold w-12"
                                : "bg-white/30 hover:bg-white/50"
                        }`}
                    />
                ))}
            </div>
        </div>
    );
}
