import { Section } from "@/components/ui/section";
import { Facebook, Instagram, Linkedin, Twitter, MapPin, Phone, Mail } from "lucide-react";


export function Footer() {
    return (
        <footer className="bg-royal text-white border-t border-white/10">
            <Section className="py-16">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
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
                            {[Facebook, Instagram, Twitter, Linkedin].map((Icon, i) => (
                                <a key={i} href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-gold hover:text-royal transition-colors">
                                    <Icon size={20} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Footer Form / CTA */}
                    <div>
                        <h4 className="font-bold text-lg mb-4 text-gold">Quick Inquiry</h4>
                        <div className="bg-white/5 border border-white/10 rounded-lg p-6">
                            <p className="text-sm text-white/70 mb-4">Looking for admissions? Drop your details and we'll call you back.</p>
                            <a href="#hero">
                                <button className="w-full bg-gold text-royal font-bold py-2 rounded-md hover:bg-gold-light transition-colors">
                                    Apply Now
                                </button>
                            </a>
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
