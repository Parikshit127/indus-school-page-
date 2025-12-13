import { useState, useEffect } from "react";
import { Plus, Edit2, Trash2, Save, X } from "lucide-react";

interface Member {
    _id: string;
    name: string;
    relation: string;
    designation: string;
    order: number;
}

export function MemberManager() {
    const [members, setMembers] = useState<Member[]>([]);
    const [loading, setLoading] = useState(true);
    const [isAdding, setIsAdding] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);

    // Form states
    const [newName, setNewName] = useState("");
    const [newRelation, setNewRelation] = useState("");
    const [newDesignation, setNewDesignation] = useState("");
    const [newOrder, setNewOrder] = useState(0);

    const [editName, setEditName] = useState("");
    const [editRelation, setEditRelation] = useState("");
    const [editDesignation, setEditDesignation] = useState("");
    const [editOrder, setEditOrder] = useState(0);

    useEffect(() => {
        fetchMembers();
    }, []);

    const fetchMembers = async () => {
        try {
            const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:4000';
            const response = await fetch(`${apiUrl}/api/members`);
            if (response.ok) {
                const data = await response.json();
                setMembers(data);
            }
        } catch (error) {
            console.error("Failed to fetch members", error);
        } finally {
            setLoading(false);
        }
    };

    const handleAdd = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:4000';
            const token = localStorage.getItem("adminToken");
            
            const response = await fetch(`${apiUrl}/api/members`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    name: newName,
                    relation: newRelation,
                    designation: newDesignation,
                    order: newOrder
                })
            });

            if (response.ok) {
                setNewName("");
                setNewRelation("");
                setNewDesignation("");
                setNewOrder(0);
                setIsAdding(false);
                fetchMembers();
            }
        } catch (error) {
            console.error("Failed to add member", error);
        }
    };

    const handleEditStart = (member: Member) => {
        setEditingId(member._id);
        setEditName(member.name);
        setEditRelation(member.relation);
        setEditDesignation(member.designation);
        setEditOrder(member.order);
        setIsAdding(false);
    };

    const handleUpdate = async (id: string) => {
        try {
            const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:4000';
            const token = localStorage.getItem("adminToken");

            const response = await fetch(`${apiUrl}/api/members/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    name: editName,
                    relation: editRelation,
                    designation: editDesignation,
                    order: editOrder
                })
            });

            if (response.ok) {
                setEditingId(null);
                fetchMembers();
            }
        } catch (error) {
            console.error("Failed to update member", error);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this member?")) return;
        
        try {
            const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:4000';
            const token = localStorage.getItem("adminToken");

            const response = await fetch(`${apiUrl}/api/members/${id}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            if (response.ok) {
                fetchMembers();
            }
        } catch (error) {
            console.error("Failed to delete member", error);
        }
    };

    if (loading) return <div className="p-8 text-center text-slate-500">Loading members...</div>;

    return (
        <div className="max-w-6xl mx-auto pb-12">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h2 className="text-2xl font-serif font-bold text-royal">Member Management</h2>
                    <p className="text-slate-500">Manage the committee members list</p>
                </div>
                <button
                    onClick={() => { setIsAdding(!isAdding); setEditingId(null); }}
                    className="flex items-center gap-2 px-6 py-2.5 bg-royal text-white rounded-lg font-medium hover:bg-royal-dark transition-colors"
                >
                    {isAdding ? <X size={20} /> : <Plus size={20} />}
                    <span>{isAdding ? "Cancel" : "Add Member"}</span>
                </button>
            </div>

            {/* Add Member Form */}
            {isAdding && (
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 mb-8 animate-in fade-in slide-in-from-top-4">
                    <h3 className="font-bold text-lg mb-4 text-royal">Add New Member</h3>
                    <form onSubmit={handleAdd} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <input
                            type="number"
                            placeholder="Order"
                            value={newOrder}
                            onChange={(e) => setNewOrder(parseInt(e.target.value))}
                            className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-royal/20 outline-none"
                            required
                        />
                        <input
                            type="text"
                            placeholder="Member Name"
                            value={newName}
                            onChange={(e) => setNewName(e.target.value)}
                            className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-royal/20 outline-none"
                            required
                        />
                        <input
                            type="text"
                            placeholder="Father/Spouse Name"
                            value={newRelation}
                            onChange={(e) => setNewRelation(e.target.value)}
                            className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-royal/20 outline-none"
                            required
                        />
                        <input
                            type="text"
                            placeholder="Designation"
                            value={newDesignation}
                            onChange={(e) => setNewDesignation(e.target.value)}
                            className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-royal/20 outline-none"
                            required
                        />
                        <div className="md:col-span-2 lg:col-span-4 flex justify-end">
                            <button
                                type="submit"
                                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium"
                            >
                                Save Member
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* Members List */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-slate-50 text-slate-500 font-medium border-b border-slate-200">
                        <tr>
                            <th className="px-6 py-4 w-20">Order</th>
                            <th className="px-6 py-4">Name</th>
                            <th className="px-6 py-4">Father/Spouse Name</th>
                            <th className="px-6 py-4">Designation</th>
                            <th className="px-6 py-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {members.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="px-6 py-12 text-center text-slate-500">
                                    No members found. Add some from the button above.
                                </td>
                            </tr>
                        ) : (
                            members.map((member) => (
                                <tr key={member._id} className="hover:bg-slate-50/50">
                                    {editingId === member._id ? (
                                        <>
                                            <td className="px-6 py-4">
                                                <input
                                                    type="number"
                                                    value={editOrder}
                                                    onChange={(e) => setEditOrder(parseInt(e.target.value))}
                                                    className="w-16 px-2 py-1 border rounded"
                                                />
                                            </td>
                                            <td className="px-6 py-4">
                                                <input
                                                    type="text"
                                                    value={editName}
                                                    onChange={(e) => setEditName(e.target.value)}
                                                    className="w-full px-2 py-1 border rounded"
                                                />
                                            </td>
                                            <td className="px-6 py-4">
                                                <input
                                                    type="text"
                                                    value={editRelation}
                                                    onChange={(e) => setEditRelation(e.target.value)}
                                                    className="w-full px-2 py-1 border rounded"
                                                />
                                            </td>
                                            <td className="px-6 py-4">
                                                <input
                                                    type="text"
                                                    value={editDesignation}
                                                    onChange={(e) => setEditDesignation(e.target.value)}
                                                    className="w-full px-2 py-1 border rounded"
                                                />
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <div className="flex justify-end gap-2">
                                                    <button
                                                        onClick={() => handleUpdate(member._id)}
                                                        className="p-2 text-green-600 hover:bg-green-50 rounded"
                                                        title="Save"
                                                    >
                                                        <Save size={18} />
                                                    </button>
                                                    <button
                                                        onClick={() => setEditingId(null)}
                                                        className="p-2 text-slate-400 hover:bg-slate-50 rounded"
                                                        title="Cancel"
                                                    >
                                                        <X size={18} />
                                                    </button>
                                                </div>
                                            </td>
                                        </>
                                    ) : (
                                        <>
                                            <td className="px-6 py-4 text-slate-500">#{member.order}</td>
                                            <td className="px-6 py-4 font-medium text-royal">{member.name}</td>
                                            <td className="px-6 py-4 text-slate-600">{member.relation}</td>
                                            <td className="px-6 py-4">
                                                <span className="px-2 py-1 text-xs font-medium bg-slate-100 text-slate-600 rounded-full">
                                                    {member.designation}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <div className="flex justify-end gap-2">
                                                    <button
                                                        onClick={() => handleEditStart(member)}
                                                        className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                                                        title="Edit"
                                                    >
                                                        <Edit2 size={18} />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(member._id)}
                                                        className="p-2 text-red-500 hover:bg-red-50 rounded"
                                                        title="Delete"
                                                    >
                                                        <Trash2 size={18} />
                                                    </button>
                                                </div>
                                            </td>
                                        </>
                                    )}
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
