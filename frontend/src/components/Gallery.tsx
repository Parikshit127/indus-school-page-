import { Section } from "@/components/ui/section";

export function Gallery() {
    const images = [
        "https://content3.jdmagicbox.com/v2/comp/rohtak/dc/9999p1262.1262.1239634669u5i3c7.dc/catalogue/indus-public-school-rohtak-ho-rohtak-cbse-schools-cbq9kft3pk.jpg", // Campus
        "https://content3.jdmagicbox.com/v2/comp/rohtak/dc/9999p1262.1262.1239634669u5i3c7.dc/catalogue/indus-public-school-rohtak-ho-rohtak-cbse-schools-bpfwwzqkt4.jpg", // Students
        "https://content.jdmagicbox.com/comp/rohtak/dc/9999p1262.1262.1239634669u5i3c7.dc/catalogue/indus-public-school-rohtak-ho-rohtak-cbse-schools-08c4a863u0.jpg", // Library
        "https://content3.jdmagicbox.com/comp/rohtak/dc/9999p1262.1262.1239634669u5i3c7.dc/catalogue/indus-public-school-rohtak-ho-rohtak-cbse-schools-se2hoiaqcn.jpg", // Sports
    ];

    return (
        <Section className="bg-white">
            <div className="text-center mb-12">
                <h2 className="text-3xl md:text-5xl font-serif text-royal font-bold">
                    Life at Indus
                </h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-2 md:gap-4 md:h-96">
                {images.map((src, i) => (
                    <div
                        key={i}
                        className={`relative overflow-hidden rounded-lg group ${i === 0 ? "h-40 md:h-full md:col-span-2 md:row-span-2" : "h-32 md:h-full"}`}
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
