import { Link } from "react-router-dom";

export function AdmissionNavbar() {
    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-royal py-4 shadow-lg">
            <div className="container mx-auto px-4 flex justify-center items-center">
                <Link to="/" className="flex items-center gap-3 group">
                    <img
                        src="/logo.png"
                        alt="Indus Public School"
                        className="w-10 h-10 md:w-12 md:h-12 object-contain"
                    />
                    <div className="flex flex-col">
                        <span className="text-white font-serif font-bold text-lg md:text-xl leading-none">Indus Public School</span>
                        <span className="text-gold text-[10px] md:text-xs font-medium tracking-widest uppercase">Rohtak</span>
                    </div>
                </Link>
            </div>
        </nav>
    );
}
