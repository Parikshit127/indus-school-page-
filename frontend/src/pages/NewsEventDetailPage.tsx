import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { CalendarDays, ArrowLeft } from "lucide-react";
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

    return (
        <div className="min-h-screen bg-gradient-to-b from-cream to-white">
            <section className="bg-royal py-16 md:py-20 relative overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-10 left-10 w-32 h-32 border-2 border-white rounded-full" />
                    <div className="absolute bottom-10 right-20 w-40 h-40 border-2 border-white rounded-full" />
                </div>

                <div className="container mx-auto px-4 md:px-8 relative z-10">
                    <Link
                        to="/news-events"
                        className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-gold mb-6"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to News & Events
                    </Link>

                    {loading ? (
                        <p className="text-white/80">Loading...</p>
                    ) : error ? (
                        <p className="text-red-100 bg-red-500/20 border border-red-500/40 px-4 py-3 rounded-lg inline-block text-sm">
                            {error}
                        </p>
                    ) : item ? (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="max-w-4xl"
                        >
                            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-gold/20 text-gold rounded-full text-xs font-bold tracking-widest uppercase mb-4 border border-gold/30">
                                {categoryLabels[item.category]}
                            </span>
                            <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-white mb-4">
                                {item.title}
                            </h1>
                            <div className="flex items-center gap-3 text-white/70 text-sm">
                                <CalendarDays className="w-4 h-4" />
                                <span>{formatDate(item.date)}</span>
                            </div>
                        </motion.div>
                    ) : (
                        <p className="text-white/80">Article not found.</p>
                    )}
                </div>
            </section>

            {item && (
                <section className="py-10 md:py-16">
                    <div className="container mx-auto px-4 md:px-8">
                        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100 max-w-4xl mx-auto">
                            {item.imageUrl && (
                                <div className="h-64 md:h-80 overflow-hidden">
                                    <img
                                        src={item.imageUrl}
                                        alt={item.title}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            )}
                            <div className="p-6 md:p-8">
                                {item.excerpt && (
                                    <p className="text-lg text-royal/80 font-medium mb-6 border-l-4 border-gold/60 pl-4">
                                        {item.excerpt}
                                    </p>
                                )}
                                <div className="prose max-w-none prose-royal">
                                    {item.content
                                        ? item.content.split(/\n{2,}/).map((para, idx) => (
                                            <p key={idx} className="text-slate-700 leading-relaxed mb-4">
                                                {para}
                                            </p>
                                        ))
                                        : (
                                            <p className="text-slate-600">
                                                Detailed content will be updated soon.
                                            </p>
                                        )}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            )}
        </div>
    );
}


