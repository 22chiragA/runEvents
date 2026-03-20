import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import api from '../../services/api';
import { User, Mail, Save, AlertCircle, CheckCircle2, Calendar, Shield, Award } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

const ProfilePage = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [activeTab, setActiveTab] = useState('profile');
  const [registrations, setRegistrations] = useState([]);
  const [loadingRegs, setLoadingRegs] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      const userId = user?.id || user?.sub;
      if (userId) {
        try {
          const res = await api.get(`/user/${userId}`);
          setFormData({
            name: res.data.name || '',
            email: res.data.email || '',
          });
        } catch (err) {
          console.error("Failed to load profile", err);
        }
      }
    };
    fetchProfile();
  }, [user]);

  useEffect(() => {
    const fetchRegistrations = async () => {
      const userId = user?.id || user?.sub;
      if (userId && activeTab === 'registrations') {
        setLoadingRegs(true);
        try {
          const res = await api.get(`/registrations/user/${userId}`);
          const fetchedRegs = res.data;

          // Fetch event details for each registration
          const hydratedRegs = await Promise.all(
            fetchedRegs.map(async (reg) => {
              if (reg.eventId) {
                try {
                  const eventRes = await api.get(`/events/${reg.eventId}`);
                  return { ...reg, event: eventRes.data };
                } catch (err) {
                  console.error(`Failed to load event ${reg.eventId}`, err);
                  return reg;
                }
              }
              return reg;
            })
          );

          setRegistrations(hydratedRegs);
        } catch (err) {
          console.error("Failed to load registrations", err);
        } finally {
          setLoadingRegs(false);
        }
      }
    };
    fetchRegistrations();
  }, [user, activeTab]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });
    
    // Fallback ID to 1 if not correctly parsed
    const userId = user?.id || user?.sub || 1; 

    try {
      await api.put(`/user/${userId}`, formData);
      setMessage({ type: 'success', text: 'Profile updated successfully!' });
    } catch (err) {
      setMessage({ type: 'error', text: err.response?.data?.message || 'Failed to update profile. Server might not be responding.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Left Column: Profile Card */}
        <div className="md:col-span-1 space-y-6">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col items-center">
            <div className="h-24 w-24 bg-gradient-to-r from-primary-500 to-indigo-600 text-white rounded-full flex items-center justify-center font-black text-4xl shadow-lg mb-4">
              {formData?.name?.charAt(0).toUpperCase() || "U"}
            </div>
            <h2 className="text-xl font-bold text-gray-900">{formData.name || "Runner"}</h2>
            <p className="text-sm text-gray-500 mb-2 truncate max-w-full">{formData.email}</p>
            <span className="bg-primary-50 text-primary-700 text-xs font-bold px-3 py-1 rounded-full border border-primary-100 mb-4">
              Athlete
            </span>

            <div className="w-full border-t border-gray-100 pt-4 mt-2 space-y-2">
              <button 
                onClick={() => setActiveTab('profile')}
                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${activeTab === 'profile' ? 'bg-primary-50 text-primary-600 border border-primary-100' : 'text-gray-600 hover:bg-gray-50'}`}
              >
                <User className="w-4 h-4" /> Profile Info
              </button>
              {user?.role !== 'ADMIN' && (
                <button 
                  onClick={() => setActiveTab('registrations')}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${activeTab === 'registrations' ? 'bg-primary-50 text-primary-600 border border-primary-100' : 'text-gray-600 hover:bg-gray-50'}`}
                >
                  <Calendar className="w-4 h-4" /> My Registrations
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Dynamic Content Dashboard */}
        <div className="md:col-span-3">
          <AnimatePresence mode="wait">
            {activeTab === 'profile' && (
              <motion.div
                key="profile"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8"
              >
                <h1 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <User className="text-primary-600" /> My Profile
                </h1>
                
                {message.text && (
                  <div className={`p-4 rounded-lg mb-6 flex items-start ${message.type === 'error' ? 'bg-red-50 text-red-800' : 'bg-green-50 text-green-800'}`}>
                    {message.type === 'error' ? <AlertCircle className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" /> : <CheckCircle2 className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" />}
                    <p>{message.text}</p>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <User className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          name="name"
                          type="text"
                          required
                          className="appearance-none rounded-lg relative block w-full px-3 py-2 pl-10 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                          placeholder="Your Name"
                          value={formData.name}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Mail className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          name="email"
                          type="email"
                          required
                          className="appearance-none rounded-lg relative block w-full px-3 py-2 pl-10 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                          placeholder="you@example.com"
                          value={formData.email}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-100 flex justify-end">
                    <button
                      type="submit"
                      disabled={loading}
                      className="inline-flex items-center px-6 py-3 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 transition"
                    >
                      {loading ? 'Saving...' : <><Save className="w-4 h-4 mr-2" /> Save Changes</>}
                    </button>
                  </div>
                </form>
              </motion.div>
            )}

            {activeTab === 'registrations' && (
              <motion.div
                key="registrations"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8"
              >
                <h1 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <Calendar className="text-primary-600" /> Registered Events
                </h1>
                
                {loadingRegs ? (
                  <p className="text-gray-500">Loading your events...</p>
                ) : registrations.length === 0 ? (
                  <p className="text-gray-500">No events registered yet!</p>
                ) : (
                  <div className="grid gap-4">
                    {registrations.map((reg) => (
                      <Link 
                        key={reg.id} 
                        to={`/events/${reg.eventId}`}
                        className="p-4 rounded-xl border border-gray-100 bg-gray-50/50 hover:bg-gray-100/80 hover:shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all duration-200 cursor-pointer block"
                      >
                        <div>
                          <h3 className="font-bold text-gray-900">
                            {reg.event?.name || 'Event Name'}
                          </h3>
                          <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                            <Calendar className="w-3.5 h-3.5" /> {reg.event?.date || 'Date TBD'}
                          </p>
                        </div>
                        <span className="bg-green-50 text-green-700 text-xs font-bold px-3 py-1 rounded-full border border-green-100">
                          {reg.status || 'Confirmed'}
                        </span>
                      </Link>
                    ))}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
