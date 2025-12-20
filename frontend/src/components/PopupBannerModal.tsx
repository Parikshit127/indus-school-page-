import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface BannerImage {
    url: string;
    publicId?: string;
}

interface PopupBanner {
    _id: string;
    title: string;
    images: BannerImage[];
    isActive: boolean;
}

export function PopupBannerModal() {
    const [banners, setBanners] = useState<PopupBanner[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const [currentBannerIndex] = useState(0);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [autoPlay, setAutoPlay] = useState(true);

    // Fetch active banners - show on every page load/refresh
    useEffect(() => {
        const fetchBanners = async () => {
            try {
                const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:4000';
                const res = await fetch(`${apiUrl}/api/popup-banners/active`);
                if (res.ok) {
                    const data = await res.json();
                    if (data.length > 0) {
                        setBanners(data);
                        // Show popup on every refresh
                        setIsOpen(true);
                    }
                }
            } catch (error) {
                console.error('Failed to fetch popup banners:', error);
            }
        };
        fetchBanners();
    }, []);

    // Auto-slide through images
    useEffect(() => {
        if (!isOpen || !autoPlay || banners.length === 0) return;

        const currentBanner = banners[currentBannerIndex];
        if (!currentBanner || currentBanner.images.length <= 1) return;

        const timer = setInterval(() => {
            setCurrentImageIndex((prev) =>
                (prev + 1) % currentBanner.images.length
            );
        }, 4000);

        return () => clearInterval(timer);
    }, [isOpen, autoPlay, currentBannerIndex, banners]);

    const handleClose = () => {
        setIsOpen(false);
    };

    const nextImage = () => {
        const currentBanner = banners[currentBannerIndex];
        if (!currentBanner) return;
        setAutoPlay(false);
        setCurrentImageIndex((prev) => (prev + 1) % currentBanner.images.length);
    };

    const prevImage = () => {
        const currentBanner = banners[currentBannerIndex];
        if (!currentBanner) return;
        setAutoPlay(false);
        setCurrentImageIndex((prev) => (prev - 1 + currentBanner.images.length) % currentBanner.images.length);
    };

    if (banners.length === 0) return null;

    const currentBanner = banners[currentBannerIndex];
    const totalImages = currentBanner?.images?.length || 0;

    return (
        <AnimatePresence>
            {isOpen && currentBanner && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80"
                    onClick={handleClose}
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                        className="relative max-w-[90vw] max-h-[90vh]"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Close Button */}
                        <button
                            onClick={handleClose}
                            className="absolute -top-3 -right-3 z-50 w-10 h-10 bg-white hover:bg-gray-100 text-gray-800 rounded-full flex items-center justify-center transition-colors shadow-lg"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        {/* Image - No padding, takes natural dimensions */}
                        <AnimatePresence mode="wait">
                            <motion.img
                                key={currentImageIndex}
                                src={currentBanner.images[currentImageIndex]?.url}
                                alt={`${currentBanner.title} - Image ${currentImageIndex + 1}`}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
                            />
                        </AnimatePresence>

                        {/* Navigation Arrows (if multiple images) */}
                        {totalImages > 1 && (
                            <>
                                <button
                                    onClick={prevImage}
                                    className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white text-gray-800 rounded-full flex items-center justify-center transition-colors shadow-lg"
                                >
                                    <ChevronLeft className="w-5 h-5" />
                                </button>
                                <button
                                    onClick={nextImage}
                                    className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white text-gray-800 rounded-full flex items-center justify-center transition-colors shadow-lg"
                                >
                                    <ChevronRight className="w-5 h-5" />
                                </button>
                            </>
                        )}

                        {/* Image Counter */}
                        {totalImages > 1 && (
                            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-black/60 px-4 py-2 rounded-full">
                                <span className="text-white text-sm font-medium">
                                    {currentImageIndex + 1} / {totalImages}
                                </span>
                                <button
                                    onClick={() => setAutoPlay(!autoPlay)}
                                    className="text-white/70 hover:text-white text-xs ml-2 transition-colors"
                                >
                                    {autoPlay ? '⏸' : '▶'}
                                </button>
                            </div>
                        )}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
