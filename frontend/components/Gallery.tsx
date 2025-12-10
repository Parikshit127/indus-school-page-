import { Section } from "@/components/ui/section";

export function Gallery() {
    const images = [
        "https://images.unsplash.com/photo-1525921429624-479b6a26d84d?q=80&w=2070&auto=format&fit=crop", // Campus
        "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=2132&auto=format&fit=crop", // Students
        "https://images.unsplash.com/photo-1588072432836-e10032774350?q=80&w=2072&auto=format&fit=crop", // Library
        "https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=2070&auto=format&fit=crop", // Sports
    ];

    return (
        <Section className="bg-white">
            <div className="text-center mb-12">
                <h2 className="text-3xl md:text-5xl font-serif text-royal font-bold">
                    Life at Indus
                </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 h-96">
                {images.map((src, i) => (
                    <div
                        key={i}
                        className={`relative overflow-hidden rounded-lg group ${i === 0 ? "md:col-span-2 md:row-span-2 h-full" : "h-48 md:h-full"}`}
                    >
                        <div
                            className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                            style={{ backgroundImage: `url('${src}')` }}
                        />
                        <div className="absolute inset-0 bg-royal/20 group-hover:bg-transparent transition-colors" />
                    </div>
                ))}
            </div>
        </Section>
    );
}
