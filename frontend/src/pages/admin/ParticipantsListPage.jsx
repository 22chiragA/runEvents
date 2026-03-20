// import React, { useState, useEffect } from 'react';
// import { useParams, Link } from 'react-router-dom';
// import api from '../../services/api';
// import { Trash2, ArrowLeft } from 'lucide-react';

// const ParticipantsListPage = () => {
//   const { eventId } = useParams();
//   const [participants, setParticipants] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [showRegisterForm, setShowRegisterForm] = useState(false);
//   const [regForm, setRegForm] = useState({
//     name: '', emailId: '', phnNumber: '', paymentStatus: 'COMPLETED'
//   });
//   const [editingUserId, setEditingUserId] = useState(null);
//   const [editForm, setEditForm] = useState({ name: '', email: '' });

//   const fetchParticipants = async () => {
//     try {
//       const response = await api.get(`/admin/events/${eventId}/users`);
//       setParticipants(response.data || []);
//     } catch (err) {
//       console.error("Failed to fetch participants", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchParticipants();
//   }, [eventId]);

//   const handleManualRegister = async (e) => {
//     e.preventDefault();
//     try {
//        await api.post(`/admin/events/${eventId}/register`, regForm);
//        setShowRegisterForm(false);
//        setRegForm({ name: '', emailId: '', phnNumber: '', paymentStatus: 'COMPLETED' });
//        setLoading(true);
//        fetchParticipants();
//     } catch (err) {
//        alert(err.response?.data?.message || 'Failed to register participant manually');
//     }
//   };

//   // const handleEditClick = (participant) => {
//   //   if (!participant.userId) {
//   //     alert("Cannot edit a manually registered participant without a linked user ID.");
//   //     return;
//   //   }
//   //   setEditingUserId(participant.userId);
//   //   setEditForm({ 
//   //     name: participant.name || participant.user?.name || '', 
//   //     email: participant.emailId || participant.email || participant.user?.email || '' 
//   //   });
//   // };
//   const handleEditClick = (participant) => {

//   setEditingUserId(participant.userId);

//   setEditForm({
//     name: participant.name || '',
//     email: participant.emailId || ''
//   });

// };

//   const handleUpdateUser = async (e) => {
//     e.preventDefault();
//     try {
//       await api.put(`/admin/users/${editingUserId}`, editForm);
//       setEditingUserId(null);
//       setLoading(true);
//       fetchParticipants();
//     } catch (err) {
//       alert(err.response?.data?.message || 'Failed to update user profile');
//     }
//   };

//   // const handleRemove = async (userId) => {
//   //   if (!window.confirm("Are you sure you want to remove this participant?")) return;
//   //   try {
//   //     await api.delete(`/admin/events/${eventId}/users/${userId}`);
//   //     setParticipants(participants.filter(p => (p.id || p.userId) !== userId));
//   //   } catch (err) {
//   //     alert(err.response?.data?.message || 'Failed to remove participant');
//   //   }
//   // };
//   const handleRemove = async (userId) => {
//   if (!window.confirm("Are you sure you want to remove this participant?")) return;

//   try {

//     await api.delete(`/admin/events/${eventId}/users/${userId}`);

//     // refresh participants
//     setParticipants(prev =>
//       prev.filter(p => p.userId !== userId)
//     );

//   } catch (err) {

//     alert(err.response?.data?.message || "Failed to remove participant");

//   }
// };

//   if (loading) {
//      return <div className="p-8 text-center">Loading...</div>;
//   }

//   return (
//     <div>
//       <div className="mb-6 flex justify-between items-center">
//         <div>
//           <Link to="/admin/events" className="text-primary-600 hover:text-primary-700 flex items-center text-sm font-medium mb-4">
//              <ArrowLeft className="w-4 h-4 mr-1" /> Back to Events
//           </Link>
//           <h1 className="text-2xl font-bold text-gray-900">Event Participants</h1>
//         </div>
//         <button
//           onClick={() => setShowRegisterForm(!showRegisterForm)}
//           className="bg-primary-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-primary-700 transition"
//         >
//           {showRegisterForm ? 'Cancel' : '+ Register Participant'}
//         </button>
//       </div>

