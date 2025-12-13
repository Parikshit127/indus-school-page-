import { LayoutDashboard, FileEdit, LogOut, Image as ImageIcon, Users, Calendar, GraduationCap } from "lucide-react";

interface AdminSidebarProps {
    activeTab: 'dashboard' | 'content' | 'gallery' | 'members' | 'calendar' | 'teachers';
    setActiveTab: (tab: 'dashboard' | 'content' | 'gallery' | 'members' | 'calendar' | 'teachers') => void;
    onLogout: () => void;
}

export function AdminSidebar({ activeTab, setActiveTab, onLogout }: AdminSidebarProps) {
    return (
        <div className="w-64 bg-royal-dark min-h-screen text-white flex flex-col fixed left-0 top-0 h-full z-10 shadow-xl">
            <div className="p-6 border-b border-white/10">
                <h2 className="text-xl font-serif font-bold text-gold">Indus Admin</h2>
                <p className="text-xs text-white/50 mt-1">Management Console</p>
            </div>

            <nav className="flex-1 p-4 space-y-2">
                <button
                    onClick={() => setActiveTab('dashboard')}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${activeTab === 'dashboard'
                            ? 'bg-gold text-royal-dark font-bold shadow-lg shadow-gold/20'
                            : 'text-white/70 hover:bg-white/5 hover:text-white'
                        }`}
                >
                    <LayoutDashboard size={20} />
                    <span>Dashboard</span>
                </button>

                <button
                    onClick={() => setActiveTab('content')}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${activeTab === 'content'
                            ? 'bg-gold text-royal-dark font-bold shadow-lg shadow-gold/20'
                            : 'text-white/70 hover:bg-white/5 hover:text-white'
                        }`}
                >
                    <FileEdit size={20} />
                    <span>Page Content</span>
                </button>

                <button
                    onClick={() => setActiveTab('gallery')}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${activeTab === 'gallery'
                            ? 'bg-gold text-royal-dark font-bold shadow-lg shadow-gold/20'
                            : 'text-white/70 hover:bg-white/5 hover:text-white'
                        }`}
                >
                    <ImageIcon size={20} />
                    <span>Gallery</span>
                </button>

                <button
                    onClick={() => setActiveTab('teachers')}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${activeTab === 'teachers'
                            ? 'bg-gold text-royal-dark font-bold shadow-lg shadow-gold/20'
                            : 'text-white/70 hover:bg-white/5 hover:text-white'
                        }`}
                >
                    <GraduationCap size={20} />
                    <span>Teaching Staff</span>
                </button>

                <button
                    onClick={() => setActiveTab('members')}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${activeTab === 'members'
                            ? 'bg-gold text-royal-dark font-bold shadow-lg shadow-gold/20'
                            : 'text-white/70 hover:bg-white/5 hover:text-white'
                        }`}
                >
                    <Users size={20} />
                    <span>Members</span>
                </button>

                <button
                    onClick={() => setActiveTab('calendar')}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${activeTab === 'calendar'
                            ? 'bg-gold text-royal-dark font-bold shadow-lg shadow-gold/20'
                            : 'text-white/70 hover:bg-white/5 hover:text-white'
                        }`}
                >
                    <Calendar size={20} />
                    <span>School Calendar</span>
                </button>
            </nav>

            <div className="p-4 border-t border-white/10">
                <button
                    onClick={onLogout}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-400 hover:bg-red-500/10 transition-colors"
                >
                    <LogOut size={20} />
                    <span>Logout</span>
                </button>
            </div>
        </div>
    );
}
