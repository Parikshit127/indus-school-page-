import { useEffect, useState } from "react";

import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer,
    PieChart, Pie, Cell, LineChart, Line
} from "recharts";
import { Calendar, Search, Filter, TrendingUp, Users, BookOpen, Download, ChevronDown, ChevronUp, Save, FileText, Trash2 } from "lucide-react";
import { motion } from "framer-motion";
import * as XLSX from 'xlsx';

const COLORS = ['#1a365d', '#fbbf24', '#10b981', '#f59e0b', '#ef4444'];

const STATUS_OPTIONS = ['New', 'Contacted', 'Admitted', 'Closed'];

const STATUS_COLORS: Record<string, string> = {
    'New': 'bg-blue-100 text-blue-800',
    'Contacted': 'bg-yellow-100 text-yellow-800',
    'Admitted': 'bg-green-100 text-green-800',
    'Closed': 'bg-red-100 text-red-800'
};

interface Lead {
    _id: string;
    studentName: string;
    fatherName?: string;
    city?: string;
    state?: string;
    phone: string;
    email: string;
    class: string;
    message?: string;
    status?: string;
    date?: string;
    createdAt?: string;
    adminNotes?: { _id: string; content: string; date: string }[];
}

interface Analytics {
    totalLeads: number;
    periodLeads: number;
    conversionStats: {
        total: number;
        admitted: number;
        rate: number;
    };
    leadsByClass: Array<{ _id: string; count: number }>;
    dailyStats: Array<{ _id: string; count: number; admitted: number }>;
}