//       {showRegisterForm && (
//         <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-6 font-sans">
//           <h2 className="text-lg font-bold mb-4">Manual Registration</h2>
//           <form onSubmit={handleManualRegister} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//             <input type="text" placeholder="Full Name" required
//                    value={regForm.name} onChange={e => setRegForm({...regForm, name: e.target.value})}
//                    className="px-3 py-2 border border-gray-300 rounded focus:ring-primary-500 focus:border-primary-500" />
//             <input type="email" placeholder="Email Address" required
//                    value={regForm.emailId} onChange={e => setRegForm({...regForm, emailId: e.target.value})}
//                    className="px-3 py-2 border border-gray-300 rounded focus:ring-primary-500 focus:border-primary-500" />
//             <input type="text" placeholder="Phone Number" required
//                    value={regForm.phnNumber} onChange={e => setRegForm({...regForm, phnNumber: e.target.value})}
//                    className="px-3 py-2 border border-gray-300 rounded focus:ring-primary-500 focus:border-primary-500" />
//             <select value={regForm.paymentStatus} onChange={e => setRegForm({...regForm, paymentStatus: e.target.value})}
//                     className="px-3 py-2 border border-gray-300 rounded focus:ring-primary-500 focus:border-primary-500">
//               <option value="PENDING">PENDING</option>
//               <option value="COMPLETED">COMPLETED</option>
//             </select>
//             <div className="md:col-span-2 lg:col-span-4 flex justify-end mt-2">
//               <button type="submit" className="bg-green-600 text-white px-6 py-2 rounded font-medium hover:bg-green-700">
//                 Register
//               </button>
//             </div>
//           </form>
//         </div>
//       )}

//       <div className="bg-white shadow-sm rounded-xl border border-gray-200 overflow-hidden">
//         <table className="min-w-full divide-y divide-gray-200">
//           <thead className="bg-gray-50">
//             <tr>
//               <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
//               <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
//               <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
//               <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
//             </tr>
//           </thead>
//           <tbody className="bg-white divide-y divide-gray-200">
//             {participants.map((registration, idx) => {
//               // Registration entity from backend: { id, userId, name, emailId, phnNumber, bibNumber, paymentStatus, eventId }
//               // For editing a profile, we must use the actual `userId` (if it exists). 
//               // For removing a participant, the API expects `/admin/events/{eventId}/users/{userId}`.
//               // Note: if manual registration doesn't require a real User ID, `userId` might be null in the DB.
//               const uId = registration.userId; 
//               // Use registration.id as the fallback React key if uId is null
//               const reactKey = uId || `reg-${registration.id}`; 
//               const isEditing = editingUserId === uId && uId !== null;

//               if (isEditing) {
//                 return (
//                   <tr key={reactKey} className="bg-blue-50">
//                     <td colSpan="4" className="px-6 py-4">
//                       <form onSubmit={handleUpdateUser} className="flex items-center space-x-4">
//                         <input type="text" value={editForm.name} onChange={e => setEditForm({...editForm, name: e.target.value})} required className="px-2 py-1 border rounded w-1/3" placeholder="Name" />
//                         <input type="email" value={editForm.email} onChange={e => setEditForm({...editForm, email: e.target.value})} required className="px-2 py-1 border rounded w-1/3" placeholder="Email" />
//                         <div className="flex-1 text-right space-x-2">
//                           <button type="button" onClick={() => setEditingUserId(null)} className="text-gray-500 hover:text-gray-700 text-sm font-medium">Cancel</button>
//                           <button type="submit" className="bg-blue-600 text-white px-3 py-1 rounded text-sm font-medium hover:bg-blue-700">Save</button>
//                         </div>
//                       </form>
//                     </td>
//                   </tr>
//                 );
//               }

