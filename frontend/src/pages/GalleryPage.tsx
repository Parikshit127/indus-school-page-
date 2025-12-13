
import { useState } from "react";
import { galleryAlbums, galleryVideos } from "@/data/galleryData";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, Calendar, PlayCircle, Clock, ExternalLink } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";

export default function GalleryPage() {
    const [activeTab, setActiveTab] = useState<'photos' | 'videos'>('photos');
    const [playingVideo, setPlayingVideo] = useState<string | null>(null);

    return (
        <div className="min-h-screen bg-slate-50">
            <PageHero
                title="Photo & Video Gallery"
                subtitle="Capturing Moments, Creating Memories"
                image="https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=2132&auto=format&fit=crop"
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
                            {galleryAlbums.map((album, index) => (
                                <motion.div
                                    key={album.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className="group bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer border border-gray-100"
                                >
                                    <div className="relative h-64 overflow-hidden">
                                        <img
                                            src={album.coverImage}
                                            alt={album.title}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

                                        <div className="absolute bottom-0 left-0 right-0 p-6 text-white translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                                            <h3 className="text-xl font-bold font-serif mb-2 line-clamp-2 text-shadow leading-tight">
                                                {album.title}
                                            </h3>
                                            <div className="flex items-center justify-between text-sm text-gray-200 mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                                                {album.date ? (
                                                    <span className="flex items-center gap-1.5">
                                                        <Calendar size={14} className="text-gold" />
                                                        {album.date}
                                                    </span>
                                                ) : <span />}

                                                <span className="flex items-center gap-1.5 bg-royal/80 px-3 py-1 rounded-full backdrop-blur-sm shadow-sm border border-white/10">
                                                    <Camera size={14} className="text-gold" />
                                                    {album.photoCount}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
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
                            {galleryVideos.map((video, index) => (
                                <motion.div
                                    key={video.id}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className="bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100 group"
                                >
                                    {/* Video Player / Thumbnail Area */}
                                    <div className="relative aspect-video bg-gray-900 group-hover:ring-4 ring-gold/10 transition-all duration-300">
                                        {playingVideo === video.id ? (
                                            <iframe
                                                width="100%"
                                                height="100%"
                                                src={`${video.videoUrl}?autoplay=1`}
                                                title={video.title}
                                                frameBorder="0"
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                allowFullScreen
                                                className="w-full h-full object-cover"
                                            ></iframe>
                                        ) : (
                                            <div
                                                className="absolute inset-0 cursor-pointer"
                                                onClick={() => setPlayingVideo(video.id)}
                                            >
                                                <img
                                                    src={video.thumbnail}
                                                    alt={video.title}
                                                    className="w-full h-full object-cover opacity-80 group-hover:opacity-90 group-hover:scale-105 transition-all duration-700"
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

                                                {/* Duration Badge */}
                                                <div className="absolute bottom-4 right-4 bg-black/70 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5">
                                                    <Clock size={12} className="text-gold" />
                                                    {video.duration}
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
                                                onClick={() => setPlayingVideo(video.id)}
                                                className="flex items-center gap-2 text-sm font-bold text-royal hover:text-gold transition-colors uppercase tracking-wider"
                                            >
                                                Play Video <ExternalLink size={14} />
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </section>
        </div>
    );
}
