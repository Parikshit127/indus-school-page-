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

    // Fetch active banners
    useEffect(() => {
        const fetchBanners = async () => {
            try {
                const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:4000';
                const res = await fetch(`${apiUrl}/api/popup-banners/active`);
                if (res.ok) {
                    const data = await res.json();
                    if (data.length > 0) {
                        setBanners(data);
                        // Check if user has dismissed today
                        const dismissedDate = sessionStorage.getItem('popupDismissed');
                        const today = new Date().toDateString();
                        if (dismissedDate !== today) {
                            setIsOpen(true);
                        }
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
        // Remember dismissal for this session
        sessionStorage.setItem('popupDismissed', new Date().toDateString());
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
                    className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
                    onClick={handleClose}
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                        className="relative max-w-3xl w-full max-h-[90vh] bg-white rounded-2xl shadow-2xl overflow-hidden"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Close Button */}
                        <button
                            onClick={handleClose}
                            className="absolute top-3 right-3 z-50 w-10 h-10 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        {/* Image Container */}
                        <div className="relative aspect-[3/4] md:aspect-[4/5] max-h-[80vh] overflow-hidden bg-slate-100">
                            <AnimatePresence mode="wait">
                                <motion.img
                                    key={currentImageIndex}
                                    src={currentBanner.images[currentImageIndex]?.url}
                                    alt={`${currentBanner.title} - Image ${currentImageIndex + 1}`}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="w-full h-full object-contain"
                                />
                            </AnimatePresence>

                            {/* Navigation Arrows (if multiple images) */}
                            {totalImages > 1 && (
                                <>
                                    <button
                                        onClick={prevImage}
                                        className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/40 hover:bg-black/60 text-white rounded-full flex items-center justify-center transition-colors"
                                    >
                                        <ChevronLeft className="w-5 h-5" />
                                    </button>
                                    <button
                                        onClick={nextImage}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/40 hover:bg-black/60 text-white rounded-full flex items-center justify-center transition-colors"
                                    >
                                        <ChevronRight className="w-5 h-5" />
                                    </button>
                                </>
                            )}

                            {/* Image Counter / Dots */}
                            {totalImages > 1 && (
                                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-black/50 px-3 py-1.5 rounded-full">
                                    <span className="text-white text-xs font-medium">
                                        {currentImageIndex + 1} / {totalImages}
                                    </span>
                                </div>
                            )}
                        </div>

                        {/* Footer with slideshow control */}
                        {totalImages > 1 && (
                            <div className="p-3 bg-slate-50 border-t border-slate-100 text-center">
                                <button
                                    onClick={() => setAutoPlay(!autoPlay)}
                                    className="text-xs font-medium text-slate-500 hover:text-royal transition-colors"
                                >
                                    {autoPlay ? 'Stop Slideshow' : 'Start Slideshow'}
                                </button>
                            </div>
                        )}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
