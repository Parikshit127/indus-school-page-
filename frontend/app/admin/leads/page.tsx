"use client";

import { useEffect, useState } from "react";
import { Section } from "@/components/ui/section";
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer,
    PieChart, Pie, Cell, LineChart, Line
} from "recharts";
import { Calendar, Search, Filter, TrendingUp, Users, BookOpen } from "lucide-react";
import { motion } from "framer-motion";

const COLORS = ['#1a365d', '#c5a059', '#10b981', '#f59e0b', '#ef4444'];

export default function AdminDashboard() {
    const [leads, setLeads] = useState([]);
    const [analytics, setAnalytics] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    // Filters
    const [searchTerm, setSearchTerm] = useState("");
    const [classFilter, setClassFilter] = useState("All");

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

            const [leadsRes, analyticsRes] = await Promise.all([
                fetch(`${apiUrl}/api/leads`, { cache: 'no-store' }),
                fetch(`${apiUrl}/api/analytics`, { cache: 'no-store' })
            ]);

            if (leadsRes.ok) setLeads(await leadsRes.json());
            if (analyticsRes.ok) setAnalytics(await analyticsRes.json());
        } catch (e) {
            console.error("Fetch Error", e);
        } finally {
            setLoading(false);
        }
    };

    // Filter Logic
    const filteredLeads = leads.filter((lead: any) => {
        const matchesSearch =
            lead.studentName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            lead.parentName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            lead.phone?.includes(searchTerm);

        const matchesClass = classFilter === "All" || lead.class === classFilter;

        return matchesSearch && matchesClass;
    });

    const StatsCard = ({ title, value, icon: Icon, trend }: any) => (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm"
        >
            <div className="flex justify-between items-start">
                <div>
                    <p className="text-slate-500 text-sm font-medium mb-1">{title}</p>
                    <h3 className="text-3xl font-bold text-royal">{value}</h3>
                </div>
                <div className="p-2 bg-royal/5 rounded-lg text-royal">
                    <Icon size={24} />
                </div>
            </div>
            {trend && (
                <div className="mt-4 flex items-center gap-1 text-xs font-medium text-green-600">
                    <TrendingUp size={14} />
                    <span>{trend}</span>
                </div>
            )}
        </motion.div>
    );

    return (
        <Section className="min-h-screen bg-slate-50/50 pt-24 pb-12">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-serif font-bold text-royal">Dashboard</h1>
                        <p className="text-slate-500">Welcome back, Admin</p>
                    </div>
                    <div className="text-sm text-slate-400">
                        Last updated: {new Date().toLocaleTimeString()}
                    </div>
                </div>

                {/* Stats Row */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <StatsCard
                        title="Total Inquiries"
                        value={analytics?.totalLeads || 0}
                        icon={Users}
                        trend="+12% from last month"
                    />
                    <StatsCard
                        title="Recent Leads (7 Days)"
                        value={analytics?.recentLeads || 0}
                        icon={Calendar}
                        trend="Active Interest"
                    />
                    <StatsCard
                        title="Top Class Interest"
                        value={analytics?.leadsByClass?.[0]?._id || "N/A"}
                        icon={BookOpen}
                        trend="Most Popular"
                    />
                </div>

                {/* Charts Row */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                    {/* Daily Trend */}
                    <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
                        <h3 className="font-bold text-royal mb-6">Inquiry Trend (Last 14 Days)</h3>
                        <div className="h-64">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={analytics?.dailyStats || []}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                                    <XAxis dataKey="_id" tick={{ fontSize: 12 }} stroke="#94a3b8" />
                                    <YAxis allowDecimals={false} stroke="#94a3b8" />
                                    <RechartsTooltip
                                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                    />
                                    <Line type="monotone" dataKey="count" stroke="#1a365d" strokeWidth={3} dot={{ r: 4, fill: '#1a365d' }} activeDot={{ r: 6 }} />
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

                        <div className="flex gap-3 w-full md:w-auto">
                            {/* Search */}
                            <div className="relative flex-1 md:w-64">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                                <input
                                    type="text"
                                    placeholder="Search name, phone..."
                                    className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-royal/20"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>

                            {/* Filter */}
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
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left text-slate-600">
                            <thead className="text-xs text-royal uppercase bg-slate-50/50">
                                <tr>
                                    <th className="px-6 py-4 font-bold">Date</th>
                                    <th className="px-6 py-4 font-bold">Student</th>
                                    <th className="px-6 py-4 font-bold">Parent</th>
                                    <th className="px-6 py-4 font-bold">Contact</th>
                                    <th className="px-6 py-4 font-bold">Class</th>
                                    <th className="px-6 py-4 font-bold">Details</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loading ? (
                                    <tr><td colSpan={6} className="px-6 py-8 text-center">Loading...</td></tr>
                                ) : filteredLeads.length === 0 ? (
                                    <tr><td colSpan={6} className="px-6 py-8 text-center text-slate-400">No leads found.</td></tr>
                                ) : (
                                    filteredLeads.map((lead: any) => (
                                        <tr key={lead._id || lead.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                                            <td className="px-6 py-4 font-medium whitespace-nowrap">
                                                {new Date(lead.createdAt || lead.date).toLocaleDateString()}
                                            </td>
                                            <td className="px-6 py-4 font-bold text-royal">
                                                {lead.studentName}
                                            </td>
                                            <td className="px-6 py-4">{lead.parentName}</td>
                                            <td className="px-6 py-4">
                                                <div className="flex flex-col">
                                                    <span>{lead.phone}</span>
                                                    <span className="text-xs text-slate-400">{lead.email}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="inline-flex items-center rounded-full bg-gold/10 px-2.5 py-0.5 text-xs font-medium text-royal">
                                                    {lead.class}
                                                </span>
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
                        Data Source: MongoDB (Atlas/Local)
                    </div>
                </div>
            </div>
        </Section>
    );
}
