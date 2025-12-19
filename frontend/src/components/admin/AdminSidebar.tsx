import { LayoutDashboard, FileEdit, LogOut, Image as ImageIcon, Users, Calendar, GraduationCap, BarChart3, Newspaper, Trophy } from "lucide-react";

interface AdminSidebarProps {
    activeTab: 'dashboard' | 'content' | 'gallery' | 'members' | 'calendar' | 'teachers' | 'analytics' | 'news' | 'results';
    setActiveTab: (tab: 'dashboard' | 'content' | 'gallery' | 'members' | 'calendar' | 'teachers' | 'analytics' | 'news' | 'results') => void;
    onLogout: () => void;
    isOpen?: boolean;
    onClose?: () => void;
}

export function AdminSidebar({ activeTab, setActiveTab, onLogout, isOpen, onClose }: AdminSidebarProps) {
    return (
        <div className={`w-64 bg-royal-dark min-h-screen text-white flex flex-col fixed left-0 top-0 h-full z-50 shadow-xl transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'
            } md:translate-x-0`}>
            <div className="p-6 border-b border-white/10 flex justify-between items-center">
                <div>
                    <h2 className="text-xl font-serif font-bold text-gold">Indus Admin</h2>
                    <p className="text-xs text-white/50 mt-1">Management Console</p>
                </div>
                <button onClick={onClose} className="md:hidden text-white/70 hover:text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                </button>
            </div>

            <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
                <button
                    onClick={() => { setActiveTab('dashboard'); onClose?.(); }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${activeTab === 'dashboard'
                            ? 'bg-gold text-royal-dark font-bold shadow-lg shadow-gold/20'
                            : 'text-white/70 hover:bg-white/5 hover:text-white'
                        }`}
                >
                    <LayoutDashboard size={20} />
                    <span>Dashboard</span>
                </button>

                <button
                    onClick={() => { setActiveTab('analytics'); onClose?.(); }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${activeTab === 'analytics'
                            ? 'bg-gold text-royal-dark font-bold shadow-lg shadow-gold/20'
                            : 'text-white/70 hover:bg-white/5 hover:text-white'
                        }`}
                >
                    <BarChart3 size={20} />
                    <span>Analytics</span>
                </button>

                <button
                    onClick={() => { setActiveTab('content'); onClose?.(); }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${activeTab === 'content'
                            ? 'bg-gold text-royal-dark font-bold shadow-lg shadow-gold/20'
                            : 'text-white/70 hover:bg-white/5 hover:text-white'
                        }`}
                >
                    <FileEdit size={20} />
                    <span>Page Content</span>
                </button>

                <button
                    onClick={() => { setActiveTab('news'); onClose?.(); }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${activeTab === 'news'
                            ? 'bg-gold text-royal-dark font-bold shadow-lg shadow-gold/20'
                            : 'text-white/70 hover:bg-white/5 hover:text-white'
                        }`}
                >
                    <Newspaper size={20} />
                    <span>News & Events</span>
                </button>

                <button
                    onClick={() => { setActiveTab('gallery'); onClose?.(); }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${activeTab === 'gallery'
                            ? 'bg-gold text-royal-dark font-bold shadow-lg shadow-gold/20'
                            : 'text-white/70 hover:bg-white/5 hover:text-white'
                        }`}
                >
                    <ImageIcon size={20} />
                    <span>Gallery</span>
                </button>

                <button
                    onClick={() => { setActiveTab('results'); onClose?.(); }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${activeTab === 'results'
                            ? 'bg-gold text-royal-dark font-bold shadow-lg shadow-gold/20'
                            : 'text-white/70 hover:bg-white/5 hover:text-white'
                        }`}
                >
                    <Trophy size={20} />
                    <span>Academic Results</span>
                </button>

                <button
                    onClick={() => { setActiveTab('teachers'); onClose?.(); }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${activeTab === 'teachers'
                            ? 'bg-gold text-royal-dark font-bold shadow-lg shadow-gold/20'
                            : 'text-white/70 hover:bg-white/5 hover:text-white'
                        }`}
                >
                    <GraduationCap size={20} />
                    <span>Teaching Staff</span>
                </button>

                <button
                    onClick={() => { setActiveTab('members'); onClose?.(); }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${activeTab === 'members'
                            ? 'bg-gold text-royal-dark font-bold shadow-lg shadow-gold/20'
                            : 'text-white/70 hover:bg-white/5 hover:text-white'
                        }`}
                >
                    <Users size={20} />
                    <span>Members</span>
                </button>

                <button
                    onClick={() => { setActiveTab('calendar'); onClose?.(); }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${activeTab === 'calendar'
                            ? 'bg-gold text-royal-dark font-bold shadow-lg shadow-gold/20'
                            : 'text-white/70 hover:bg-white/5 hover:text-white'
                        }`}
                >
                    <Calendar size={20} />
                    <span>School Calendar</span>
                </button>

                <div className="pt-4 border-t border-white/10 mt-4">
                    <button
                        onClick={onLogout}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-400 hover:bg-red-500/10 transition-colors"
                    >
                        <LogOut size={20} />
                        <span>Logout</span>
                    </button>
                </div>
            </nav>
        </div>
    );
}
