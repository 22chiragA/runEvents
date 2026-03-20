import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import api from '../../services/api';
import { User, LogOut, Settings, ChevronDown, Camera, Activity } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [profileData, setProfileData] = useState(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const fetchProfile = async () => {
      if (isAuthenticated && user?.id) {
        try {
          const res = await api.get(`/user/${user.id}`);
          setProfileData(res.data);
        } catch (err) {
          console.error("Failed to fetch profile", err);
        }
      }
    };
    fetchProfile();
  }, [isAuthenticated, user?.id]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    setIsProfileOpen(false);
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold text-primary-600">
              RunEvents
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/" className="text-gray-700 hover:text-primary-600 font-medium">Home</Link>
            {isAuthenticated && user?.role === 'ADMIN' && (
              <Link to="/admin/dashboard" className="flex items-center gap-1.5 px-3 py-1.5 bg-red-50 hover:bg-red-100 border border-red-200 text-red-600 rounded-full font-bold text-xs transition-all shadow-sm">
                <Settings className="w-3.5 h-3.5" /> Admin Panel
              </Link>
            )}
            {isAuthenticated ? (
              <div className="relative" ref={dropdownRef}>
                <button 
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center space-x-2 p-1 rounded-full hover:bg-gray-100 transition-all duration-300 focus:outline-none"
                >
                  <div className="h-9 w-9 bg-gradient-to-r from-primary-600 to-indigo-600 text-white rounded-full flex items-center justify-center font-bold text-sm shadow-md">
                    {profileData?.name?.charAt(0).toUpperCase() || user?.email?.charAt(0).toUpperCase() || "U"}
                  </div>
                  <ChevronDown className={`w-4 h-4 text-gray-600 transition-transform duration-300 ${isProfileOpen ? 'rotate-180' : ''}`} />
                </button>

                <AnimatePresence>
                  {isProfileOpen && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: 10 }}
                      transition={{ duration: 0.15, ease: "easeOut" }}
                      className="absolute right-0 mt-3 w-80 bg-white backdrop-blur-md rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-50 origin-top-right flex flex-col items-center p-6"
                    >
                      <div className="w-full text-center text-xs text-gray-400 mb-4 truncate">
                        {user?.email}
                      </div>

                      <div className="relative mb-3 group">
                        <div className="h-20 w-20 bg-gradient-to-r from-primary-500 to-indigo-600 text-white rounded-full flex items-center justify-center font-black text-3xl shadow-lg">
                          {profileData?.name?.charAt(0).toUpperCase() || user?.email?.charAt(0).toUpperCase() || "U"}
                        </div>
                        <button className="absolute bottom-0 right-0 bg-white p-1.5 rounded-full shadow-md border border-gray-200 hover:bg-gray-50 transition-colors">
                          <Camera className="w-3.5 h-3.5 text-gray-600" />
                        </button>
                      </div>

                      <p className="text-xl font-black text-gray-900 tracking-tight">
                        Hi, {profileData?.name || "Runner"}!
                      </p>
                      <p className="text-xs text-gray-500 font-medium mb-1">
                        {profileData?.phoneNumber || "Athlete"}
                      </p>
                      
                      {user?.role === 'ADMIN' && (
                        <span className="bg-red-50 text-red-600 text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider mb-2 border border-red-200">
                          Admin
                        </span>
                      )}

                      <div className="w-full border-t border-gray-100 mt-4 pt-3 flex flex-col space-y-1">
                        {user?.role === 'ADMIN' && (
                          <Link 
                            to="/admin/dashboard" 
                            className="w-full flex items-center gap-3 px-4 py-2 hover:bg-gray-50 rounded-xl transition-colors text-sm font-semibold text-gray-700 hover:text-primary-600"
                            onClick={() => setIsProfileOpen(false)}
                          >
                            <Settings className="w-4 h-4" /> Admin Panel
                          </Link>
                        )}
                        <Link 
                          to="/dashboard" 
                          className="w-full flex items-center gap-3 px-4 py-2 hover:bg-gray-50 rounded-xl transition-colors text-sm font-semibold text-gray-700 hover:text-primary-600"
                          onClick={() => setIsProfileOpen(false)}
                        >
                          <Activity className="w-4 h-4" /> My Dashboard
                        </Link>
                        <Link 
                          to="/profile" 
                          className="w-full flex items-center gap-3 px-4 py-2 hover:bg-gray-50 rounded-xl transition-colors text-sm font-semibold text-gray-700 hover:text-primary-600"
                          onClick={() => setIsProfileOpen(false)}
                        >
                          <User className="w-4 h-4" /> My Profile
                        </Link>
                      </div>

                      <button 
                        onClick={handleLogout}
                        className="w-full mt-4 flex items-center justify-center gap-2 border border-blue-400  hover:bg-gray-50 text-gray-800 font-bold px-4 py-2.5 rounded-xl text-sm shadow-sm transition-all duration-300"
                      >
                        <LogOut className="w-4 h-4" /> Sign out
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <>
                <Link to="/login" className="text-gray-700 hover:text-primary-600 font-medium">Login</Link>
                <Link to="/signup" className="bg-primary-600 text-white px-4 py-2 rounded font-medium hover:bg-primary-700 transition-colors shadow-sm">
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
