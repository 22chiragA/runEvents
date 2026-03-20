import React from 'react';
import { NavLink, Outlet, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { LayoutDashboard, PlusCircle, CalendarDays, Users, LogOut, ShieldAlert, Home } from 'lucide-react';

const AdminLayout = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Create Admin', path: '/admin/create-admin', icon: ShieldAlert },
    { name: 'Create Event', path: '/admin/events/create', icon: PlusCircle },
    { name: 'Manage Events', path: '/admin/events', icon: CalendarDays, end: true },
  ];

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-slate-900 text-slate-300 flex flex-col hidden md:flex">
        <div className="h-16 flex items-center px-6 bg-slate-950 font-bold text-xl text-white tracking-wider">
          RunAdmin
        </div>
        <div className="flex-1 py-6 px-3 space-y-2">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              end={item.end}
              className={({ isActive }) =>
                `flex items-center px-3 py-2.5 rounded-lg font-medium transition-colors ${
                  isActive ? 'bg-primary-600 text-white' : 'hover:bg-slate-800 hover:text-white'
                }`
              }
            >
              <item.icon className="w-5 h-5 mr-3" />
              {item.name}
            </NavLink>
          ))}
        </div>
        <div className="p-4 bg-slate-950 space-y-2 border-t border-slate-800">
          <Link 
            to="/" 
            className="flex items-center w-full px-3 py-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors font-medium mb-1"
          >
            <Home className="w-5 h-5 mr-3" />
            Go to Website
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center w-full px-3 py-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors font-medium"
          >
            <LogOut className="w-5 h-5 mr-3" />
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="bg-white shadow-sm h-16 flex items-center px-6 md:hidden">
            <span className="font-bold text-xl text-slate-900 tracking-wider">RunAdmin</span>
            <button onClick={handleLogout} className="ml-auto text-sm bg-gray-100 px-3 py-1.5 rounded text-gray-700">Logout</button>
        </header>
        <main className="flex-1 p-6 lg:p-10 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
