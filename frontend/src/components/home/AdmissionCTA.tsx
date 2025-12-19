import { motion } from "framer-motion";
import { Phone, MessageCircle, MapPin, Clock, Calendar, ArrowRight } from "lucide-react";
import { LeadForm } from "@/components/LeadForm";

const contactInfo = [
    { icon: Phone, label: "Call Us", value: "+91 12345 67890", action: "tel:+911234567890" },
    { icon: MessageCircle, label: "WhatsApp", value: "Chat Now", action: "https://wa.me/911234567890" },
    { icon: Clock, label: "Office Hours", value: "Mon-Sat: 9AM - 5PM", action: null }
];

export function AdmissionCTA() {
    return (
        <section id="admission-cta" className="py-16 md:py-24 bg-white relative overflow-hidden">
            <div className="absolute top-0 left-0 w-72 h-72 bg-gold/10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-royal/10 rounded-full translate-x-1/2 translate-y-1/2 blur-3xl" />

            <div className="container mx-auto px-4 md:px-8 relative z-10">
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
                    <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-gold/20 text-royal rounded-full text-xs font-bold tracking-widest uppercase mb-4 border border-gold/30">
                        <Calendar className="w-3 h-3" /> Admissions 2025-26
                    </span>
                    <h2 className="text-3xl md:text-5xl font-serif font-bold text-royal mb-4">
                        Begin Your Child's Journey to <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-dark to-gold">Excellence</span>
                    </h2>
                    <p className="text-royal/70 max-w-2xl mx-auto text-lg">Limited seats available. Apply now to secure admission for the upcoming academic session.</p>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
                    {/* Left - Form */}
                    <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                        <LeadForm />
                    </motion.div>

                    {/* Right - Contact & Map */}
                    <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="space-y-6">
                        {/* Contact Cards */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            {contactInfo.map((item, index) => (
                                <a key={index} href={item.action || "#"} className="group bg-white p-5 rounded-xl border border-royal/10 hover:border-gold/30 hover:shadow-lg transition-all text-center">
                                    <div className="w-12 h-12 mx-auto bg-royal/5 rounded-xl flex items-center justify-center mb-3 group-hover:bg-gold/10 transition-colors">
                                        <item.icon className="w-6 h-6 text-royal group-hover:text-gold transition-colors" />
                                    </div>
                                    <div className="text-sm font-bold text-royal">{item.label}</div>
                                    <div className="text-sm text-royal/60">{item.value}</div>
                                </a>
                            ))}
                        </div>

                        {/* Visit Campus CTA */}
                        <a href="/contact" className="block bg-royal rounded-xl p-6 text-white hover:bg-royal-light transition-colors group">
                            <div className="flex items-center justify-between">
                                <div><h4 className="font-bold text-lg mb-1">Book a Campus Visit</h4><p className="text-white/70 text-sm">Experience our world-class facilities firsthand</p></div>
                                <div className="w-12 h-12 bg-gold/20 rounded-full flex items-center justify-center group-hover:bg-gold/30 transition-colors">
                                    <ArrowRight className="w-5 h-5 text-gold" />
                                </div>
                            </div>
                        </a>

                        {/* Google Map */}
                        <div className="bg-white rounded-xl overflow-hidden border border-royal/10 shadow-sm">
                            <div className="p-4 border-b border-royal/10 flex items-center gap-2">
                                <MapPin className="w-5 h-5 text-gold" />
                                <span className="font-semibold text-royal">Our Location</span>
                            </div>
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3489.123456789!2d76.606!3d28.895!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjjCsDUzJzQyLjAiTiA3NsKwMzYnMjEuNiJF!5e0!3m2!1sen!2sin!4v1234567890"
                                width="100%" height="200" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="School Location"
                            />
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
