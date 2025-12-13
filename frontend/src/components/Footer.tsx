import { Section } from "@/components/ui/section";
import { Facebook, Instagram, Linkedin, MapPin, Phone, Mail } from "lucide-react";
import { Link } from "react-router-dom";

// Custom X (Twitter) icon component
const XIcon = ({ size = 20 }: { size?: number }) => (
    <svg
        viewBox="0 0 24 24"
        width={size}
        height={size}
        fill="currentColor"
        aria-hidden="true"
    >
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
);

export function Footer() {
    const quickLinks = [
        { name: "About Us", path: "/about" },
        { name: "Academics", path: "/academics" },
        { name: "Activities", path: "/activities" },
        { name: "Facilities", path: "/facilities" },
        { name: "Gallery", path: "/gallery" },
    ];

    const handleApplyNow = () => {
        // Navigate to home page and scroll to admissions section
        window.location.href = "/#admissions";
    };

    return (
        <footer className="bg-royal text-white border-t border-white/10">
            <Section className="py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                    {/* Brand & Contact */}
                    <div className="space-y-6">
                        <div>
                            <h3 className="text-2xl font-serif font-bold text-gold">Indus Public School</h3>
                            <p className="text-white/60 text-sm">Shaping Minds, Building Legacy.</p>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-start gap-3 text-white/80">
                                <MapPin className="text-gold shrink-0 mt-1" size={20} />
                                <p>Sector 6, Rohtak, Haryana 124001</p>
                            </div>
                            <div className="flex items-center gap-3 text-white/80">
                                <Phone className="text-gold shrink-0" size={20} />
                                <p>+91 12345 67890</p>
                            </div>
                            <div className="flex items-center gap-3 text-white/80">
                                <Mail className="text-gold shrink-0" size={20} />
                                <p>admissions@indusrohtak.com</p>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-gold hover:text-royal transition-colors">
                                <Facebook size={20} />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-gold hover:text-royal transition-colors">
                                <Instagram size={20} />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-gold hover:text-royal transition-colors">
                                <XIcon size={20} />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-gold hover:text-royal transition-colors">
                                <Linkedin size={20} />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="font-bold text-lg mb-4 text-gold">Quick Links</h4>
                        <ul className="space-y-3">
                            {quickLinks.map((link) => (
                                <li key={link.path}>
                                    <Link
                                        to={link.path}
                                        className="text-white/70 hover:text-gold transition-colors flex items-center gap-2"
                                    >
                                        <span className="w-1.5 h-1.5 bg-gold/50 rounded-full"></span>
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                            <li>
                                <Link
                                    to="/#admissions"
                                    className="text-white/70 hover:text-gold transition-colors flex items-center gap-2"
                                >
                                    <span className="w-1.5 h-1.5 bg-gold/50 rounded-full"></span>
                                    Admissions
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Footer Form / CTA */}
                    <div>
                        <h4 className="font-bold text-lg mb-4 text-gold">Quick Inquiry</h4>
                        <div className="bg-white/5 border border-white/10 rounded-lg p-6">
                            <p className="text-sm text-white/70 mb-4">Looking for admissions? Drop your details and we'll call you back.</p>
                            <button
                                onClick={handleApplyNow}
                                className="w-full bg-gold text-royal font-bold py-2 rounded-md hover:bg-gold-light transition-colors"
                            >
                                Apply Now
                            </button>
                        </div>
                    </div>
                </div>

                <div className="border-t border-white/10 mt-16 pt-8 text-center text-white/40 text-sm flex flex-col md:flex-row justify-between items-center gap-4">
                    <p>© 2025 Indus Public School, Rohtak. All rights reserved.</p>
                    <div className="flex gap-6">
                        <a href="#" className="hover:text-gold">Privacy Policy</a>
                        <a href="#" className="hover:text-gold">Terms of Use</a>
                    </div>
                </div>
            </Section>
        </footer>
    );
}
