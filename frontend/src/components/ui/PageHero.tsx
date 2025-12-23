import { motion } from "framer-motion";

interface PageHeroProps {
    title: string;
    subtitle?: string;
    image: string;
}

export function PageHero({ title, subtitle, image }: PageHeroProps) {
    return (
        <div className="relative h-[60vh] min-h-[400px] flex items-center justify-center overflow-hidden pt-32">
            {/* Background Image */}
            <img
                src={image}
                alt={title}
                className="absolute inset-0 w-full h-full object-cover z-0 scale-105"
                style={{ filter: "brightness(0.4) blur(3px)" }}
                onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = 'https://via.placeholder.com/1920x600/1e293b/f1f5f9?text=Hero+Image';
                }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-royal-dark/80 via-royal/50 to-slate-50/10 z-1" />

            {/* Content */}
            <div className="container mx-auto px-4 relative z-10 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <h1 className="text-5xl md:text-7xl font-serif font-bold text-white mb-6 drop-shadow-lg">
                        {title}
                    </h1>
                    {subtitle && (
                        <p className="text-lg md:text-2xl text-gold/90 font-light max-w-2xl mx-auto leading-relaxed drop-shadow-md">
                            {subtitle}
                        </p>
                    )}

                    <motion.div
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                        className="w-24 h-1 bg-gold mx-auto mt-8 rounded-full"
                    />
                </motion.div>
            </div>
        </div>
    );
}
