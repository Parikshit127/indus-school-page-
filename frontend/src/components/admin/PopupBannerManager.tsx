import { useState, useEffect, useRef } from 'react';
import { Plus, Trash2, ToggleLeft, ToggleRight, Image, X, Upload, Save } from 'lucide-react';

interface BannerImage {
    url: string;
    publicId?: string;
}

interface PopupBanner {
    _id: string;
    title: string;
    images: BannerImage[];
    isActive: boolean;
    displayOrder: number;
    startDate: string;
    endDate?: string;
}

export function PopupBannerManager() {
    const [banners, setBanners] = useState<PopupBanner[]>([]);
    const [loading, setLoading] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [editingBanner, setEditingBanner] = useState<PopupBanner | null>(null);

    // Form state
    const [title, setTitle] = useState('');
    const [isActive, setIsActive] = useState(true);
    const [displayOrder, setDisplayOrder] = useState(0);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [existingImages, setExistingImages] = useState<BannerImage[]>([]);
    const [newImages, setNewImages] = useState<File[]>([]);
    const [previewUrls, setPreviewUrls] = useState<string[]>([]);
    const [saving, setSaving] = useState(false);

    const fileInputRef = useRef<HTMLInputElement>(null);
    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:4000';

    const fetchBanners = async () => {
        try {
            setLoading(true);
            const res = await fetch(`${apiUrl}/api/popup-banners`);
            if (res.ok) {
                const data = await res.json();
                setBanners(data);
            }
        } catch (error) {
            console.error('Failed to fetch banners:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBanners();
    }, []);

    const resetForm = () => {
        setTitle('');
        setIsActive(true);
        setDisplayOrder(0);
        setStartDate('');
        setEndDate('');
        setExistingImages([]);
        setNewImages([]);
        setPreviewUrls([]);
        setEditingBanner(null);
    };

    const handleEdit = (banner: PopupBanner) => {
        setEditingBanner(banner);
        setTitle(banner.title);
        setIsActive(banner.isActive);
        setDisplayOrder(banner.displayOrder);
        setStartDate(banner.startDate ? new Date(banner.startDate).toISOString().split('T')[0] : '');
        setEndDate(banner.endDate ? new Date(banner.endDate).toISOString().split('T')[0] : '');
        setExistingImages(banner.images || []);
        setNewImages([]);
        setPreviewUrls([]);
        setShowForm(true);
    };

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        setNewImages(prev => [...prev, ...files]);

        // Create preview URLs
        files.forEach(file => {
            const reader = new FileReader();
            reader.onload = (e) => {
                setPreviewUrls(prev => [...prev, e.target?.result as string]);
            };
            reader.readAsDataURL(file);
        });
    };

    const removeExistingImage = (index: number) => {
        setExistingImages(prev => prev.filter((_, i) => i !== index));
    };

    const removeNewImage = (index: number) => {
        setNewImages(prev => prev.filter((_, i) => i !== index));
        setPreviewUrls(prev => prev.filter((_, i) => i !== index));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);

        try {
            const formData = new FormData();
            formData.append('title', title);
            formData.append('isActive', String(isActive));
            formData.append('displayOrder', String(displayOrder));
            if (startDate) formData.append('startDate', startDate);
            if (endDate) formData.append('endDate', endDate);
            formData.append('existingImages', JSON.stringify(existingImages));

            newImages.forEach(file => {
                formData.append('images', file);
            });

            const url = editingBanner
                ? `${apiUrl}/api/popup-banners/${editingBanner._id}`
                : `${apiUrl}/api/popup-banners`;

            const res = await fetch(url, {
                method: editingBanner ? 'PUT' : 'POST',
                body: formData
            });

            if (res.ok) {
                fetchBanners();
                setShowForm(false);
                resetForm();
            } else {
                const error = await res.json();
                alert(error.error || 'Failed to save banner');
            }
        } catch (error) {
            console.error('Error saving banner:', error);
            alert('Failed to save banner');
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this banner?')) return;

        try {
            const res = await fetch(`${apiUrl}/api/popup-banners/${id}`, {
                method: 'DELETE'
            });
            if (res.ok) {
                fetchBanners();
            }
        } catch (error) {
            console.error('Error deleting banner:', error);
        }
    };

    const handleToggle = async (id: string) => {
        try {
            const res = await fetch(`${apiUrl}/api/popup-banners/${id}/toggle`, {
                method: 'PATCH'
            });
            if (res.ok) {
                fetchBanners();
            }
        } catch (error) {
            console.error('Error toggling banner:', error);
        }
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-royal">Popup Banners</h2>
                    <p className="text-slate-500 text-sm">Manage popup banners that appear when visitors open the website</p>
                </div>
                <button
                    onClick={() => { resetForm(); setShowForm(true); }}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-royal text-white rounded-lg hover:bg-royal-light transition-colors"
                >
                    <Plus size={18} /> Add Banner
                </button>
            </div>

            {/* Banner List */}
            {loading ? (
                <div className="text-center py-12 text-slate-500">Loading banners...</div>
            ) : banners.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-xl border border-slate-200">
                    <Image className="w-12 h-12 mx-auto text-slate-300 mb-3" />
                    <p className="text-slate-500">No popup banners yet</p>
                    <p className="text-sm text-slate-400">Click "Add Banner" to create one</p>
                </div>
            ) : (
                <div className="grid gap-4">
                    {banners.map(banner => (
                        <div key={banner._id} className="bg-white rounded-xl border border-slate-200 p-4 flex flex-col sm:flex-row gap-4">
                            {/* Preview Image */}
                            <div className="w-full sm:w-32 h-24 bg-slate-100 rounded-lg overflow-hidden shrink-0">
                                {banner.images?.[0] ? (
                                    <img src={banner.images[0].url} alt={banner.title} className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-slate-300">
                                        <Image size={24} />
                                    </div>
                                )}
                            </div>

                            {/* Info */}
                            <div className="flex-1 min-w-0">
                                <h3 className="font-bold text-royal truncate">{banner.title}</h3>
                                <p className="text-sm text-slate-500">{banner.images?.length || 0} image(s)</p>
                                <div className="flex items-center gap-2 mt-2">
                                    <span className={`text-xs px-2 py-0.5 rounded-full ${banner.isActive ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-500'}`}>
                                        {banner.isActive ? 'Active' : 'Inactive'}
                                    </span>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex sm:flex-col gap-2 shrink-0">
                                <button
                                    onClick={() => handleToggle(banner._id)}
                                    className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                                    title={banner.isActive ? 'Deactivate' : 'Activate'}
                                >
                                    {banner.isActive ? <ToggleRight className="text-green-600" size={20} /> : <ToggleLeft className="text-slate-400" size={20} />}
                                </button>
                                <button
                                    onClick={() => handleEdit(banner)}
                                    className="p-2 hover:bg-slate-100 rounded-lg text-royal transition-colors"
                                    title="Edit"
                                >
                                    <Save size={18} />
                                </button>
                                <button
                                    onClick={() => handleDelete(banner._id)}
                                    className="p-2 hover:bg-red-50 rounded-lg text-red-500 transition-colors"
                                    title="Delete"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Form Modal */}
            {showForm && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto">
                    <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                        <div className="p-6 border-b border-slate-200 flex justify-between items-center sticky top-0 bg-white">
                            <h3 className="text-xl font-bold text-royal">
                                {editingBanner ? 'Edit Banner' : 'Add New Banner'}
                            </h3>
                            <button onClick={() => { setShowForm(false); resetForm(); }} className="p-2 hover:bg-slate-100 rounded-full">
                                <X size={20} />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-6 space-y-6">
                            {/* Title */}
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Title *</label>
                                <input
                                    type="text"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    required
                                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-royal/20 focus:border-royal"
                                    placeholder="e.g., Admission Open 2025-26"
                                />
                            </div>

                            {/* Images */}
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">Images *</label>

                                {/* Existing Images */}
                                {existingImages.length > 0 && (
                                    <div className="grid grid-cols-3 gap-3 mb-3">
                                        {existingImages.map((img, idx) => (
                                            <div key={idx} className="relative aspect-square rounded-lg overflow-hidden bg-slate-100">
                                                <img src={img.url} alt="" className="w-full h-full object-cover" />
                                                <button
                                                    type="button"
                                                    onClick={() => removeExistingImage(idx)}
                                                    className="absolute top-1 right-1 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center"
                                                >
                                                    <X size={14} />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {/* New Image Previews */}
                                {previewUrls.length > 0 && (
                                    <div className="grid grid-cols-3 gap-3 mb-3">
                                        {previewUrls.map((url, idx) => (
                                            <div key={idx} className="relative aspect-square rounded-lg overflow-hidden bg-slate-100 border-2 border-dashed border-royal">
                                                <img src={url} alt="" className="w-full h-full object-cover" />
                                                <button
                                                    type="button"
                                                    onClick={() => removeNewImage(idx)}
                                                    className="absolute top-1 right-1 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center"
                                                >
                                                    <X size={14} />
                                                </button>
                                                <span className="absolute bottom-1 left-1 text-[10px] bg-royal text-white px-1 rounded">New</span>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {/* Upload Button */}
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    onChange={handleFileSelect}
                                    accept="image/*"
                                    multiple
                                    className="hidden"
                                />
                                <button
                                    type="button"
                                    onClick={() => fileInputRef.current?.click()}
                                    className="w-full py-8 border-2 border-dashed border-slate-300 rounded-xl flex flex-col items-center gap-2 hover:border-royal hover:bg-royal/5 transition-colors"
                                >
                                    <Upload className="text-slate-400" size={24} />
                                    <span className="text-sm text-slate-500">Click to upload images</span>
                                </button>
                            </div>

                            {/* Date Range */}
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Start Date</label>
                                    <input
                                        type="date"
                                        value={startDate}
                                        onChange={(e) => setStartDate(e.target.value)}
                                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-royal/20 focus:border-royal"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">End Date (optional)</label>
                                    <input
                                        type="date"
                                        value={endDate}
                                        onChange={(e) => setEndDate(e.target.value)}
                                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-royal/20 focus:border-royal"
                                    />
                                </div>
                            </div>

                            {/* Active & Order */}
                            <div className="flex items-center gap-6">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={isActive}
                                        onChange={(e) => setIsActive(e.target.checked)}
                                        className="w-4 h-4 text-royal rounded"
                                    />
                                    <span className="text-sm font-medium text-slate-700">Active</span>
                                </label>
                                <div className="flex items-center gap-2">
                                    <label className="text-sm font-medium text-slate-700">Order:</label>
                                    <input
                                        type="number"
                                        value={displayOrder}
                                        onChange={(e) => setDisplayOrder(parseInt(e.target.value) || 0)}
                                        className="w-20 px-2 py-1 border border-slate-300 rounded-lg text-sm"
                                    />
                                </div>
                            </div>

                            {/* Submit */}
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
                                    disabled={saving || !title || (existingImages.length === 0 && newImages.length === 0)}
                                    className="flex-1 py-2.5 bg-royal text-white rounded-lg hover:bg-royal-light transition-colors disabled:opacity-50"
                                >
                                    {saving ? 'Saving...' : (editingBanner ? 'Update Banner' : 'Create Banner')}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
