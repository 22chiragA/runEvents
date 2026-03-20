import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import MainLayout from '../components/layout/MainLayout';
import AdminLayout from '../components/layout/AdminLayout';

import LandingPage from '../pages/LandingPage';
import LoginPage from '../pages/auth/LoginPage';
import SignupPage from '../pages/auth/SignupPage';

import DashboardPage from '../pages/user/DashboardPage';
import ProfilePage from '../pages/user/ProfilePage';
import MyRegistrationsPage from '../pages/user/MyRegistrationsPage';
import EventDetailsPage from '../pages/events/EventDetailsPage';

import AdminDashboardPage from '../pages/admin/AdminDashboardPage';
import CreateEventPage from '../pages/admin/CreateEventPage';
import ManageEventsPage from '../pages/admin/ManageEventsPage';
import CreateAdminPage from '../pages/admin/CreateAdminPage';
import ParticipantsListPage from '../pages/admin/ParticipantsListPage';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return children;
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        {/* Public Routes */}
        <Route index element={<LandingPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="signup" element={<SignupPage />} />
        
        {/* Events details is public but register needs auth */}
        <Route path="events/:id" element={<EventDetailsPage />} />

        {/* Protected User Routes */}
        <Route path="dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
        <Route path="profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
        <Route path="my-registrations" element={<ProtectedRoute><MyRegistrationsPage /></ProtectedRoute>} />
      </Route>

      {/* Admin Routes */}
      <Route path="/admin" element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<AdminDashboardPage />} />
        <Route path="create-admin" element={<CreateAdminPage />} />
        <Route path="events" element={<ManageEventsPage />} />
        <Route path="events/create" element={<CreateEventPage />} />
        <Route path="events/:eventId/users" element={<ParticipantsListPage />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
