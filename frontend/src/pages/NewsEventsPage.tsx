import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
    ArrowRight, Filter,
    Newspaper, Bell,
    CalendarDays
} from "lucide-react";

// Types
interface NewsItem {
    _id: string;
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    date: string;
    category: "announcement" | "achievement" | "news" | "notice";
    imageUrl: string;
    isFeatured: boolean;
}

// Events block removed as per requirement; keeping only dynamic News & Updates

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
    const [selectedCategory, setSelectedCategory] = useState<string>("all");
    const [newsData, setNewsData] = useState<NewsItem[]>([]);
    const [loading, setLoading] = useState(false);

    const filtered = selectedCategory === "all"
        ? newsData
        : newsData.filter((n) => n.category === selectedCategory);

    const featuredNews = filtered.filter(n => n.isFeatured);
    const regularNews = filtered.filter(n => !n.isFeatured);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                setLoading(true);
                const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:4000';
                const res = await fetch(`${apiUrl}/api/news-events`);
                const data = await res.json();
                if (res.ok && Array.isArray(data)) {
                    setNewsData(data);
                }
            } catch {
                // ignore – page will just show empty state
            } finally {
                setLoading(false);
            }
        };
        fetchNews();
    }, []);

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
    };

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Page Header */}
            <section className="bg-royal py-16 md:py-24">
                <div className="container mx-auto px-4 md:px-8">
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
            <div className="md:sticky md:top-16 z-30 bg-white/90 backdrop-blur-lg border-b border-royal/10 shadow-sm">
                <div className="container mx-auto px-4 md:px-8">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 py-3 md:py-4">
                        <div className="flex gap-2">
                            <button
                                className="flex items-center gap-2 px-4 md:px-5 py-2.5 rounded-full font-semibold text-sm bg-royal text-white shadow-lg"
                            >
                                <Newspaper className="w-4 h-4" />
                                News & Updates
                            </button>
                        </div>

                        {/* Category Filter */}
                        <div className="relative z-40 flex items-center md:justify-end gap-2 w-full md:w-auto">
                            <div className="flex items-center gap-2 w-full md:w-auto">
                                <span className="inline-flex items-center gap-1 text-[11px] md:text-xs font-semibold uppercase tracking-wide text-royal/70 bg-royal/5 px-2 py-1 rounded-full">
                                    <Filter className="w-3 h-3 md:w-4 md:h-4" />
                                    Filter
                                </span>
                                <select
                                    value={selectedCategory}
                                    onChange={(e) => setSelectedCategory(e.target.value)}
                                    className="flex-1 md:flex-none px-3 py-2 rounded-lg border border-royal/15 text-xs md:text-sm text-royal bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-gold/50"
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
            </div>

            {/* Content Area */}
            <div className="container mx-auto px-4 md:px-8 py-12">
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
                                        key={news._id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all border border-royal/5"
                                    >
                                        <Link to={`/news-events/${news.slug}`} className="block">
                                            <div className="relative h-56 overflow-hidden">
                                                <img
                                                    src={news.imageUrl || "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600"}
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
                                                <span className="inline-flex items-center gap-2 text-gold font-semibold hover:gap-3 transition-all">
                                                    Read More <ArrowRight className="w-4 h-4" />
                                                </span>
                                            </div>
                                        </Link>
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
                                    key={news._id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all border border-royal/5"
                                >
                                    <Link to={`/news-events/${news.slug}`} className="block">
                                        <div className="relative h-40 overflow-hidden">
                                            <img
                                                src={news.imageUrl || "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600"}
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
                                    </Link>
                                </motion.article>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
