import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { GalleryManager } from "@/components/admin/GalleryManager";
import { MemberManager } from "@/components/admin/MemberManager";
import { CalendarManager } from "@/components/admin/CalendarManager";
import { TeacherManager } from "@/components/admin/TeacherManager";
import Analytics from "@/components/admin/Analytics";
import { NewsEventsManager } from "@/components/admin/NewsEventsManager";
import { ResultsManager } from "@/components/admin/ResultsManager";
import { PopupBannerManager } from "@/components/admin/PopupBannerManager";
import { AchievementManager } from "@/components/admin/AchievementManager";
import { ContentEditor } from "@/components/admin/ContentEditor";
import { Menu } from "lucide-react";

export default function AdminDashboard() {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState<'dashboard' | 'content' | 'gallery' | 'members' | 'calendar' | 'teachers' | 'analytics' | 'news' | 'results' | 'popups' | 'achievements'>('dashboard');
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

            {/* Main Content - Add left margin for fixed sidebar on desktop */}
            <main className="flex-1 md:ml-64 p-6 md:p-10 mt-14 md:mt-0 overflow-y-auto min-h-screen">
                <div className="max-w-7xl mx-auto">
                    {/* Header */}
                    <div className="flex justify-between items-end mb-8">
                        <div>
                            <h2 className="text-2xl md:text-3xl font-serif font-bold text-royal">
                                {activeTab === 'dashboard' && 'Dashboard Overview'}
                                {activeTab === 'content' && 'Content Management'}
                                {activeTab === 'gallery' && 'Gallery Management'}
                                {activeTab === 'members' && 'Managing Committee'}
                                {activeTab === 'calendar' && 'Academic Calendar'}
                                {activeTab === 'teachers' && 'Faculty Management'}
                                {activeTab === 'analytics' && 'Lead Analytics'}
                                {activeTab === 'news' && 'News & Events'}
                                {activeTab === 'results' && 'Academic Results'}
                                {activeTab === 'popups' && 'Popup Banners'}
                                {activeTab === 'achievements' && 'Achievements'}
                            </h2>
                            <p className="text-slate-500 mt-1 text-sm">Welcome back, Administrator</p>
                        </div>
                        <div className="text-right hidden md:block">
                            <p className="text-sm font-bold text-royal">Indus Public School</p>
                            <p className="text-xs text-slate-400">Admin Panel v1.0</p>
                        </div>
                    </div>

                    {/* Content Area - Render component based on activeTab */}
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                        {activeTab === 'dashboard' && <Analytics />}
                        {activeTab === 'analytics' && <Analytics />}
                        {activeTab === 'content' && <ContentEditor />}
                        {activeTab === 'gallery' && <GalleryManager />}
                        {activeTab === 'members' && <MemberManager />}
                        {activeTab === 'calendar' && <CalendarManager />}
                        {activeTab === 'teachers' && <TeacherManager />}
                        {activeTab === 'news' && <NewsEventsManager />}
                        {activeTab === 'results' && <ResultsManager />}
                        {activeTab === 'popups' && <PopupBannerManager />}
                        {activeTab === 'achievements' && <AchievementManager />}
                    </div>
                </div>
            </main>
        </div>
    );
}