//               return (
//                 <tr key={reactKey} className="hover:bg-gray-50">
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <div className="text-sm font-medium text-gray-900">{registration.name}</div>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                     {registration.emailId}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                     {registration.phnNumber || '-'}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-3">
//                     <button onClick={() => handleEditClick(registration)} className="text-blue-600 hover:text-blue-900 inline-flex items-center">
//                       Edit
//                     </button>
//                     {/* <button onClick={() => {
//                        // Ensure there's a valid user ID to send, or handle manual delete later. 
//                        // Based on API: /admin/events/{eventId}/users/{userId}

//                        handleRemove(uId);
//                     }} className="text-red-600 hover:text-red-900 inline-flex items-center">
//                       <Trash2 className="w-4 h-4 mr-1"/> Remove
//                     </button> */}
// <button
//   onClick={() => handleRemove(registration.userId)}
//   className="text-red-600 hover:text-red-900 inline-flex items-center"
// >
//   <Trash2 className="w-4 h-4 mr-1" /> Remove
// </button>
//                   </td>
//                 </tr>
//               )
//             })}
//             {participants.length === 0 && (
//               <tr>
//                 <td colSpan="4" className="px-6 py-8 text-center text-gray-500">No participants registered yet.</td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default ParticipantsListPage;
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../../services/api';
import { Trash2, ArrowLeft } from 'lucide-react';

