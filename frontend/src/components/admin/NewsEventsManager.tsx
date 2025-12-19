import { useEffect, useRef, useState } from "react";
import { Plus, Trash2, Edit3, Loader2, Image as ImageIcon, Upload, Bold, Italic, List, ListOrdered, Quote } from "lucide-react";

interface NewsEvent {
    _id?: string;
    title: string;
    slug?: string;
    excerpt: string;
    content: string;
    category: "announcement" | "achievement" | "news" | "notice";
    imageUrl: string;
    date: string;
    isFeatured: boolean;
}

const emptyForm: NewsEvent = {
    title: "",
    excerpt: "",
    content: "",
    category: "news",
    imageUrl: "",
    date: new Date().toISOString().slice(0, 10),
    isFeatured: false
};

export function NewsEventsManager() {
    const [items, setItems] = useState<NewsEvent[]>([]);
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [editingItem, setEditingItem] = useState<NewsEvent | null>(null);
    const [uploadingImage, setUploadingImage] = useState(false);

    const contentRef = useRef<HTMLTextAreaElement | null>(null);

    const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:4000";
    const token = localStorage.getItem("adminToken");

    const fetchItems = async () => {
        try {
            setLoading(true);
            setError("");
            const res = await fetch(`${apiUrl}/api/news-events`);
            const data = await res.json();
            if (!res.ok) {
                throw new Error(data.error || "Failed to fetch news");
            }
            setItems(data);
        } catch (err: any) {
            setError(err.message || "Failed to fetch news");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchItems();
    }, []);

    const handleEdit = (item?: NewsEvent) => {
        if (item) {
            setEditingItem({
                ...item,
                date: item.date ? item.date.slice(0, 10) : new Date().toISOString().slice(0, 10)
            });
        } else {
            setEditingItem({ ...emptyForm });
        }
        setError("");
        setSuccess("");
    };

    const handleDelete = async (id?: string) => {
        if (!id) return;
        if (!confirm("Delete this news/event item?")) return;
        try {
            setError("");
            setSuccess("");
            const res = await fetch(`${apiUrl}/api/news-events/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const data = await res.json();
            if (!res.ok) {
                throw new Error(data.error || "Failed to delete item");
            }
            setSuccess("Item deleted");
            fetchItems();
        } catch (err: any) {
            setError(err.message || "Failed to delete item");
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!editingItem) return;

        try {
            setSaving(true);
            setError("");
            setSuccess("");

            const method = editingItem._id ? "PUT" : "POST";
            const url = editingItem._id
                ? `${apiUrl}/api/news-events/${editingItem._id}`
                : `${apiUrl}/api/news-events`;

            const res = await fetch(url, {
                method,
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    title: editingItem.title,
                    excerpt: editingItem.excerpt,
                    content: editingItem.content,
                    category: editingItem.category,
                    imageUrl: editingItem.imageUrl,
                    date: editingItem.date,
                    isFeatured: editingItem.isFeatured
                })
            });

            const data = await res.json();
            if (!res.ok) {
                throw new Error(data.error || "Failed to save item");
            }

            setSuccess("Saved successfully");
            setEditingItem(null);
            fetchItems();
        } catch (err: any) {
            setError(err.message || "Failed to save item");
        } finally {
            setSaving(false);
        }
    };

    const handleImageUpload = async (file: File) => {
        try {
            if (!editingItem) return;
            setUploadingImage(true);
            setError("");
            const formData = new FormData();
            formData.append("file", file);

            const res = await fetch(`${apiUrl}/api/upload`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`
                },
                body: formData
            });
            const data = await res.json();
            if (!res.ok) {
                throw new Error(data.error || "Image upload failed");
            }

            setEditingItem({ ...editingItem, imageUrl: data.url });
            setSuccess("Image uploaded");
        } catch (err: any) {
            setError(err.message || "Image upload failed");
        } finally {
            setUploadingImage(false);
        }
    };

    const insertFormatSnippet = (snippet: string) => {
        if (!editingItem) return;
        const textarea = contentRef.current;
        // Simple: insert at cursor position, fallback append at end
        if (textarea) {
            const start = textarea.selectionStart || 0;
            const end = textarea.selectionEnd || start;
            const current = editingItem.content || "";
            const before = current.slice(0, start);
            const after = current.slice(end);
            const nextValue = `${before}${snippet}${after}`;
            setEditingItem({ ...editingItem, content: nextValue });
            // Move cursor after inserted snippet
            requestAnimationFrame(() => {
                const pos = start + snippet.length;
                textarea.selectionStart = textarea.selectionEnd = pos;
                textarea.focus();
            });
        } else {
            setEditingItem({ ...editingItem, content: (editingItem.content || "") + snippet });
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-serif font-bold text-royal">News & Events</h1>
                    <p className="text-sm text-slate-500">
                        Manage homepage News & Events section and detailed blog-style posts.
                    </p>
                </div>
                <button
                    onClick={() => handleEdit()}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-royal text-white rounded-lg text-sm font-semibold hover:bg-royal-light transition-colors"
                >
                    <Plus className="w-4 h-4" />
                    Add News / Event
                </button>
            </div>

            {(error || success) && (
                <div className="space-y-2">
                    {error && (
                        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-2 rounded-lg text-sm">
                            {error}
                        </div>
                    )}
                    {success && (
                        <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 px-4 py-2 rounded-lg text-sm">
                            {success}
                        </div>
                    )}
                </div>
            )}

            {/* List */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100">
                <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between">
                    <h2 className="text-sm font-semibold text-slate-700 uppercase tracking-wide">
                        All News & Events
                    </h2>
                    {loading && (
                        <div className="flex items-center gap-2 text-xs text-slate-500">
                            <Loader2 className="w-3 h-3 animate-spin" />
                            Loading...
                        </div>
                    )}
                </div>

                <div className="divide-y divide-slate-100 max-h-[360px] overflow-y-auto">
                    {items.length === 0 && !loading && (
                        <div className="p-4 text-sm text-slate-500">No items yet. Add your first news/event.</div>
                    )}
                    {items.map((item) => (
                        <div key={item._id} className="px-4 py-3 flex items-start gap-3 hover:bg-slate-50/70">
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="text-xs px-2 py-0.5 rounded-full bg-royal/5 text-royal font-semibold uppercase">
                                        {item.category}
                                    </span>
                                    {item.isFeatured && (
                                        <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-amber-100 text-amber-700 font-semibold uppercase tracking-wide">
                                            Featured
                                        </span>
                                    )}
                                </div>
                                <p className="text-sm font-semibold text-royal line-clamp-1">
                                    {item.title}
                                </p>
                                <p className="text-xs text-slate-500 line-clamp-1">
                                    {item.excerpt}
                                </p>
                                <p className="text-[11px] text-slate-400 mt-1">
                                    {item.date ? new Date(item.date).toLocaleDateString("en-IN", {
                                        day: "numeric",
                                        month: "short",
                                        year: "numeric"
                                    }) : ""}
                                </p>
                            </div>
                            <div className="flex flex-col gap-1">
                                <button
                                    onClick={() => handleEdit(item)}
                                    className="p-1.5 rounded-lg border border-slate-200 text-slate-500 hover:bg-royal hover:text-white hover:border-royal transition-colors"
                                >
                                    <Edit3 className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={() => handleDelete(item._id)}
                                    className="p-1.5 rounded-lg border border-red-100 text-red-500 hover:bg-red-50 hover:border-red-200 transition-colors"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Editor Drawer / Form */}
            {editingItem && (
                <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col">
                        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
                            <h2 className="text-lg font-semibold text-royal">
                                {editingItem._id ? "Edit News / Event" : "Add News / Event"}
                            </h2>
                            <button
                                onClick={() => setEditingItem(null)}
                                className="text-slate-400 hover:text-slate-600 text-sm"
                            >
                                Close
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-semibold text-slate-600 mb-1">
                                        Title
                                    </label>
                                    <input
                                        type="text"
                                        value={editingItem.title}
                                        onChange={(e) =>
                                            setEditingItem({ ...editingItem, title: e.target.value })
                                        }
                                        className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-royal/30"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-slate-600 mb-1">
                                        Category
                                    </label>
                                    <select
                                        value={editingItem.category}
                                        onChange={(e) =>
                                            setEditingItem({
                                                ...editingItem,
                                                category: e.target.value as NewsEvent["category"]
                                            })
                                        }
                                        className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-royal/30"
                                    >
                                        <option value="announcement">Announcement</option>
                                        <option value="achievement">Achievement</option>
                                        <option value="news">News</option>
                                        <option value="notice">Notice</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-slate-600 mb-1">
                                        Date
                                    </label>
                                    <input
                                        type="date"
                                        value={editingItem.date}
                                        onChange={(e) =>
                                            setEditingItem({ ...editingItem, date: e.target.value })
                                        }
                                        className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-royal/30"
                                    />
                                </div>
                                <div className="flex items-center gap-2 pt-5">
                                    <input
                                        id="isFeatured"
                                        type="checkbox"
                                        checked={editingItem.isFeatured}
                                        onChange={(e) =>
                                            setEditingItem({
                                                ...editingItem,
                                                isFeatured: e.target.checked
                                            })
                                        }
                                        className="rounded border-slate-300 text-royal focus:ring-royal/40"
                                    />
                                    <label htmlFor="isFeatured" className="text-xs text-slate-600">
                                        Mark as featured (shown as large card on News & Events page)
                                    </label>
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-slate-600 mb-1">
                                    Short Excerpt
                                </label>
                                <textarea
                                    value={editingItem.excerpt}
                                    onChange={(e) =>
                                        setEditingItem({ ...editingItem, excerpt: e.target.value })
                                    }
                                    className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-royal/30"
                                    rows={2}
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-slate-600 mb-1">
                                    Full Content (Blog Details)
                                </label>
                                {/* Simple formatting toolbar */}
                                <div className="flex flex-wrap gap-1 mb-2">
                                    <button
                                        type="button"
                                        onClick={() => insertFormatSnippet("**Bold text** ")}
                                        className="px-2 py-1 text-[11px] border border-slate-200 rounded-md text-slate-600 hover:bg-slate-50 flex items-center gap-1"
                                    >
                                        <Bold className="w-3 h-3" /> Bold
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => insertFormatSnippet("_Italic text_ ")}
                                        className="px-2 py-1 text-[11px] border border-slate-200 rounded-md text-slate-600 hover:bg-slate-50 flex items-center gap-1"
                                    >
                                        <Italic className="w-3 h-3" /> Italic
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => insertFormatSnippet("\n- Point 1\n- Point 2\n")}
                                        className="px-2 py-1 text-[11px] border border-slate-200 rounded-md text-slate-600 hover:bg-slate-50 flex items-center gap-1"
                                    >
                                        <List className="w-3 h-3" /> Bullet List
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => insertFormatSnippet("\n1. Step one\n2. Step two\n")}
                                        className="px-2 py-1 text-[11px] border border-slate-200 rounded-md text-slate-600 hover:bg-slate-50 flex items-center gap-1"
                                    >
                                        <ListOrdered className="w-3 h-3" /> Numbered
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => insertFormatSnippet('\n> Highlighted note\n')}
                                        className="px-2 py-1 text-[11px] border border-slate-200 rounded-md text-slate-600 hover:bg-slate-50 flex items-center gap-1"
                                    >
                                        <Quote className="w-3 h-3" /> Quote
                                    </button>
                                </div>
                                <textarea
                                    ref={contentRef}
                                    value={editingItem.content}
                                    onChange={(e) =>
                                        setEditingItem({ ...editingItem, content: e.target.value })
                                    }
                                    className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-royal/30 font-sans leading-relaxed"
                                    rows={8}
                                    placeholder="Write detailed description, highlights, schedule etc."
                                />
                                <p className="text-[11px] text-slate-400 mt-1">
                                    Tip: Use the buttons above to quickly insert bold text, bullet lists, and highlighted notes.
                                </p>
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-slate-600 mb-1">
                                    Featured Image
                                </label>
                                <div className="flex flex-col md:flex-row gap-3 items-start md:items-center">
                                    <div className="w-28 h-20 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-center overflow-hidden">
                                        {editingItem.imageUrl ? (
                                            <img
                                                src={editingItem.imageUrl}
                                                alt={editingItem.title || "News image"}
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <ImageIcon className="w-6 h-6 text-slate-300" />
                                        )}
                                    </div>
                                    <div className="flex-1 space-y-2">
                                        <div className="flex flex-wrap gap-2 items-center">
                                            <label className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-dashed border-royal/30 text-xs font-semibold text-royal cursor-pointer hover:bg-royal/5">
                                                <Upload className="w-3 h-3" />
                                                {uploadingImage ? "Uploading..." : "Upload Image"}
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    className="hidden"
                                                    onChange={(e) => {
                                                        const file = e.target.files?.[0];
                                                        if (file) {
                                                            handleImageUpload(file);
                                                            e.target.value = "";
                                                        }
                                                    }}
                                                />
                                            </label>
                                            <span className="text-[11px] text-slate-400">
                                                or paste URL manually below
                                            </span>
                                        </div>
                                        <input
                                            type="text"
                                            value={editingItem.imageUrl}
                                            onChange={(e) =>
                                                setEditingItem({ ...editingItem, imageUrl: e.target.value })
                                            }
                                            className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-royal/30"
                                            placeholder="https://..."
                                        />
                                    </div>
                                </div>
                                <p className="text-[11px] text-slate-400 mt-1">
                                    Use a horizontal image (16:9 or 3:2) for best appearance.
                                </p>
                            </div>
                        </form>

                        <div className="px-6 py-3 border-t border-slate-100 flex items-center justify-end gap-3 bg-slate-50/60">
                            <button
                                type="button"
                                onClick={() => setEditingItem(null)}
                                className="px-3 py-1.5 text-xs font-semibold text-slate-600 hover:text-slate-800"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                onClick={handleSubmit}
                                disabled={saving}
                                className="inline-flex items-center gap-2 px-4 py-2 bg-royal text-white rounded-lg text-sm font-semibold hover:bg-royal-light disabled:opacity-60"
                            >
                                {saving && <Loader2 className="w-4 h-4 animate-spin" />}
                                {editingItem._id ? "Update" : "Create"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}


