import React, { useState, FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useLoginMutation } from '../../store/api';
import { setCredentials } from '../../store/authSlice';

const LoginPage = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState('patient@helseflow.com');
  const [password, setPassword] = useState('password');
  const [error, setError] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login, { isLoading }] = useLoginMutation();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const userData = await login({ email, password }).unwrap();
      dispatch(setCredentials(userData));
      navigate('/');
    } catch (err: any) {
      setError(err.data || 'An error occurred');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md m-4">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">{t('loginPage.title')}</h2>
        <form onSubmit={handleSubmit}>
          {error && <p className="mb-4 text-center text-red-500 bg-red-100 p-3 rounded-lg">{error}</p>}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              {t('common.email')}
            </label>
            <input
              className="shadow-sm appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t('common.email')}
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              {t('common.password')}
            </label>
            <input
              className="shadow-sm appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 mb-3 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="******************"
              required
            />
          </div>
          <div className="flex items-center justify-between mb-4">
            <button
              className={`w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:shadow-outline transition-transform transform hover:scale-105 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? t('common.signingIn') : t('common.signIn')}
            </button>
          </div>
          <div className="text-center">
            <Link to="/register" className="font-bold text-sm text-blue-600 hover:text-blue-800">
              {t('common.dontHaveAccount')}
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
