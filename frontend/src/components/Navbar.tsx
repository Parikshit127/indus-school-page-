import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
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
        setActiveDropdown(null);
    }, [location]);

    // Navbar background style based on scroll only (transparent at top for all pages)
    const navbarClass = `fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
        ? "bg-royal-dark/95 backdrop-blur-md shadow-lg py-3"
        : "bg-transparent py-6"
        }`;

    const navLinks = [
        { name: "Home", path: "/" },
        { name: "About Us", path: "/about" },
        {
            name: "Academics",
            path: "/academics",
            dropdown: [
                { name: "Academics Overview", path: "/academics" },
                { name: "Teaching Staff", path: "/academics/teaching-staff" },
                { name: "School Calendar", path: "/calendar" }
            ]
        },
        {
            name: "Activities",
            path: "/activities",
            dropdown: [
                { name: "Academic Clubs", path: "/activities/clubs" },
                { name: "Arts & Culture", path: "/activities/cultural" },
                { name: "Sports & Athletics", path: "/activities/sports" }
            ]
        },
        { name: "Gallery", path: "/gallery" },
        { name: "Facilities", path: "/facilities" },
        { name: "Admissions", path: "/#admissions" },
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
                        <div
                            key={link.name}
                            className="relative group"
                            onMouseEnter={() => setActiveDropdown(link.name)}
                            onMouseLeave={() => setActiveDropdown(null)}
                        >
                            <Link
                                to={link.path}
                                className={`flex items-center gap-1 text-sm font-medium tracking-wide transition-colors relative ${location.pathname === link.path || (link.dropdown && location.pathname.startsWith(link.path))
                                    ? "text-gold"
                                    : "text-white hover:text-gold"
                                    }`}
                            >
                                {link.name}
                                {link.dropdown && <ChevronDown size={14} />}
                                <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-gold transition-all group-hover:w-full ${location.pathname === link.path || (link.dropdown && location.pathname.startsWith(link.path)) ? "w-full" : ""}`} />
                            </Link>

                            {/* Dropdown Menu */}
                            {link.dropdown && (
                                <AnimatePresence>
                                    {activeDropdown === link.name && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: 10 }}
                                            transition={{ duration: 0.2 }}
                                            className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-xl py-2 overflow-hidden"
                                        >
                                            {link.dropdown.map((subItem) => (
                                                <Link
                                                    key={subItem.name}
                                                    to={subItem.path}
                                                    className="block px-4 py-2 text-sm text-slate-700 hover:bg-royal/5 hover:text-royal transition-colors"
                                                >
                                                    {subItem.name}
                                                </Link>
                                            ))}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            )}
                        </div>
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
                                <div key={link.name}>
                                    {link.dropdown ? (
                                        <div>
                                            <div 
                                                className="flex items-center justify-between text-lg font-medium text-white cursor-pointer"
                                                onClick={() => setActiveDropdown(activeDropdown === link.name ? null : link.name)}
                                            >
                                                <span className={location.pathname.startsWith(link.path) ? "text-gold" : ""}>{link.name}</span>
                                                <ChevronDown size={20} className={`transition-transform ${activeDropdown === link.name ? "rotate-180" : ""}`} />
                                            </div>
                                            <AnimatePresence>
                                                {activeDropdown === link.name && (
                                                    <motion.div
                                                        initial={{ height: 0, opacity: 0 }}
                                                        animate={{ height: "auto", opacity: 1 }}
                                                        exit={{ height: 0, opacity: 0 }}
                                                        className="overflow-hidden pl-4 border-l border-white/10 mt-2 space-y-2"
                                                    >
                                                        {link.dropdown.map((subItem) => (
                                                            <Link
                                                                key={subItem.name}
                                                                to={subItem.path}
                                                                className="block py-2 text-white/80 hover:text-gold text-base"
                                                            >
                                                                {subItem.name}
                                                            </Link>
                                                        ))}
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                    ) : (
                                        <Link
                                            to={link.path}
                                            className={`block text-lg font-medium ${location.pathname === link.path ? "text-gold" : "text-white"}`}
                                        >
                                            {link.name}
                                        </Link>
                                    )}
                                </div>
                            ))}
                            {/* Mobile specific Login as Admin button if needed */}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
