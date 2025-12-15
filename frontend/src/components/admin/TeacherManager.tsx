import { useState, useEffect } from "react";
import { Plus, Edit2, Trash2, Save, X, Search, GraduationCap } from "lucide-react";

interface Teacher {
    _id: string;
    teacherCode: string;
    name: string;
    gender: 'Male' | 'Female' | 'Other';
    teacherType: string;
    qualification: string;
    classesTaught: string;
    order: number;
}

export function TeacherManager() {
    const [teachers, setTeachers] = useState<Teacher[]>([]);
    const [isAdding, setIsAdding] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState("");

    // Form State
    const [formData, setFormData] = useState({
        teacherCode: "",
        name: "",
        gender: "Female",
        teacherType: "",
        qualification: "",
        classesTaught: "",
        order: 0
    });

    useEffect(() => {
        fetchTeachers();
    }, []);

    const fetchTeachers = async () => {
        try {
            const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:4000';
            const response = await fetch(`${apiUrl}/api/teachers`);
            if (response.ok) {
                const data = await response.json();
                setTeachers(data);
            }
        } catch (error) {
            console.error("Failed to fetch teachers", error);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const resetForm = () => {
        setFormData({
            teacherCode: "",
            name: "",
            gender: "Female",
            teacherType: "",
            qualification: "",
            classesTaught: "",
            order: 0
        });
        setIsAdding(false);
        setEditingId(null);
    };

    const handleAdd = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("adminToken");
            const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:4000';
            const response = await fetch(`${apiUrl}/api/teachers`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                fetchTeachers();
                resetForm();
            }
        } catch (error) {
            console.error("Failed to add teacher", error);
        }
    };

    const handleEditClick = (teacher: Teacher) => {
        setFormData({
            teacherCode: teacher.teacherCode,
            name: teacher.name,
            gender: teacher.gender,
            teacherType: teacher.teacherType,
            qualification: teacher.qualification,
            classesTaught: teacher.classesTaught,
            order: teacher.order
        });
        setEditingId(teacher._id);
        setIsAdding(true);
    };

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!editingId) return;

        try {
            const token = localStorage.getItem("adminToken");
            const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:4000';
            const response = await fetch(`${apiUrl}/api/teachers/${editingId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                fetchTeachers();
                resetForm();
            }
        } catch (error) {
            console.error("Failed to update teacher", error);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this teacher?")) return;

        try {
            const token = localStorage.getItem("adminToken");
            const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:4000';
            const response = await fetch(`${apiUrl}/api/teachers/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                fetchTeachers();
            }
        } catch (error) {
            console.error("Failed to delete teacher", error);
        }
    };

    const filteredTeachers = teachers.filter(t => 
        t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.teacherCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.teacherType.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="max-w-6xl mx-auto pb-12">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                    <h2 className="text-xl md:text-2xl font-serif font-bold text-royal">Teaching Staff Manager</h2>
                    <p className="text-sm md:text-base text-slate-500">Manage teacher profiles and details</p>
                </div>
                {!isAdding && (
                    <button
                        onClick={() => setIsAdding(true)}
                        className="w-full md:w-auto flex items-center justify-center gap-2 px-4 py-2 bg-royal text-gold rounded-lg font-medium hover:bg-royal-dark transition-colors"
                    >
                        <Plus size={20} />
                        <span>Add Teacher</span>
                    </button>
                )}
            </div>

            {isAdding && (
                <div className="bg-white p-6 rounded-xl shadow-lg border border-slate-200 mb-8 animate-in slide-in-from-top-4">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="font-bold text-lg text-royal">
                            {editingId ? "Edit Teacher" : "Add New Teacher"}
                        </h3>
                        <button onClick={resetForm} className="text-slate-400 hover:text-red-500">
                            <X size={24} />
                        </button>
                    </div>

                    <form onSubmit={editingId ? handleUpdate : handleAdd} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Teacher Code</label>
                            <input
                                name="teacherCode"
                                value={formData.teacherCode}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-royal/20 outline-none"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Name</label>
                            <input
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-royal/20 outline-none"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Gender</label>
                            <select
                                name="gender"
                                value={formData.gender}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-royal/20 outline-none"
                            >
                                <option value="Female">Female</option>
                                <option value="Male">Male</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Type of Teacher</label>
                            <input
                                name="teacherType"
                                value={formData.teacherType}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-royal/20 outline-none"
                                placeholder="e.g. PGT, TGT, PRT"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Highest Qualification</label>
                            <input
                                name="qualification"
                                value={formData.qualification}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-royal/20 outline-none"
                                placeholder="e.g. M.Sc, B.Ed"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Classes Taught</label>
                            <input
                                name="classesTaught"
                                value={formData.classesTaught}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-royal/20 outline-none"
                                placeholder="e.g. IX, X, XI, XII"
                                required
                            />
                        </div>
                        
                        <div className="md:col-span-2 flex justify-end gap-4 mt-4">
                            <button
                                type="button"
                                onClick={resetForm}
                                className="px-6 py-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="flex items-center gap-2 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                            >
                                <Save size={20} />
                                <span>{editingId ? "Update Teacher" : "Save Teacher"}</span>
                            </button>
                        </div>
                    </form>
                </div>
            )}

            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="p-4 border-b border-slate-100 flex gap-4">
                     <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                        <input
                            type="text"
                            placeholder="Search teachers..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-royal/20 outline-none"
                        />
                     </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50 text-slate-600 text-sm uppercase tracking-wider">
                                <th className="p-4 border-b font-bold">Sr. No.</th>
                                <th className="p-4 border-b font-bold">Code</th>
                                <th className="p-4 border-b font-bold">Name</th>
                                <th className="p-4 border-b font-bold">Gender</th>
                                <th className="p-4 border-b font-bold">Type</th>
                                <th className="p-4 border-b font-bold">Qualification</th>
                                <th className="p-4 border-b font-bold">Classes</th>
                                <th className="p-4 border-b font-bold text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {filteredTeachers.map((teacher, index) => (
                                <tr key={teacher._id} className="hover:bg-slate-50 transition-colors">
                                    <td className="p-4 text-slate-500 font-medium">{index + 1}</td>
                                    <td className="p-4 text-slate-600 font-mono text-xs">{teacher.teacherCode}</td>
                                    <td className="p-4 font-bold text-royal">{teacher.name}</td>
                                    <td className="p-4 text-slate-600">{teacher.gender}</td>
                                    <td className="p-4 text-slate-600">
                                        <span className="px-2 py-1 bg-royal/10 text-royal text-xs rounded-full font-bold">
                                            {teacher.teacherType}
                                        </span>
                                    </td>
                                    <td className="p-4 text-slate-600">
                                        <div className="flex items-center gap-1">
                                            <GraduationCap size={14} className="text-slate-400" />
                                            {teacher.qualification}
                                        </div>
                                    </td>
                                    <td className="p-4 text-slate-600">{teacher.classesTaught}</td>
                                    <td className="p-4 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <button
                                                onClick={() => handleEditClick(teacher)}
                                                className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                                title="Edit"
                                            >
                                                <Edit2 size={18} />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(teacher._id)}
                                                className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                title="Delete"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {filteredTeachers.length === 0 && (
                                <tr>
                                    <td colSpan={8} className="p-8 text-center text-slate-500">
                                        No teachers found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
