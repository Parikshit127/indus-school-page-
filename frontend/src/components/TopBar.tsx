import { Link } from "react-router-dom";
import { Facebook, Instagram, Youtube, Twitter, Linkedin } from "lucide-react";

export function TopBar() {
    const topLinks = [
        { name: "Fees Structure", path: "/fees" },
        { name: "Feedback", path: "/feedback" },
        { name: "Career", path: "/career" },
        { name: "CBSE Mandatory Disclosure", path: "/mandatory-disclosure" }
    ];

    return (
        <div className="fixed top-0 left-0 right-0 bg-royal-dark text-white h-auto md:h-[40px] flex items-center py-2 md:py-0 border-b border-white/10 z-[60]">
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex flex-col md:flex-row items-center justify-between gap-2">
                    {/* Top Links */}
                    <div className="flex items-center gap-4 md:gap-6 text-xs md:text-sm">
                        {topLinks.map((link, index) => (
                            <span key={link.name} className="flex items-center gap-4 md:gap-6">
                                <Link
                                    to={link.path}
                                    className="text-white/90 hover:text-gold transition-colors"
                                >
                                    {link.name}
                                </Link>
                                {index < topLinks.length - 1 && (
                                    <span className="text-white/30">|</span>
                                )}
                            </span>
                        ))}
                    </div>

                    {/* Social Media Icons */}
                    <div className="flex items-center gap-3">
                        <a
                            href="https://facebook.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-white/80 hover:text-gold transition-colors"
                            aria-label="Facebook"
                        >
                            <Facebook size={16} />
                        </a>
                        <a
                            href="https://instagram.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-white/80 hover:text-gold transition-colors"
                            aria-label="Instagram"
                        >
                            <Instagram size={16} />
                        </a>
                        <a
                            href="https://youtube.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-white/80 hover:text-gold transition-colors"
                            aria-label="YouTube"
                        >
                            <Youtube size={16} />
                        </a>
                        <a
                            href="https://twitter.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-white/80 hover:text-gold transition-colors"
                            aria-label="Twitter"
                        >
                            <Twitter size={16} />
                        </a>
                        <a
                            href="https://linkedin.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-white/80 hover:text-gold transition-colors"
                            aria-label="LinkedIn"
                        >
                            <Linkedin size={16} />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
