import React, { useState, useEffect } from 'react';
import { CalendarDays, Users, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import api from '../../services/api';

const AdminDashboardPage = () => {
  const [stats, setStats] = useState({ totalEvents: 0, totalUsers: 0, totalRegistrations: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await api.get('/admin/stats');
        setStats(response.data);
      } catch (err) {
        console.error("Failed to fetch stats", err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <Link to="/admin/events" className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex items-center hover:shadow-md transition">
          <div className="bg-primary-100 text-primary-600 p-4 rounded-lg mr-4 flex-shrink-0">
            <CalendarDays className="w-8 h-8" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Total Events</p>
            <p className="text-2xl font-black text-gray-900">{stats.totalEvents}</p>
          </div>
        </Link>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex items-center">
          <div className="bg-green-100 text-green-600 p-4 rounded-lg mr-4 flex-shrink-0">
            <Users className="w-8 h-8" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Total Users</p>
            <p className="text-2xl font-black text-gray-900">{stats.totalUsers}</p>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex items-center">
          <div className="bg-purple-100 text-purple-600 p-4 rounded-lg mr-4 flex-shrink-0">
            <TrendingUp className="w-8 h-8" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Total Registrations</p>
            <p className="text-2xl font-black text-gray-900">{stats.totalRegistrations}</p>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 text-center text-gray-500">
        <p>Select an option above or use the sidebar to navigate the admin panel.</p>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
