import { useState, useEffect } from "react";
import { Save, Loader2, Image as ImageIcon, Megaphone, Calendar, Users, Trophy, GraduationCap } from "lucide-react";
import { motion } from "framer-motion";

interface HeroContent {
    mediaType: 'image' | 'video';
    mediaUrl: string;
    announcement: {
        text: string;
        isActive: boolean;
        link: string;
    };
    admission: {
        deadline: string;
        gradesOpen: string;
        ctaText: string;
    };
    stats: {
        years: number;
        students: number;
        teachers: number;
        boardResults: string;
    };
}

export function ContentEditor() {
    const [content, setContent] = useState<HeroContent | null>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    useEffect(() => {
        fetchContent();
    }, []);

    const fetchContent = async () => {
        try {
            const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:4000';
            const response = await fetch(`${apiUrl}/api/content/hero`);
            if (response.ok) {
                const data = await response.json();
                setContent(data);
            }
        } catch (error) {
            console.error("Failed to fetch content", error);
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async () => {
        if (!content) return;
        setSaving(true);
        setMessage(null);

        try {
            const token = localStorage.getItem("adminToken");
            const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:4000';

            const response = await fetch(`${apiUrl}/api/content/hero`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(content)
            });

            if (response.ok) {
                setMessage({ type: 'success', text: 'Content updated successfully!' });

                // Refresh content to ensure sync
                const updated = await response.json();
                setContent(updated);
            } else {
                throw new Error('Failed to update');
            }
        } catch (error) {
            setMessage({ type: 'error', text: 'Failed to save changes.' });
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div className="p-8 text-center text-slate-500">Loading editor...</div>;
    if (!content) return <div className="p-8 text-center text-red-500">Error loading content.</div>;

    return (
        <div className="max-w-4xl mx-auto pb-12">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h2 className="text-2xl font-serif font-bold text-royal">Hero Section Manager</h2>
                    <p className="text-slate-500">Customize the first impression of your website</p>
                </div>
                <button
                    onClick={handleSave}
                    disabled={saving}
                    className="flex items-center gap-2 px-6 py-2.5 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors disabled:opacity-50"
                >
                    {saving ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
                    <span>{saving ? 'Saving...' : 'Save Changes'}</span>
                </button>
            </div>

            {message && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`p-4 rounded-lg mb-6 ${message.type === 'success' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'
                        }`}
                >
                    {message.text}
                </motion.div>
            )}

            <div className="space-y-6">
                {/* Media Section */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                    <div className="flex items-center gap-2 mb-4 text-royal font-bold border-b border-slate-100 pb-2">
                        <ImageIcon size={20} />
                        <h3>Hero Media</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Media Type</label>
                            <div className="flex gap-4">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="radio"
                                        checked={content.mediaType === 'image'}
                                        onChange={() => setContent({ ...content, mediaType: 'image' })}
                                        className="text-royal focus:ring-royal"
                                    />
                                    <span>Image</span>
                                </label>
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="radio"
                                        checked={content.mediaType === 'video'}
                                        onChange={() => setContent({ ...content, mediaType: 'video' })}
                                        className="text-royal focus:ring-royal"
                                    />
                                    <span>Video</span>
                                </label>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Media URL</label>
                            <input
                                type="text"
                                value={content.mediaUrl}
                                onChange={(e) => setContent({ ...content, mediaUrl: e.target.value })}
                                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-royal/20 focus:border-royal outline-none"
                                placeholder="https://example.com/image.jpg"
                            />
                            <p className="text-xs text-slate-400 mt-1">Use a high-quality hosted image/video link</p>
                        </div>
                    </div>
                </div>

                {/* Announcement Section */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                    <div className="flex items-center gap-2 mb-4 text-royal font-bold border-b border-slate-100 pb-2">
                        <Megaphone size={20} />
                        <h3>Announcement Bar</h3>
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                checked={content.announcement.isActive}
                                onChange={(e) => setContent({
                                    ...content,
                                    announcement: { ...content.announcement, isActive: e.target.checked }
                                })}
                                id="announce-active"
                                className="w-4 h-4 text-royal rounded border-slate-300 focus:ring-royal"
                            />
                            <label htmlFor="announce-active" className="text-sm font-medium text-slate-700">Show Announcement Bar</label>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">Announcement Text</label>
                                <input
                                    type="text"
                                    value={content.announcement.text}
                                    onChange={(e) => setContent({
                                        ...content,
                                        announcement: { ...content.announcement, text: e.target.value }
                                    })}
                                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-royal/20 focus:border-royal outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">Link (Optional)</label>
                                <input
                                    type="text"
                                    value={content.announcement.link}
                                    onChange={(e) => setContent({
                                        ...content,
                                        announcement: { ...content.announcement, link: e.target.value }
                                    })}
                                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-royal/20 focus:border-royal outline-none"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Admission Check Section */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                    <div className="flex items-center gap-2 mb-4 text-royal font-bold border-b border-slate-100 pb-2">
                        <Calendar size={20} />
                        <h3>Admission CTA</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Deadline Text</label>
                            <input
                                type="text"
                                value={content.admission.deadline}
                                onChange={(e) => setContent({
                                    ...content,
                                    admission: { ...content.admission, deadline: e.target.value }
                                })}
                                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-royal/20 focus:border-royal outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Grades Open</label>
                            <input
                                type="text"
                                value={content.admission.gradesOpen}
                                onChange={(e) => setContent({
                                    ...content,
                                    admission: { ...content.admission, gradesOpen: e.target.value }
                                })}
                                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-royal/20 focus:border-royal outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">CTA Button Text</label>
                            <input
                                type="text"
                                value={content.admission.ctaText}
                                onChange={(e) => setContent({
                                    ...content,
                                    admission: { ...content.admission, ctaText: e.target.value }
                                })}
                                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-royal/20 focus:border-royal outline-none"
                            />
                        </div>
                    </div>
                </div>

                {/* Live Stats Section */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                    <div className="flex items-center gap-2 mb-4 text-royal font-bold border-b border-slate-100 pb-2">
                        <Trophy size={20} />
                        <h3>Live Counters</h3>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2"><Trophy size={16} className="inline mr-1" /> Years</label>
                            <input
                                type="number"
                                value={content.stats.years}
                                onChange={(e) => setContent({
                                    ...content,
                                    stats: { ...content.stats, years: parseInt(e.target.value) || 0 }
                                })}
                                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-royal/20 focus:border-royal outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2"><Users size={16} className="inline mr-1" /> Students</label>
                            <input
                                type="number"
                                value={content.stats.students}
                                onChange={(e) => setContent({
                                    ...content,
                                    stats: { ...content.stats, students: parseInt(e.target.value) || 0 }
                                })}
                                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-royal/20 focus:border-royal outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2"><GraduationCap size={16} className="inline mr-1" /> Teachers</label>
                            <input
                                type="number"
                                value={content.stats.teachers}
                                onChange={(e) => setContent({
                                    ...content,
                                    stats: { ...content.stats, teachers: parseInt(e.target.value) || 0 }
                                })}
                                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-royal/20 focus:border-royal outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2"><Trophy size={16} className="inline mr-1" /> Results</label>
                            <input
                                type="text"
                                value={content.stats.boardResults}
                                onChange={(e) => setContent({
                                    ...content,
                                    stats: { ...content.stats, boardResults: e.target.value }
                                })}
                                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-royal/20 focus:border-royal outline-none"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
