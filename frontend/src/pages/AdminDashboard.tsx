
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
            {/* Mobile Sidebar Toggle */}
            <button
                className="md:hidden fixed top-4 right-4 z-40 p-2 bg-royal-dark text-white rounded-lg shadow-lg"
                onClick={() => setIsSidebarOpen(true)}
            >
                <Menu size={24} />
            </button>

            {/* Sidebar Overlay */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 md:hidden"
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
            <div className={`flex-1 min-w-0 transition-all duration-300 md:ml-64`}>
                <Section className="min-h-screen pt-8 pb-12">
                    <div className="max-w-7xl mx-auto px-4">
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
