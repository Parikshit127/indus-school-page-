import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Section } from "@/components/ui/section";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { DashboardOverview } from "@/components/admin/DashboardOverview";
import { ContentEditor } from "@/components/admin/ContentEditor";
import { GalleryManager } from "@/components/admin/GalleryManager";

export default function AdminDashboard() {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState<'dashboard' | 'content' | 'gallery'>('dashboard');

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
        <div className="flex bg-slate-50/50 min-h-screen">
            {/* Sidebar */}
            <AdminSidebar
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                onLogout={handleLogout}
            />

            {/* Main Content Area */}
            <div className="flex-1 ml-64">
                <Section className="min-h-screen pt-8 pb-12">
                    <div className="max-w-7xl mx-auto px-4">
                        {activeTab === 'dashboard' ? (
                            <DashboardOverview />
                        ) : activeTab === 'content' ? (
                            <ContentEditor />
                        ) : (
                            <GalleryManager />
                        )}
                    </div>
                </Section>
            </div>
        </div>
    );
}
