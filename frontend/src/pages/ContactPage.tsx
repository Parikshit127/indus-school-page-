
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/section";
import { Mail, Phone, MapPin, Clock, Send } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

export default function ContactPage() {
    return (
        <div className="min-h-screen bg-slate-50">
            <PageHero
                title="Contact Us"
                subtitle="We'd love to hear from you"
                image="https://images.unsplash.com/photo-1577896334614-5d85d79788f4?q=80&w=2070&auto=format&fit=crop"
            />

            <Section className="bg-white relative">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
                    {/* Contact Information */}
                    <div>
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <h2 className="text-3xl md:text-5xl font-serif text-royal font-bold mb-8">
                                Get in Touch
                            </h2>
                            <p className="text-lg text-slate-600 mb-12 leading-relaxed">
                                Whether you have a question about admissions, academics, or just want to say hello, we are here to answer all your queries.
                            </p>

                            <div className="space-y-8">
                                <ContactInfoItem
                                    icon={<MapPin size={24} />}
                                    title="Visit Us"
                                    content="Indus Public School, Delhi Road, Near Asthal Bohar, Rohtak, Haryana 124001"
                                    link="https://maps.app.goo.gl/SNGRWPV4XqjG4AC2A"
                                />
                                <ContactInfoItem
                                    icon={<Phone size={24} />}
                                    title="Call Us"
                                    content="+91 12345 67890, +91 98765 43210"
                                    link="tel:+911234567890"
                                />
                                <ContactInfoItem
                                    icon={<Mail size={24} />}
                                    title="Email Us"
                                    content="contact@induspublicschool.com"
                                    link="mailto:contact@induspublicschool.com"
                                />
                                <ContactInfoItem
                                    icon={<Clock size={24} />}
                                    title="School Hours"
                                    content="Mon - Sat: 8:00 AM - 2:30 PM"
                                    link=""
                                />
                            </div>
                        </motion.div>
                    </div>

                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="bg-slate-50 p-8 md:p-10 rounded-3xl shadow-lg border border-slate-100"
                    >
                        <h3 className="text-2xl font-bold text-royal mb-6">Send us a Message</h3>
                        <ContactForm />
                    </motion.div>
                </div>
            </Section>

            {/* Map Section */}
            <Section className="p-0 py-0 md:py-0">
                <div className="w-full h-[450px] bg-slate-200">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3493.5658744005666!2d76.61111007616149!3d28.881729373033504!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d84d7286de731%3A0xe54c15337b5268c3!2sIndus%20Public%20School%2C%20Rohtak!5e0!3m2!1sen!2sin!4v1709228947214!5m2!1sen!2sin"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        className="grayscale hover:grayscale-0 transition-all duration-700"
                    ></iframe>
                </div>
            </Section>
        </div>
    );
}

function ContactInfoItem({ icon, title, content, link }: { icon: any, title: string, content: string, link: string }) {
    return (
        <div className="flex gap-4 group">
            <div className="bg-royal/10 text-royal p-3 rounded-2xl h-fit group-hover:bg-royal group-hover:text-white transition-colors duration-300">
                {icon}
            </div>
            <div>
                <h4 className="font-bold text-slate-800 mb-1">{title}</h4>
                {link ? (
                    <a href={link} className="text-slate-600 hover:text-royal transition-colors">{content}</a>
                ) : (
                    <p className="text-slate-600">{content}</p>
                )}
            </div>
        </div>
    )
}

function ContactForm() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
    });
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        // Simulating API call
        setTimeout(() => {
            setLoading(false);
            setStatus('success');
            setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
            setTimeout(() => setStatus('idle'), 3000);
        }, 1500);

        // In real implementation you would call:
        // await fetch('/api/contact', { method: 'POST', body: JSON.stringify(formData) ... })
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium text-slate-700">Full Name</label>
                    <input
                        required
                        type="text"
                        id="name"
                        value={formData.name}
                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-royal focus:ring-1 focus:ring-royal outline-none transition-all placeholder:text-slate-400"
                        placeholder="John Doe"
                    />
                </div>
                <div className="space-y-2">
                    <label htmlFor="phone" className="text-sm font-medium text-slate-700">Phone Number</label>
                    <input
                        required
                        type="tel"
                        id="phone"
                        value={formData.phone}
                        onChange={e => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-royal focus:ring-1 focus:ring-royal outline-none transition-all placeholder:text-slate-400"
                        placeholder="+91 98765 43210"
                    />
                </div>
            </div>

            <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-slate-700">Email Address</label>
                <input
                    required
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-royal focus:ring-1 focus:ring-royal outline-none transition-all placeholder:text-slate-400"
                    placeholder="john@example.com"
                />
            </div>

            <div className="space-y-2">
                <label htmlFor="subject" className="text-sm font-medium text-slate-700">Subject (Optional)</label>
                <select
                    id="subject"
                    value={formData.subject}
                    onChange={e => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-royal focus:ring-1 focus:ring-royal outline-none transition-all text-slate-600"
                >
                    <option value="">Select a topic</option>
                    <option value="admission">Admission Enquiry</option>
                    <option value="general">General Enquiry</option>
                    <option value="feedback">Feedback</option>
                </select>
            </div>

            <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium text-slate-700">Message</label>
                <textarea
                    required
                    id="message"
                    rows={4}
                    value={formData.message}
                    onChange={e => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-royal focus:ring-1 focus:ring-royal outline-none transition-all placeholder:text-slate-400"
                    placeholder="How can we help you?"
                ></textarea>
            </div>

            <button
                type="submit"
                disabled={loading}
                className="w-full bg-royal text-white font-bold py-4 rounded-xl hover:bg-royal-dark transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
                {loading ? 'Sending...' : (
                    <>
                        Send Message <Send size={18} />
                    </>
                )}
            </button>

            {status === 'success' && (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-green-600 text-center font-medium bg-green-50 p-3 rounded-lg"
                >
                    Message sent successfully! We'll get back to you soon.
                </motion.div>
            )}
        </form>
    )
}