export function DashboardOverview() {
    const [leads, setLeads] = useState<Lead[]>([]);
    const [analytics, setAnalytics] = useState<Analytics | null>(null);
    const [loading, setLoading] = useState(true);

    const [searchTerm, setSearchTerm] = useState("");
    const [classFilter, setClassFilter] = useState("All");
    const [statusFilter, setStatusFilter] = useState("All");
    const [dateRange, setDateRange] = useState("30d");
    const [customStart, setCustomStart] = useState("");
    const [customEnd, setCustomEnd] = useState("");

    const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());
    const [noteDrafts, setNoteDrafts] = useState<Record<string, string>>({});

    const toggleRow = (id: string) => {
        const newExpanded = new Set(expandedRows);
        if (newExpanded.has(id)) {
            newExpanded.delete(id);
        } else {
            newExpanded.add(id);
            setNoteDrafts(prev => ({ ...prev, [id]: '' }));
        }
        setExpandedRows(newExpanded);
    };

    const handleAddNote = async (id: string) => {
        const token = localStorage.getItem("adminToken");
        if (!token) {
            alert("Session expired. Please log in again.");
            return;
        }

        const content = noteDrafts[id];
        if (!content?.trim()) {
            alert("Please enter some text for the note.");
            return;
        }

        try {
            const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:4000';
            const response = await fetch(`${apiUrl}/api/leads/${id}/notes`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ content })
            });

            if (response.ok) {
                const updatedLead = await response.json();
                setLeads(leads.map(l => l._id === id ? updatedLead : l));
                setNoteDrafts(prev => ({ ...prev, [id]: '' }));
            } else {
                const err = await response.json();
                alert(`Failed to add note: ${err.error || 'Unknown error'}`);
            }
        } catch (error) {
            console.error("Failed to add note", error);
            alert("Network error while adding note.");
        }
    };

    const handleDeleteNote = async (leadId: string, noteId: string) => {
        const token = localStorage.getItem("adminToken");
        if (!token) return;

        try {
            const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:4000';
            const response = await fetch(`${apiUrl}/api/leads/${leadId}/notes/${noteId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                const updatedLead = await response.json();
                setLeads(leads.map(l => l._id === leadId ? updatedLead : l));
            }
        } catch (error) {
            console.error("Failed to delete note", error);
        }
    };

    useEffect(() => {
        const token = localStorage.getItem("adminToken");
        if (token) {
            fetchData(token);
        }
    }, [dateRange, customStart, customEnd]);

    const fetchData = async (token: string) => {
        setLoading(true);
        try {
            const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:4000';

            let startDate = "";
            let endDate = "";
            const now = new Date();

            if (dateRange === "7d") {
                const date = new Date();
                date.setDate(now.getDate() - 7);
                startDate = date.toISOString();
            } else if (dateRange === "30d") {
                const date = new Date();
                date.setDate(now.getDate() - 30);
                startDate = date.toISOString();
            } else if (dateRange === "month") {
                const date = new Date(now.getFullYear(), now.getMonth(), 1);
                startDate = date.toISOString();
                endDate = new Date(now.getFullYear(), now.getMonth() + 1, 0).toISOString();
            } else if (dateRange === "custom" && customStart) {
                startDate = new Date(customStart).toISOString();
                if (customEnd) endDate = new Date(customEnd).toISOString();
            }

            const queryParams = new URLSearchParams();
            if (startDate) queryParams.append("startDate", startDate);
            if (endDate) queryParams.append("endDate", endDate);

            const [leadsRes, analyticsRes] = await Promise.all([
                fetch(`${apiUrl}/api/leads`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                }),
                fetch(`${apiUrl}/api/analytics?${queryParams.toString()}`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                })
            ]);

            if (leadsRes.ok) setLeads(await leadsRes.json());
            if (analyticsRes.ok) {
                const analyticsData = await analyticsRes.json();
                setAnalytics(analyticsData);
            }
        } catch (e) {
            console.error("Fetch Error", e);
        } finally {
            setLoading(false);
        }
    };

    const handleStatusChange = async (id: string, newStatus: string) => {
        const token = localStorage.getItem("adminToken");
        if (!token) return;

        const updatedLeads = leads.map((lead) =>
            lead._id === id ? { ...lead, status: newStatus } : lead
        );
        setLeads(updatedLeads);

        try {
            const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:4000';
            const response = await fetch(`${apiUrl}/api/leads/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ status: newStatus })
            });

            if (!response.ok) {
                fetchData(token);
            }
        } catch (error) {
            console.error("Failed to update status", error);
            fetchData(token);
        }
    };

    const exportToExcel = () => {
        const exportData = filteredLeads.map((lead) => ({
            'Date': new Date(lead.createdAt || lead.date || '').toLocaleDateString(),
            'Student Name': lead.studentName,
            'Father Name': lead.fatherName || '-',
            'City': lead.city || '-',
            'State': lead.state || '-',
            'Phone': lead.phone,
            'Email': lead.email,
            'Class': lead.class,
            'Status': lead.status || 'New',
            'Message': lead.message || '-'
        }));

        const ws = XLSX.utils.json_to_sheet(exportData);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Leads');

        // Generate filename based on date range
        let dateLabel = '';
        if (dateRange === 'custom' && customStart && customEnd) {
            dateLabel = `${customStart}_to_${customEnd}`;
        } else if (dateRange === '7d') {
            dateLabel = 'Last_7_Days';
        } else if (dateRange === '30d') {
            dateLabel = 'Last_30_Days';
        } else if (dateRange === 'month') {
            dateLabel = 'This_Month';
        }

        const fileName = `Indus_Leads_${dateLabel}_${new Date().toISOString().split('T')[0]}.xlsx`;
        XLSX.writeFile(wb, fileName);
    };

    const getDateRangeForFilter = () => {
        const now = new Date();
        let start = new Date();

        switch (dateRange) {
            case '7d':
                start.setDate(now.getDate() - 7);
                break;
            case '30d':
                start.setDate(now.getDate() - 30);
                break;
            case 'month':
                start = new Date(now.getFullYear(), now.getMonth(), 1);
                break;
            case 'custom':
                if (customStart && customEnd) {
                    return {
                        start: new Date(customStart),
                        end: new Date(customEnd)
                    };
                }
                return null;
        }

        return { start, end: now };
    };

    const filteredLeads = leads.filter((lead) => {
        const matchesSearch =
            lead.studentName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            lead.fatherName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            lead.city?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            lead.phone?.includes(searchTerm);

        const matchesClass = classFilter === "All" || lead.class === classFilter;
        const matchesStatus = statusFilter === "All" || lead.status === statusFilter || (!lead.status && statusFilter === "New");

        // Date filtering
        const dateRangeFilter = getDateRangeForFilter();
        let matchesDate = true;
        if (dateRangeFilter) {
            const leadDate = new Date(lead.createdAt || lead.date || '');
            matchesDate = leadDate >= dateRangeFilter.start && leadDate <= dateRangeFilter.end;
        }

        return matchesSearch && matchesClass && matchesStatus && matchesDate;
    });

    const StatsCard = ({ title, value, icon: Icon, trend }: { title: string; value: number; icon: React.ElementType; trend?: string }) => (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-4 md:p-6 rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow"
        >
            <div className="flex justify-between items-start">
                <div className="min-w-0 flex-1">
                    <p className="text-slate-500 text-xs md:text-sm font-medium mb-1 truncate">{title}</p>
                    <h3 className="text-2xl md:text-3xl font-bold text-royal">{value}</h3>
                </div>
                <div className="p-2 md:p-3 bg-gradient-to-br from-royal/10 to-gold/10 rounded-lg text-royal flex-shrink-0 ml-2">
                    <Icon size={20} className="md:hidden" />
                    <Icon size={24} className="hidden md:block" />
                </div>
            </div>
            {trend && (
                <div className="mt-3 md:mt-4 flex items-center gap-1 text-[10px] md:text-xs font-medium text-emerald-600 bg-emerald-50 w-fit px-2 py-1 rounded-full">
                    <TrendingUp size={10} className="md:hidden" />
                    <TrendingUp size={12} className="hidden md:block" />
                    <span className="truncate max-w-[80px] md:max-w-none">{trend}</span>
                </div>
            )}
        </motion.div>
    );

    const conversionData = [
        { name: 'Total Inquiries', value: analytics?.conversionStats?.total || 0 },
        { name: 'Admitted', value: analytics?.conversionStats?.admitted || 0 },
    ];

    return (
        <div className="pb-8 md:pb-12">
            <div className="flex flex-col gap-4 mb-6 md:mb-8">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <h2 className="text-xl md:text-2xl font-serif font-bold text-royal">Dashboard Overview</h2>
                        <p className="text-sm md:text-base text-slate-500">Overview of admissions and inquiries</p>
                    </div>

                    <div className="w-full md:w-auto">
                        <div className="flex flex-col md:flex-row items-stretch md:items-center gap-2 md:gap-3 bg-white p-2 md:p-2 rounded-lg border border-slate-200 shadow-sm">
                            <select
                                className="bg-transparent text-sm font-medium text-royal focus:outline-none cursor-pointer px-2 py-1.5 md:py-0"
                                value={dateRange}
                                onChange={(e) => setDateRange(e.target.value)}
                            >
                                <option value="7d">Last 7 Days</option>
                                <option value="30d">Last 30 Days</option>
                                <option value="month">This Month</option>
                                <option value="custom">Custom Range</option>
                            </select>

                            {dateRange === "custom" && (
                                <div className="flex items-center gap-2 border-t md:border-t-0 md:border-l border-slate-200 pt-2 md:pt-0 md:pl-3">
                                    <input
                                        type="date"
                                        className="flex-1 text-xs border border-slate-200 rounded px-2 py-1.5"
                                        value={customStart}
                                        onChange={(e) => setCustomStart(e.target.value)}
                                    />
                                    <span className="text-slate-400">-</span>
                                    <input
                                        type="date"
                                        className="flex-1 text-xs border border-slate-200 rounded px-2 py-1.5"
                                        value={customEnd}
                                        onChange={(e) => setCustomEnd(e.target.value)}
                                    />
                                </div>
                            )}
                            <span className="text-xs text-slate-400 px-2 md:pl-3 md:border-l border-slate-200 text-center md:text-left">
                                {loading ? "Syncing..." : "Updated"}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 mb-6 md:mb-8">
                <StatsCard title="Total Inquiries" value={analytics?.totalLeads || 0} icon={Users} />
                <StatsCard title="Selected Period" value={analytics?.periodLeads || 0} icon={Calendar} trend="In Range" />
                <StatsCard title="Admissions" value={analytics?.conversionStats?.admitted || 0} icon={BookOpen} trend={`${analytics?.conversionStats?.rate || 0}%`} />
                <StatsCard title="Pending" value={(analytics?.periodLeads || 0) - (analytics?.conversionStats?.admitted || 0)} icon={Filter} trend="Follow-up" />
            </div>

            {/* Detailed Table */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden mb-6 md:mb-8">
                <div className="p-4 md:p-6 border-b border-slate-100">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <h3 className="font-bold text-royal text-base md:text-lg">Detailed Inquiries</h3>
                        <button
                            onClick={exportToExcel}
                            className="w-full md:w-auto flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-royal to-royal-light text-white rounded-lg text-sm font-medium hover:shadow-lg transition-all duration-200"
                        >
                            <Download size={16} />
                            <span>Export Excel</span>
                        </button>
                    </div>

                    <div className="flex flex-col gap-3 mt-4">
                        <div className="relative w-full">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                            <input
                                type="text"
                                placeholder="Search details..."
                                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-royal/20"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>

                        <div className="flex flex-wrap gap-2">
                            <select
                                className="flex-1 min-w-[120px] px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-600 focus:outline-none focus:ring-2 focus:ring-royal/20"
                                value={classFilter}
                                onChange={(e) => setClassFilter(e.target.value)}
                            >
                                <option value="All">All Classes</option>
                                <option value="XI Medical">XI Medical</option>
                                <option value="XI Non-Medical">XI Non-Medical</option>
                                <option value="XI Commerce">XI Commerce</option>
                                <option value="XI Humanities">XI Humanities</option>
                            </select>

                            <select
                                className="flex-1 min-w-[120px] px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-600 focus:outline-none focus:ring-2 focus:ring-royal/20"
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                            >
                                <option value="All">All Status</option>
                                {STATUS_OPTIONS.map(status => (
                                    <option key={status} value={status}>{status}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-slate-600">
                        <thead className="text-xs text-royal uppercase bg-slate-50/50">
                            <tr>
                                <th className="px-6 py-4 font-bold">Date</th>
                                <th className="px-6 py-4 font-bold">Student</th>
                                <th className="px-6 py-4 font-bold">Father</th>
                                <th className="px-6 py-4 font-bold">City</th>
                                <th className="px-6 py-4 font-bold">Contact</th>
                                <th className="px-6 py-4 font-bold">Class</th>
                                <th className="px-6 py-4 font-bold">Status</th>
                                <th className="px-6 py-4 font-bold">Details</th>
                                <th className="px-6 py-4 font-bold text-center">Notes</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr><td colSpan={9} className="px-6 py-8 text-center">Loading...</td></tr>
                            ) : filteredLeads.length === 0 ? (
                                <tr><td colSpan={9} className="px-6 py-8 text-center text-slate-400">No leads found.</td></tr>
                            ) : (
                                filteredLeads.map((lead) => (
                                    <>
                                        <tr key={lead._id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                                            <td className="px-6 py-4 font-medium whitespace-nowrap">
                                                {new Date(lead.createdAt || lead.date || '').toLocaleDateString()}
                                            </td>
                                            <td className="px-6 py-4 font-bold text-royal">{lead.studentName}</td>
                                            <td className="px-6 py-4">{lead.fatherName || '-'}</td>
                                            <td className="px-6 py-4">{lead.city || '-'}</td>
                                            <td className="px-6 py-4">
                                                <div className="flex flex-col">
                                                    <span>{lead.phone}</span>
                                                    <span className="text-xs text-slate-400">{lead.email}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-700">
                                                    {lead.class}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <select
                                                    value={lead.status || 'New'}
                                                    onChange={(e) => handleStatusChange(lead._id, e.target.value)}
                                                    className={`text-xs font-semibold px-2 py-1 rounded-full border-none focus:ring-2 focus:ring-royal/20 cursor-pointer ${STATUS_COLORS[lead.status || 'New']}`}
                                                >
                                                    {STATUS_OPTIONS.map(opt => (
                                                        <option key={opt} value={opt}>{opt}</option>
                                                    ))}
                                                </select>
                                            </td>
                                            <td className="px-6 py-4 max-w-xs truncate" title={lead.message}>
                                                {lead.message || "-"}
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                <button
                                                    onClick={() => toggleRow(lead._id)}
                                                    className="p-1 text-slate-400 hover:text-royal hover:bg-royal/5 rounded transition-colors"
                                                >
                                                    {expandedRows.has(lead._id) ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                                                </button>
                                            </td>
                                        </tr>
                                        {expandedRows.has(lead._id) && (
                                            <tr className="bg-slate-50/50">
                                                <td colSpan={9} className="px-6 py-4 border-b border-slate-50">
                                                    <div className="space-y-3">
                                                        {/* Existing Notes List */}
                                                        {lead.adminNotes && Array.isArray(lead.adminNotes) && lead.adminNotes.length > 0 && (
                                                            <div className="space-y-2 mb-3">
                                                                {lead.adminNotes.map((note) => (
                                                                    <div key={note._id} className="flex gap-3 p-3 bg-white rounded-lg border border-slate-200 shadow-sm relative group">
                                                                        <div className="mt-0.5 text-royal/60"><FileText size={14} /></div>
                                                                        <div className="flex-1">
                                                                            <p className="text-sm text-slate-700 whitespace-pre-wrap leading-relaxed">{note.content}</p>
                                                                            <p className="text-[10px] text-slate-400 mt-1">{new Date(note.date).toLocaleString()}</p>
                                                                        </div>
                                                                        <button
                                                                            onClick={() => handleDeleteNote(lead._id, note._id)}
                                                                            className="absolute top-2 right-2 p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded opacity-0 group-hover:opacity-100 transition-all"
                                                                            title="Delete Note"
                                                                        >
                                                                            <Trash2 size={14} />
                                                                        </button>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        )}

                                                        {/* Add New Note Form */}
                                                        <div className="flex gap-4 p-3 bg-white rounded-lg border border-slate-200 shadow-sm">
                                                            <div className="mt-2 text-royal"><FileText size={18} /></div>
                                                            <div className="flex-1">
                                                                <div className="flex justify-between items-center mb-2">
                                                                    <label className="text-xs font-bold text-slate-500 uppercase">Add New Note</label>
                                                                    <span className="text-[10px] text-slate-400">Internal use only</span>
                                                                </div>
                                                                <textarea
                                                                    className="w-full text-sm p-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-royal/20 resize-none h-20 font-medium text-slate-600"
                                                                    placeholder="Type note content here..."
                                                                    value={noteDrafts[lead._id] || ''}
                                                                    onChange={(e) => setNoteDrafts({ ...noteDrafts, [lead._id]: e.target.value })}
                                                                />
                                                                <div className="mt-2 flex justify-end">
                                                                    <button
                                                                        onClick={() => handleAddNote(lead._id)}
                                                                        className="flex items-center gap-2 px-4 py-2 bg-royal text-white text-xs font-medium rounded-lg hover:bg-royal-light transition-colors hover:shadow-md"
                                                                    >
                                                                        <Save size={14} />
                                                                        Add Note
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                        )}
                                    </>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                <div className="p-4 border-t border-slate-100 text-center text-xs text-slate-400">
                    Data Source: MongoDB (Atlas)
                </div>
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-8 mb-6 md:mb-8">
                <div className="bg-white p-4 md:p-6 rounded-xl border border-slate-100 shadow-sm lg:col-span-1">
                    <h3 className="font-bold text-royal mb-4 md:mb-6 text-sm md:text-base">Conversion Overview</h3>
                    <div style={{ width: '100%', height: 200 }} className="md:h-64">
                        {conversionData[0].value > 0 ? (
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={conversionData}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                                    <XAxis dataKey="name" tick={{ fontSize: 10 }} stroke="#94a3b8" />
                                    <YAxis allowDecimals={false} stroke="#94a3b8" tick={{ fontSize: 10 }} />
                                    <RechartsTooltip cursor={{ fill: 'transparent' }} />
                                    <Bar dataKey="value" fill="#1a365d" radius={[4, 4, 0, 0]}>
                                        {conversionData.map((_, index) => (
                                            <Cell key={`cell-${index}`} fill={index === 1 ? '#10b981' : '#1a365d'} />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        ) : (
                            <div className="flex items-center justify-center h-full text-slate-400 text-sm">No data available</div>
                        )}
                    </div>
                </div>

                <div className="bg-white p-4 md:p-6 rounded-xl border border-slate-100 shadow-sm lg:col-span-2">
                    <h3 className="font-bold text-royal mb-4 md:mb-6 text-sm md:text-base">Inquiry & Admission Trend</h3>
                    <div style={{ width: '100%', height: 200 }} className="md:h-64">
                        {(analytics?.dailyStats?.length || 0) > 0 ? (
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={analytics?.dailyStats || []}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                                    <XAxis dataKey="_id" tick={{ fontSize: 10 }} stroke="#94a3b8" />
                                    <YAxis allowDecimals={false} stroke="#94a3b8" tick={{ fontSize: 10 }} />
                                    <RechartsTooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                                    <Line type="monotone" dataKey="count" name="Inquiries" stroke="#1a365d" strokeWidth={2} dot={{ r: 3, fill: '#1a365d' }} activeDot={{ r: 5 }} />
                                    <Line type="monotone" dataKey="admitted" name="Admitted" stroke="#10b981" strokeWidth={2} dot={{ r: 3, fill: '#10b981' }} />
                                </LineChart>
                            </ResponsiveContainer>
                        ) : (
                            <div className="flex items-center justify-center h-full text-slate-400 text-sm">No trend data available</div>
                        )}
                    </div>
                </div>

                <div className="bg-white p-4 md:p-6 rounded-xl border border-slate-100 shadow-sm lg:col-span-3">
                    <h3 className="font-bold text-royal mb-4 md:mb-6 text-sm md:text-base">Distribution by Class</h3>
                    <div style={{ width: '100%', height: 180 }} className="md:h-52">
                        {(analytics?.leadsByClass?.length || 0) > 0 ? (
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={analytics?.leadsByClass || []}
                                        cx="50%"
                                        cy="50%"
                                        labelLine={false}
                                        innerRadius={40}
                                        outerRadius={60}
                                        fill="#8884d8"
                                        dataKey="count"
                                        nameKey="_id"
                                    >
                                        {(analytics?.leadsByClass || []).map((_, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <RechartsTooltip />
                                </PieChart>
                            </ResponsiveContainer>
                        ) : (
                            <div className="flex items-center justify-center h-full text-slate-400 text-sm">No class data</div>
                        )}
                    </div>
                    <div className="flex flex-wrap justify-center gap-2 md:gap-4 mt-4">
                        {(analytics?.leadsByClass || []).map((entry, index) => (
                            <div key={index} className="flex items-center gap-1.5 text-[10px] md:text-xs">
                                <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                                <span className="text-slate-600">{entry._id} ({entry.count})</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
