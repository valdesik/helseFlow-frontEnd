import React from 'react';
import { useTranslation } from 'react-i18next';

const ProfilePage = () => {
  const { t } = useTranslation();

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-gray-800">{t('profilePage.title')}</h1>
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-2xl">
        <form>
          {/* Full Name */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="fullName">
              {t('common.fullName')}
            </label>
            <input
              className="shadow-sm appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
              id="fullName"
              type="text"
              defaultValue="John Doe"
            />
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              {t('common.email')}
            </label>
            <input
              className="shadow-sm appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 bg-gray-200 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              defaultValue="john.doe@example.com"
              readOnly // Email is typically not editable
            />
          </div>

          {/* Age & Region */}
          <div className="flex gap-4 mb-4">
            <div className="w-1/2">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="age">
                {t('profilePage.age')}
              </label>
              <input
                className="shadow-sm appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
                id="age"
                type="number"
                defaultValue={35}
              />
            </div>
            <div className="w-1/2">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="region">
                {t('profilePage.region')}
              </label>
              <input
                className="shadow-sm appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
                id="region"
                type="text"
                defaultValue="Oslo"
              />
            </div>
          </div>

          {/* Risk Factors */}
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="riskFactors">
              {t('profilePage.riskFactors')}
            </label>
            <textarea
              className="shadow-sm appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
              id="riskFactors"
              rows={3}
              defaultValue="Smoking, High-stress job"
            />
          </div>

          <div className="flex items-center justify-end">
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg focus:outline-none focus:shadow-outline transition-transform transform hover:scale-105"
              type="button"
            >
              {t('common.saveChanges')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;
