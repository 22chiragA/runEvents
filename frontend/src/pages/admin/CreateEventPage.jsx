import React, { useState } from 'react';
import api from '../../services/api';
import { useNavigate } from 'react-router-dom';
import { PlusCircle, AlertCircle } from 'lucide-react';

const CreateEventPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    date: '',
  });
  const [categories, setCategories] = useState([
    { distance: '', price: '', maxParticipants: '' }
  ]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCategoryChange = (index, e) => {
    const updated = [...categories];
    updated[index][e.target.name] = e.target.value;
    setCategories(updated);
  };

  const addCategory = () => {
    setCategories([...categories, { distance: '', price: '', maxParticipants: '' }]);
  };

  const removeCategory = (index) => {
    setCategories(categories.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    // POST /admin/events requires distance and price as numeric values sometimes, though api spec shows number in output
    const payload = {
      ...formData,
      categories: categories.map(cat => ({
        distance: Number(cat.distance),
        price: Number(cat.price),
        maxParticipants: Number(cat.maxParticipants)
      }))
    };

    try {
      await api.post('/admin/events', payload);
      navigate('/admin/events'); // Go to manage events on success
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create event. Is backend running?');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Create New Event</h1>
      
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sm:p-8">
        {error && (
          <div className="bg-red-50 text-red-700 p-4 rounded-lg mb-6 flex items-center">
             <AlertCircle className="w-5 h-5 mr-2" />
             {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Event Name</label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="Jaipur Soldierathon"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
              <input
                type="text"
                name="location"
                required
                value={formData.location}
                onChange={handleChange}
                placeholder="Jaipur, Rajasthan"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
              <input
                type="date"
                name="date"
                required
                value={formData.date}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
              />
            </div>

            {/* Categories Section */}
            <div className="md:col-span-2 border-t border-gray-100 pt-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800">Available Categories (Distances)</h3>
                <button
                  type="button"
                  onClick={addCategory}
                  className="text-sm px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition flex items-center font-medium"
                >
                  <PlusCircle className="w-4 h-4 mr-1" /> Add Category
                </button>
              </div>

              <div className="space-y-4">
                {categories.map((cat, index) => (
                  <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-gray-50 p-4 rounded-xl relative border border-gray-100">
                    <div>
                      <label className="block text-xs font-medium text-gray-500 mb-1">Distance (km)</label>
                      <input
                        type="number"
                        name="distance"
                        required
                        value={cat.distance}
                        onChange={(e) => handleCategoryChange(index, e)}
                        placeholder="21"
                        min="1"
                        className="w-full px-3 py-1.5 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-500 mb-1">Price (₹)</label>
                      <input
                        type="number"
                        name="price"
                        required
                        value={cat.price}
                        onChange={(e) => handleCategoryChange(index, e)}
                        placeholder="999"
                        min="0"
                        className="w-full px-3 py-1.5 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-500 mb-1">Max Participants</label>
                      <input
                        type="number"
                        name="maxParticipants"
                        required
                        value={cat.maxParticipants}
                        onChange={(e) => handleCategoryChange(index, e)}
                        placeholder="500"
                        min="1"
                        className="w-full px-3 py-1.5 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 text-sm"
                      />
                    </div>
                    {categories.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeCategory(index)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full shadow-md hover:bg-red-600 transition"
                        title="Remove Category"
                      >
                        <AlertCircle className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-4 flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 transition flex items-center disabled:opacity-50"
            >
              <PlusCircle className="w-5 h-5 mr-2" />
              {loading ? 'Creating...' : 'Create Event'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateEventPage;
