import React from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Package, 
  FolderOpen, 
  MessageSquare, 
  LogOut,
  Settings,
  Home,
  Users,
  TrendingUp,
  ShoppingBag,
  CheckCircle,
  XCircle,
  Menu,
  X,
  DollarSign,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

const DashboardPage: React.FC = () => {
  const { state, dispatch } = useApp();
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
    navigate('/admin');
  };

  const sidebarItems = [
    { 
      path: '/admin/dashboard', 
      icon: LayoutDashboard, 
      label: 'Tableau de bord',
      exact: true
    },
    { 
      path: '/admin/dashboard/trips', 
      icon: Package, 
      label: 'Voyages' 
    },
    { 
      path: '/admin/dashboard/categories', 
      icon: FolderOpen, 
      label: 'Catégories' 
    },
    { 
      path: '/admin/dashboard/financial', 
      icon: DollarSign, 
      label: 'Gestion Financière' 
    },
    { 
      path: '/admin/dashboard/messages', 
      icon: MessageSquare, 
      label: 'Messages',
      badge: state.messages.filter(m => !m.read).length
    },
    { 
      path: '/admin/dashboard/settings', 
      icon: Settings, 
      label: 'Paramètres' 
    },
  ];

  const isActive = (path: string, exact = false) => {
    if (exact) {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  const stats = [
    {
      title: 'Total Figurines',
      value: state.products ? state.products.length : 0,
      icon: Package,
      gradient: 'from-blue-500 to-cyan-600',
      bgGradient: 'from-blue-50 to-cyan-50'
    },
    {
      title: 'Catégories',
      value: state.categories ? state.categories.length : 0,
      icon: FolderOpen,
      gradient: 'from-cyan-500 to-teal-600',
      bgGradient: 'from-cyan-50 to-teal-50'
    },
    {
      title: 'Chiffre d\'Affaires',
      value: `${state.revenues ? state.revenues.reduce((sum, r) => sum + r.amount, 0) : 0} DH`,
      icon: TrendingUp,
      gradient: 'from-green-500 to-emerald-600',
      bgGradient: 'from-green-50 to-emerald-50'
    },
    {
      title: 'Bénéfice Net',
      value: `${(() => {
        const totalRevenue = state.revenues ? state.revenues.reduce((sum, r) => sum + r.amount, 0) : 0;
        const totalCharges = state.charges ? state.charges.reduce((sum, c) => sum + c.amount, 0) : 0;
        const totalInvestments = state.investments ? state.investments.reduce((sum, i) => sum + i.amount, 0) : 0;
        return totalRevenue - totalCharges - totalInvestments;
      })()} DH`,
      icon: DollarSign,
      gradient: 'from-purple-500 to-pink-600',
      bgGradient: 'from-purple-50 to-pink-50'
    },
    {
      title: 'Messages',
      value: state.messages ? state.messages.length : 0,
      icon: MessageSquare,
      gradient: 'from-teal-500 to-green-600',
      bgGradient: 'from-teal-50 to-green-50'
    },
  ];

  const isDashboardHome = location.pathname === '/admin/dashboard';

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 w-72 bg-white shadow-2xl z-30 border-r border-slate-200 transform transition-transform duration-300 ease-in-out ${
        isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="px-8 py-8 bg-gradient-to-br from-amber-900 to-orange-900">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                  <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                  </svg>
                </div>
              </div>
              <div className="flex items-center space-x-2 flex-shrink-0">
                <Link
                  to="/"
                  className="p-2 text-amber-300 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-300"
                  title="Retour à l'accueil"
                >
                  <Home className="w-5 h-5" />
                </Link>
                <button
                  onClick={handleLogout}
                  className="p-2 text-amber-300 hover:text-white hover:bg-red-500/20 rounded-lg transition-all duration-300"
                  title="Déconnexion"
                >
                  <LogOut className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="lg:hidden p-2 text-amber-300 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-300"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* User info */}
          <div className="px-8 py-6 bg-gradient-to-r from-orange-600 to-amber-600 border-b border-slate-200">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                <Users className="w-7 h-7 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-lg font-bold text-white">{state.user.username}</p>
                <p className="text-amber-100 font-medium">Administrateur</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-6 py-8 space-y-3">
            {sidebarItems.map(item => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center justify-between px-6 py-4 rounded-2xl transition-all duration-300 group ${
                  isActive(item.path, item.exact)
                    ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-lg transform scale-105'
                    : 'text-slate-600 hover:bg-gradient-to-r hover:from-slate-100 hover:to-amber-50 hover:text-amber-600'
                }`}
              >
                <div className="flex items-center">
                  <item.icon className={`w-6 h-6 mr-4 ${
                    isActive(item.path, item.exact) ? 'text-white' : 'group-hover:text-amber-600'
                  }`} />
                  <span className="font-semibold text-lg">{item.label}</span>
                </div>
                {item.badge && item.badge > 0 && (
                  <span className="bg-red-500 text-white text-sm rounded-full px-3 py-1 min-w-[1.5rem] text-center font-bold shadow-lg">
                    {item.badge}
                  </span>
                )}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Menu Button */}
      <div className="lg:hidden fixed top-4 left-4 z-40">
        <button
          onClick={() => setIsMobileMenuOpen(true)}
          className="p-4 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-200"
        >
          <Menu className="w-6 h-6 text-slate-700" />
        </button>
      </div>

      {/* Main content */}
      <div className="lg:ml-72">
        <div className="px-10 py-8">
          {isDashboardHome ? (
            <>
              {/* Dashboard Header */}
              <div className="mb-12 hidden lg:block">
                <h1 className="text-4xl font-bold text-slate-800 mb-4">
                  Tableau de Bord
                </h1>
                <p className="text-xl text-slate-600">
                  Vue d'ensemble de votre boutique AYO Figurine
                </p>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 lg:gap-8 mb-12">
                {stats.map((stat, index) => (
                  <div key={index} className="bg-white rounded-3xl shadow-xl p-6 lg:p-8 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-bold text-slate-500 mb-2 uppercase tracking-wider">
                          {stat.title}
                        </p>
                        <p className="text-2xl lg:text-3xl font-bold text-slate-800">
                          {stat.value}
                        </p>
                      </div>
                      <div className={`w-12 h-12 lg:w-16 lg:h-16 bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl flex items-center justify-center shadow-lg`}>
                        <stat.icon className={`w-6 h-6 lg:w-8 lg:h-8 text-amber-600`} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Status */}
              <div className="bg-white rounded-3xl shadow-xl p-6 lg:p-8">
                <div className="flex items-center mb-8">
                  <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-amber-500 to-yellow-600 rounded-2xl flex items-center justify-center mr-4 shadow-lg">
                    <ShoppingBag className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
                  </div>
                  <h3 className="text-xl lg:text-2xl font-bold text-slate-800">
                    Commandes de Figurines
                  </h3>
                </div>
                <div className="space-y-6">
                  <div className="flex items-center justify-between p-6 bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl">
                    <div className="flex items-center space-x-4">
                      <CheckCircle className="w-5 h-5 lg:w-6 lg:h-6 text-blue-500" />
                      <span className="text-sm lg:text-lg font-bold text-blue-700">Commandes Confirmées</span>
                    </div>
                    <span className="text-xl lg:text-2xl font-bold text-amber-600">
                      {Array.isArray(state.messages) 
                        ? state.messages.filter(m => m && m.orderStatus === 'confirmed').length 
                        : 0}
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl">
                    <div className="flex items-center space-x-4">
                      <CheckCircle className="w-5 h-5 lg:w-6 lg:h-6 text-green-500" />
                      <span className="text-sm lg:text-lg font-bold text-green-700">Reçues</span>
                    </div>
                    <span className="text-xl lg:text-2xl font-bold text-green-600">
                      {Array.isArray(state.messages) 
                        ? state.messages.filter(m => m && m.orderStatus === 'received').length 
                        : 0}
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-6 bg-gradient-to-r from-red-50 to-pink-50 rounded-2xl">
                    <div className="flex items-center space-x-4">
                      <XCircle className="w-5 h-5 lg:w-6 lg:h-6 text-red-500" />
                      <span className="text-sm lg:text-lg font-bold text-red-700">Retournées</span>
                    </div>
                    <span className="text-xl lg:text-2xl font-bold text-red-600">
                      {Array.isArray(state.messages) 
                        ? state.messages.filter(m => m && m.orderStatus === 'returned').length 
                        : 0}
                    </span>
                  </div>

                  {/* ✅ Correction de la partie Total CA */}
                  <div className="pt-6 border-t-2 border-slate-200">
                    <div className="flex items-center justify-between p-4 bg-gradient-to-r from-amber-50 to-yellow-50 rounded-2xl">
                      <span className="text-sm lg:text-lg font-bold text-slate-700">Total CA : </span>
                      <span className="text-xl lg:text-2xl font-bold text-amber-600">
                        {(Array.isArray(state.messages) 
                          ? state.messages
                              .filter(m => m && m.orderStatus === 'received' && typeof m.orderPrice === 'number')
                              .reduce((total, m) => total + (m.orderPrice ?? 0), 0)
                          : 0
                        )} DH
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <Outlet />
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
