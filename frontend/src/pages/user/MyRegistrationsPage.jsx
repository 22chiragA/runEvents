import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { useAuth } from '../../contexts/AuthContext';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, Ticket } from 'lucide-react';

const MyRegistrationsPage = () => {
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchRegistrations = async () => {
      // Assuming userId from token or context
      const userId = user?.id || user?.sub || 1; // Fallback to 1
      try {
        const response = await api.get(`/registrations/user/${userId}`);
        setRegistrations(response.data || []);
        // Note: the backend might just return the event details, or registration wrapper. 
        // We will adapt to a generic display.
      } catch (err) {
        console.error("Failed to fetch registrations", err);
      } finally {
        setLoading(false);
      }
    };
    fetchRegistrations();
  }, [user]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8 flex items-center gap-3">
        <Ticket className="w-8 h-8 text-primary-600" />
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Registrations</h1>
          <p className="text-gray-600">Events you have signed up to participate in.</p>
        </div>
      </div>

      {registrations.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-xl shadow-sm border border-gray-100">
          <Ticket className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No Registrations Yet</h3>
          <p className="text-gray-500 mb-6">You haven't registered for any events yet. Find an upcoming event to get started!</p>
          <Link to="/dashboard" className="px-6 py-3 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition">
            Browse Events
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {registrations.map((reg, idx) => {
            // Adjust depending on actual response. Might be reg.event.name or reg.name
            const eventData = reg.event || reg; 
            return (
              <div key={reg.id || idx} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="bg-green-100 text-green-800 text-xs font-bold px-2 py-1 rounded-md uppercase tracking-wide">Confirmed</span>
                    <h3 className="text-xl font-bold text-gray-900">{eventData.name || 'Running Event'}</h3>
                  </div>
                  <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                    {eventData.date && (
                      <span className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1 text-gray-400" />
                        {new Date(eventData.date).toLocaleDateString()}
                      </span>
                    )}
                    {eventData.location && (
                      <span className="flex items-center">
                        <MapPin className="w-4 h-4 mr-1 text-gray-400" />
                        {eventData.location}
                      </span>
                    )}
                  </div>
                </div>
                <div>
                  <Link to={`/events/${eventData.eventId || eventData.id}`} className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition inline-block text-center w-full md:w-auto">
                    View Event Details
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MyRegistrationsPage;
