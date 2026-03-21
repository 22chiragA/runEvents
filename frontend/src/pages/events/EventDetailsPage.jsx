// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import api from '../../services/api';
// import { useAuth } from '../../contexts/AuthContext';
// import { MapPin, Calendar, Activity, IndianRupee, Clock, AlertCircle, CheckCircle2 } from 'lucide-react';

// const EventDetailsPage = () => {
//   const { id } = useParams();
//   const [event, setEvent] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [registering, setRegistering] = useState(false);
//   const [message, setMessage] = useState({ type: '', text: '' });
//   const [showRegForm, setShowRegForm] = useState(false);
//   const [regData, setRegData] = useState({ name: '', emailId: '', phnNumber: '' });
//   const { user, isAuthenticated } = useAuth();
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchEvent = async () => {
//       try {
//         const response = await api.get(`/events/${id}`);
//         setEvent(response.data);
//       } catch (err) {
//         setMessage({ type: 'error', text: 'Failed to load event details.' });
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchEvent();
//   }, [id]);

//   const handleRegister = async (e) => {
//     e.preventDefault();
//     if (!isAuthenticated) {
//       navigate('/login');
//       return;
//     }
//     setRegistering(true);
//     setMessage({ type: '', text: '' });

//     // Assume user ID is available from decoded token
//     const userId = user?.id || user?.sub || 1; // Fallback to 1 if not parsed

//     try {
//       await api.post(`/registrations/events/${id}/users/${userId}`, regData);
//       setMessage({ type: 'success', text: 'Successfully registered for this event!' });
//       setShowRegForm(false);
//     } catch (err) {
//       setMessage({ type: 'error', text: err.response?.data?.message || 'Failed to register.' });
//     } finally {
//       setRegistering(false);
//     }
//   };

//   const handleInputChange = (e) => {
//     setRegData({ ...regData, [e.target.name]: e.target.value });
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-[calc(100vh-4rem)]">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
//       </div>
//     );
//   }

//   if (!event) {
//     return (
//       <div className="max-w-7xl mx-auto px-4 py-16 text-center">
//         <h2 className="text-2xl font-bold text-gray-900">Event Not Found</h2>
//         <button onClick={() => navigate(-1)} className="mt-4 text-primary-600 hover:text-primary-700">
//           Go Back
//         </button>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
//       <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
//         {/* Placeholder for event banner */}
//         <div className="h-48 bg-gradient-to-r from-primary-600 to-indigo-700 flex items-center justify-center">
//           <Activity className="w-16 h-16 text-white opacity-50" />
//         </div>

//         <div className="p-8">
//           <div className="flex justify-between items-start mb-6">
//             <div>
//               <h1 className="text-3xl font-extrabold text-gray-900 mb-2">{event.name}</h1>
//               <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
//                 Registration Open
//               </span>
//             </div>
//             <div className="text-right">
//               <span className="block text-3xl font-bold text-primary-700">₹{event.price}</span>
//               <span className="text-sm text-gray-500">per participant</span>
//             </div>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 bg-gray-50 p-6 rounded-xl border border-gray-100">
//             <div className="flex items-center text-gray-700">
//               <Calendar className="w-6 h-6 mr-3 text-primary-500" />
//               <div>
//                 <p className="text-sm text-gray-500">Date</p>
//                 <p className="font-medium text-gray-900">{new Date(event.date).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
//               </div>
//             </div>
//             <div className="flex items-center text-gray-700">
//               <MapPin className="w-6 h-6 mr-3 text-primary-500" />
//               <div>
//                 <p className="text-sm text-gray-500">Location</p>
//                 <p className="font-medium text-gray-900">{event.location}</p>
//               </div>
//             </div>
//             <div className="flex items-center text-gray-700">
//               <Activity className="w-6 h-6 mr-3 text-primary-500" />
//               <div>
//                 <p className="text-sm text-gray-500">Distance</p>
//                 <p className="font-medium text-gray-900">{event.distance} km</p>
//               </div>
//             </div>
//             <div className="flex items-center text-gray-700">
//               <Clock className="w-6 h-6 mr-3 text-primary-500" />
//               <div>
//                 <p className="text-sm text-gray-500">Time</p>
//                 <p className="font-medium text-gray-900">05:30 AM (Reporting)</p>
//               </div>
//             </div>
//           </div>

//           {message.text && (
//             <div className={`p-4 rounded-lg mb-6 flex items-start ${message.type === 'error' ? 'bg-red-50 text-red-800' : 'bg-green-50 text-green-800'}`}>
//               {message.type === 'error' ? <AlertCircle className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" /> : <CheckCircle2 className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" />}
//               <p>{message.text}</p>
//             </div>
//           )}

//           {!showRegForm ? (
//             <div className="flex justify-center">
//               <button
//                 onClick={() => {
//                   if (!isAuthenticated) navigate('/login');
//                   else setShowRegForm(true);
//                 }}
//                 className="px-8 py-4 bg-primary-600 text-white text-lg font-bold rounded-xl shadow-lg hover:bg-primary-700 transform transition-all hover:-translate-y-1 w-full md:w-auto"
//               >
//                 {isAuthenticated ? 'Register Now' : 'Log in to Register'}
//               </button>
//             </div>
//           ) : (
//             <div className="mt-8 border-t border-gray-100 pt-8">
//               <h3 className="text-xl font-bold text-gray-900 mb-6">Participant Details</h3>
//               <form onSubmit={handleRegister} className="space-y-4">
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
//                     <input type="text" name="name" required value={regData.name} onChange={handleInputChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500" />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
//                     <input type="tel" name="phnNumber" required value={regData.phnNumber} onChange={handleInputChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500" />
//                   </div>
//                   <div className="md:col-span-2">
//                     <label className="block text-sm font-medium text-gray-700 mb-1">Email ID</label>
//                     <input type="email" name="emailId" required value={regData.emailId} onChange={handleInputChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500" />
//                   </div>
//                 </div>
//                 <div className="flex gap-4 mt-6">
//                   <button type="submit" disabled={registering} className="flex-1 bg-primary-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-primary-700 transition disabled:opacity-50">
//                     {registering ? 'Processing...' : 'Confirm Registration & Pay'}
//                   </button>
//                   <button type="button" onClick={() => setShowRegForm(false)} className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition">
//                     Cancel
//                   </button>
//                 </div>
//               </form>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EventDetailsPage;







import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../services/api';
import { useAuth } from '../../contexts/AuthContext';
import { MapPin, Calendar, Activity, Clock, AlertCircle, CheckCircle2 } from 'lucide-react';
import { loadRazorpayScript, createRazorpayOrder } from '../../services/paymentService';

const EventDetailsPage = () => {

  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [registering, setRegistering] = useState(false);
  const [showRegForm, setShowRegForm] = useState(false);

  const [message, setMessage] = useState({
    type: '',
    text: ''
  });

  const [regData, setRegData] = useState({
    name: '',
    emailId: '',
    phnNumber: '',
    categoryId: ''
  });
  const [isRegistered, setIsRegistered] = useState(false);

  /* ---------------------------------- */
  /* Fetch Event                        */
  /* ---------------------------------- */

  useEffect(() => {

    const fetchEvent = async () => {

      try {

        const response = await api.get(`/events/${id}`);
        setEvent(response.data);

      } catch (err) {

        setMessage({
          type: 'error',
          text: 'Failed to load event details.'
        });

      } finally {

        setLoading(false);

      }

    };

    fetchEvent();

  }, [id]);

  useEffect(() => {
    const checkRegistration = async () => {
      const userId = user?.id || user?.sub;
      if (userId && id) {
        try {
          const res = await api.get(`/registrations/user/${userId}`);
          const hasReg = res.data.some(r => Number(r.eventId) === Number(id));
          setIsRegistered(hasReg);
        } catch (err) {
          console.error("Failed to check registration", err);
        }
      }
    };
    checkRegistration();
  }, [user, id]);

  /* ---------------------------------- */
  /* Prefill user data                  */
  /* ---------------------------------- */

  useEffect(() => {

    if (user) {

      setRegData({
        name: user.name || '',
        emailId: user.email || '',
        phnNumber: ''
      });

    }

  }, [user]);

  /* ---------------------------------- */
  /* Input handler                      */
  /* ---------------------------------- */

  const handleInputChange = (e) => {

    setRegData({
      ...regData,
      [e.target.name]: e.target.value
    });

  };

  /* ---------------------------------- */
  /* Register user                      */
  /* ---------------------------------- */

  const handleRegister = async (e) => {

    e.preventDefault();

    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    const userId = user?.id;

    if (!userId) {

      setMessage({
        type: 'error',
        text: 'User ID not found. Please login again.'
      });

      return;
    }

    setRegistering(true);
    setMessage({ type: '', text: '' });

    try {
      const isScriptLoaded = await loadRazorpayScript();
      if (!isScriptLoaded) {
        setMessage({ type: 'error', text: 'Razorpay SDK failed to load.' });
        setRegistering(false);
        return;
      }

      const selectedCat = event.categories.find(c => Number(c.id) === Number(regData.categoryId));
      if (!selectedCat) {
        setMessage({ type: 'error', text: 'Please select a valid Category.' });
        setRegistering(false);
        return;
      }

      const orderData = await createRazorpayOrder(selectedCat.price);

      // REGISTER THE USER IMMEDIATELY BEFORE PAYMENT
      try {
        await api.post(
          `/registrations/events/${id}/users/${userId}`,
          {
            name: regData.name,
            emailId: regData.emailId,
            phnNumber: regData.phnNumber,
            categoryId: Number(regData.categoryId)
          }
        );
        setMessage({ type: 'success', text: 'Successfully registered! Opening payment gateway...' });
      } catch (err) {
        throw new Error('Registration failed. ' + (err.response?.data?.message || ''));
      }

      const options = {
        key: orderData.keyId,
        amount: orderData.amount, // amount from backend
        currency: orderData.currency,
        name: "RunEvents",
        description: `Registration for ${event.name}`,
        order_id: orderData.orderId,
        handler: async (response) => {
          setMessage({ type: 'success', text: 'Payment completed successfully!' });
          setShowRegForm(false);
        },
        prefill: {
          name: regData.name,
          email: regData.emailId,
          contact: regData.phnNumber
        },
        theme: { color: "#4F46E5" }
      };

      const rzp = new window.Razorpay(options);
      
      // If user closes Razorpay without paying, they are still registered
      rzp.on('payment.failed', function (response){
        setMessage({ type: 'error', text: 'Payment failed or cancelled. However, your registration was saved.' });
        setShowRegForm(false);
      });

      rzp.open();

    } catch (err) {

      setMessage({
        type: 'error',
        text: err.response?.data?.message || err.response?.data || 'Registration failed'
      });

    } finally {

      setRegistering(false);

    }

  };

  /* ---------------------------------- */
  /* Loading                            */
  /* ---------------------------------- */

  if (loading) {

    return (
      <div className="flex justify-center items-center h-[calc(100vh-4rem)]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );

  }

  /* ---------------------------------- */
  /* Event not found                    */
  /* ---------------------------------- */

  if (!event) {

    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold text-gray-900">
          Event Not Found
        </h2>

        <button
          onClick={() => navigate(-1)}
          className="mt-4 text-primary-600 hover:text-primary-700"
        >
          Go Back
        </button>
      </div>
    );

  }

  /* ---------------------------------- */
  /* UI                                 */
  /* ---------------------------------- */

  return (

    <div className="max-w-4xl mx-auto px-4 py-10">

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">

        {/* Banner */}

        <div className="h-48 bg-gradient-to-r from-primary-600 to-indigo-700 flex items-center justify-center">

          <Activity className="w-16 h-16 text-white opacity-50" />

        </div>

        <div className="p-8">

          {/* Title */}

          <div className="flex justify-between items-start mb-6">

            <div>

              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {event.name}
              </h1>

              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-green-100 text-green-800">
                Registration Open
              </span>

            </div>

            <div className="text-right">

              <span className="text-3xl font-bold text-primary-700">
                {event.categories && event.categories.length > 0
                  ? (Math.min(...event.categories.map(c => c.price)) === Math.max(...event.categories.map(c => c.price))
                    ? `₹${event.categories[0].price}`
                    : `₹${Math.min(...event.categories.map(c => c.price))} - ₹${Math.max(...event.categories.map(c => c.price))}`)
                  : "N/A"
                }
              </span>

              <span className="block text-sm text-gray-500">
                per participant
              </span>

            </div>

          </div>

          {/* Event Details */}

          <div className="grid md:grid-cols-2 gap-6 mb-8 bg-gray-50 p-6 rounded-xl border">

            <div className="flex items-center">

              <Calendar className="w-6 h-6 mr-3 text-primary-500" />

              <div>

                <p className="text-sm text-gray-500">Date</p>

                <p className="font-medium">

                  {new Date(event.date).toLocaleDateString()}

                </p>

              </div>

            </div>

            <div className="flex items-center">

              <MapPin className="w-6 h-6 mr-3 text-primary-500" />

              <div>

                <p className="text-sm text-gray-500">Location</p>
                <p className="font-medium">{event.location}</p>

              </div>

            </div>

            <div className="flex items-center">
              <Activity className="w-6 h-6 mr-3 text-primary-500" />
              <div>
                <p className="text-sm text-gray-500">Available Categories</p>
                <p className="font-medium text-xs">
                  {event.categories && event.categories.map(c => `${c.distance}km`).join(', ')}
                </p>
              </div>
            </div>

            <div className="flex items-center">

              <Clock className="w-6 h-6 mr-3 text-primary-500" />

              <div>

                <p className="text-sm text-gray-500">Time</p>
                <p className="font-medium">05:30 AM (Reporting)</p>

              </div>

            </div>

          </div>

          {/* Message */}

          {message.text && (

            <div className={`p-4 rounded mb-6 flex items-center ${message.type === 'error'
                ? 'bg-red-50 text-red-800'
                : 'bg-green-50 text-green-800'
              }`}>

              {message.type === 'error'
                ? <AlertCircle className="w-5 h-5 mr-2" />
                : <CheckCircle2 className="w-5 h-5 mr-2" />
              }

              {message.text}

            </div>

          )}

          {/* Register Button */}

          {user?.role === 'ADMIN' ? (
            <div className="flex justify-center">
              <div className="bg-red-50 border border-red-200 text-red-700 px-8 py-4 rounded-xl flex items-center justify-center gap-2 font-bold text-lg shadow-sm">
                 Admin Account (Registration Disabled)
              </div>
            </div>
          ) : isRegistered ? (
            <div className="flex justify-center">
              <div className="bg-green-50 border border-green-200 text-green-700 px-8 py-4 rounded-xl flex items-center justify-center gap-2 font-bold text-lg shadow-sm">
                <CheckCircle2 className="w-6 h-6 text-green-600" /> Already Registered
              </div>
            </div>
          ) : !showRegForm ? (
            <div className="flex justify-center">
              <button
                onClick={() => {
                  if (!isAuthenticated) {
                    navigate('/login');
                  } else {
                    setShowRegForm(true);
                  }
                }}
                className="px-8 py-4 bg-primary-600 text-white rounded-xl font-bold hover:bg-primary-700 transition"
              >
                {isAuthenticated ? 'Register Now' : 'Log in to Register'}
              </button>
            </div>
          ) : (

            /* Registration Form */

            <div className="border-t pt-8">

              <h3 className="text-xl font-bold mb-6">
                Participant Details
              </h3>

              <form onSubmit={handleRegister} className="space-y-4">
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Select Distance Category</label>
                  <select
                    name="categoryId"
                    value={regData.categoryId}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white focus:ring-primary-500 focus:border-primary-500 text-sm"
                  >
                    <option value="" disabled>-- Select Distance --</option>
                    {event.categories && event.categories.map(cat => (
                      <option key={cat.id} value={cat.id}>
                        {cat.distance} km (₹{cat.price})
                      </option>
                    ))}
                  </select>
                </div>

                <input
                  name="name"
                  placeholder="Full Name"
                  value={regData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full border rounded px-4 py-2"
                />

                <input
                  name="phnNumber"
                  placeholder="Phone Number"
                  value={regData.phnNumber}
                  onChange={handleInputChange}
                  required
                  className="w-full border rounded px-4 py-2"
                />

                <input
                  name="emailId"
                  placeholder="Email"
                  value={regData.emailId}
                  onChange={handleInputChange}
                  required
                  className="w-full border rounded px-4 py-2"
                />

                <div className="flex gap-4 pt-4">

                  <button
                    type="submit"
                    disabled={registering}
                    className="flex-1 bg-primary-600 text-white py-3 rounded font-bold"
                  >

                    {registering
                      ? "Processing..."
                      : "Confirm Registration & Pay"
                    }

                  </button>

                  <button
                    type="button"
                    onClick={() => setShowRegForm(false)}
                    className="px-6 py-3 bg-gray-100 rounded"
                  >

                    Cancel

                  </button>

                </div>

              </form>

            </div>

          )}

        </div>

      </div>

    </div>

  );

};

export default EventDetailsPage;