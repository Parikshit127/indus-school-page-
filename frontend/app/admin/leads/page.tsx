"use client";

import { useRouter } from "next/navigation";

import { useEffect, useState } from "react";
import { Section } from "@/components/ui/section";
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer,
    PieChart, Pie, Cell, LineChart, Line
} from "recharts";
import { Calendar, Search, Filter, TrendingUp, Users, BookOpen, Download } from "lucide-react";
import { motion } from "framer-motion";
import * as XLSX from 'xlsx';

const COLORS = ['#1a365d', '#c5a059', '#10b981', '#f59e0b', '#ef4444'];

// Status Options
const STATUS_OPTIONS = ['New', 'Contacted', 'Admitted', 'Closed'];

const STATUS_COLORS: any = {
    'New': 'bg-blue-100 text-blue-800',
    'Contacted': 'bg-yellow-100 text-yellow-800',
    'Admitted': 'bg-green-100 text-green-800',
    'Closed': 'bg-red-100 text-red-800'
};

export default function AdminDashboard() {
    const [leads, setLeads] = useState([]);
    const [analytics, setAnalytics] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    // Filters
    const [searchTerm, setSearchTerm] = useState("");
    const [classFilter, setClassFilter] = useState("All");
    const [statusFilter, setStatusFilter] = useState("All");
    const [dateRange, setDateRange] = useState("30d");
    const [customStart, setCustomStart] = useState("");
    const [customEnd, setCustomEnd] = useState("");

    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem("adminToken");
        if (!token) {
            router.push("/admin/login");
        } else {
            fetchData(token);
        }
    }, [dateRange, customStart, customEnd]);

    const fetchData = async (token: string) => {
        setLoading(true);
        try {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

            // Calculate Dates based on Range
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
                    cache: 'no-store',
                    headers: { 'Authorization': `Bearer ${token}` }
                }),
                fetch(`${apiUrl}/api/analytics?${queryParams.toString()}`, {
                    cache: 'no-store',
                    headers: { 'Authorization': `Bearer ${token}` }
                })
            ]);

            if (leadsRes.status === 401 || leadsRes.status === 403) {
                localStorage.removeItem("adminToken");
                // Clear cookie
                document.cookie = "adminToken=; path=/; max-age=0";
                router.push("/admin/login");
                return;
            }

            if (leadsRes.ok) setLeads(await leadsRes.json());
            if (analyticsRes.ok) setAnalytics(await analyticsRes.json());
        } catch (e) {
            console.error("Fetch Error", e);
        } finally {
            setLoading(false);
        }
    };

    const handleStatusChange = async (id: string, newStatus: string) => {
        const token = localStorage.getItem("adminToken");
        if (!token) return;

        // Optimistic Update
        const updatedLeads: any = leads.map((lead: any) =>
            lead._id === id ? { ...lead, status: newStatus } : lead
        );
        setLeads(updatedLeads);

        try {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
            const response = await fetch(`${apiUrl}/api/leads/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ status: newStatus })
            });

            if (response.ok) {
                // Only refetch analytics to update conversion stats, not all leads
                const queryParams = new URLSearchParams();
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

                if (startDate) queryParams.append("startDate", startDate);
                if (endDate) queryParams.append("endDate", endDate);

                const analyticsRes = await fetch(`${apiUrl}/api/analytics?${queryParams.toString()}`, {
                    cache: 'no-store',
                    headers: { 'Authorization': `Bearer ${token}` }
                });

                if (analyticsRes.ok) {
                    setAnalytics(await analyticsRes.json());
                }
            } else {
                // Revert on failure
                fetchData(token);
            }
        } catch (error) {
            console.error("Failed to update status", error);
            // Revert on failure
            fetchData(token);
        }
    };

    const exportToExcel = () => {
        // Prepare data for export
        const exportData = filteredLeads.map((lead: any) => ({
            'Date': new Date(lead.createdAt || lead.date).toLocaleDateString(),
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

        // Create worksheet
        const ws = XLSX.utils.json_to_sheet(exportData);

        // Set column widths
        const colWidths = [
            { wch: 12 }, // Date
            { wch: 20 }, // Student Name
            { wch: 20 }, // Father Name
            { wch: 15 }, // City
            { wch: 15 }, // State
            { wch: 15 }, // Phone
            { wch: 25 }, // Email
            { wch: 20 }, // Class
            { wch: 12 }, // Status
            { wch: 30 }  // Message
        ];
        ws['!cols'] = colWidths;

        // Create workbook
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Leads');

        // Generate filename with current date
        const fileName = `Indus_School_Leads_${new Date().toISOString().split('T')[0]}.xlsx`;

        // Download
        XLSX.writeFile(wb, fileName);
    };

    // Filter Logic for Table (Client Side)
    const filteredLeads = leads.filter((lead: any) => {
        const matchesSearch =
            lead.studentName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            lead.fatherName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            lead.city?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            lead.phone?.includes(searchTerm);

        const matchesClass = classFilter === "All" || lead.class === classFilter;
        const matchesStatus = statusFilter === "All" || lead.status === statusFilter || (!lead.status && statusFilter === "New");

        return matchesSearch && matchesClass && matchesStatus;
    });

    const StatsCard = ({ title, value, icon: Icon, trend }: any) => (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow"
        >
            <div className="flex justify-between items-start">
                <div>
                    <p className="text-slate-500 text-sm font-medium mb-1">{title}</p>
                    <h3 className="text-3xl font-bold text-royal">{value}</h3>
                </div>
                <div className="p-3 bg-gradient-to-br from-royal/10 to-gold/10 rounded-lg text-royal">
                    <Icon size={24} />
                </div>
            </div>
            {trend && (
                <div className="mt-4 flex items-center gap-1 text-xs font-medium text-emerald-600 bg-emerald-50 w-fit px-2 py-1 rounded-full">
                    <TrendingUp size={12} />
                    <span>{trend}</span>
                </div>
            )}
        </motion.div>
    );

    const conversionData = [
        { name: 'Total Inquiries', value: analytics?.conversionStats?.total || 0 },
        { name: 'Admitted', value: analytics?.conversionStats?.admitted || 0 },
    ];

    return (
        <Section className="min-h-screen bg-slate-50/50 pt-24 pb-12">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                    <div>
                        <h1 className="text-3xl font-serif font-bold text-royal">Admin Dashboard</h1>
                        <p className="text-slate-500">Overview of admissions and inquiries</p>
                    </div>

                    {/* Date Filters */}
                    <div className="flex flex-wrap items-center gap-3 bg-white p-2 rounded-lg border border-slate-200 shadow-sm">
                        <select
                            className="bg-transparent text-sm font-medium text-royal focus:outline-none cursor-pointer"
                            value={dateRange}
                            onChange={(e) => setDateRange(e.target.value)}
                        >
                            <option value="7d">Last 7 Days</option>
                            <option value="30d">Last 30 Days</option>
                            <option value="month">This Month</option>
                            <option value="custom">Custom Range</option>
                        </select>

                        {dateRange === "custom" && (
                            <div className="flex items-center gap-2 border-l border-slate-200 pl-3">
                                <input
                                    type="date"
                                    className="text-xs border border-slate-200 rounded px-2 py-1"
                                    value={customStart}
                                    onChange={(e) => setCustomStart(e.target.value)}
                                />
                                <span className="text-slate-400">-</span>
                                <input
                                    type="date"
                                    className="text-xs border border-slate-200 rounded px-2 py-1"
                                    value={customEnd}
                                    onChange={(e) => setCustomEnd(e.target.value)}
                                />
                            </div>
                        )}
                        <span className="text-xs text-slate-400 pl-3 border-l border-slate-200">
                            {loading ? "Syncing..." : "Updated"}
                        </span>
                    </div>
                </div>

                {/* Stats Row */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <StatsCard
                        title="Total Inquiries"
                        value={analytics?.totalLeads || 0}
                        icon={Users}
                    />
                    <StatsCard
                        title="Selected Period"
                        value={analytics?.periodLeads || 0}
                        icon={Calendar}
                        trend="In Range"
                    />
                    <StatsCard
                        title="Admissions (Period)"
                        value={analytics?.conversionStats?.admitted || 0}
                        icon={BookOpen}
                        trend={`${analytics?.conversionStats?.rate || 0}% Rate`}
                    />
                    <StatsCard
                        title="Pending Actions"
                        value={analytics?.periodLeads - analytics?.conversionStats?.admitted || 0}
                        icon={Filter}
                        trend="Follow-up needed"
                    />
                </div>

                {/* Charts Row */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                    {/* Conversion Chart */}
                    <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm lg:col-span-1">
                        <h3 className="font-bold text-royal mb-6">Conversion Overview</h3>
                        <div className="h-64">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={conversionData}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                                    <XAxis dataKey="name" tick={{ fontSize: 12 }} stroke="#94a3b8" />
                                    <YAxis allowDecimals={false} stroke="#94a3b8" />
                                    <RechartsTooltip cursor={{ fill: 'transparent' }} />
                                    <Bar dataKey="value" fill="#1a365d" radius={[4, 4, 0, 0]}>
                                        {conversionData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={index === 1 ? '#10b981' : '#1a365d'} />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Daily Trend */}
                    <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm lg:col-span-2">
                        <h3 className="font-bold text-royal mb-6">Inquiry & Admission Trend</h3>
                        <div className="h-64">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={analytics?.dailyStats || []}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                                    <XAxis dataKey="_id" tick={{ fontSize: 12 }} stroke="#94a3b8" />
                                    <YAxis allowDecimals={false} stroke="#94a3b8" />
                                    <RechartsTooltip
                                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                    />
                                    <Line type="monotone" dataKey="count" name="Inquiries" stroke="#1a365d" strokeWidth={3} dot={{ r: 4, fill: '#1a365d' }} activeDot={{ r: 6 }} />
                                    <Line type="monotone" dataKey="admitted" name="Admitted" stroke="#10b981" strokeWidth={3} dot={{ r: 4, fill: '#10b981' }} />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Class Distribution */}
                    <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
                        <h3 className="font-bold text-royal mb-6">Distribution by Class</h3>
                        <div className="h-64">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={analytics?.leadsByClass || []}
                                        cx="50%"
                                        cy="50%"
                                        labelLine={false}
                                        innerRadius={60}
                                        outerRadius={80}
                                        fill="#8884d8"
                                        dataKey="count"
                                        nameKey="_id"
                                    >
                                        {(analytics?.leadsByClass || []).map((entry: any, index: number) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <RechartsTooltip />
                                </PieChart>
                            </ResponsiveContainer>
                            <div className="flex flex-wrap justify-center gap-4 mt-4">
                                {(analytics?.leadsByClass || []).map((entry: any, index: number) => (
                                    <div key={index} className="flex items-center gap-2 text-xs">
                                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                                        <span className="text-slate-600">{entry._id} ({entry.count})</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Detailed Table */}
                <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
                    <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4">
                        <h3 className="font-bold text-royal text-lg">Detailed Inquiries</h3>

                        <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto">
                            {/* Search */}
                            <div className="relative flex-1 md:w-64">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                                <input
                                    type="text"
                                    placeholder="Search details..."
                                    className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-royal/20"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>

                            {/* Class Filter */}
                            <select
                                className="px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-600 focus:outline-none focus:ring-2 focus:ring-royal/20"
                                value={classFilter}
                                onChange={(e) => setClassFilter(e.target.value)}
                            >
                                <option value="All">All Classes</option>
                                <option value="XI Medical">XI Medical</option>
                                <option value="XI Non-Medical">XI Non-Medical</option>
                                <option value="XI Commerce">XI Commerce</option>
                                <option value="XI Humanities">XI Humanities</option>
                            </select>

                            {/* Status Filter */}
                            <select
                                className="px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-600 focus:outline-none focus:ring-2 focus:ring-royal/20"
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                            >
                                <option value="All">All Status</option>
                                {STATUS_OPTIONS.map(status => (
                                    <option key={status} value={status}>{status}</option>
                                ))}
                            </select>

                            {/* Export Button */}
                            <button
                                onClick={exportToExcel}
                                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-royal to-royal/90 text-white rounded-lg text-sm font-medium hover:shadow-lg transition-all duration-200 hover:scale-105"
                            >
                                <Download size={16} />
                                <span>Export Excel</span>
                            </button>
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
                                </tr>
                            </thead>
                            <tbody>
                                {loading ? (
                                    <tr><td colSpan={8} className="px-6 py-8 text-center">Loading...</td></tr>
                                ) : filteredLeads.length === 0 ? (
                                    <tr><td colSpan={8} className="px-6 py-8 text-center text-slate-400">No leads found.</td></tr>
                                ) : (
                                    filteredLeads.map((lead: any) => (
                                        <tr key={lead._id || lead.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                                            <td className="px-6 py-4 font-medium whitespace-nowrap">
                                                {new Date(lead.createdAt || lead.date).toLocaleDateString()}
                                            </td>
                                            <td className="px-6 py-4 font-bold text-royal">
                                                {lead.studentName}
                                            </td>
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
                                                    className={`text-xs font-semibold px-2 py-1 rounded-full border-none focus:ring-2 focus:ring-royal/20 cursor-pointer ${STATUS_COLORS[lead.status] || STATUS_COLORS['New']}`}
                                                >
                                                    {STATUS_OPTIONS.map(opt => (
                                                        <option key={opt} value={opt}>{opt}</option>
                                                    ))}
                                                </select>
                                            </td>
                                            <td className="px-6 py-4 max-w-xs truncate" title={lead.message}>
                                                {lead.message || "-"}
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>

                    <div className="p-4 border-t border-slate-100 text-center text-xs text-slate-400">
                        Data Source: MongoDB (Atlas)
                    </div>
                </div>
            </div >
        </Section >
    );
}
