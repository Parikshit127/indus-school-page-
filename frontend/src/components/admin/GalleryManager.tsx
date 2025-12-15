import { useState, useEffect } from "react";
import { Plus, Trash2, Edit2, Image as ImageIcon, Youtube, Loader2, Save, X } from "lucide-react";
import { motion } from "framer-motion";

interface GalleryItem {
    _id: string;
    type: 'photo' | 'video';
    url: string;
    title: string;
    category?: string;
}

export function GalleryManager() {
    const [activeTab, setActiveTab] = useState<'photos' | 'videos'>('photos');
    const [items, setItems] = useState<GalleryItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const [newVideoUrl, setNewVideoUrl] = useState('');
    const [newVideoTitle, setNewVideoTitle] = useState('');
    const [newPhotoTitle, setNewPhotoTitle] = useState('');
    const [editingItem, setEditingItem] = useState<GalleryItem | null>(null);

    useEffect(() => {
        fetchItems();
    }, [activeTab]);

    const fetchItems = async () => {
        setLoading(true);
        try {
            const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:4000';
            const response = await fetch(`${apiUrl}/api/gallery?type=${activeTab === 'photos' ? 'photo' : 'video'}`);
            if (response.ok) {
                const data = await response.json();
                setItems(data);
            }
        } catch (error) {
            console.error("Failed to fetch gallery items", error);
        } finally {
            setLoading(false);
        }
    };

    const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploading(true);
        const formData = new FormData();
        formData.append('file', file);

        try {
            const token = localStorage.getItem("adminToken");
            const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:4000';

            // 1. Upload File
            const uploadResponse = await fetch(`${apiUrl}/api/upload`, {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${token}` },
                body: formData
            });

            if (!uploadResponse.ok) throw new Error('Upload failed');
            const uploadData = await uploadResponse.json();

            // 2. Save Gallery Item
            const itemResponse = await fetch(`${apiUrl}/api/gallery`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    type: 'photo',
                    url: uploadData.url,
                    title: newPhotoTitle || 'New Photo'
                })
            });

            if (itemResponse.ok) {
                setNewPhotoTitle('');
                fetchItems(); // Refresh
            }
        } catch (error) {
            console.error('Error adding photo:', error);
            alert('Failed to add photo');
        } finally {
            setUploading(false);
        }
    };

    const handleAddVideo = async () => {
        if (!newVideoUrl) return;

        try {
            const token = localStorage.getItem("adminToken");
            const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:4000';

            // Convert regular YouTube link to embed if needed, or just save as is
            // Simple check to ensure it's a valid-ish URL
            let embedUrl = newVideoUrl;
            if (newVideoUrl.includes('watch?v=')) {
                embedUrl = newVideoUrl.replace('watch?v=', 'embed/');
            } else if (newVideoUrl.includes('youtu.be/')) {
                embedUrl = newVideoUrl.replace('youtu.be/', 'www.youtube.com/embed/');
            }

            const response = await fetch(`${apiUrl}/api/gallery`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    type: 'video',
                    url: embedUrl,
                    title: newVideoTitle || 'New Video'
                })
            });

            if (response.ok) {
                setNewVideoUrl('');
                setNewVideoTitle('');
                fetchItems();
            }
        } catch (error) {
            console.error('Error adding video:', error);
            alert('Failed to add video');
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this item?')) return;

        try {
            const token = localStorage.getItem("adminToken");
            const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:4000';
            await fetch(`${apiUrl}/api/gallery/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            setItems(items.filter(item => item._id !== id));
        } catch (error) {
            console.error('Failed to delete:', error);
        }
    };

    const handleEditStart = (item: GalleryItem) => {
        setEditingItem(item);
        if (item.type === 'video') {
            setNewVideoTitle(item.title);
            setNewVideoUrl(item.url);
        } else {
            setNewPhotoTitle(item.title);
        }
    };

    const handleCancelEdit = () => {
        setEditingItem(null);
        setNewVideoTitle('');
        setNewVideoUrl('');
        setNewPhotoTitle('');
    };

    const handleUpdate = async () => {
        if (!editingItem) return;

        try {
            const token = localStorage.getItem("adminToken");
            const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:4000';

            let updateData: Partial<GalleryItem> = {
                title: editingItem.type === 'photo' ? newPhotoTitle : newVideoTitle
            };

            if (editingItem.type === 'video' && newVideoUrl !== editingItem.url) {
                let embedUrl = newVideoUrl;
                if (newVideoUrl.includes('watch?v=')) {
                    embedUrl = newVideoUrl.replace('watch?v=', 'embed/');
                } else if (newVideoUrl.includes('youtu.be/')) {
                    embedUrl = newVideoUrl.replace('youtu.be/', 'www.youtube.com/embed/');
                }
                updateData.url = embedUrl;
            }

            const response = await fetch(`${apiUrl}/api/gallery/${editingItem._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(updateData)
            });

            if (response.ok) {
                const updated = await response.json();
                setItems(items.map(i => i._id === updated._id ? updated : i)); // Update in list
                handleCancelEdit();
            }
        } catch (error) {
            console.error('Update failed:', error);
            alert('Failed to update item');
        }
    };

    return (
        <div className="max-w-6xl mx-auto pb-8 md:pb-12">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 md:mb-8 gap-4">
                <div>
                    <h2 className="text-xl md:text-2xl font-serif font-bold text-royal">Gallery Manager</h2>
                    <p className="text-sm md:text-base text-slate-500">Manage photos and videos</p>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-2 md:gap-4 mb-6 md:mb-8 border-b border-slate-200">
                <button
                    onClick={() => setActiveTab('photos')}
                    className={`pb-2 md:pb-3 px-3 md:px-4 text-xs md:text-sm font-medium transition-colors relative ${activeTab === 'photos' ? 'text-royal' : 'text-slate-500 hover:text-slate-700'}`}
                >
                    <div className="flex items-center gap-1.5 md:gap-2">
                        <ImageIcon size={16} className="md:hidden" />
                        <ImageIcon size={18} className="hidden md:block" />
                        Photos
                    </div>
                    {activeTab === 'photos' && <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-royal" />}
                </button>
                <button
                    onClick={() => setActiveTab('videos')}
                    className={`pb-2 md:pb-3 px-3 md:px-4 text-xs md:text-sm font-medium transition-colors relative ${activeTab === 'videos' ? 'text-royal' : 'text-slate-500 hover:text-slate-700'}`}
                >
                    <div className="flex items-center gap-1.5 md:gap-2">
                        <Youtube size={16} className="md:hidden" />
                        <Youtube size={18} className="hidden md:block" />
                        Videos
                    </div>
                    {activeTab === 'videos' && <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-royal" />}
                </button>
            </div>

            <div className="bg-white p-4 md:p-6 rounded-xl shadow-sm border border-slate-200 min-h-[300px] md:min-h-[400px]">
                {/* Actions Area */}
                <div className="mb-6 md:mb-8 p-3 md:p-4 bg-slate-50 rounded-lg border border-slate-200">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-3 md:mb-4 gap-2">
                        <h3 className="text-xs md:text-sm font-bold text-slate-700 uppercase tracking-wider">
                            {editingItem
                                ? `Edit ${editingItem.type === 'photo' ? 'Photo' : 'Video'}`
                                : (activeTab === 'photos' ? 'Add New Photo' : 'Add New Video')
                            }
                        </h3>
                        {editingItem && (
                            <button onClick={handleCancelEdit} className="text-xs text-red-500 flex items-center gap-1 hover:underline">
                                <X size={14} /> Cancel Edit
                            </button>
                        )}
                    </div>

                    {activeTab === 'photos' ? (
                        <div className="flex flex-col gap-3 md:gap-4">
                            <div className="w-full">
                                <label className="block text-xs font-medium text-slate-500 mb-1">Photo Title (Optional)</label>
                                <input
                                    type="text"
                                    value={newPhotoTitle}
                                    onChange={(e) => setNewPhotoTitle(e.target.value)}
                                    placeholder="e.g. Annual Sports Day"
                                    className="w-full px-3 py-2.5 border border-slate-300 rounded focus:ring-1 focus:ring-royal outline-none bg-white text-sm"
                                />
                            </div>
                            <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3">
                                {editingItem ? (
                                    <button
                                        onClick={handleUpdate}
                                        className="w-full md:w-auto px-4 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
                                    >
                                        <Save size={18} /> Update
                                    </button>
                                ) : (
                                    <label className="flex items-center justify-center gap-2 px-4 py-2.5 bg-royal text-white rounded-lg cursor-pointer hover:bg-royal-dark transition-colors">
                                        {uploading ? <Loader2 className="animate-spin" size={20} /> : <Plus size={20} />}
                                        <span>{uploading ? 'Uploading...' : 'Upload Photo'}</span>
                                        <input type="file" className="hidden" accept="image/*" onChange={handlePhotoUpload} disabled={uploading} />
                                    </label>
                                )}
                                <span className="text-xs text-slate-400 text-center md:text-left">Supports JPG, PNG, WEBP</span>
                            </div>
                        </div>
                    ) : (
                        <div className="flex flex-col gap-3 md:gap-4">
                            <div className="w-full">
                                <label className="block text-xs font-medium text-slate-500 mb-1">YouTube URL</label>
                                <input
                                    type="text"
                                    value={newVideoUrl}
                                    onChange={(e) => setNewVideoUrl(e.target.value)}
                                    placeholder="https://youtube.com/watch?v=..."
                                    className="w-full px-3 py-2.5 border border-slate-300 rounded focus:ring-1 focus:ring-royal outline-none text-sm"
                                />
                            </div>
                            <div className="w-full">
                                <label className="block text-xs font-medium text-slate-500 mb-1">Video Title</label>
                                <input
                                    type="text"
                                    value={newVideoTitle}
                                    onChange={(e) => setNewVideoTitle(e.target.value)}
                                    placeholder="My Awesome Video"
                                    className="w-full px-3 py-2.5 border border-slate-300 rounded focus:ring-1 focus:ring-royal outline-none text-sm"
                                />
                            </div>
                            <button
                                onClick={editingItem ? handleUpdate : handleAddVideo}
                                disabled={!newVideoUrl}
                                className={`w-full md:w-auto px-4 py-2.5 text-white rounded-lg transition-colors flex items-center justify-center gap-2 ${editingItem ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'}`}
                            >
                                {editingItem ? <Save size={18} /> : <Plus size={18} />}
                                {editingItem ? 'Update Video' : 'Add Video'}
                            </button>
                        </div>
                    )}
                </div>

                {/* Grid */}
                {loading ? (
                    <div className="flex justify-center items-center h-40 text-slate-400 text-sm">Loading...</div>
                ) : items.length === 0 ? (
                    <div className="text-center py-8 md:py-12 text-slate-400 italic text-sm">No items found. Add some!</div>
                ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
                        {items.map((item) => (
                            <div key={item._id} className="group flex flex-col bg-white rounded-lg overflow-hidden border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                                <div className="relative aspect-video bg-slate-100">
                                    {item.type === 'photo' ? (
                                        <img src={item.url} alt={item.title} className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="w-full h-full bg-black flex items-center justify-center relative">
                                            <img
                                                src={`https://img.youtube.com/vi/${item.url.split('/embed/')[1]?.split('?')[0]}/0.jpg`}
                                                alt={item.title}
                                                className="w-full h-full object-cover opacity-80"
                                                onError={(e) => {
                                                    (e.target as HTMLImageElement).src = 'https://via.placeholder.com/320x180?text=Video';
                                                }}
                                            />
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <Youtube size={24} className="md:w-8 md:h-8 text-white drop-shadow-lg" />
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className="p-2 md:p-3 border-t border-slate-100">
                                    <p className="text-xs md:text-sm font-medium text-slate-700 truncate mb-2 md:mb-3" title={item.title}>
                                        {item.title || (item.type === 'photo' ? 'Untitled Photo' : 'Untitled Video')}
                                    </p>
                                    <div className="flex gap-1 md:gap-2">
                                        <button
                                            onClick={() => handleEditStart(item)}
                                            className="flex-1 flex items-center justify-center gap-1 p-1.5 md:p-2 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors text-[10px] md:text-xs font-medium"
                                            title="Edit"
                                        >
                                            <Edit2 size={12} className="md:w-3.5 md:h-3.5" />
                                            <span className="hidden sm:inline">Edit</span>
                                        </button>
                                        <button
                                            onClick={() => handleDelete(item._id)}
                                            className="flex-1 flex items-center justify-center gap-1 p-1.5 md:p-2 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg transition-colors text-[10px] md:text-xs font-medium"
                                            title="Delete"
                                        >
                                            <Trash2 size={12} className="md:w-3.5 md:h-3.5" />
                                            <span className="hidden sm:inline">Delete</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
