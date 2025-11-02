import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const { t } = useTranslation();
  const user = useSelector((state: RootState) => state.auth.user);

  return (
    <> 
      {/* Overlay for mobile */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      ></div>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 w-64 bg-white h-full p-4 border-r border-gray-200 z-40 transform transition-transform duration-300 md:relative md:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex justify-between items-center mb-6">
            <h2 className="font-bold text-xl">{t('common.menu')}</h2>
            <button onClick={onClose} className="md:hidden text-gray-600 hover:text-gray-800">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
        </div>
        <nav>
          {user?.role === 'patient' && (
            <>
              <h3 className="font-semibold text-sm text-gray-500 uppercase tracking-wider mb-2">{t('common.patientMenu')}</h3>
              <ul>
                <li className="mb-2">
                  <Link to="/" className="block py-2 px-4 rounded-lg text-gray-700 hover:bg-blue-100 hover:text-blue-600 transition-colors" onClick={onClose}>{t('common.dashboard')}</Link>
                </li>
                <li className="mb-2">
                  <Link to="/log-vitals" className="block py-2 px-4 rounded-lg text-gray-700 hover:bg-blue-100 hover:text-blue-600 transition-colors" onClick={onClose}>{t('common.logVitals')}</Link>
                </li>
                <li className="mb-2">
                  <Link to="/health-history" className="block py-2 px-4 rounded-lg text-gray-700 hover:bg-blue-100 hover:text-blue-600 transition-colors" onClick={onClose}>{t('common.healthHistory')}</Link>
                </li>
                <li className="mb-2">
                  <Link to="/find-doctor" className="block py-2 px-4 rounded-lg text-gray-700 hover:bg-blue-100 hover:text-blue-600 transition-colors" onClick={onClose}>{t('common.findDoctor')}</Link>
                </li>
                <li className="mb-2">
                  <Link to="/my-appointments" className="block py-2 px-4 rounded-lg text-gray-700 hover:bg-blue-100 hover:text-blue-600 transition-colors" onClick={onClose}>{t('common.myAppointments')}</Link>
                </li>
                <li className="mb-2">
                  <Link to="/notifications" className="block py-2 px-4 rounded-lg text-gray-700 hover:bg-blue-100 hover:text-blue-600 transition-colors" onClick={onClose}>{t('common.notifications')}</Link>
                </li>
                <li className="mb-2">
                  <Link to="/profile" className="block py-2 px-4 rounded-lg text-gray-700 hover:bg-blue-100 hover:text-blue-600 transition-colors" onClick={onClose}>{t('common.profile')}</Link>
                </li>
              </ul>
            </>
          )}

          {user?.role === 'admin' && (
            <>
              <h3 className="font-semibold text-sm text-gray-500 uppercase tracking-wider mt-6 mb-2">{t('common.adminMenu')}</h3>
              <ul>
                <li className="mb-2">
                  <Link to="/admin" className="block py-2 px-4 rounded-lg text-gray-700 hover:bg-blue-100 hover:text-blue-600 transition-colors" onClick={onClose}>{t('common.analytics')}</Link>
                </li>
                <li className="mb-2">
                  <Link to="/admin/patients" className="block py-2 px-4 rounded-lg text-gray-700 hover:bg-blue-100 hover:text-blue-600 transition-colors" onClick={onClose}>{t('common.patientManagement')}</Link>
                </li>
                <li className="mb-2">
                  <Link to="/admin/doctors" className="block py-2 px-4 rounded-lg text-gray-700 hover:bg-blue-100 hover:text-blue-600 transition-colors" onClick={onClose}>{t('common.doctorManagement')}</Link>
                </li>
                <li className="mb-2">
                  <Link to="/admin/guidelines" className="block py-2 px-4 rounded-lg text-gray-700 hover:bg-blue-100 hover:text-blue-600 transition-colors" onClick={onClose}>{t('common.guidelines')}</Link>
                </li>
                <li className="mb-2">
                  <Link to="/notifications" className="block py-2 px-4 rounded-lg text-gray-700 hover:bg-blue-100 hover:text-blue-600 transition-colors" onClick={onClose}>{t('common.notifications')}</Link>
                </li>
              </ul>
            </>
          )}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
