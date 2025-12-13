import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Close mobile menu on route change
    useEffect(() => {
        setIsOpen(false);
    }, [location]);

    // Navbar background style based on scroll only (transparent at top for all pages)
    const navbarClass = `fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
        ? "bg-royal-dark/95 backdrop-blur-md shadow-lg py-3"
        : "bg-transparent py-6"
        }`;

    const navLinks = [
        { name: "Home", path: "/" },
        { name: "About Us", path: "/about" },
        { name: "Academics", path: "/academics" },
        { name: "Facilities", path: "/facilities" },
        { name: "Admissions", path: "/#admissions" }, // Scroll to form
    ];

    return (
        <nav className={navbarClass}>
            <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
                {/* Logo */}
                <Link to="/" className="flex items-center gap-3 group">
                    <img
                        src="/logo.png"
                        alt="Indus Public School"
                        className="w-10 h-10 md:w-12 md:h-12 object-contain transition-transform group-hover:scale-105"
                    />
                    <div className="flex flex-col">
                        <span className="text-white font-serif font-bold text-lg md:text-xl leading-none">Indus Public School</span>
                        <span className="text-gold text-[10px] md:text-xs font-medium tracking-widest uppercase">Rohtak</span>
                    </div>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            to={link.path}
                            className={`text-sm font-medium tracking-wide transition-colors relative group ${location.pathname === link.path ? "text-gold" : "text-white hover:text-gold"
                                }`}
                        >
                            {link.name}
                            <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-gold transition-all group-hover:w-full ${location.pathname === link.path ? "w-full" : ""}`} />
                        </Link>
                    ))}

                </div>

                {/* Mobile Menu Button */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="md:hidden text-white hover:text-gold transition-colors"
                >
                    {isOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {/* Mobile Navigation Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-royal-dark border-t border-white/10 overflow-hidden"
                    >
                        <div className="flex flex-col p-6 space-y-4">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    to={link.path}
                                    className={`text-lg font-medium ${location.pathname === link.path ? "text-gold" : "text-white"
                                        }`}
                                >
                                    {link.name}
                                </Link>
                            ))}

                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
