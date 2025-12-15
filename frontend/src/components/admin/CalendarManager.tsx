import { useState, useEffect } from "react";
import { Save, Upload, FileText, Loader2, Download, Trash2 } from "lucide-react";
import { motion } from "framer-motion";

export function CalendarManager() {
    const [pdfUrl, setPdfUrl] = useState("");
    const [title, setTitle] = useState("Academic Calendar"); // Default title
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    useEffect(() => {
        fetchCalendar();
    }, []);

    const fetchCalendar = async () => {
        try {
            const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:4000';
            const response = await fetch(`${apiUrl}/api/content/calendar`);
            if (response.ok) {
                const data = await response.json();
                if (data) {
                    if (data.pdfUrl) setPdfUrl(data.pdfUrl);
                    if (data.title) setTitle(data.title);
                }
            }
        } catch (error) {
            console.error("Failed to fetch calendar", error);
        } finally {
            setLoading(false);
        }
    };

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (file.type !== 'application/pdf') {
            setMessage({ type: 'error', text: 'Please upload a PDF file.' });
            return;
        }

        setUploading(true);
        setMessage(null);

        const formData = new FormData();
        formData.append('file', file);

        try {
            const token = localStorage.getItem("adminToken");
            const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:4000';

            const response = await fetch(`${apiUrl}/api/content/calendar/upload`, {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${token}` },
                body: formData
            });

            if (response.ok) {
                const data = await response.json();
                setPdfUrl(data.url);
                setMessage({ type: 'success', text: 'PDF uploaded successfully! Click Save to apply changes.' });
            } else {
                throw new Error('Upload failed');
            }
        } catch (error) {
            console.error('Upload error:', error);
            setMessage({ type: 'error', text: 'Failed to upload file.' });
        } finally {
            setUploading(false);
        }
    };

    const handleSave = async () => {
        setSaving(true);
        setMessage(null);

        try {
            const token = localStorage.getItem("adminToken");
            const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:4000';

            const response = await fetch(`${apiUrl}/api/content/calendar`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ pdfUrl, title })
            });

            if (response.ok) {
                setMessage({ type: 'success', text: 'School calendar updated successfully!' });
            } else {
                throw new Error('Failed to update');
            }
        } catch (error) {
            setMessage({ type: 'error', text: 'Failed to save changes.' });
        } finally {
            setSaving(false);
        }
    };

    const handleDeletePdf = () => {
        if (confirm("Are you sure you want to remove the PDF?")) {
            setPdfUrl("");
            setMessage({ type: 'success', text: 'PDF removed from view. Click Save Changes to confirm.' });
        }
    };

    if (loading) return <div className="p-8 text-center text-slate-500">Loading...</div>;

    return (
        <div className="max-w-4xl mx-auto pb-12">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                    <h2 className="text-xl md:text-2xl font-serif font-bold text-royal">School Calendar Manager</h2>
                    <p className="text-sm md:text-base text-slate-500">Manage the academic calendar PDF and title</p>
                </div>
                <button
                    onClick={handleSave}
                    disabled={saving}
                    className="w-full md:w-auto flex items-center justify-center gap-2 px-6 py-2.5 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors disabled:opacity-50"
                >
                    {saving ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
                    <span>{saving ? 'Saving...' : 'Save Changes'}</span>
                </button>
            </div>

            {message && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`p-4 rounded-lg mb-6 ${message.type === 'success' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'}`}
                >
                    {message.text}
                </motion.div>
            )}

            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 space-y-6">
                <div>
                     <label className="block text-sm font-bold text-royal mb-2">Calendar Title</label>
                     <input 
                        type="text" 
                        value={title} 
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-royal/20 focus:border-royal outline-none"
                        placeholder="e.g. Academic Calendar 2024-25"
                     />
                </div>

                <div className="border-t border-slate-100 pt-6">
                    <div className="flex items-center gap-2 mb-4 text-royal font-bold">
                        <FileText size={20} />
                        <h3>Calendar File</h3>
                    </div>

                <div className="space-y-6">
                    {pdfUrl ? (
                        <div className="flex flex-col md:flex-row items-start md:items-center justify-between p-4 bg-slate-50 rounded-lg border border-slate-200 gap-4">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-red-100 text-red-600 rounded">
                                    <FileText size={24} />
                                </div>
                                <div className="overflow-hidden">
                                    <p className="font-medium text-slate-700">Current Calendar PDF</p>
                                    <a 
                                        href={pdfUrl} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="text-sm text-blue-600 hover:underline truncate block max-w-[200px] md:max-w-md"
                                    >
                                        View File
                                    </a>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 w-full md:w-auto justify-end">
                                <a 
                                    href={pdfUrl} 
                                    download
                                    className="p-2 text-slate-500 hover:text-royal hover:bg-slate-200 rounded-full transition-colors"
                                    title="Download"
                                >
                                    <Download size={20} />
                                </a>
                                <button
                                    onClick={handleDeletePdf}
                                    className="p-2 text-red-500 hover:bg-red-100 rounded-full transition-colors"
                                    title="Delete PDF"
                                >
                                    <Trash2 size={20} />
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="text-center py-8 text-slate-500 bg-slate-50 rounded-lg border border-dashed border-slate-300">
                            No calendar uploaded yet.
                        </div>
                    )}

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Upload New PDF</label>
                        <label className="flex items-center justify-center gap-2 w-full px-4 py-8 bg-slate-50 text-slate-600 rounded-lg cursor-pointer border-2 border-dashed border-slate-300 hover:bg-white hover:border-royal hover:text-royal transition-all group">
                            {uploading ? <Loader2 size={24} className="animate-spin" /> : <Upload size={24} className="group-hover:scale-110 transition-transform" />}
                            <span className="font-medium">{uploading ? 'Uploading...' : 'Click to Upload PDF'}</span>
                            <input 
                                type="file" 
                                className="hidden" 
                                onChange={handleFileUpload} 
                                accept="application/pdf"
                                disabled={uploading}
                            />
                        </label>
                        <p className="text-xs text-slate-400 mt-2 text-center">Supported Format: PDF only</p>
                    </div>
                </div>
                </div>
            </div>
        </div>
    );
}