const ParticipantsListPage = () => {

  const { eventId } = useParams();

  const [participants, setParticipants] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showRegisterForm, setShowRegisterForm] = useState(false);

  const [regForm, setRegForm] = useState({
    name: '',
    emailId: '',
    phnNumber: '',
    paymentStatus: 'COMPLETED'
  });

  const [editingRegId, setEditingRegId] = useState(null);

  const [editForm, setEditForm] = useState({
    name: '',
    emailId: '',
    phnNumber: ''
  });

  const fetchParticipants = async () => {

    try {

      const response = await api.get(`/admin/events/${eventId}/users`);

      setParticipants(response.data || []);

    } catch (err) {

      console.error("Failed to fetch participants", err);

    } finally {

      setLoading(false);

    }

  };

  useEffect(() => {

    fetchParticipants();

  }, [eventId]);

  const handleManualRegister = async (e) => {

    e.preventDefault();

    try {

      await api.post(`/admin/events/${eventId}/register`, regForm);

      setShowRegisterForm(false);

      setRegForm({
        name: '',
        emailId: '',
        phnNumber: '',
        paymentStatus: 'COMPLETED'
      });

      fetchParticipants();

    } catch (err) {

      alert(err.response?.data?.message || 'Failed to register participant');

    }

  };

  const handleEditClick = (participant) => {

    setEditingRegId(participant.id);

    setEditForm({
      name: participant.name || '',
      emailId: participant.emailId || '',
      phnNumber: participant.phnNumber || ''
    });

  };

  const handleUpdateUser = async (e) => {

    e.preventDefault();

    try {

      await api.put(`/admin/registrations/${editingRegId}`, {
        name: editForm.name,
        emailId: editForm.emailId,
        phnNumber: editForm.phnNumber
      });

      setEditingRegId(null);

      fetchParticipants();

    } catch (err) {

      alert(err.response?.data?.message || 'Failed to update participant');

    }

  };

  const handleRemove = async (participant) => {

    if (!window.confirm("Are you sure you want to remove this participant?")) return;

    try {
      
      // We modified the backend to use the Registration ID directly,
      // so this will work universally for both normal users and manual registrations.
      await api.delete(`/admin/events/${eventId}/registrations/${participant.id}`);

      setParticipants(prev =>
        prev.filter(p => p.id !== participant.id)
      );

    } catch (err) {

      alert(err.response?.data?.message || 'Failed to remove participant');

    }

  };

  if (loading) {

    return <div className="p-8 text-center">Loading...</div>;

  }

  return (

    <div>

      <div className="mb-6 flex justify-between items-center">

        <div>

          <Link
            to="/admin/events"
            className="text-primary-600 hover:text-primary-700 flex items-center text-sm font-medium mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-1" /> Back to Events
          </Link>

          <h1 className="text-2xl font-bold text-gray-900">

            Event Participants

          </h1>

        </div>

        <button
          onClick={() => setShowRegisterForm(!showRegisterForm)}
          className="bg-primary-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-primary-700"
        >

          {showRegisterForm ? 'Cancel' : '+ Register Participant'}

        </button>

      </div>

      {showRegisterForm && (

        <div className="bg-white p-6 rounded-xl shadow-sm border mb-6">

          <h2 className="text-lg font-bold mb-4">

            Manual Registration

          </h2>

          <form
            onSubmit={handleManualRegister}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
          >

            <input
              type="text"
              placeholder="Full Name"
              required
              value={regForm.name}
              onChange={e => setRegForm({ ...regForm, name: e.target.value })}
              className="border px-3 py-2 rounded"
            />

            <input
              type="email"
              placeholder="Email"
              required
              value={regForm.emailId}
              onChange={e => setRegForm({ ...regForm, emailId: e.target.value })}
              className="border px-3 py-2 rounded"
            />

            <input
              type="text"
              placeholder="Phone"
              required
              value={regForm.phnNumber}
              onChange={e => setRegForm({ ...regForm, phnNumber: e.target.value })}
              className="border px-3 py-2 rounded"
            />

            <select
              value={regForm.paymentStatus}
              onChange={e => setRegForm({ ...regForm, paymentStatus: e.target.value })}
              className="border px-3 py-2 rounded"
            >

              <option value="PENDING">PENDING</option>
              <option value="COMPLETED">COMPLETED</option>

            </select>

            <div className="col-span-4 flex justify-end">

              <button
                type="submit"
                className="bg-green-600 text-white px-6 py-2 rounded"
              >

                Register

              </button>

            </div>

          </form>

        </div>

      )}

      <div className="bg-white shadow rounded-xl border overflow-hidden">

        <table className="min-w-full">

          <thead className="bg-gray-50">

            <tr>

              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Name
              </th>

              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Email
              </th>

              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Phone
              </th>

              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                Actions
              </th>

            </tr>

          </thead>

          <tbody className="divide-y">

            {participants.map((registration) => {

              const isEditing = editingRegId === registration.id;

              if (isEditing) {

                return (

                  <tr key={registration.id}>

                    <td colSpan="4">

                      <form
                        onSubmit={handleUpdateUser}
                        className="flex gap-4 p-4 bg-blue-50"
                      >

                        <input
                          value={editForm.name}
                          onChange={e => setEditForm({ ...editForm, name: e.target.value })}
                          className="border px-2 py-1 rounded"
                          placeholder="Name"
                        />

                        <input
                          value={editForm.emailId}
                          onChange={e => setEditForm({ ...editForm, emailId: e.target.value })}
                          className="border px-2 py-1 rounded"
                          placeholder="Email"
                        />

                        <input
                          value={editForm.phnNumber}
                          onChange={e => setEditForm({ ...editForm, phnNumber: e.target.value })}
                          className="border px-2 py-1 rounded"
                          placeholder="Phone"
                        />

                        <button type="submit" className="bg-blue-600 text-white px-3 py-1 rounded">

                          Save

                        </button>

                        <button
                          type="button"
                          onClick={() => setEditingRegId(null)}
                          className="text-gray-500"
                        >

                          Cancel

                        </button>

                      </form>

                    </td>

                  </tr>

                );

              }

              return (

                <tr key={registration.id}>

                  <td className="px-6 py-4">

                    {registration.name}

                  </td>

                  <td className="px-6 py-4">

                    {registration.emailId}

                  </td>

                  <td className="px-6 py-4">

                    {registration.phnNumber}

                  </td>

                  <td className="px-6 py-4 text-right space-x-3">

                    <button
                      onClick={() => handleEditClick(registration)}
                      className="text-blue-600"
                    >

                      Edit

                    </button>

                    <button
                      onClick={() => handleRemove(registration)}
                      className="text-red-600 inline-flex items-center"
                    >

                      <Trash2 className="w-4 h-4 mr-1" />

                      Remove

                    </button>

                  </td>

                </tr>

              );

            })}

          </tbody>

        </table>

      </div>

    </div>

  );

};

export default ParticipantsListPage;