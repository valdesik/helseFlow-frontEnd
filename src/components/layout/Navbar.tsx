import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { logOut } from '../../store/authSlice';
import { RootState } from '../../store/store';
import LanguageSwitcher from '../common/LanguageSwitcher';
import NotificationBell from '../common/NotificationBell'; // Import NotificationBell

interface NavbarProps {
  onMenuButtonClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onMenuButtonClick }) => {
  const { t } = useTranslation();
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logOut());
    navigate('/login');
  };

  return (
    <nav className="bg-white text-gray-800 shadow-md fixed top-0 left-0 right-0 z-20">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-3">
          <div className="flex items-center">
            {user && (
              <div className="md:hidden mr-2">
                <button onClick={onMenuButtonClick} className="text-gray-600 hover:text-gray-800 focus:outline-none">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" /></svg>
                </button>
              </div>
            )}
            <div className="text-xl font-bold">
              <Link to="/">{t('common.helseflow')}</Link>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {user && <NotificationBell />} {/* Show bell only if logged in */}
            <LanguageSwitcher />
            {user ? (
              <div className="flex items-center">
                <span className="mr-4 font-medium">{t('common.welcome', { name: user.name })}</span>
                <button 
                  onClick={handleLogout}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
                >
                  {t('common.logout')}
                </button>
              </div>
            ) : (
              <Link to="/login" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300">
                {t('common.login')}
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
