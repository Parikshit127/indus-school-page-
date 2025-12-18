import { Section } from "@/components/ui/section";
import { motion } from "framer-motion";
import { Camera, ArrowRight } from "lucide-react";

const galleryImages = [
    { src: "https://content3.jdmagicbox.com/v2/comp/rohtak/dc/9999p1262.1262.1239634669u5i3c7.dc/catalogue/indus-public-school-rohtak-ho-rohtak-cbse-schools-cbq9kft3pk.jpg", label: "Campus View" },
    { src: "https://content3.jdmagicbox.com/v2/comp/rohtak/dc/9999p1262.1262.1239634669u5i3c7.dc/catalogue/indus-public-school-rohtak-ho-rohtak-cbse-schools-bpfwwzqkt4.jpg", label: "Students" },
    { src: "https://content.jdmagicbox.com/comp/rohtak/dc/9999p1262.1262.1239634669u5i3c7.dc/catalogue/indus-public-school-rohtak-ho-rohtak-cbse-schools-08c4a863u0.jpg", label: "Library" },
    { src: "https://content3.jdmagicbox.com/comp/rohtak/dc/9999p1262.1262.1239634669u5i3c7.dc/catalogue/indus-public-school-rohtak-ho-rohtak-cbse-schools-se2hoiaqcn.jpg", label: "Sports" }
];

export function Gallery() {
    return (
        <Section className="bg-gradient-to-b from-white to-cream">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8 md:mb-12"
            >
                <div>
                    <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-royal/5 text-royal rounded-full text-xs font-bold tracking-widest uppercase mb-4">
                        <Camera className="w-3 h-3" /> Photo Gallery
                    </span>
                    <h2 className="text-3xl md:text-5xl font-serif text-royal font-bold">
                        Life at <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-dark to-gold">Indus</span>
                    </h2>
                </div>
                <a href="/gallery" className="inline-flex items-center gap-2 text-royal font-semibold hover:text-gold transition-colors group">
                    View Full Gallery <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 md:h-[450px]">
                {galleryImages.map((img, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                        className={`relative overflow-hidden rounded-2xl group cursor-pointer ${i === 0 ? "h-44 md:h-full md:col-span-2 md:row-span-2" : "h-36 md:h-full"}`}
                    >
                        <div
                            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                            style={{ backgroundImage: `url('${img.src}')` }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-royal/80 via-royal/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

                        {/* Label */}
                        <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                            <span className="text-white font-semibold text-sm">{img.label}</span>
                        </div>

                        {/* Hover Icon */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                                <Camera className="w-5 h-5 text-white" />
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </Section>
    );
}
