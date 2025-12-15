
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Section } from "@/components/ui/section";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { DashboardOverview } from "@/components/admin/DashboardOverview";
import { ContentEditor } from "@/components/admin/ContentEditor";
import { GalleryManager } from "@/components/admin/GalleryManager";
import { MemberManager } from "@/components/admin/MemberManager";
import { CalendarManager } from "@/components/admin/CalendarManager";
import { TeacherManager } from "@/components/admin/TeacherManager";
import Analytics from "@/components/admin/Analytics";
import { Menu } from "lucide-react";


export default function AdminDashboard() {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState<'dashboard' | 'content' | 'gallery' | 'members' | 'calendar' | 'teachers' | 'analytics'>('dashboard');
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("adminToken");
        if (!token) {
            navigate("/admin/login");
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem("adminToken");
        navigate("/admin/login");
    };

    return (
        <div className="flex bg-slate-50/50 min-h-screen relative">
            {/* Mobile Header Bar */}
            <div className="md:hidden fixed top-0 left-0 right-0 z-30 bg-royal-dark text-white px-4 py-3 flex items-center justify-between shadow-lg">
                <div>
                    <h1 className="text-lg font-serif font-bold text-gold">Indus Admin</h1>
                    <p className="text-[10px] text-white/60">Management Console</p>
                </div>
                <button
                    className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
                    onClick={() => setIsSidebarOpen(true)}
                >
                    <Menu size={22} />
                </button>
            </div>

            {/* Sidebar Overlay */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 md:hidden backdrop-blur-sm"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <AdminSidebar
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                onLogout={handleLogout}
                isOpen={isSidebarOpen}
                onClose={() => setIsSidebarOpen(false)}
            />

            {/* Main Content Area */}
            <div className={`flex-1 min-w-0 transition-all duration-300 md:ml-64 pt-16 md:pt-0`}>
                <Section className="min-h-screen pt-4 md:pt-8 pb-12">
                    <div className="max-w-7xl mx-auto px-3 md:px-4">
                        {activeTab === 'dashboard' && <DashboardOverview />}
                        {activeTab === 'content' && <ContentEditor />}
                        {activeTab === 'gallery' && <GalleryManager />}
                        {activeTab === 'members' && <MemberManager />}
                        {activeTab === 'calendar' && <CalendarManager />}
                        {activeTab === 'teachers' && <TeacherManager />}
                        {activeTab === 'analytics' && <Analytics />}
                    </div>
                </Section>
            </div>
        </div>
    );
}
