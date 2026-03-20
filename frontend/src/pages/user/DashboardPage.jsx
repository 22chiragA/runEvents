import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import api from '../../services/api';
import { Calendar, MapPin, Activity, Search } from 'lucide-react';
import { Link } from 'react-router-dom';

const DashboardPage = () => {
  const { user } = useAuth();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [adminStats, setAdminStats] = useState({ totalEvents: 0, totalUsers: 0, totalRegistrations: 0 });
  const [userRegistrations, setUserRegistrations] = useState([]);

  useEffect(() => {
    // Fetch events. We will assume the endpoint is GET /events
    const fetchEvents = async () => {
      try {
        const response = await api.get('/events');
        // Let's assume response.data is the array of events
        setEvents(response.data || []);
      } catch (err) {
        console.error("Failed to fetch events", err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  useEffect(() => {
    const fetchAdminStats = async () => {
      if (user?.role === 'ADMIN') {
        try {
          const response = await api.get('/admin/stats');
          setAdminStats(response.data);
        } catch (err) {
          console.error("Failed to fetch admin stats", err);
        }
      }
    };
    fetchAdminStats();
  }, [user]);

  useEffect(() => {
    const fetchUserRegistrations = async () => {
      if (user?.id && user?.role !== 'ADMIN') {
        try {
          const response = await api.get(`/registrations/user/${user.id}`);
          setUserRegistrations(response.data || []);
        } catch (err) {
          console.error("Failed to fetch user registrations", err);
        }
      }
    };
    fetchUserRegistrations();
  }, [user]);

  const filteredEvents = events.filter(event => 
    (event.name && event.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (event.location && event.location.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-primary-50 px-4 sm:px-6 lg:px-8 py-8 overflow-hidden">
      {/* Dynamic Backlight glowing mesh */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse pointer-events-none" />

      <div className="relative max-w-7xl mx-auto z-10">
        <div className="mb-10">
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
            Dashboard
          </h1>
          <p className="text-gray-600 mt-1">Discover, register, and conquer your next running challenge.</p>
        </div>

        {/* 📊 Quick Stats Row for high interactivity feel */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-white/20 hover:scale-105 transition-transform duration-300">
            <h3 className="text-gray-500 text-sm font-medium">Available Runs</h3>
            <p className="text-3xl font-black text-primary-600 mt-1">{events.length}</p>
          </div>

          {user?.role === 'ADMIN' ? (
            <>
              <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-white/20 hover:scale-105 transition-transform duration-300">
                <h3 className="text-gray-500 text-sm font-medium">Total Registered Users</h3>
                <p className="text-3xl font-black text-green-600 mt-1">{adminStats.totalUsers}</p>
              </div>
              <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-white/20 hover:scale-105 transition-transform duration-300 flex items-center justify-between">
                <div>
                  <h3 className="text-gray-500 text-sm font-medium">Total Event Registrations</h3>
                  <p className="text-3xl font-bold text-gray-800 mt-1">{adminStats.totalRegistrations}</p>
                </div>
                <div className="h-10 w-10 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center">
                  <Activity className="w-5 h-5 animate-bounce" />
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-white/20 hover:scale-105 transition-transform duration-300">
                <h3 className="text-gray-500 text-sm font-medium">Registered Runs</h3>
                <p className="text-3xl font-black text-green-600 mt-1">{userRegistrations.length}</p>
              </div>
              <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-white/20 hover:scale-105 transition-transform duration-300 flex items-center justify-between">
                <div>
                  <h3 className="text-gray-500 text-sm font-medium">Performance</h3>
                  <p className="text-xl font-bold text-gray-800 mt-1">Active</p>
                </div>
                <div className="h-10 w-10 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center">
                  <Activity className="w-5 h-5 animate-bounce" />
                </div>
              </div>
            </>
          )}
        </div>

        <div className="mb-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <h2 className="text-2xl font-black text-gray-800 tracking-tight">Available Events</h2>
          
          <div className="relative w-full md:w-80 group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 group-focus-within:text-primary-500 transition-colors">
              <Search className="h-5 w-5" />
            </div>
            <input
              type="text"
              placeholder="Search by name or location..."
              className="pl-10 pr-4 py-2.5 w-full bg-white/80 backdrop-blur-md rounded-xl border border-white/20 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block animate-spin w-10 h-10 border-4 border-primary-500 border-t-transparent rounded-full"></div>
            <p className="mt-4 text-gray-600 font-medium">Reaching server routes...</p>
          </div>
        ) : filteredEvents.length === 0 ? (
          <div className="text-center py-16 bg-white/80 backdrop-blur-md rounded-2xl shadow-xl border border-white/20">
            <p className="text-gray-500 font-medium">{searchTerm ? "No matching events found." : "No events found at the moment."}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredEvents.map((event) => (
              <div 
                key={event.id} 
                className="group relative bg-white/90 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 overflow-hidden flex flex-col justify-between"
              >
                {/* Card Hover Overlay Glow */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                <div>
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-black text-gray-900 tracking-tight group-hover:text-primary-600 transition-colors">
                      {event.name}
                    </h3>
                    <span className="bg-primary-50 text-primary-600 text-xs font-black px-2.5 py-1 rounded-full uppercase tracking-wider">
                      Live
                    </span>
                  </div>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-center text-gray-500 text-sm font-medium">
                      <Calendar className="w-4 h-4 mr-2 text-primary-500" />
                      {new Date(event.date || Date.now()).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </div>
                    <div className="flex items-center text-gray-500 text-sm font-medium">
                      <MapPin className="w-4 h-4 mr-2 text-primary-500" />
                      {event.location}
                    </div>
                    <div className="flex items-center text-gray-500 text-sm font-medium">
                      <Activity className="w-4 h-4 mr-2 text-primary-500" />
                      {event.distance} KM Run
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between border-t border-gray-100 pt-4 mt-auto">
                  <span className="font-extrabold text-2xl text-gray-900">₹{event.price}</span>
                  <Link
                    to={`/events/${event.id}`}
                    className="px-5 py-2.5 bg-gradient-to-r from-primary-600 to-indigo-600 text-white rounded-xl text-sm font-bold shadow-md group-hover:shadow-lg hover:from-primary-700 hover:to-indigo-700 hover:scale-105 transition-all duration-300 flex items-center gap-1"
                  >
                    Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
