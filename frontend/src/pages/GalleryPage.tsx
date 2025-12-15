import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, PlayCircle, ExternalLink } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { getOptimizedImageUrl, handleImageError } from "@/utils/imageUtils";

interface GalleryItem {
    _id: string;
    type: 'photo' | 'video';
    url: string;
    title: string;
    date: string;
}

export default function GalleryPage() {
    const [activeTab, setActiveTab] = useState<'photos' | 'videos'>('photos');
    const [playingVideo, setPlayingVideo] = useState<string | null>(null);
    const [items, setItems] = useState<GalleryItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchGallery = async () => {
            setLoading(true);
            setError(null);
            try {
                const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:4000';
                const url = `${apiUrl}/api/gallery?type=${activeTab === 'photos' ? 'photo' : 'video'}`;
                console.log('Fetching from:', url);
                console.log('Environment VITE_API_URL:', import.meta.env.VITE_API_URL);
                
                const response = await fetch(url);
                console.log('Response status:', response.status);
                console.log('Response headers:', response.headers);
                
                if (response.ok) {
                    const data = await response.json();
                    console.log('Gallery data received:', data);
                    console.log('Number of items:', data.length);
                    setItems(data);
                    setError(null);
                } else {
                    const errorText = await response.text();
                    console.error('API response not ok:', response.status, response.statusText, errorText);
                    setError(`API Error: ${response.status} ${response.statusText}`);
                }
            } catch (error) {
                console.error("Failed to fetch gallery", error);
                setError(`Network Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
            } finally {
                setLoading(false);
            }
        };

        fetchGallery();
    }, [activeTab]);

    const getYoutubeThumbnail = (url: string) => {
        try {
            if (url.includes('embed/')) {
                const id = url.split('embed/')[1].split('?')[0];
                return `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
            }
            return "https://via.placeholder.com/640x360?text=Video";
        } catch {
            return "https://via.placeholder.com/640x360?text=Video";
        }
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
    };

    return (
        <div className="min-h-screen bg-slate-50">
            <PageHero
                title="Photo & Video Gallery"
                subtitle="Capturing Moments, Creating Memories"
                image="https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?q=80&w=2070&auto=format&fit=crop"
            />

            <section className="container mx-auto px-4 py-16">
                {/* Tabs */}
                <div className="flex justify-center mb-12">
                    <div className="bg-white p-1 rounded-full shadow-md border border-gray-200 inline-flex">
                        <button
                            onClick={() => setActiveTab('photos')}
                            className={`px-8 py-3 rounded-full text-sm md:text-base font-bold transition-all duration-300 ${activeTab === 'photos'
                                ? "bg-royal text-white shadow-lg"
                                : "text-gray-500 hover:text-royal"
                                }`}
                        >
                            Photo Gallery
                        </button>
                        <button
                            onClick={() => setActiveTab('videos')}
                            className={`px-8 py-3 rounded-full text-sm md:text-base font-bold transition-all duration-300 ${activeTab === 'videos'
                                ? "bg-royal text-white shadow-lg"
                                : "text-gray-500 hover:text-royal"
                                }`}
                        >
                            Video Gallery
                        </button>
                    </div>
                </div>

                {loading ? (
                    <div className="min-h-[400px] flex items-center justify-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-royal"></div>
                    </div>
                ) : error ? (
                    <div className="min-h-[400px] flex items-center justify-center">
                        <div className="text-center">
                            <p className="text-red-600 text-lg mb-4">{error}</p>
                            <button 
                                onClick={() => window.location.reload()} 
                                className="bg-royal text-white px-4 py-2 rounded"
                            >
                                Retry
                            </button>
                        </div>
                    </div>
                ) : (
                    <AnimatePresence mode="wait">
                        {activeTab === 'photos' ? (
                            <motion.div
                                key="photos"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.4 }}
                                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                            >
                                {items.length > 0 ? items.map((item, index) => (
                                    <motion.div
                                        key={item._id}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.1 }}
                                        className="group bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer border border-gray-100"
                                    >
                                        <div className="relative h-64 overflow-hidden">
                                            <img
                                                src={getOptimizedImageUrl(item.url, 400, 300)}
                                                alt={item.title}
                                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                                onError={(e) => handleImageError(e, 'gallery')}
                                                loading="lazy"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

                                            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                                                <h3 className="text-xl font-bold font-serif mb-2 line-clamp-2 text-shadow leading-tight">
                                                    {item.title}
                                                </h3>
                                                <div className="flex items-center justify-between text-sm text-gray-200 mt-3">
                                                    <span className="flex items-center gap-1.5">
                                                        <Calendar size={14} className="text-gold" />
                                                        {formatDate(item.date)}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                )) : (
                                    <div className="col-span-full text-center py-12 text-slate-500">
                                        No photos found. Check back later!
                                    </div>
                                )}
                            </motion.div>
                        ) : (
                            <motion.div
                                key="videos"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.4 }}
                                className="grid grid-cols-1 lg:grid-cols-2 gap-10"
                            >
                                {items.length > 0 ? items.map((video, index) => (
                                    <motion.div
                                        key={video._id}
                                        initial={{ opacity: 0, y: 30 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.1 }}
                                        className="bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100 group"
                                    >
                                        {/* Video Player / Thumbnail Area */}
                                        <div className="relative aspect-video bg-gray-900 group-hover:ring-4 ring-gold/10 transition-all duration-300">
                                            {playingVideo === video._id ? (
                                                <iframe
                                                    width="100%"
                                                    height="100%"
                                                    src={`${video.url}${video.url.includes('?') ? '&' : '?'}autoplay=1`}
                                                    title={video.title}
                                                    frameBorder="0"
                                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                    allowFullScreen
                                                    className="w-full h-full object-cover"
                                                ></iframe>
                                            ) : (
                                                <div
                                                    className="absolute inset-0 cursor-pointer"
                                                    onClick={() => setPlayingVideo(video._id)}
                                                >
                                                    <img
                                                        src={getYoutubeThumbnail(video.url)}
                                                        alt={video.title}
                                                        className="w-full h-full object-cover opacity-80 group-hover:opacity-90 group-hover:scale-105 transition-all duration-700"
                                                        onError={(e) => handleImageError(e, 'video')}
                                                        loading="lazy"
                                                    />
                                                    <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors" />

                                                    {/* Play Button */}
                                                    <div className="absolute inset-0 flex items-center justify-center">
                                                        <div className="w-16 h-16 md:w-20 md:h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-2xl border border-white/30">
                                                            <div className="w-12 h-12 md:w-14 md:h-14 bg-white rounded-full flex items-center justify-center shadow-lg">
                                                                <PlayCircle size={32} className="text-royal fill-royal ml-1" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>

                                        {/* Details */}
                                        <div className="p-6 md:p-8">
                                            <h3 className="text-2xl font-bold font-serif text-royal mb-3 group-hover:text-gold-dark transition-colors">{video.title}</h3>
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-2 text-sm text-gray-500">
                                                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                                    <span>Watch Now</span>
                                                </div>
                                                <button
                                                    onClick={() => setPlayingVideo(video._id)}
                                                    className="flex items-center gap-2 text-sm font-bold text-royal hover:text-gold transition-colors uppercase tracking-wider"
                                                >
                                                    Play Video <ExternalLink size={14} />
                                                </button>
                                            </div>
                                        </div>
                                    </motion.div>
                                )) : (
                                    <div className="col-span-full text-center py-12 text-slate-500">
                                        No videos found. Check back later!
                                    </div>
                                )}
                            </motion.div>
                        )}
                    </AnimatePresence>
                )}
            </section>
        </div>
    );
}
