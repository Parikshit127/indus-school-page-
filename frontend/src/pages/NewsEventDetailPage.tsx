import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { CalendarDays, ArrowLeft, Clock } from "lucide-react";
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

// Simple markdown to HTML converter
const markdownToHtml = (text: string): string => {
    if (!text) return '';
    
    // Process line by line to handle block elements first
    const lines = text.split('\n');
    const processedLines: string[] = [];
    let inList = false;
    let listType: 'ul' | 'ol' | null = null;
    let listItems: string[] = [];
    
    const flushList = () => {
        if (listItems.length > 0) {
            const tag = listType === 'ul' ? 'ul' : 'ol';
            const className = listType === 'ul' ? 'list-disc' : 'list-decimal';
            processedLines.push(`<${tag} class="${className} ml-6 my-4 space-y-1">${listItems.join('')}</${tag}>`);
            listItems = [];
        }
        inList = false;
        listType = null;
    };
    
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        const trimmed = line.trim();
        
        // Quote: > text
        if (trimmed.startsWith('> ')) {
            flushList();
            const quoteText = trimmed.substring(2);
            processedLines.push(`<blockquote class="border-l-4 border-gold pl-4 py-2 my-4 bg-gold/5 italic text-slate-700">${quoteText}</blockquote>`);
            continue;
        }
        
        // Bullet list: - item
        const bulletMatch = trimmed.match(/^\- (.+)$/);
        if (bulletMatch) {
            if (!inList || listType !== 'ul') {
                flushList();
                inList = true;
                listType = 'ul';
            }
            listItems.push(`<li class="ml-4 mb-1">${bulletMatch[1]}</li>`);
            continue;
        }
        
        // Numbered list: 1. item
        const numberedMatch = trimmed.match(/^\d+\. (.+)$/);
        if (numberedMatch) {
            if (!inList || listType !== 'ol') {
                flushList();
                inList = true;
                listType = 'ol';
            }
            listItems.push(`<li class="ml-4 mb-1">${numberedMatch[1]}</li>`);
            continue;
        }
        
        // Regular line
        flushList();
        if (trimmed) {
            processedLines.push(trimmed);
        } else {
            processedLines.push('');
        }
    }
    flushList();
    
    let html = processedLines.join('\n');
    
    // Inline formatting (after block processing)
    // Bold: **text** (process before italic to avoid conflicts)
    html = html.replace(/\*\*([^*]+?)\*\*/g, '<strong>$1</strong>');
    html = html.replace(/__(.+?)__/g, '<strong>$1</strong>');
    
    // Italic: _text_ (single underscore, not part of __)
    html = html.replace(/(?<!_)_([^_]+?)_(?!_)/g, '<em>$1</em>');
    // Italic: *text* (single asterisk, not part of **)
    html = html.replace(/(?<!\*)\*([^*]+?)\*(?!\*)/g, '<em>$1</em>');
    
    // Paragraphs: split by double newlines or empty lines
    const paragraphs = html.split(/\n{2,}/);
    html = paragraphs.map(p => {
        p = p.trim();
        if (!p) return '';
        // Don't wrap if already a block element
        if (p.startsWith('<') && (p.startsWith('<ul') || p.startsWith('<ol') || p.startsWith('<blockquote'))) {
            return p;
        }
        return `<p class="mb-4">${p}</p>`;
    }).join('');
    
    return html;
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
            {/* Header Section - With Image Background */}
            <section className="relative pt-32 pb-12 md:pt-40 md:pb-16 overflow-hidden">
                {/* Background Image */}
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.pexels.com/photos/8813497/pexels-photo-8813497.jpeg"
                        alt="Background"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-royal/80"></div>
                </div>
                
                <div className="container mx-auto px-4 md:px-8 relative z-10">
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

                        {/* Back Button */}
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

            {/* Article Content - Full Image, then Content */}
            <article className="container mx-auto px-4 md:px-8 py-8 md:py-12">
                <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden -mt-8 relative z-20">
                    {/* Full Image */}
                    {item.imageUrl && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="w-full"
                        >
                            <img
                                src={item.imageUrl}
                                alt={item.title}
                                className="w-full h-auto max-h-[500px] object-cover"
                            />
                        </motion.div>
                    )}

                    {/* Content Section */}
                    <div className="p-6 md:p-8 lg:p-10">
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
                                <div 
                                    className="text-base md:text-lg leading-relaxed"
                                    dangerouslySetInnerHTML={{ __html: markdownToHtml(item.content) }}
                                />
                            ) : (
                                <p className="italic text-slate-400">Content will be updated soon.</p>
                            )}
                        </motion.div>
                    </div>
                </div>
            </article>
        </div>
    );
}
