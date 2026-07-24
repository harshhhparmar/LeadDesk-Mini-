import { useEffect, useState } from 'react';
import { api, Lead } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { auth } from '../lib/firebase';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'motion/react';
import { 
  LogOut, 
  Search, 
  MoreVertical, 
  RefreshCw,
  Inbox,
  Clock,
  CheckCircle,
  Users,
  LayoutDashboard,
  Settings,
  Bell
} from 'lucide-react';

export function AdminDashboard() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  
  const { user } = useAuth();
  const navigate = useNavigate();

  const fetchLeads = async (search?: string) => {
    setLoading(true);
    try {
      const data = await api.getLeads(search);
      setLeads(data);
    } catch (error: any) {
      toast.error('Failed to load leads: ' + (error.message || 'Unknown error'));
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchLeads(searchQuery);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.success('Logged out successfully');
      navigate('/login');
    } catch (error: any) {
      toast.error('Failed to logout');
    }
  };

  const handleStatusChange = async (leadId: string, currentStatus: string) => {
    const statusOrder: ('New' | 'Contacted' | 'Closed')[] = ['New', 'Contacted', 'Closed'];
    const currentIndex = statusOrder.indexOf(currentStatus as any);
    const nextStatus = statusOrder[(currentIndex + 1) % statusOrder.length];
    
    try {
      await api.updateLeadStatus(leadId, nextStatus);
      toast.success(`Status updated to ${nextStatus}`);
      setLeads(leads.map(lead => 
        lead._id === leadId ? { ...lead, status: nextStatus } : lead
      ));
    } catch (error: any) {
      toast.error('Failed to update status');
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'New':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100/50 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 border border-blue-200 dark:border-blue-800">New</span>;
      case 'Contacted':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100/50 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300 border border-amber-200 dark:border-amber-800">Contacted</span>;
      case 'Closed':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100/50 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">Closed</span>;
      default:
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100/50 text-gray-800 dark:bg-gray-800/50 dark:text-gray-300 border border-gray-200 dark:border-gray-700">{status}</span>;
    }
  };

  const totalLeads = leads.length;
  const newLeads = leads.filter(l => l.status === 'New').length;
  const contactedLeads = leads.filter(l => l.status === 'Contacted').length;
  const closedLeads = leads.filter(l => l.status === 'Closed').length;

  const totalPages = Math.ceil(leads.length / itemsPerPage);
  const paginatedLeads = leads.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const stats = [
    { label: 'Total Leads', value: totalLeads, icon: <Inbox className="w-5 h-5 text-indigo-500" />, bg: 'bg-indigo-50 dark:bg-indigo-500/10' },
    { label: 'New', value: newLeads, icon: <Clock className="w-5 h-5 text-blue-500" />, bg: 'bg-blue-50 dark:bg-blue-500/10' },
    { label: 'Contacted', value: contactedLeads, icon: <Users className="w-5 h-5 text-amber-500" />, bg: 'bg-amber-50 dark:bg-amber-500/10' },
    { label: 'Closed', value: closedLeads, icon: <CheckCircle className="w-5 h-5 text-emerald-500" />, bg: 'bg-emerald-50 dark:bg-emerald-500/10' },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex h-screen overflow-hidden bg-gray-50 dark:bg-gray-950"
    >
      {/* Sidebar */}
      <motion.aside 
        initial={{ x: -250 }}
        animate={{ x: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="w-64 border-r border-gray-200/50 dark:border-gray-800/50 bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl hidden lg:flex flex-col z-20"
      >
        <div className="h-16 flex items-center px-6 border-b border-gray-200/50 dark:border-gray-800/50">
          <div className="flex items-center gap-3">
            <img src="/logo.svg" alt="LeadDesk Logo" className="w-9 h-9 object-contain" />
            <span className="font-bold text-lg tracking-tight text-gray-900 dark:text-white">LeadDesk</span>
          </div>
        </div>
        
        <div className="flex-1 py-6 px-4 space-y-1">
          <a href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-indigo-50 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 font-medium transition-colors">
            <LayoutDashboard className="w-5 h-5" />
            Dashboard
          </a>
          <a href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 font-medium transition-colors opacity-50 cursor-not-allowed">
            <Settings className="w-5 h-5" />
            Settings
          </a>
        </div>
        
        <div className="p-4 border-t border-gray-200/50 dark:border-gray-800/50">
          <div className="flex items-center gap-3 px-3 py-2 mb-4">
            <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center">
              <span className="text-indigo-700 dark:text-indigo-300 font-bold text-xs">
                {user?.email?.charAt(0).toUpperCase() || 'A'}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{user?.email}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 truncate">Admin</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 font-medium transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </motion.aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden relative z-10">
        <header className="h-16 flex items-center justify-between px-4 sm:px-6 lg:px-8 border-b border-gray-200/50 dark:border-gray-800/50 bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl z-10">
          <h1 className="text-xl font-semibold text-gray-900 dark:text-white lg:hidden">LeadDesk</h1>
          <h1 className="text-xl font-semibold text-gray-900 dark:text-white hidden lg:block">Overview</h1>
          <div className="flex items-center gap-4">
            <button className="w-8 h-8 flex items-center justify-center rounded-full text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
              <Bell className="w-5 h-5" />
            </button>
            <button
              onClick={() => fetchLeads(searchQuery)}
              className="w-8 h-8 flex items-center justify-center rounded-full text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              title="Refresh"
            >
              <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin text-indigo-500' : ''}`} />
            </button>
            <button
              onClick={handleLogout}
              className="lg:hidden text-sm font-medium text-red-600 dark:text-red-400"
            >
              Logout
            </button>
          </div>
        </header>

        <div className="flex-1 overflow-auto p-4 sm:px-6 lg:px-8 py-8">
          <div className="max-w-7xl mx-auto space-y-8">
            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {stats.map((stat, i) => (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="glass rounded-2xl p-6 shadow-sm flex items-center justify-between group hover:shadow-md transition-all duration-300 bg-white/60 dark:bg-gray-900/60"
                >
                  <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">{stat.label}</p>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                  </div>
                  <div className={`w-12 h-12 rounded-2xl ${stat.bg} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    {stat.icon}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Table Area */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="glass rounded-[2rem] shadow-sm border border-gray-200/50 dark:border-gray-800/50 overflow-hidden bg-white/60 dark:bg-gray-900/60"
            >
              {/* Toolbar */}
              <div className="p-5 border-b border-gray-200/50 dark:border-gray-800/50 flex flex-col sm:flex-row flex-wrap gap-4 justify-between items-center bg-gray-50/30 dark:bg-gray-900/30">
                <div className="relative w-full sm:w-96 group">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-indigo-500 transition-colors" />
                  <input
                    type="text"
                    placeholder="Search leads..."
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="w-full pl-10 pr-4 py-2.5 bg-white/50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all dark:text-white"
                  />
                </div>
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200/50 dark:divide-gray-800/50">
                  <thead className="bg-gray-50/50 dark:bg-gray-900/50 backdrop-blur-sm">
                    <tr>
                      <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Lead Details
                      </th>
                      <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Budget
                      </th>
                      <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Message
                      </th>
                      <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Date
                      </th>
                      <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200/50 dark:divide-gray-800/50">
                    <AnimatePresence mode="popLayout">
                      {loading ? (
                        <motion.tr
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                        >
                          <td colSpan={5} className="px-6 py-24 text-center">
                            <div className="flex flex-col items-center justify-center">
                              <Loader2 className="w-8 h-8 text-indigo-500 animate-spin mb-4" />
                              <p className="text-gray-500 dark:text-gray-400 text-sm">Loading leads...</p>
                            </div>
                          </td>
                        </motion.tr>
                      ) : leads.length === 0 ? (
                        <motion.tr
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                        >
                          <td colSpan={5} className="px-6 py-24 text-center">
                            <div className="flex flex-col items-center justify-center text-gray-500 dark:text-gray-400">
                              <Inbox className="w-12 h-12 mb-4 text-gray-300 dark:text-gray-700" />
                              <p className="text-lg font-medium text-gray-900 dark:text-white mb-1">No leads found</p>
                              <p className="text-sm">
                                {searchQuery ? "Try adjusting your search query." : "When you receive new leads, they will appear here."}
                              </p>
                            </div>
                          </td>
                        </motion.tr>
                      ) : (
                        paginatedLeads.map((lead, idx) => (
                          <motion.tr 
                            key={lead._id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.2, delay: idx * 0.05 }}
                            className="hover:bg-gray-50/50 dark:hover:bg-gray-800/50 transition-colors group"
                          >
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex flex-col">
                                <span className="text-sm font-semibold text-gray-900 dark:text-white">{lead.name}</span>
                                <span className="text-sm text-gray-500 dark:text-gray-400">{lead.email}</span>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="text-xs font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 px-2.5 py-1 rounded-md border border-gray-200 dark:border-gray-700">{lead.budget}</span>
                            </td>
                            <td className="px-6 py-4">
                              <div className="text-sm text-gray-600 dark:text-gray-400 max-w-xs truncate font-light" title={lead.message}>
                                {lead.message}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="text-sm text-gray-500 dark:text-gray-400">
                                {new Date(lead.createdAt).toLocaleDateString('en-US', {
                                  month: 'short',
                                  day: 'numeric',
                                  year: 'numeric'
                                })}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <button
                                onClick={() => handleStatusChange(lead._id, lead.status)}
                                className="group/btn flex items-center gap-2 hover:scale-105 transition-all"
                                title="Click to change status"
                              >
                                {getStatusBadge(lead.status)}
                                <MoreVertical className="w-4 h-4 text-gray-400 group-hover/btn:text-indigo-600 opacity-0 group-hover:opacity-100 transition-all" />
                              </button>
                            </td>
                          </motion.tr>
                        ))
                      )}
                    </AnimatePresence>
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              {!loading && leads.length > 0 && (
                <div className="px-6 py-4 border-t border-gray-200/50 dark:border-gray-800/50 flex flex-col sm:flex-row flex-wrap items-center justify-between gap-4 bg-gray-50/30 dark:bg-gray-900/30">
                  <p className="text-sm text-gray-700 dark:text-gray-400">
                    Showing <span className="font-medium text-gray-900 dark:text-white">{((currentPage - 1) * itemsPerPage) + 1}</span> to{' '}
                    <span className="font-medium text-gray-900 dark:text-white">{Math.min(currentPage * itemsPerPage, leads.length)}</span> of{' '}
                    <span className="font-medium text-gray-900 dark:text-white">{leads.length}</span> results
                  </p>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                      disabled={currentPage === 1}
                      className="px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 bg-white/50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm"
                    >
                      Previous
                    </button>
                    <button
                      onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                      disabled={currentPage === totalPages}
                      className="px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 bg-white/50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm"
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </main>
    </motion.div>
  );
}
