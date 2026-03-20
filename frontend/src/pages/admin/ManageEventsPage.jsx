import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { Link } from 'react-router-dom';
import { Trash2, Users } from 'lucide-react';

const ManageEventsPage = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingEvent, setEditingEvent] = useState(null);
  const [editFormData, setEditFormData] = useState({ name: '', date: '', location: '', categories: [] });
  const [updating, setUpdating] = useState(false);

  const fetchEvents = async () => {
    try {
      const response = await api.get('/events');
      setEvents(response.data || []);
    } catch (err) {
      console.error("Failed to fetch events", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this event?")) return;
    try {
      await api.delete(`/admin/events/${id}`);
      setEvents(events.filter(e => e.id !== id));
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to delete event');
    }
  };

  const openEditModal = (event) => {
    setEditingEvent(event);
    setEditFormData({
      name: event.name || '',
      date: event.date ? event.date.split('T')[0] : '',
      location: event.location || '',
      categories: event.categories ? [...event.categories] : []
    });
  };

  const handleEditCategoryChange = (index, e) => {
    const updated = [...editFormData.categories];
    updated[index][e.target.name] = e.target.value;
    setEditFormData({ ...editFormData, categories: updated });
  };

  const addEditCategory = () => {
    setEditFormData({ 
      ...editFormData, 
      categories: [...editFormData.categories, { distance: '', price: '', maxParticipants: '' }] 
    });
  };

  const removeEditCategory = (index) => {
    setEditFormData({ 
      ...editFormData, 
      categories: editFormData.categories.filter((_, i) => i !== index) 
    });
  };

  const handleEditChange = (e) => {
    setEditFormData({ ...editFormData, [e.target.name]: e.target.value });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setUpdating(true);

    const payload = {
      ...editFormData,
      categories: editFormData.categories.map(cat => ({
        id: cat.id,
        distance: Number(cat.distance),
        price: Number(cat.price),
        maxParticipants: Number(cat.maxParticipants)
      }))
    };

    try {
      await api.put(`/events/${editingEvent.id}`, payload);
      setEditingEvent(null);
      fetchEvents(); 
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to update event');
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return <div className="p-8 text-center"><div className="animate-spin h-8 w-8 border-4 border-primary-500 border-t-transparent rounded-full mx-auto"></div></div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Manage Events</h1>
        <Link to="/admin/events/create" className="bg-primary-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-primary-700">
          + New Event
        </Link>
      </div>

      <div className="bg-white shadow-sm rounded-xl border border-gray-200 overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Event Name</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {events.map((event) => (
              <tr key={event.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{event.name}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(event.date).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {event.location}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-3">
                  <Link to={`/admin/events/${event.id}/users`} className="text-primary-600 hover:text-primary-900 inline-flex items-center">
                    <Users className="w-4 h-4 mr-1"/> Participants
                  </Link>
                  <button onClick={() => openEditModal(event)} className="text-indigo-600 hover:text-indigo-900 inline-flex items-center">
                    Edit
                  </button>
                  <button onClick={() => handleDelete(event.id)} className="text-red-600 hover:text-red-900 inline-flex items-center">
                    <Trash2 className="w-4 h-4 mr-1"/> Delete
                  </button>
                </td>
              </tr>
            ))}
            {events.length === 0 && (
              <tr>
                <td colSpan="4" className="px-6 py-8 text-center text-gray-500">No events found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {editingEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-xl">
            <h2 className="text-xl font-bold mb-4 text-gray-900">Edit Event</h2>
            <form onSubmit={handleEditSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Event Name</label>
                <input type="text" name="name" required value={editFormData.name} onChange={handleEditChange} className="mt-1 block w-full border border-gray-300 rounded-lg p-2" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Date</label>
                <input type="date" name="date" required value={editFormData.date} onChange={handleEditChange} className="mt-1 block w-full border border-gray-300 rounded-lg p-2" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Location</label>
                <input type="text" name="location" required value={editFormData.location} onChange={handleEditChange} className="mt-1 block w-full border border-gray-300 rounded-lg p-2" />
              </div>
              <div className="border-t border-gray-100 pt-3">
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-medium text-gray-700">Categories (Distances)</label>
                  <button
                    type="button"
                    onClick={addEditCategory}
                    className="text-xs px-2 py-1 bg-blue-50 text-blue-600 rounded hover:bg-blue-100 transition"
                  >
                    + Add
                  </button>
                </div>
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {editFormData.categories.map((cat, index) => (
                    <div key={index} className="grid grid-cols-3 gap-2 bg-gray-50 p-2 rounded-lg relative">
                      <div>
                        <input type="number" name="distance" placeholder="Km" required value={cat.distance} onChange={(e) => handleEditCategoryChange(index, e)} className="block w-full border border-gray-300 rounded p-1 text-xs" />
                      </div>
                      <div>
                        <input type="number" name="price" placeholder="₹" required value={cat.price} onChange={(e) => handleEditCategoryChange(index, e)} className="block w-full border border-gray-300 rounded p-1 text-xs" />
                      </div>
                      <div>
                        <input type="number" name="maxParticipants" placeholder="Cap" required value={cat.maxParticipants} onChange={(e) => handleEditCategoryChange(index, e)} className="block w-full border border-gray-300 rounded p-1 text-xs" />
                      </div>
                      {editFormData.categories.length > 1 && (
                        <button type="button" onClick={() => removeEditCategory(index)} className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full p-0.5 shadow-sm hover:bg-red-600">
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex justify-end space-x-3 pt-4">
                <button type="button" onClick={() => setEditingEvent(null)} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">Cancel</button>
                <button type="submit" disabled={updating} className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700">{updating ? 'Saving...' : 'Save'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageEventsPage;
