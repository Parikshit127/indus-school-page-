
import { useState, useEffect } from "react";
import { Section } from "@/components/ui/section";
import { FileText, Download, Receipt } from "lucide-react";
import { motion } from "framer-motion";

export default function FeesPage() {
    const [pdfUrl, setPdfUrl] = useState<string | null>(null);
    const [title, setTitle] = useState("Fees Structure 2024-25"); // Default title
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFees = async () => {
            try {
                const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:4000';
                const response = await fetch(`${apiUrl}/api/content/fees`);
                if (response.ok) {
                    const data = await response.json();
                    if (data) {
                        if (data.pdfUrl) setPdfUrl(data.pdfUrl);
                        if (data.title) setTitle(data.title);
                    }
                }
            } catch (error) {
                console.error("Failed to fetch fees structure", error);
            } finally {
                setLoading(false);
            }
        };
        fetchFees();
    }, []);

    return (
        <div className="bg-slate-50 min-h-screen pt-40">
            <Section className="py-20">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100 p-8 md:p-12 text-center">
                        <div className="w-20 h-20 bg-royal/5 text-royal rounded-full flex items-center justify-center mx-auto mb-6">
                            <Receipt size={40} />
                        </div>
                        
                        <h2 className="text-3xl font-serif font-bold text-royal mb-4">
                            {title}
                        </h2>
                        
                        <p className="text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
                            We believe in providing quality education with a transparent fee structure. Below you can find the detailed breakdown of fees for the current academic session.
                        </p>

                        {loading ? (
                            <div className="animate-pulse space-y-4">
                                <div className="h-64 bg-slate-100 rounded-xl w-full max-w-lg mx-auto"></div>
                            </div>
                        ) : pdfUrl ? (
                            <div className="space-y-8">
                                <motion.div 
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="flex justify-center"
                                >
                                    <a
                                        href={pdfUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-3 px-8 py-4 bg-royal text-gold rounded-full font-bold text-lg hover:bg-royal-dark transition-all shadow-lg hover:shadow-royal/20 hover:-translate-y-1"
                                    >
                                        <Download size={24} />
                                        Download Fees Structure PDF
                                    </a>
                                </motion.div>

                                <div className="text-center text-slate-500 max-w-lg mx-auto mt-8">
                                    <p>Click the button above to view and download the official fees structure for this session.</p>
                                </div>
                            </div>
                        ) : (
                            <div className="py-12 bg-slate-50 rounded-xl border border-dashed border-slate-300">
                                <FileText size={48} className="mx-auto text-slate-300 mb-4" />
                                <p className="text-slate-500 font-medium">Fees structure has not been uploaded yet.</p>
                                <p className="text-slate-400 text-sm">Please contact the school office for details.</p>
                            </div>
                        )}
                    </div>
                </div>
            </Section>
        </div>
    );
}
