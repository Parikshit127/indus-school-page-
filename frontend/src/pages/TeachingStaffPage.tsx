import { useState, useEffect } from "react";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/section";
import { Search } from "lucide-react";

interface Teacher {
    _id: string;
    teacherCode: string;
    name: string;
    gender: 'Male' | 'Female' | 'Other';
    teacherType: string;
    qualification: string;
    classesTaught: string;
}

export default function TeachingStaffPage() {
    const [teachers, setTeachers] = useState<Teacher[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
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
            } finally {
                setLoading(false);
            }
        };
        fetchTeachers();
    }, []);

    const filteredTeachers = teachers.filter(t => 
        t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.teacherCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.teacherType.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="bg-slate-50 min-h-screen">
            <PageHero
                title="Our Teaching Staff"
                subtitle="Meet our dedicated team of educators committed to shaping the future."
                image="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=2070&auto=format&fit=crop"
            />

            <Section className="py-16">
                <div className="max-w-7xl mx-auto">
                    {/* Search Bar */}
                    <div className="mb-8 flex justify-end">
                        <div className="relative w-full max-w-md">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                            <input
                                type="text"
                                placeholder="Search by name, code or type..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl shadow-sm focus:ring-2 focus:ring-royal/20 focus:border-royal outline-none transition-all"
                            />
                        </div>
                    </div>

                    {/* Teachers Table */}
                    <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-royal-dark text-white uppercase tracking-wider text-sm">
                                        <th className="p-4 md:p-6 font-bold whitespace-nowrap">Sr. No.</th>
                                        <th className="p-4 md:p-6 font-bold whitespace-nowrap">Teacher Code</th>
                                        <th className="p-4 md:p-6 font-bold whitespace-nowrap">Name</th>
                                        <th className="p-4 md:p-6 font-bold whitespace-nowrap">Gender</th>
                                        <th className="p-4 md:p-6 font-bold whitespace-nowrap">Type of Teacher</th>
                                        <th className="p-4 md:p-6 font-bold whitespace-nowrap">Highest Qualification</th>
                                        <th className="p-4 md:p-6 font-bold whitespace-nowrap min-w-[200px]">Classes Taught</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {loading ? (
                                        <tr>
                                            <td colSpan={7} className="p-12 text-center text-slate-500">
                                                <div className="animate-spin w-8 h-8 border-4 border-royal/20 border-t-royal rounded-full mx-auto mb-4"></div>
                                                Loading staff details...
                                            </td>
                                        </tr>
                                    ) : filteredTeachers.length > 0 ? (
                                        filteredTeachers.map((teacher, index) => (
                                            <tr 
                                                key={teacher._id} 
                                                className="hover:bg-slate-50 transition-colors even:bg-slate-50/50"
                                            >
                                                <td className="p-4 md:p-6 text-slate-500 font-medium">{index + 1}</td>
                                                <td className="p-4 md:p-6 text-slate-600 font-mono text-sm">{teacher.teacherCode}</td>
                                                <td className="p-4 md:p-6 font-bold text-royal">{teacher.name}</td>
                                                <td className="p-4 md:p-6 text-slate-600">{teacher.gender}</td>
                                                <td className="p-4 md:p-6 text-slate-600">
                                                    <span className="px-3 py-1 bg-royal/5 text-royal rounded-full text-sm font-medium">
                                                        {teacher.teacherType}
                                                    </span>
                                                </td>
                                                <td className="p-4 md:p-6 text-slate-600 font-medium">{teacher.qualification}</td>
                                                <td className="p-4 md:p-6 text-slate-600">{teacher.classesTaught}</td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={7} className="p-12 text-center text-slate-500">
                                                No teaching staff details found matching your search.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </Section>
        </div>
    );
}
