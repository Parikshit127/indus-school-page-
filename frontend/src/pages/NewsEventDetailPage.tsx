import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { CalendarDays, ArrowLeft, Share2, Printer, Clock } from "lucide-react";
import { motion } from "framer-motion";

interface NewsItem {
    _id: string;
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    date: string;
    category: "announcement" | "achievement" | "news" | "notice";
    imageUrl: string;
}

const categoryLabels: Record<NewsItem["category"], string> = {
    announcement: "Announcement",
    achievement: "Achievement",
    news: "News",
    notice: "Notice"
};

export default function NewsEventDetailPage() {
    const { slug } = useParams<{ slug: string }>();
    const [item, setItem] = useState<NewsItem | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchItem = async () => {
            if (!slug) return;
            try {
                setLoading(true);
                setError("");
                const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:4000";
                const res = await fetch(`${apiUrl}/api/news-events/${slug}`);
                const data = await res.json();
                if (!res.ok) {
                    throw new Error(data.error || "Failed to load article");
                }
                setItem(data);
            } catch (err: any) {
                setError(err.message || "Failed to load article");
            } finally {
                setLoading(false);
            }
        };
        fetchItem();
    }, [slug]);

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });
    };

    if (loading) return (
        <div className="min-h-screen bg-slate-50">
            <div className="bg-royal py-16"></div>
            <div className="flex items-center justify-center py-20"><p className="text-royal/60 font-medium">Loading article...</p></div>
        </div>
    );
    if (error) return (
        <div className="min-h-screen bg-slate-50">
            <div className="bg-royal py-16"></div>
            <div className="flex items-center justify-center py-20"><p className="text-red-500">{error}</p></div>
        </div>
    );
    if (!item) return (
        <div className="min-h-screen bg-slate-50">
            <div className="bg-royal py-16"></div>
            <div className="flex items-center justify-center py-20"><p className="text-royal/60">Article not found.</p></div>
        </div>
    );

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Header Section - Royal Blue for Navbar Visibility */}
            <section className="bg-royal pt-32 pb-12 md:pt-40 md:pb-16">
                <div className="container mx-auto px-4 md:px-8">
                    {/* Title & Meta in Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-4xl"
                    >
                        <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-gold/20 text-gold rounded-full text-xs font-bold tracking-widest uppercase mb-4 border border-gold/30">
                            {categoryLabels[item.category]}
                        </span>
                        <h1 className="text-2xl md:text-4xl lg:text-5xl font-serif font-bold text-white mb-4 leading-tight">
                            {item.title}
                        </h1>
                        <div className="flex flex-wrap items-center gap-4 text-white/70 text-sm mb-6">
                            <div className="flex items-center gap-2">
                                <CalendarDays className="w-4 h-4" />
                                <span>{formatDate(item.date)}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Clock className="w-4 h-4" />
                                <span>2 min read</span>
                            </div>
                        </div>

                        {/* Back Button - Below the heading */}
                        <Link
                            to="/news-events"
                            className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-gold font-medium transition-colors"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Back to News & Events
                        </Link>
                    </motion.div>
                </div>
            </section>

            {/* Article Content - Side by Side Layout */}
            <article className="container mx-auto px-4 md:px-8 py-8 md:py-12">
                <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden -mt-8 relative z-20">
                    <div className="flex flex-col lg:flex-row">
                        {/* Left - Image */}
                        {item.imageUrl && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="lg:w-2/5 shrink-0"
                            >
                                <img
                                    src={item.imageUrl}
                                    alt={item.title}
                                    className="w-full h-64 lg:h-full object-cover"
                                />
                            </motion.div>
                        )}

                        {/* Right - Content */}
                        <div className={`flex-1 p-6 md:p-8 ${!item.imageUrl ? 'lg:p-10' : ''}`}>
                            {/* Action Buttons */}
                            <div className="flex justify-end gap-2 mb-4">
                                <button className="p-2 hover:bg-slate-100 rounded-full text-slate-400 hover:text-royal transition-colors" title="Share">
                                    <Share2 className="w-4 h-4" />
                                </button>
                                <button className="p-2 hover:bg-slate-100 rounded-full text-slate-400 hover:text-royal transition-colors" title="Print">
                                    <Printer className="w-4 h-4" />
                                </button>
                            </div>

                            {/* Excerpt / Summary */}
                            {item.excerpt && (
                                <motion.p
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 }}
                                    className="text-base md:text-lg text-slate-600 bg-slate-50 p-4 rounded-xl mb-6 border-l-4 border-gold font-medium"
                                >
                                    {item.excerpt}
                                </motion.p>
                            )}

                            {/* Main Content */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.3 }}
                                className="prose prose-slate max-w-none text-slate-700 leading-relaxed"
                            >
                                {item.content ? (
                                    item.content.split(/\n{2,}/).map((para, idx) => (
                                        <p key={idx} className="mb-4">{para}</p>
                                    ))
                                ) : (
                                    <p className="italic text-slate-400">Content will be updated soon.</p>
                                )}
                            </motion.div>
                        </div>
                    </div>
                </div>
            </article>
        </div>
    );
}
