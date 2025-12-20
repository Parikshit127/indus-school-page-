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
    const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
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
                        setCurrentBannerIndex(0);
                        setCurrentImageIndex(0);
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

    // Reset image index when banner changes
    useEffect(() => {
        setCurrentImageIndex(0);
    }, [currentBannerIndex]);

    // Auto-slide through banners and images
    useEffect(() => {
        if (!isOpen || !autoPlay || banners.length === 0) return;

        const timer = setInterval(() => {
            const currentBanner = banners[currentBannerIndex];
            if (!currentBanner) return;
            
            // If current banner has multiple images, slide through them first
            if (currentBanner.images.length > 1) {
                setCurrentImageIndex((prev) => {
                    const nextIndex = (prev + 1) % currentBanner.images.length;
                    // If we've completed all images in this banner, move to next banner
                    if (nextIndex === 0 && banners.length > 1) {
                        setCurrentBannerIndex((prevBanner) => (prevBanner + 1) % banners.length);
                        return 0;
                    }
                    return nextIndex;
                });
            } else {
                // If only one image per banner, just switch banners
                if (banners.length > 1) {
                    setCurrentBannerIndex((prevBanner) => (prevBanner + 1) % banners.length);
                }
            }
        }, 5000); // 5 seconds for each slide

        return () => clearInterval(timer);
    }, [isOpen, autoPlay, currentBannerIndex, banners]);

    const handleClose = () => {
        setIsOpen(false);
    };

    const nextBanner = () => {
        setAutoPlay(false);
        if (banners.length > 1) {
            setCurrentBannerIndex((prev) => (prev + 1) % banners.length);
            setCurrentImageIndex(0);
        }
    };

    const prevBanner = () => {
        setAutoPlay(false);
        if (banners.length > 1) {
            setCurrentBannerIndex((prev) => (prev - 1 + banners.length) % banners.length);
            setCurrentImageIndex(0);
        }
    };

    const nextImage = () => {
        const currentBanner = banners[currentBannerIndex];
        if (!currentBanner) return;
        setAutoPlay(false);
        
        if (currentBanner.images.length > 1) {
            const nextIndex = (currentImageIndex + 1) % currentBanner.images.length;
            if (nextIndex === 0 && banners.length > 1) {
                // Move to next banner if we've seen all images
                nextBanner();
            } else {
                setCurrentImageIndex(nextIndex);
            }
        } else if (banners.length > 1) {
            // If only one image, move to next banner
            nextBanner();
        }
    };

    const prevImage = () => {
        const currentBanner = banners[currentBannerIndex];
        if (!currentBanner) return;
        setAutoPlay(false);
        
        if (currentBanner.images.length > 1) {
            if (currentImageIndex === 0 && banners.length > 1) {
                // Move to previous banner if we're at first image
                prevBanner();
                const prevBannerIndex = (currentBannerIndex - 1 + banners.length) % banners.length;
                const prevBannerImages = banners[prevBannerIndex]?.images || [];
                setCurrentImageIndex(prevBannerImages.length > 0 ? prevBannerImages.length - 1 : 0);
            } else {
                setCurrentImageIndex((prev) => (prev - 1 + currentBanner.images.length) % currentBanner.images.length);
            }
        } else if (banners.length > 1) {
            // If only one image, move to previous banner
            prevBanner();
        }
    };

    if (banners.length === 0) return null;

    const currentBanner = banners[currentBannerIndex];
    const totalImages = currentBanner?.images?.length || 0;
    const totalBanners = banners.length;
    const hasMultipleBanners = totalBanners > 1;

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

                        {/* Navigation Arrows - Always show if multiple banners or multiple images */}
                        {(hasMultipleBanners || totalImages > 1) && (
                            <>
                                <button
                                    onClick={prevImage}
                                    className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white text-gray-800 rounded-full flex items-center justify-center transition-colors shadow-lg z-10"
                                >
                                    <ChevronLeft className="w-5 h-5" />
                                </button>
                                <button
                                    onClick={nextImage}
                                    className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white text-gray-800 rounded-full flex items-center justify-center transition-colors shadow-lg z-10"
                                >
                                    <ChevronRight className="w-5 h-5" />
                                </button>
                            </>
                        )}

                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
