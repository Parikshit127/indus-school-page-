import { useState, useEffect } from "react";
import { Plus, Trash2, Save, X, Trophy, Image as ImageIcon, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Achievement {
    _id: string;
    studentName: string;
    achievement: string;
    class: string;
    category: string;
    order: number;
}

interface AchievementBanner {
    _id: string;
    title: string;
    imageUrl: string;
    order: number;
    isActive: boolean;
}

export function AchievementManager() {
    const [activeTab, setActiveTab] = useState<'table' | 'banners'>('table');
    const [loading, setLoading] = useState(false);
    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:4000';

    // Data States
    const [achievements, setAchievements] = useState<Achievement[]>([]);
    const [banners, setBanners] = useState<AchievementBanner[]>([]);

    // Form States
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        studentName: "",
        achievement: "",
        class: "",
        category: "Academic",
        order: 0
    });

    // Banner Form States
    const [bannerTitle, setBannerTitle] = useState("");
    const [bannerOrder, setBannerOrder] = useState(0);
    const [bannerImage, setBannerImage] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    useEffect(() => {
        fetchData();
    }, [activeTab]);

    const fetchData = async () => {
        setLoading(true);
        try {
            if (activeTab === 'table') {
                const res = await fetch(`${apiUrl}/api/achievements`);
                if (res.ok) setAchievements(await res.json());
            } else {
                const res = await fetch(`${apiUrl}/api/achievements/banners`);
                if (res.ok) setBanners(await res.json());
            }
        } catch (error) {
            console.error("Fetch error:", error);
        } finally {
            setLoading(false);
        }
    };

    /* --- TABLE HANDLERS --- */
    const handleAddAchievement = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await fetch(`${apiUrl}/api/achievements`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            if (res.ok) {
                setShowForm(false);
                setFormData({ studentName: "", achievement: "", class: "", category: "Academic", order: 0 });
                fetchData();
            }
        } catch (error) {
            console.error("Error adding achievement:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteAchievement = async (id: string) => {
        if (!confirm("Delete this achievement?")) return;
        setLoading(true);
        try {
            await fetch(`${apiUrl}/api/achievements/${id}`, { method: 'DELETE' });
            fetchData();
        } catch (error) {
            console.error("Error deleting achievement:", error);
        } finally {
            setLoading(false);
        }
    };

    /* --- BANNER HANDLERS --- */
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setBannerImage(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const handleAddBanner = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!bannerImage) return alert("Please select an image");

        setLoading(true);
        const data = new FormData();
        data.append('image', bannerImage);
        data.append('title', bannerTitle);
        data.append('order', bannerOrder.toString());
        data.append('isActive', 'true');

        try {
            const res = await fetch(`${apiUrl}/api/achievements/banners`, {
                method: 'POST',
                body: data
            });
            if (res.ok) {
                setShowForm(false);
                setBannerTitle("");
                setBannerImage(null);
                setPreviewUrl(null);
                fetchData();
            }
        } catch (error) {
            console.error("Error adding banner:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteBanner = async (id: string) => {
        if (!confirm("Delete this banner?")) return;
        setLoading(true);
        try {
            await fetch(`${apiUrl}/api/achievements/banners/${id}`, { method: 'DELETE' });
            fetchData();
        } catch (error) {
            console.error("Error deleting banner:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h2 className="text-2xl font-serif font-bold text-royal">Achievements Management</h2>
                    <p className="text-slate-500 text-sm">Manage the Hall of Fame table and banner slider</p>
                </div>
                <div className="flex bg-white p-1 rounded-lg border border-slate-200">
                    <button
                        onClick={() => { setActiveTab('table'); setShowForm(false); }}
                        className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${activeTab === 'table' ? 'bg-royal text-white shadow-sm' : 'text-slate-600 hover:bg-slate-50'
                            }`}
                    >
                        <Trophy size={16} className="inline mr-2" /> Hall of Fame
                    </button>
                    <button
                        onClick={() => { setActiveTab('banners'); setShowForm(false); }}
                        className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${activeTab === 'banners' ? 'bg-royal text-white shadow-sm' : 'text-slate-600 hover:bg-slate-50'
                            }`}
                    >
                        <ImageIcon size={16} className="inline mr-2" /> Banners
                    </button>
                </div>
            </div>

            {/* HEADER ACTIONS */}
            {!showForm && (
                <button
                    onClick={() => setShowForm(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-gold to-gold-dark text-royal-dark font-bold rounded-lg hover:shadow-lg transition-all"
                >
                    <Plus size={20} />
                    {activeTab === 'table' ? 'Add New Achievement' : 'Upload New Banner'}
                </button>
            )}

            {/* FORMS */}
            <AnimatePresence>
                {showForm && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm overflow-hidden"
                    >
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="font-bold text-lg text-royal">
                                {activeTab === 'table' ? 'Add Achievement Entry' : 'Upload Banner Image'}
                            </h3>
                            <button onClick={() => setShowForm(false)} className="text-slate-400 hover:text-red-500">
                                <X size={20} />
                            </button>
                        </div>

                        {activeTab === 'table' ? (
                            <form onSubmit={handleAddAchievement} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <input
                                    required
                                    placeholder="Student Name"
                                    value={formData.studentName}
                                    onChange={e => setFormData({ ...formData, studentName: e.target.value })}
                                    className="p-3 border rounded-lg focus:ring-2 focus:ring-royal/20 outline-none"
                                />
                                <input
                                    required
                                    placeholder="Achievement (e.g. Gold Medal in Skating)"
                                    value={formData.achievement}
                                    onChange={e => setFormData({ ...formData, achievement: e.target.value })}
                                    className="p-3 border rounded-lg focus:ring-2 focus:ring-royal/20 outline-none"
                                />
                                <input
                                    placeholder="Class (e.g. Class 10)"
                                    value={formData.class}
                                    onChange={e => setFormData({ ...formData, class: e.target.value })}
                                    className="p-3 border rounded-lg focus:ring-2 focus:ring-royal/20 outline-none"
                                />
                                <select
                                    value={formData.category}
                                    onChange={e => setFormData({ ...formData, category: e.target.value })}
                                    className="p-3 border rounded-lg focus:ring-2 focus:ring-royal/20 outline-none"
                                >
                                    <option value="Academic">Academic</option>
                                    <option value="Sports">Sports</option>
                                    <option value="Cultural">Cultural</option>
                                    <option value="Other">Other</option>
                                </select>
                                <input
                                    type="number"
                                    placeholder="Order Preference (0 = Top)"
                                    value={formData.order}
                                    onChange={e => setFormData({ ...formData, order: parseInt(e.target.value) })}
                                    className="p-3 border rounded-lg focus:ring-2 focus:ring-royal/20 outline-none"
                                />
                                <button disabled={loading} type="submit" className="md:col-span-2 bg-royal text-white py-3 rounded-lg font-bold hover:bg-royal-dark transition-colors flex justify-center items-center gap-2">
                                    {loading ? <Loader2 className="animate-spin" /> : <Save size={20} />}
                                    Save Entry
                                </button>
                            </form>
                        ) : (
                            <form onSubmit={handleAddBanner} className="space-y-4">
                                <input
                                    placeholder="Banner Title/Caption (Optional)"
                                    value={bannerTitle}
                                    onChange={e => setBannerTitle(e.target.value)}
                                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-royal/20 outline-none"
                                />
                                <div className="border-2 border-dashed border-slate-300 rounded-lg p-8 text-center bg-slate-50 cursor-pointer hover:bg-slate-100 transition-colors relative">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                    />
                                    {previewUrl ? (
                                        <img src={previewUrl} alt="Preview" className="max-h-48 mx-auto rounded shadow-sm" />
                                    ) : (
                                        <div className="text-slate-500">
                                            <ImageIcon className="mx-auto h-10 w-10 mb-2 opacity-50" />
                                            <p>Click to upload banner image</p>
                                        </div>
                                    )}
                                </div>
                                <input
                                    type="number"
                                    placeholder="Order Preference"
                                    value={bannerOrder}
                                    onChange={e => setBannerOrder(parseInt(e.target.value))}
                                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-royal/20 outline-none"
                                />
                                <button disabled={loading} type="submit" className="w-full bg-royal text-white py-3 rounded-lg font-bold hover:bg-royal-dark transition-colors flex justify-center items-center gap-2">
                                    {loading ? <Loader2 className="animate-spin" /> : <Save size={20} />}
                                    Upload Banner
                                </button>
                            </form>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* LISTS */}
            {loading && !showForm ? (
                <div className="py-12 text-center text-slate-500">Loading...</div>
            ) : (
                <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
                    {activeTab === 'table' ? (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm">
                                <thead className="bg-slate-50 text-slate-500 uppercase text-xs">
                                    <tr>
                                        <th className="px-6 py-4">Student</th>
                                        <th className="px-6 py-4">Achievement</th>
                                        <th className="px-6 py-4">Category</th>
                                        <th className="px-6 py-4">Order</th>
                                        <th className="px-6 py-4 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {achievements.length === 0 ? (
                                        <tr><td colSpan={5} className="px-6 py-8 text-center text-slate-400">No achievements found</td></tr>
                                    ) : (
                                        achievements.map((item) => (
                                            <tr key={item._id} className="hover:bg-slate-50">
                                                <td className="px-6 py-4 font-medium text-royal">{item.studentName}</td>
                                                <td className="px-6 py-4 text-slate-600">{item.achievement}</td>
                                                <td className="px-6 py-4">
                                                    <span className="px-2 py-1 bg-slate-100 rounded text-xs">{item.category}</span>
                                                </td>
                                                <td className="px-6 py-4 text-slate-500">{item.order}</td>
                                                <td className="px-6 py-4 text-right">
                                                    <button onClick={() => handleDeleteAchievement(item._id)} className="text-red-400 hover:text-red-600 p-2">
                                                        <Trash2 size={18} />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
                            {banners.length === 0 ? (
                                <div className="col-span-full py-12 text-center text-slate-400">No banners found</div>
                            ) : (
                                banners.map((banner) => (
                                    <div key={banner._id} className="group relative rounded-lg overflow-hidden border border-slate-200 aspect-video bg-slate-50">
                                        <img src={banner.imageUrl} alt={banner.title} className="w-full h-full object-cover" />
                                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                            <button onClick={() => handleDeleteBanner(banner._id)} className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600">
                                                <Trash2 size={20} />
                                            </button>
                                        </div>
                                        {banner.title && (
                                            <div className="absolute bottom-0 left-0 right-0 bg-black/60 p-2 text-white text-xs truncate">
                                                {banner.title}
                                            </div>
                                        )}
                                        <div className="absolute top-2 right-2 bg-white/90 px-2 py-0.5 rounded text-xs font-bold text-royal">
                                            #{banner.order}
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
