import { useState, useEffect } from 'react';
import { Plus, Trash2, ToggleLeft, ToggleRight, X, Edit, Megaphone, Bell, Calendar, Award } from 'lucide-react';

interface Announcement {
    _id: string;
    text: string;
    type: 'admission' | 'event' | 'achievement' | 'notice' | 'other';
    link?: string;
    isActive: boolean;
    order: number;
}

export function AnnouncementManager() {
    const [announcements, setAnnouncements] = useState<Announcement[]>([]);
    const [loading, setLoading] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [editingAnnouncement, setEditingAnnouncement] = useState<Announcement | null>(null);

    // Form state
    const [text, setText] = useState('');
    const [type, setType] = useState('notice');
    const [link, setLink] = useState('');
    const [isActive, setIsActive] = useState(true);
    const [order, setOrder] = useState(0);
    const [saving, setSaving] = useState(false);

    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:4000';

    const fetchAnnouncements = async () => {
        try {
            setLoading(true);
            const res = await fetch(`${apiUrl}/api/announcements/all`);
            if (res.ok) {
                const data = await res.json();
                setAnnouncements(data);
            }
        } catch (error) {
            console.error('Failed to fetch announcements:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAnnouncements();
    }, []);

    const resetForm = () => {
        setText('');
        setType('notice');
        setLink('');
        setIsActive(true);
        setOrder(0);
        setEditingAnnouncement(null);
    };

    const handleEdit = (announcement: Announcement) => {
        setEditingAnnouncement(announcement);
        setText(announcement.text);
        setType(announcement.type);
        setLink(announcement.link || '');
        setIsActive(announcement.isActive);
        setOrder(announcement.order);
        setShowForm(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);

        try {
            const payload = { text, type, link, isActive, order };
            const url = editingAnnouncement
                ? `${apiUrl}/api/announcements/${editingAnnouncement._id}`
                : `${apiUrl}/api/announcements`;

            const res = await fetch(url, {
                method: editingAnnouncement ? 'PATCH' : 'POST', // Backend users PATCH for updates
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (res.ok) {
                fetchAnnouncements();
                setShowForm(false);
                resetForm();
            } else {
                const error = await res.json();
                alert(error.message || 'Failed to save announcement');
            }
        } catch (error) {
            console.error('Error saving announcement:', error);
            alert('Failed to save announcement');
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this announcement?')) return;

        try {
            const res = await fetch(`${apiUrl}/api/announcements/${id}`, {
                method: 'DELETE'
            });
            if (res.ok) {
                fetchAnnouncements();
            }
        } catch (error) {
            console.error('Error deleting announcement:', error);
        }
    };

    const handleToggle = async (id: string, currentStatus: boolean) => {
        try {
            const res = await fetch(`${apiUrl}/api/announcements/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ isActive: !currentStatus })
            });
            if (res.ok) {
                fetchAnnouncements();
            }
        } catch (error) {
            console.error('Error toggling announcement:', error);
        }
    };

    const getIcon = (type: string) => {
        switch (type) {
            case 'admission': return <Bell size={18} className="text-royal" />;
            case 'event': return <Calendar size={18} className="text-orange-500" />;
            case 'achievement': return <Award size={18} className="text-gold" />;
            case 'notice': return <Megaphone size={18} className="text-blue-500" />;
            default: return <Megaphone size={18} className="text-slate-400" />;
        }
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-royal">Announcements Ticker</h2>
                    <p className="text-slate-500 text-sm">Manage the scrolling announcements on the homepage</p>
                </div>
                <button
                    onClick={() => { resetForm(); setShowForm(true); }}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-royal text-white rounded-lg hover:bg-royal-light transition-colors"
                >
                    <Plus size={18} /> Add Announcement
                </button>
            </div>

            {/* List */}
            {loading ? (
                <div className="text-center py-12 text-slate-500">Loading announcements...</div>
            ) : announcements.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-xl border border-slate-200">
                    <Megaphone className="w-12 h-12 mx-auto text-slate-300 mb-3" />
                    <p className="text-slate-500">No announcements yet</p>
                    <p className="text-sm text-slate-400">Click "Add Announcement" to create one</p>
                </div>
            ) : (
                <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-slate-50 border-b border-slate-200">
                                <tr>
                                    <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase">Announcement</th>
                                    <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase">Type</th>
                                    <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase">Status</th>
                                    <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase">Order</th>
                                    <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {announcements.map((item) => (
                                    <tr key={item._id} className="hover:bg-slate-50 transition-colors">
                                        <td className="px-6 py-4">
                                            <p className="font-medium text-slate-900 line-clamp-2">{item.text}</p>
                                            {item.link && <p className="text-xs text-blue-500 truncate max-w-xs">{item.link}</p>}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                {getIcon(item.type)}
                                                <span className="text-sm capitalize">{item.type}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <button
                                                onClick={() => handleToggle(item._id, item.isActive)}
                                                className={`text-xs px-2 py-1 rounded-full border ${item.isActive ? 'bg-green-50 text-green-600 border-green-200' : 'bg-slate-50 text-slate-500 border-slate-200'}`}
                                            >
                                                {item.isActive ? 'Active' : 'Inactive'}
                                            </button>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-slate-500">
                                            {item.order}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <button
                                                    onClick={() => handleToggle(item._id, item.isActive)}
                                                    className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                                                    title={item.isActive ? 'Deactivate' : 'Activate'}
                                                >
                                                    {item.isActive ? <ToggleRight className="text-green-600" size={18} /> : <ToggleLeft className="text-slate-400" size={18} />}
                                                </button>
                                                <button
                                                    onClick={() => handleEdit(item)}
                                                    className="p-2 hover:bg-slate-100 rounded-lg text-royal transition-colors"
                                                    title="Edit"
                                                >
                                                    <Edit size={18} />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(item._id)}
                                                    className="p-2 hover:bg-red-50 rounded-lg text-red-500 transition-colors"
                                                    title="Delete"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* Form Modal */}
            {showForm && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto">
                    <div className="bg-white rounded-2xl w-full max-w-lg">
                        <div className="p-6 border-b border-slate-200 flex justify-between items-center bg-white rounded-t-2xl">
                            <h3 className="text-xl font-bold text-royal">
                                {editingAnnouncement ? 'Edit Announcement' : 'Add Announcement'}
                            </h3>
                            <button onClick={() => { setShowForm(false); resetForm(); }} className="p-2 hover:bg-slate-100 rounded-full">
                                <X size={20} />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Result Text *</label>
                                <textarea
                                    value={text}
                                    onChange={(e) => setText(e.target.value)}
                                    required
                                    rows={3}
                                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-royal/20 focus:border-royal"
                                    placeholder="Enter the announcement text..."
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Type</label>
                                    <select
                                        value={type}
                                        onChange={(e) => setType(e.target.value)}
                                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-royal/20 focus:border-royal"
                                    >
                                        <option value="notice">Notice</option>
                                        <option value="admission">Admission</option>
                                        <option value="event">Event</option>
                                        <option value="achievement">Achievement</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Display Order</label>
                                    <input
                                        type="number"
                                        value={order}
                                        onChange={(e) => setOrder(parseInt(e.target.value) || 0)}
                                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-royal/20 focus:border-royal"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Link URL (Optional)</label>
                                <input
                                    type="text"
                                    value={link}
                                    onChange={(e) => setLink(e.target.value)}
                                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-royal/20 focus:border-royal"
                                    placeholder="e.g., /admissions"
                                />
                            </div>

                            <div className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    id="isActive"
                                    checked={isActive}
                                    onChange={(e) => setIsActive(e.target.checked)}
                                    className="w-4 h-4 text-royal rounded"
                                />
                                <label htmlFor="isActive" className="text-sm font-medium text-slate-700 cursor-pointer">
                                    Active (Visible on Homepage)
                                </label>
                            </div>

                            <div className="flex gap-3 pt-4">
                                <button
                                    type="button"
                                    onClick={() => { setShowForm(false); resetForm(); }}
                                    className="flex-1 py-2.5 border border-slate-300 text-slate-600 rounded-lg hover:bg-slate-50 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={saving || !text}
                                    className="flex-1 py-2.5 bg-royal text-white rounded-lg hover:bg-royal-light transition-colors disabled:opacity-50"
                                >
                                    {saving ? 'Saving...' : (editingAnnouncement ? 'Update' : 'Create')}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
