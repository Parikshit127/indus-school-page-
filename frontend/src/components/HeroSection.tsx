
import { LeadForm } from "@/components/LeadForm";


export function HeroSection() {
    return (
        <section className="relative min-h-[100dvh] flex flex-col md:flex-row items-start md:items-center justify-center overflow-hidden pt-32 pb-12 md:py-0">
            {/* Background with Overlay */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-b md:bg-gradient-to-r from-royal/90 via-royal/70 to-transparent z-10" />
                {/* Placeholder for actual image */}
                <div
                    className="w-full h-full bg-cover bg-center"
                    style={{ backgroundImage: "url('https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=2070&auto=format&fit=crop')" }}
                />
            </div>

            {/* Logo and Header */}
            <div className="absolute top-0 left-0 p-4 md:p-6 z-20 flex items-center gap-3 md:gap-4">
                <img
                    src="/logo.png"
                    alt="Indus Public School Logo"
                    className="w-14 h-14 md:w-20 md:h-20 object-contain drop-shadow-lg"
                />
                <div>
                    <h2 className="text-white font-serif font-bold text-lg md:text-2xl leading-tight drop-shadow-md">Indus Public School</h2>
                    <p className="text-gold text-xs md:text-sm font-medium tracking-widest uppercase">Rohtak</p>
                </div>
            </div>

            <div className="container mx-auto px-4 md:px-6 relative z-10 grid md:grid-cols-2 gap-8 md:gap-12 items-center">
                {/* Left Content */}
                <div className="text-white space-y-6 md:space-y-8 text-center md:text-left">
                    <div className="inline-block px-3 py-1 bg-gold/20 text-gold border border-gold/30 rounded-full text-xs font-bold tracking-widest uppercase mb-2">
                        Admissions Open 2025-26
                    </div>
                    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-bold leading-tight">
                        Shaping Excellence <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold to-gold-light">
                            Since 2003
                        </span>
                    </h1>
                    <p className="text-lg md:text-xl text-white/80 max-w-lg mx-auto md:mx-0 font-light">
                        Indus Public School, Rohtak offers a heritage of discipline blended with modern academic rigor. Join a legacy of leaders.
                    </p>


                </div>

                {/* Right Form */}
                <div className="w-full max-w-md ml-auto mt-8 md:mt-0">
                    <LeadForm />
                </div>
            </div>
        </section>
    );
}
