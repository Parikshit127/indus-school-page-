"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav
            className={cn(
                "fixed top-0 w-full z-50 transition-all duration-300",
                isScrolled
                    ? "bg-white/90 backdrop-blur-md shadow-md py-4"
                    : "bg-transparent py-6"
            )}
        >
            <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2">
                    {/* Logo Placeholder */}
                    <div className="w-10 h-10 bg-royal flex items-center justify-center rounded-sm text-gold font-serif font-bold text-xl">
                        I
                    </div>
                    <div className="flex flex-col">
                        <span className={cn(
                            "font-serif text-lg md:text-xl font-bold leading-none",
                            isScrolled ? "text-royal" : "text-white"
                        )}>
                            INDUS
                        </span>
                        <span className={cn(
                            "text-[0.65rem] md:text-xs tracking-widest uppercase",
                            isScrolled ? "text-royal/80" : "text-white/80"
                        )}>
                            Public School
                        </span>
                    </div>
                </Link>

                {/* Desktop Nav - Commented out for single page view
                <div className="hidden md:flex items-center gap-8">
                    {["About", "Academics", "Admissions", "Campus", "Contact"].map((item) => (
                        <Link
                            key={item}
                            href={item === "Academics" ? "/academics" : (item === "Campus" ? "/campus" : (item === "About" ? "/about" : (item === "Home" ? "/" : `/#${item.toLowerCase()}`)))}
                            className={cn(
                                "text-sm font-medium transition-colors hover:text-gold",
                                isScrolled ? "text-royal" : "text-white/90"
                            )}
                        >
                            {item}
                        </Link>
                    ))}
                    <Button variant="gold" size="sm">
                        Apply Now
                    </Button>
                </div>
                */}

                {/* Mobile Toggle - Commented out
                <button
                    className="md:hidden"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? (
                        <X className={isScrolled ? "text-royal" : "text-white"} />
                    ) : (
                        <Menu className={isScrolled ? "text-royal" : "text-white"} />
                    )}
                </button>
                */}
            </div>

            {/* Mobile Menu - Commented out for single page view
            {isOpen && (
                <div className="absolute top-full left-0 w-full bg-white shadow-xl p-4 flex flex-col gap-4 md:hidden animate-fade-in-up">
                    {["About", "Academics", "Admissions", "Campus", "Contact"].map((item) => (
                        <Link
                            key={item}
                            href={item === "Academics" ? "/academics" : (item === "Campus" ? "/campus" : (item === "About" ? "/about" : (item === "Home" ? "/" : `/#${item.toLowerCase()}`)))}
                            className="text-royal font-medium hover:text-gold"
                            onClick={() => setIsOpen(false)}
                        >
                            {item}
                        </Link>
                    ))}
                    <Button variant="gold" className="w-full">
                        Apply Now
                    </Button>
                </div>
            )}
            */}
        </nav>
    );
}
