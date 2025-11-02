import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainLayout from '../components/layout/MainLayout';
import LoginPage from '../pages/auth/LoginPage';
import RegisterPage from '../pages/auth/RegisterPage';
import PatientDashboard from '../pages/patient/PatientDashboard';
import AdminDashboard from '../pages/admin/AdminDashboard';
import ProfilePage from '../pages/common/ProfilePage';
import LogVitalsPage from '../pages/patient/LogVitalsPage';
import FindDoctorPage from '../pages/appointments/FindDoctorPage';
import DoctorProfilePage from '../pages/appointments/DoctorProfilePage';
import MyAppointmentsPage from '../pages/appointments/MyAppointmentsPage';
import NotificationsPage from '../pages/common/NotificationsPage';
import PatientListPage from '../pages/admin/PatientListPage';
import PatientDetailPage from '../pages/admin/PatientDetailPage'; // Re-adding the missing import
import DoctorManagementPage from '../pages/admin/DoctorManagementPage';
import GuidelinesPage from '../pages/admin/GuidelinesPage';
import HealthHistoryPage from '../pages/patient/HealthHistoryPage';
import ProtectedRoute from './ProtectedRoute';

// A wrapper to apply the main layout and protection to a component
const withProtection = (Component: React.ComponentType, allowedRoles?: string[]) => {
  return (
    <ProtectedRoute allowedRoles={allowedRoles}>
      <MainLayout>
        <Component />
      </MainLayout>
    </ProtectedRoute>
  );
};

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        {/* Protected Routes with Layout */}
        <Route path="/" element={withProtection(PatientDashboard, ['patient', 'admin'])} />
        <Route path="/admin" element={withProtection(AdminDashboard, ['admin'])} />
        <Route path="/admin/patients" element={withProtection(PatientListPage, ['admin'])} />
        <Route path="/admin/patients/:id" element={withProtection(PatientDetailPage, ['admin'])} />
        <Route path="/admin/doctors" element={withProtection(DoctorManagementPage, ['admin'])} />
        <Route path="/admin/guidelines" element={withProtection(GuidelinesPage, ['admin'])} />
        <Route path="/profile" element={withProtection(ProfilePage, ['patient', 'admin'])} />
        <Route path="/log-vitals" element={withProtection(LogVitalsPage, ['patient'])} />
        <Route path="/find-doctor" element={withProtection(FindDoctorPage, ['patient'])} />
        <Route path="/doctor/:id" element={withProtection(DoctorProfilePage, ['patient'])} />
        <Route path="/health-history" element={withProtection(HealthHistoryPage, ['patient'])} />
        <Route path="/my-appointments" element={withProtection(MyAppointmentsPage, ['patient'])} />
        <Route path="/notifications" element={withProtection(NotificationsPage, ['patient', 'admin'])} />

        {/* Public Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
