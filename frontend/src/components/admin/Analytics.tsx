import { useEffect, useState } from "react";
import { Users, UserCheck, UserPlus, UserX, TrendingUp, Calendar } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { motion } from "framer-motion";

interface StatusStats {
    New: number;
    Contacted: number;
    Admitted: number;
    Closed: number;
}

const STATUS_COLORS = {
    'New': '#3b82f6',
    'Contacted': '#f59e0b',
    'Admitted': '#10b981',
    'Closed': '#ef4444'
};

const STATUS_ICONS = {
    'New': Users,
    'Contacted': UserCheck,
    'Admitted': UserPlus,
    'Closed': UserX
};

const StatsCard = ({ title, value, icon: Icon, color }: { title: string; value: number; icon: any; color: string }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl p-6 shadow-sm border border-slate-100 hover:shadow-md transition-shadow"
    >
        <div className="flex items-center justify-between">
            <div>
                <p className="text-sm text-slate-500 font-medium mb-1">{title}</p>
                <p className="text-3xl font-bold text-slate-800">{value}</p>
            </div>
            <div className="p-3 rounded-lg" style={{ backgroundColor: `${color}20` }}>
                <Icon size={28} style={{ color }} />
            </div>
        </div>
    </motion.div>
);

export default function Analytics() {
    const [stats, setStats] = useState<StatusStats>({
        New: 0,
        Contacted: 0,
        Admitted: 0,
        Closed: 0
    });
    const [loading, setLoading] = useState(true);
    const [dateRange, setDateRange] = useState<'today' | 'week' | 'month' | 'year' | 'custom'>('month');
    const [customStart, setCustomStart] = useState("");
    const [customEnd, setCustomEnd] = useState("");
    const [allLeads, setAllLeads] = useState<any[]>([]);

    useEffect(() => {
        fetchAnalytics();
    }, []);

    useEffect(() => {
        if (allLeads.length > 0) {
            calculateStats();
        }
    }, [dateRange, customStart, customEnd, allLeads]);

    const fetchAnalytics = async () => {
        const token = localStorage.getItem("adminToken");
        if (!token) return;

        try {
            const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:4000';
            const response = await fetch(`${apiUrl}/api/leads`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                const leads = await response.json();
                setAllLeads(leads);
            }
        } catch (error) {
            console.error("Failed to fetch analytics", error);
        } finally {
            setLoading(false);
        }
    };

    const getDateRange = () => {
        const now = new Date();
        let start = new Date();

        switch (dateRange) {
            case 'today':
                start.setHours(0, 0, 0, 0);
                break;
            case 'week':
                start.setDate(now.getDate() - 7);
                break;
            case 'month':
                start.setMonth(now.getMonth() - 1);
                break;
            case 'year':
                start.setFullYear(now.getFullYear() - 1);
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

    const calculateStats = () => {
        const range = getDateRange();
        if (!range) {
            // If custom range not set, show all
            const statusCounts: StatusStats = {
                New: 0,
                Contacted: 0,
                Admitted: 0,
                Closed: 0
            };

            allLeads.forEach((lead: any) => {
                const status = lead.status || 'New';
                if (status in statusCounts) {
                    statusCounts[status as keyof StatusStats]++;
                }
            });

            setStats(statusCounts);
            return;
        }

        const filteredLeads = allLeads.filter((lead: any) => {
            const leadDate = new Date(lead.createdAt || lead.date);
            return leadDate >= range.start && leadDate <= range.end;
        });

        const statusCounts: StatusStats = {
            New: 0,
            Contacted: 0,
            Admitted: 0,
            Closed: 0
        };

        filteredLeads.forEach((lead: any) => {
            const status = lead.status || 'New';
            if (status in statusCounts) {
                statusCounts[status as keyof StatusStats]++;
            }
        });

        setStats(statusCounts);
    };

    const chartData = [
        { name: 'New', value: stats.New, color: STATUS_COLORS.New },
        { name: 'Contacted', value: stats.Contacted, color: STATUS_COLORS.Contacted },
        { name: 'Admitted', value: stats.Admitted, color: STATUS_COLORS.Admitted },
        { name: 'Closed', value: stats.Closed, color: STATUS_COLORS.Closed }
    ];

    const totalLeads = stats.New + stats.Contacted + stats.Admitted + stats.Closed;

    return (
        <div className="p-6 max-w-7xl mx-auto">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-royal mb-2">Analytics Dashboard</h1>
                <p className="text-slate-600">Track inquiry status and conversion metrics</p>
            </div>

            {/* Date Range Filters */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100 mb-8">
                <div className="flex items-center gap-2 mb-4">
                    <Calendar className="text-royal" size={20} />
                    <h3 className="font-bold text-royal">Date Range</h3>
                </div>

                <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex flex-wrap gap-2">
                        <button
                            onClick={() => setDateRange('today')}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                                dateRange === 'today'
                                    ? 'bg-royal text-white shadow-md'
                                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                            }`}
                        >
                            Today
                        </button>
                        <button
                            onClick={() => setDateRange('week')}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                                dateRange === 'week'
                                    ? 'bg-royal text-white shadow-md'
                                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                            }`}
                        >
                            Last 7 Days
                        </button>
                        <button
                            onClick={() => setDateRange('month')}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                                dateRange === 'month'
                                    ? 'bg-royal text-white shadow-md'
                                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                            }`}
                        >
                            Last Month
                        </button>
                        <button
                            onClick={() => setDateRange('year')}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                                dateRange === 'year'
                                    ? 'bg-royal text-white shadow-md'
                                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                            }`}
                        >
                            Last Year
                        </button>
                        <button
                            onClick={() => setDateRange('custom')}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                                dateRange === 'custom'
                                    ? 'bg-royal text-white shadow-md'
                                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                            }`}
                        >
                            Custom Range
                        </button>
                    </div>

                    {dateRange === 'custom' && (
                        <div className="flex flex-col md:flex-row gap-3 flex-1">
                            <div className="flex-1">
                                <label className="block text-xs text-slate-500 mb-1 font-medium">Start Date</label>
                                <input
                                    type="date"
                                    value={customStart}
                                    onChange={(e) => setCustomStart(e.target.value)}
                                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-royal/20"
                                />
                            </div>
                            <div className="flex-1">
                                <label className="block text-xs text-slate-500 mb-1 font-medium">End Date</label>
                                <input
                                    type="date"
                                    value={customEnd}
                                    onChange={(e) => setCustomEnd(e.target.value)}
                                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-royal/20"
                                />
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {loading ? (
                <div className="flex items-center justify-center h-64">
                    <div className="text-slate-400">Loading analytics...</div>
                </div>
            ) : (
                <>
                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        <StatsCard 
                            title="New Inquiries" 
                            value={stats.New} 
                            icon={STATUS_ICONS.New}
                            color={STATUS_COLORS.New}
                        />
                        <StatsCard 
                            title="Contacted" 
                            value={stats.Contacted} 
                            icon={STATUS_ICONS.Contacted}
                            color={STATUS_COLORS.Contacted}
                        />
                        <StatsCard 
                            title="Admitted" 
                            value={stats.Admitted} 
                            icon={STATUS_ICONS.Admitted}
                            color={STATUS_COLORS.Admitted}
                        />
                        <StatsCard 
                            title="Closed" 
                            value={stats.Closed} 
                            icon={STATUS_ICONS.Closed}
                            color={STATUS_COLORS.Closed}
                        />
                    </div>

                    {/* Bar Chart */}
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h2 className="text-xl font-bold text-royal mb-1">Status Distribution</h2>
                                <p className="text-sm text-slate-500">Total Inquiries: {totalLeads}</p>
                            </div>
                            <div className="p-2 bg-royal/10 rounded-lg">
                                <TrendingUp className="text-royal" size={24} />
                            </div>
                        </div>

                        <div style={{ width: '100%', height: 400 }}>
                            {totalLeads > 0 ? (
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={chartData}>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                                        <XAxis 
                                            dataKey="name" 
                                            tick={{ fontSize: 14, fill: '#64748b' }}
                                            axisLine={{ stroke: '#E2E8F0' }}
                                        />
                                        <YAxis 
                                            allowDecimals={false}
                                            tick={{ fontSize: 14, fill: '#64748b' }}
                                            axisLine={{ stroke: '#E2E8F0' }}
                                        />
                                        <Tooltip 
                                            cursor={{ fill: 'transparent' }}
                                            contentStyle={{ 
                                                borderRadius: '8px', 
                                                border: 'none', 
                                                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                                                padding: '12px'
                                            }}
                                        />
                                        <Bar dataKey="value" radius={[8, 8, 0, 0]} barSize={60}>
                                            {chartData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.color} />
                                            ))}
                                        </Bar>
                                    </BarChart>
                                </ResponsiveContainer>
                            ) : (
                                <div className="flex items-center justify-center h-full text-slate-400">
                                    No data available for selected date range
                                </div>
                            )}
                        </div>

                        {/* Legend */}
                        <div className="flex flex-wrap justify-center gap-6 mt-6 pt-6 border-t border-slate-100">
                            {chartData.map((item) => (
                                <div key={item.name} className="flex items-center gap-2">
                                    <div 
                                        className="w-4 h-4 rounded" 
                                        style={{ backgroundColor: item.color }}
                                    />
                                    <span className="text-sm text-slate-600 font-medium">
                                        {item.name}: {item.value}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
