import { useEffect, useState } from "react";
import { Plus, Trash2, Edit3, Loader2, Image as ImageIcon, ToggleLeft, ToggleRight, Upload } from "lucide-react";

interface ResultBanner {
    imageUrl: string;
    caption?: string;
    order?: number;
}

interface ResultSession {
    _id?: string;
    sessionLabel: string;
    slug?: string;
    description?: string;
    isActive: boolean;
    order?: number;
    banners: ResultBanner[];
}

const emptySession: ResultSession = {
    sessionLabel: "",
    description: "",
    isActive: true,
    order: 0,
    banners: []
};

export function ResultsManager() {
    const [sessions, setSessions] = useState<ResultSession[]>([]);
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [editingSession, setEditingSession] = useState<ResultSession | null>(null);

    const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:4000";
    const token = localStorage.getItem("adminToken");

    const fetchSessions = async () => {
        try {
            setLoading(true);
            setError("");
            const res = await fetch(`${apiUrl}/api/result-sessions`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const data = await res.json();
            if (!res.ok) {
                throw new Error(data.error || "Failed to fetch result sessions");
            }
            setSessions(data);
        } catch (err: any) {
            setError(err.message || "Failed to fetch result sessions");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSessions();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleEditSession = (session?: ResultSession) => {
        if (session) {
            setEditingSession({
                ...session,
                banners: session.banners || []
            });
        } else {
            setEditingSession({ ...emptySession });
        }
        setError("");
        setSuccess("");
    };

    const handleDeleteSession = async (id?: string) => {
        if (!id) return;
        if (!confirm("Delete this result session?")) return;
        try {
            setError("");
            setSuccess("");
            const res = await fetch(`${apiUrl}/api/result-sessions/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const data = await res.json();
            if (!res.ok) {
                throw new Error(data.error || "Failed to delete session");
            }
            setSuccess("Session deleted");
            fetchSessions();
        } catch (err: any) {
            setError(err.message || "Failed to delete session");
        }
    };

    const handleSaveSession = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!editingSession) return;

        try {
            setSaving(true);
            setError("");
            setSuccess("");

            const method = editingSession._id ? "PUT" : "POST";
            const url = editingSession._id
                ? `${apiUrl}/api/result-sessions/${editingSession._id}`
                : `${apiUrl}/api/result-sessions`;

            const res = await fetch(url, {
                method,
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    sessionLabel: editingSession.sessionLabel,
                    description: editingSession.description,
                    isActive: editingSession.isActive,
                    order: editingSession.order,
                    banners: editingSession.banners
                })
            });

            const data = await res.json();
            if (!res.ok) {
                throw new Error(data.error || "Failed to save session");
            }

            setSuccess("Session saved");
            setEditingSession(null);
            fetchSessions();
        } catch (err: any) {
            setError(err.message || "Failed to save session");
        } finally {
            setSaving(false);
        }
    };

    const handleBannerImageUpload = async (file: File, index: number | "new") => {
        try {
            if (!editingSession) return;
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

            const url = data.url as string;
            const banners = [...(editingSession.banners || [])];
            if (index === "new") {
                banners.push({ imageUrl: url, caption: "", order: banners.length });
            } else {
                banners[index] = { ...(banners[index] || {}), imageUrl: url };
            }
            setEditingSession({ ...editingSession, banners });
        } catch (err: any) {
            setError(err.message || "Image upload failed");
        }
    };

    const handleBannerChange = (index: number, field: keyof ResultBanner, value: string) => {
        if (!editingSession) return;
        const banners = [...(editingSession.banners || [])];
        const existing = banners[index] || { imageUrl: "" };
        banners[index] = { ...existing, [field]: value };
        setEditingSession({ ...editingSession, banners });
    };

    const handleRemoveBanner = (index: number) => {
        if (!editingSession) return;
        const banners = [...(editingSession.banners || [])];
        banners.splice(index, 1);
        setEditingSession({ ...editingSession, banners });
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-serif font-bold text-royal">Academic Results</h1>
                    <p className="text-sm text-slate-500">
                        Manage result sessions and banner images shown on the Academic Results page.
                    </p>
                </div>
                <button
                    onClick={() => handleEditSession()}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-royal text-white rounded-lg text-sm font-semibold hover:bg-royal-light transition-colors"
                >
                    <Plus className="w-4 h-4" />
                    Add Session
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

            {/* Sessions List */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100">
                <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between">
                    <h2 className="text-sm font-semibold text-slate-700 uppercase tracking-wide">
                        Result Sessions
                    </h2>
                    {loading && (
                        <div className="flex items-center gap-2 text-xs text-slate-500">
                            <Loader2 className="w-3 h-3 animate-spin" />
                            Loading...
                        </div>
                    )}
                </div>
                <div className="divide-y divide-slate-100 max-h-[360px] overflow-y-auto">
                    {sessions.length === 0 && !loading && (
                        <div className="p-4 text-sm text-slate-500">
                            No sessions yet. Add your first academic session.
                        </div>
                    )}
                    {sessions.map((session) => (
                        <div key={session._id} className="px-4 py-3 flex items-center gap-4 hover:bg-slate-50/70">
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="text-sm font-semibold text-royal">
                                        Session {session.sessionLabel}
                                    </span>
                                    {session.isActive ? (
                                        <span className="inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-semibold uppercase tracking-wide">
                                            <ToggleRight className="w-3 h-3" />
                                            Active
                                        </span>
                                    ) : (
                                        <span className="inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-500 font-semibold uppercase tracking-wide">
                                            <ToggleLeft className="w-3 h-3" />
                                            Hidden
                                        </span>
                                    )}
                                </div>
                                <p className="text-xs text-slate-500 line-clamp-1">
                                    {session.description || "No description added"}
                                </p>
                                <p className="text-[11px] text-slate-400 mt-1 flex items-center gap-1.5">
                                    <ImageIcon className="w-3 h-3" />
                                    {session.banners?.length || 0} banner image(s)
                                </p>
                            </div>
                            <div className="flex flex-col gap-1">
                                <button
                                    onClick={() => handleEditSession(session)}
                                    className="p-1.5 rounded-lg border border-slate-200 text-slate-500 hover:bg-royal hover:text-white hover:border-royal transition-colors"
                                >
                                    <Edit3 className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={() => handleDeleteSession(session._id)}
                                    className="p-1.5 rounded-lg border border-red-100 text-red-500 hover:bg-red-50 hover:border-red-200 transition-colors"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Editor Modal */}
            {editingSession && (
                <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
                        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
                            <h2 className="text-lg font-semibold text-royal">
                                {editingSession._id ? "Edit Result Session" : "Add Result Session"}
                            </h2>
                            <button
                                onClick={() => setEditingSession(null)}
                                className="text-slate-400 hover:text-slate-600 text-sm"
                            >
                                Close
                            </button>
                        </div>

                        <form onSubmit={handleSaveSession} className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-semibold text-slate-600 mb-1">
                                        Session Label
                                    </label>
                                    <input
                                        type="text"
                                        value={editingSession.sessionLabel}
                                        onChange={(e) =>
                                            setEditingSession({ ...editingSession, sessionLabel: e.target.value })
                                        }
                                        className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-royal/30"
                                        placeholder="e.g. 2024-25"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-slate-600 mb-1">
                                        Display Order (optional)
                                    </label>
                                    <input
                                        type="number"
                                        value={editingSession.order ?? 0}
                                        onChange={(e) =>
                                            setEditingSession({
                                                ...editingSession,
                                                order: Number(e.target.value) || 0
                                            })
                                        }
                                        className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-royal/30"
                                    />
                                    <p className="text-[11px] text-slate-400 mt-1">
                                        Lower numbers appear first in the session buttons.
                                    </p>
                                </div>
                                <div className="flex items-center gap-2 pt-5">
                                    <input
                                        id="sessionActive"
                                        type="checkbox"
                                        checked={editingSession.isActive}
                                        onChange={(e) =>
                                            setEditingSession({
                                                ...editingSession,
                                                isActive: e.target.checked
                                            })
                                        }
                                        className="rounded border-slate-300 text-royal focus:ring-royal/40"
                                    />
                                    <label htmlFor="sessionActive" className="text-xs text-slate-600">
                                        Show this session on the Academic Results page
                                    </label>
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-slate-600 mb-1">
                                    Short Description (optional)
                                </label>
                                <textarea
                                    value={editingSession.description || ""}
                                    onChange={(e) =>
                                        setEditingSession({ ...editingSession, description: e.target.value })
                                    }
                                    className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-royal/30"
                                    rows={2}
                                    placeholder="e.g. CBSE Board Examination Results for Session 2023-24"
                                />
                            </div>

                            {/* Banners management */}
                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                                        <ImageIcon className="w-4 h-4" />
                                        Banner Images for this Session
                                    </h3>
                                    <label className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-dashed border-royal/30 text-xs font-semibold text-royal cursor-pointer hover:bg-royal/5">
                                        <Upload className="w-3 h-3" />
                                        Upload Image
                                        <input
                                            type="file"
                                            accept="image/*"
                                            className="hidden"
                                            onChange={(e) => {
                                                const file = e.target.files?.[0];
                                                if (file) {
                                                    handleBannerImageUpload(file, "new");
                                                    e.target.value = "";
                                                }
                                            }}
                                        />
                                    </label>
                                </div>
                                <p className="text-[11px] text-slate-400">
                                    Upload multiple landscape banners; these will auto-rotate with arrows on the
                                    Academic Results page.
                                </p>

                                <div className="space-y-3 max-h-64 overflow-y-auto">
                                    {(editingSession.banners || []).map((banner, index) => (
                                        <div
                                            key={index}
                                            className="flex gap-3 items-center bg-slate-50 rounded-xl p-2 border border-slate-100"
                                        >
                                            <div className="w-24 h-16 rounded-lg bg-white overflow-hidden border border-slate-200 flex items-center justify-center">
                                                {banner.imageUrl ? (
                                                    <img
                                                        src={banner.imageUrl}
                                                        alt={banner.caption || `Result banner ${index + 1}`}
                                                        className="w-full h-full object-cover"
                                                    />
                                                ) : (
                                                    <ImageIcon className="w-6 h-6 text-slate-300" />
                                                )}
                                            </div>
                                            <div className="flex-1 space-y-2">
                                                <input
                                                    type="text"
                                                    value={banner.imageUrl}
                                                    onChange={(e) =>
                                                        handleBannerChange(index, "imageUrl", e.target.value)
                                                    }
                                                    placeholder="Or paste image URL directly"
                                                    className="w-full border border-slate-200 rounded-lg px-3 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-royal/30"
                                                />
                                                <input
                                                    type="text"
                                                    value={banner.caption || ""}
                                                    onChange={(e) =>
                                                        handleBannerChange(index, "caption", e.target.value)
                                                    }
                                                    placeholder="Caption / Alt text (optional)"
                                                    className="w-full border border-slate-200 rounded-lg px-3 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-royal/30"
                                                />
                                            </div>
                                            <div className="flex flex-col gap-1">
                                                <label className="inline-flex items-center justify-center px-2 py-1 rounded-lg border border-slate-200 text-[10px] text-slate-600 bg-white cursor-pointer hover:bg-slate-50">
                                                    <Upload className="w-3 h-3 mr-1" />
                                                    Change
                                                    <input
                                                        type="file"
                                                        accept="image/*"
                                                        className="hidden"
                                                        onChange={(e) => {
                                                            const file = e.target.files?.[0];
                                                            if (file) {
                                                                handleBannerImageUpload(file, index);
                                                                e.target.value = "";
                                                            }
                                                        }}
                                                    />
                                                </label>
                                                <button
                                                    type="button"
                                                    onClick={() => handleRemoveBanner(index)}
                                                    className="p-1.5 rounded-lg border border-red-100 text-red-500 hover:bg-red-50 hover:border-red-200 transition-colors"
                                                >
                                                    <Trash2 className="w-3 h-3" />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </form>

                        <div className="px-6 py-3 border-t border-slate-100 flex items-center justify-end gap-3 bg-slate-50/60">
                            <button
                                type="button"
                                onClick={() => setEditingSession(null)}
                                className="px-3 py-1.5 text-xs font-semibold text-slate-600 hover:text-slate-800"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                onClick={handleSaveSession}
                                disabled={saving}
                                className="inline-flex items-center gap-2 px-4 py-2 bg-royal text-white rounded-lg text-sm font-semibold hover:bg-royal-light disabled:opacity-60"
                            >
                                {saving && <Loader2 className="w-4 h-4 animate-spin" />}
                                {editingSession._id ? "Update Session" : "Create Session"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}


