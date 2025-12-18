import { useState } from "react";
import { motion } from "framer-motion";
import {
    Calendar, Clock, MapPin, ArrowRight, Filter,
    Newspaper, PartyPopper, Bell, ChevronRight,
    CalendarDays
} from "lucide-react";

// Types
interface NewsItem {
    id: number;
    title: string;
    excerpt: string;
    content: string;
    date: string;
    category: "announcement" | "achievement" | "news" | "notice";
    image: string;
    featured: boolean;
}

interface EventItem {
    id: number;
    title: string;
    description: string;
    date: string;
    time: string;
    location: string;
    category: "academic" | "cultural" | "sports" | "parent";
    status: "upcoming" | "ongoing" | "completed";
}

// Sample data
const newsData: NewsItem[] = [
    {
        id: 1,
        title: "Admissions Open for 2025-26 Academic Session",
        excerpt: "We are now accepting applications for classes Nursery to XI. Limited seats available with early bird discounts.",
        content: "",
        date: "2024-12-15",
        category: "announcement",
        image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600",
        featured: true
    },
    {
        id: 2,
        title: "Our Students Excel in CBSE Board Exams 2024",
        excerpt: "Congratulations to our Class X and XII students for achieving 100% pass rate with 45 students scoring above 90%.",
        content: "",
        date: "2024-12-10",
        category: "achievement",
        image: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=600",
        featured: true
    },
    {
        id: 3,
        title: "Science Exhibition 2024 Winners Announced",
        excerpt: "The annual science exhibition saw participation from over 200 students with innovative projects on sustainability.",
        content: "",
        date: "2024-12-08",
        category: "news",
        image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=600",
        featured: false
    },
    {
        id: 4,
        title: "Winter Vacation Notice",
        excerpt: "School will remain closed from 25th December 2024 to 5th January 2025 for winter break.",
        content: "",
        date: "2024-12-05",
        category: "notice",
        image: "https://images.unsplash.com/photo-1491002052546-bf38f186af56?w=600",
        featured: false
    },
    {
        id: 5,
        title: "National Level Olympiad Medals",
        excerpt: "Three students from our school won medals at the National Science Olympiad held in Delhi.",
        content: "",
        date: "2024-12-01",
        category: "achievement",
        image: "https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?w=600",
        featured: false
    },
    {
        id: 6,
        title: "New Computer Lab Inauguration",
        excerpt: "State-of-the-art computer lab with 50 systems and AI learning modules inaugurated by the Principal.",
        content: "",
        date: "2024-11-28",
        category: "news",
        image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600",
        featured: false
    }
];

const eventsData: EventItem[] = [
    {
        id: 1,
        title: "Annual Sports Day 2025",
        description: "Inter-house sports competition featuring athletics, team sports, and march past.",
        date: "2025-01-15",
        time: "8:00 AM - 4:00 PM",
        location: "School Sports Ground",
        category: "sports",
        status: "upcoming"
    },
    {
        id: 2,
        title: "Parent-Teacher Meeting",
        description: "Discussion on academic progress and upcoming semester plans.",
        date: "2024-12-20",
        time: "9:00 AM - 1:00 PM",
        location: "Respective Classrooms",
        category: "parent",
        status: "upcoming"
    },
    {
        id: 3,
        title: "Republic Day Celebration",
        description: "Flag hoisting ceremony followed by cultural performances and march past.",
        date: "2025-01-26",
        time: "8:00 AM - 12:00 PM",
        location: "School Auditorium",
        category: "cultural",
        status: "upcoming"
    },
    {
        id: 4,
        title: "Career Counseling Session",
        description: "Expert guidance for Class XI and XII students on career options after board exams.",
        date: "2025-01-10",
        time: "10:00 AM - 2:00 PM",
        location: "Conference Hall",
        category: "academic",
        status: "upcoming"
    }
];

const categoryColors = {
    announcement: "bg-blue-500",
    achievement: "bg-green-500",
    news: "bg-purple-500",
    notice: "bg-orange-500",
    academic: "bg-indigo-500",
    cultural: "bg-pink-500",
    sports: "bg-emerald-500",
    parent: "bg-amber-500"
};

const categoryLabels = {
    announcement: "Announcement",
    achievement: "Achievement",
    news: "News",
    notice: "Notice",
    academic: "Academic",
    cultural: "Cultural",
    sports: "Sports",
    parent: "Parent Meet"
};

export default function NewsEventsPage() {
    const [activeTab, setActiveTab] = useState<"news" | "events">("news");
    const [selectedCategory, setSelectedCategory] = useState<string>("all");

    const featuredNews = newsData.filter(n => n.featured);
    const regularNews = newsData.filter(n => !n.featured);

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
    };

    const getDaysUntil = (dateString: string) => {
        const eventDate = new Date(dateString);
        const today = new Date();
        const diffTime = eventDate.getTime() - today.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays;
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-cream to-white">
            {/* Page Header */}
            <section className="bg-royal py-16 md:py-24 relative overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-10 left-10 w-32 h-32 border-2 border-white rounded-full" />
                    <div className="absolute bottom-10 right-20 w-40 h-40 border-2 border-white rounded-full" />
                </div>

                <div className="container mx-auto px-4 md:px-8 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center"
                    >
                        <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-gold/20 text-gold rounded-full text-xs font-bold tracking-widest uppercase mb-4 border border-gold/30">
                            <Bell className="w-3 h-3" /> Stay Updated
                        </span>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-4">
                            News & <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold to-gold-light">Events</span>
                        </h1>
                        <p className="text-white/70 max-w-2xl mx-auto text-lg">
                            Stay connected with the latest happenings, achievements, and upcoming events at Indus Public School.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Tab Navigation */}
            <div className="sticky top-16 z-30 bg-white/80 backdrop-blur-lg border-b border-royal/10 shadow-sm">
                <div className="container mx-auto px-4 md:px-8">
                    <div className="flex items-center justify-between py-4">
                        <div className="flex gap-2">
                            <button
                                onClick={() => setActiveTab("news")}
                                className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-semibold text-sm transition-all ${activeTab === "news"
                                    ? "bg-royal text-white shadow-lg"
                                    : "bg-royal/5 text-royal hover:bg-royal/10"
                                    }`}
                            >
                                <Newspaper className="w-4 h-4" />
                                News & Updates
                            </button>
                            <button
                                onClick={() => setActiveTab("events")}
                                className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-semibold text-sm transition-all ${activeTab === "events"
                                    ? "bg-royal text-white shadow-lg"
                                    : "bg-royal/5 text-royal hover:bg-royal/10"
                                    }`}
                            >
                                <PartyPopper className="w-4 h-4" />
                                Upcoming Events
                            </button>
                        </div>

                        {/* Category Filter */}
                        <div className="hidden md:flex items-center gap-2">
                            <Filter className="w-4 h-4 text-royal/60" />
                            <select
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                                className="px-3 py-1.5 rounded-lg border border-royal/20 text-sm text-royal bg-transparent focus:outline-none focus:ring-2 focus:ring-gold/50"
                            >
                                <option value="all">All Categories</option>
                                <option value="announcement">Announcements</option>
                                <option value="achievement">Achievements</option>
                                <option value="news">News</option>
                                <option value="notice">Notices</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content Area */}
            <div className="container mx-auto px-4 md:px-8 py-12">
                {activeTab === "news" ? (
                    <div className="space-y-12">
                        {/* Featured News */}
                        {featuredNews.length > 0 && (
                            <div>
                                <h2 className="text-2xl font-bold text-royal mb-6 flex items-center gap-2">
                                    <span className="w-8 h-1 bg-gold rounded-full" />
                                    Featured Stories
                                </h2>
                                <div className="grid md:grid-cols-2 gap-6">
                                    {featuredNews.map((news, index) => (
                                        <motion.article
                                            key={news.id}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: index * 0.1 }}
                                            className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all border border-royal/5"
                                        >
                                            <div className="relative h-56 overflow-hidden">
                                                <img
                                                    src={news.image}
                                                    alt={news.title}
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                                                <span className={`absolute top-4 left-4 px-3 py-1 ${categoryColors[news.category]} text-white text-xs font-bold rounded-full uppercase`}>
                                                    {categoryLabels[news.category]}
                                                </span>
                                                <div className="absolute bottom-4 left-4 flex items-center gap-2 text-white/80 text-sm">
                                                    <CalendarDays className="w-4 h-4" />
                                                    {formatDate(news.date)}
                                                </div>
                                            </div>
                                            <div className="p-6">
                                                <h3 className="text-xl font-bold text-royal mb-3 group-hover:text-gold transition-colors line-clamp-2">
                                                    {news.title}
                                                </h3>
                                                <p className="text-royal/70 mb-4 line-clamp-2">{news.excerpt}</p>
                                                <button className="inline-flex items-center gap-2 text-gold font-semibold hover:gap-3 transition-all">
                                                    Read More <ArrowRight className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </motion.article>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* All News */}
                        <div>
                            <h2 className="text-2xl font-bold text-royal mb-6 flex items-center gap-2">
                                <span className="w-8 h-1 bg-gold rounded-full" />
                                Latest Updates
                            </h2>
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {regularNews.map((news, index) => (
                                    <motion.article
                                        key={news.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all border border-royal/5"
                                    >
                                        <div className="relative h-40 overflow-hidden">
                                            <img
                                                src={news.image}
                                                alt={news.title}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                            />
                                            <span className={`absolute top-3 left-3 px-2.5 py-1 ${categoryColors[news.category]} text-white text-xs font-bold rounded-full uppercase`}>
                                                {categoryLabels[news.category]}
                                            </span>
                                        </div>
                                        <div className="p-5">
                                            <div className="flex items-center gap-2 text-royal/60 text-xs mb-2">
                                                <CalendarDays className="w-3 h-3" />
                                                {formatDate(news.date)}
                                            </div>
                                            <h3 className="font-bold text-royal mb-2 group-hover:text-gold transition-colors line-clamp-2">
                                                {news.title}
                                            </h3>
                                            <p className="text-sm text-royal/60 line-clamp-2">{news.excerpt}</p>
                                        </div>
                                    </motion.article>
                                ))}
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="space-y-8">
                        <h2 className="text-2xl font-bold text-royal mb-6 flex items-center gap-2">
                            <span className="w-8 h-1 bg-gold rounded-full" />
                            Upcoming Events
                        </h2>

                        <div className="grid gap-4">
                            {eventsData.map((event, index) => {
                                const daysUntil = getDaysUntil(event.date);
                                return (
                                    <motion.div
                                        key={event.id}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        className="group bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all border border-royal/5 flex flex-col md:flex-row gap-6"
                                    >
                                        {/* Date Badge */}
                                        <div className="shrink-0 w-20 h-20 bg-gradient-to-br from-gold to-gold-dark rounded-xl flex flex-col items-center justify-center text-royal shadow-lg">
                                            <span className="text-2xl font-bold">{new Date(event.date).getDate()}</span>
                                            <span className="text-xs uppercase font-semibold">{new Date(event.date).toLocaleDateString('en-IN', { month: 'short' })}</span>
                                        </div>

                                        {/* Event Details */}
                                        <div className="flex-1">
                                            <div className="flex items-start justify-between gap-4 mb-2">
                                                <h3 className="text-xl font-bold text-royal group-hover:text-gold transition-colors">
                                                    {event.title}
                                                </h3>
                                                <span className={`shrink-0 px-3 py-1 ${categoryColors[event.category]} text-white text-xs font-bold rounded-full uppercase`}>
                                                    {categoryLabels[event.category]}
                                                </span>
                                            </div>
                                            <p className="text-royal/70 mb-4">{event.description}</p>
                                            <div className="flex flex-wrap gap-4 text-sm text-royal/60">
                                                <span className="inline-flex items-center gap-1.5">
                                                    <Clock className="w-4 h-4 text-gold" />
                                                    {event.time}
                                                </span>
                                                <span className="inline-flex items-center gap-1.5">
                                                    <MapPin className="w-4 h-4 text-gold" />
                                                    {event.location}
                                                </span>
                                                {daysUntil > 0 && (
                                                    <span className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-green-100 text-green-700 rounded-full font-medium">
                                                        <Calendar className="w-3 h-3" />
                                                        {daysUntil} days to go
                                                    </span>
                                                )}
                                            </div>
                                        </div>

                                        {/* Action */}
                                        <div className="shrink-0 flex items-center">
                                            <button className="w-10 h-10 rounded-full bg-royal/5 flex items-center justify-center text-royal group-hover:bg-gold group-hover:text-royal transition-all">
                                                <ChevronRight className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>

                        {/* Calendar Link */}
                        <div className="text-center pt-8">
                            <a
                                href="/academics/calendar"
                                className="inline-flex items-center gap-2 px-6 py-3 bg-royal text-white font-bold rounded-full hover:bg-royal-light transition-colors shadow-lg"
                            >
                                <Calendar className="w-5 h-5" />
                                View Full School Calendar
                            </a>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
